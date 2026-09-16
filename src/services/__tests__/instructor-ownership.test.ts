import * as courseService from "../course";
import * as curriculumService from "../curriculum";
import * as enrollmentService from "../enrollment";
import * as courseRepository from "@/repositories/course";
import * as moduleRepository from "@/repositories/module";
import * as lessonRepository from "@/repositories/lesson";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as authorizationService from "@/services/authorization";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import {
  CourseLevel,
  CourseStatus,
  EnrollmentStatus,
  type Prisma,
} from "@prisma/client";

jest.mock("@/repositories/course");
jest.mock("@/repositories/module");
jest.mock("@/repositories/lesson");
jest.mock("@/repositories/enrollment");
jest.mock("@/services/authorization");

const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockModuleRepo = moduleRepository as jest.Mocked<typeof moduleRepository>;
const mockLessonRepo = lessonRepository as jest.Mocked<typeof lessonRepository>;
const mockEnrollmentRepo = enrollmentRepository as jest.Mocked<
  typeof enrollmentRepository
>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Instructor Resource Ownership & Isolation (Task 07)", () => {
  const instructorA = "instructor-a";
  const instructorB = "instructor-b";
  const adminId = "admin-1";

  const courseB = {
    id: "course-b-id",
    title: "Instructor B Course",
    slug: "instructor-b-course",
    description: "Belongs to Instructor B",
    thumbnailUrl: null,
    status: CourseStatus.DRAFT,
    level: CourseLevel.BEGINNER,
    category: "Web Development",
    instructorId: instructorB,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  const publishedCourseB = {
    ...courseB,
    id: "course-b-published-id",
    status: CourseStatus.PUBLISHED,
  };

  const moduleB = {
    id: "module-b-id",
    title: "Module B",
    description: "Module B description",
    orderIndex: 0,
    courseId: courseB.id,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  const lessonB = {
    id: "lesson-b-id",
    title: "Lesson B",
    slug: "lesson-b",
    orderIndex: 0,
    durationMinutes: 15,
    isFreePreview: false,
    moduleId: moduleB.id,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    module: {
      id: moduleB.id,
      courseId: courseB.id,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthService.hasRole.mockResolvedValue(false);
  });

  describe("Course Management Access Isolation", () => {
    it("Instructor A CANNOT view Instructor B's draft course in management view", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        courseService.getInstructorCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT view Instructor B's PUBLISHED course in management view (IDOR defense)", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(publishedCourseB);

      await expect(
        courseService.getInstructorCourse(instructorA, publishedCourseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor B CAN view their own course in management view", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      const result = await courseService.getInstructorCourse(
        instructorB,
        courseB.id,
      );
      expect(result.id).toBe(courseB.id);
    });

    it("Admin CAN view any instructor's course in management view", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockAuthService.hasRole.mockResolvedValue(true);

      const result = await courseService.getInstructorCourse(
        adminId,
        courseB.id,
      );
      expect(result.id).toBe(courseB.id);
    });

    it("throws NotFoundError when the course does not exist", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(null);

      await expect(
        courseService.getInstructorCourse(instructorA, "non-existent"),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("Course Mutation Isolation", () => {
    it("Instructor A CANNOT update Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        courseService.updateCourse(instructorA, courseB.id, {
          title: "Tampered",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT delete Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        courseService.deleteCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT publish Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        courseService.publishCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT unpublish Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(publishedCourseB);

      await expect(
        courseService.unpublishCourse(instructorA, publishedCourseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT archive Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        courseService.archiveCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe("Curriculum Mutation Isolation", () => {
    it("Instructor A CANNOT add a module to Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.createModule(instructorA, {
          courseId: courseB.id,
          title: "Intruder Module",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT update a module on Instructor B's course", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(moduleB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.updateModule(instructorA, moduleB.id, {
          title: "Renamed",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT delete a module on Instructor B's course", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(moduleB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.deleteModule(instructorA, moduleB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT reorder modules on Instructor B's course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.reorderModules(instructorA, courseB.id, [moduleB.id]),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT add a lesson to Instructor B's module", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(moduleB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.createLesson(instructorA, {
          moduleId: moduleB.id,
          title: "Intruder Lesson",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT update a lesson on Instructor B's course", async () => {
      mockLessonRepo.findLessonWithModule.mockResolvedValue(lessonB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.updateLesson(instructorA, lessonB.id, {
          title: "Tampered Lesson",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT delete a lesson on Instructor B's course", async () => {
      mockLessonRepo.findLessonWithModule.mockResolvedValue(lessonB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.deleteLesson(instructorA, lessonB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor A CANNOT reorder lessons on Instructor B's module", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(moduleB);
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        curriculumService.reorderLessons(instructorA, moduleB.id, [lessonB.id]),
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe("Student Roster Privacy", () => {
    const mockRoster = [
      {
        id: "enrollment-1",
        userId: "student-1",
        courseId: courseB.id,
        status: EnrollmentStatus.ACTIVE,
        progressPercentage: 45,
        enrolledAt: new Date("2026-02-01"),
        completedAt: null,
        lastAccessedAt: new Date("2026-02-05"),
        user: {
          id: "student-1",
          name: "Alice Smith",
          email: "alice@example.com",
          image: null,
          avatarUrl: null,
        },
      },
    ];

    it("Instructor A CANNOT view Instructor B's student roster", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);

      await expect(
        enrollmentService.getCourseRoster(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("Instructor B CAN view their own course student roster", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockEnrollmentRepo.findEnrollmentsByCourseId.mockResolvedValue(
        mockRoster,
      );

      const roster = await enrollmentService.getCourseRoster(
        instructorB,
        courseB.id,
      );
      expect(roster).toHaveLength(1);
      expect(roster[0].user.name).toBe("Alice Smith");
      expect(roster[0].progressPercentage).toBe(45);
    });

    it("Admin CAN view any course student roster", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockAuthService.hasRole.mockResolvedValue(true);
      mockEnrollmentRepo.findEnrollmentsByCourseId.mockResolvedValue(
        mockRoster,
      );

      const roster = await enrollmentService.getCourseRoster(
        adminId,
        courseB.id,
      );
      expect(roster).toHaveLength(1);
      expect(roster[0].user.email).toBe("alice@example.com");
    });
  });

  describe("Publishing Prerequisite Enforcement", () => {
    it("rejects publishing when course has 0 modules", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockCourseRepo.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepo.countCurriculumItems.mockResolvedValue({
              moduleCount: 0,
              lessonCount: 0,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return courseB;
        },
      );

      await expect(
        courseService.publishCourse(instructorB, courseB.id),
      ).rejects.toThrow(ValidationError);
      await expect(
        courseService.publishCourse(instructorB, courseB.id),
      ).rejects.toThrow("Cannot publish a course without at least one module");
    });

    it("rejects publishing when course has 1 module but 0 lessons", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockCourseRepo.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepo.countCurriculumItems.mockResolvedValue({
              moduleCount: 1,
              lessonCount: 0,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return courseB;
        },
      );

      await expect(
        courseService.publishCourse(instructorB, courseB.id),
      ).rejects.toThrow(ValidationError);
      await expect(
        courseService.publishCourse(instructorB, courseB.id),
      ).rejects.toThrow("Cannot publish a course without at least one lesson");
    });

    it("successfully publishes when course has at least 1 module and 1 lesson", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockCourseRepo.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepo.countCurriculumItems.mockResolvedValue({
              moduleCount: 2,
              lessonCount: 5,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return {
            ...courseB,
            status: CourseStatus.PUBLISHED,
          };
        },
      );

      const published = await courseService.publishCourse(
        instructorB,
        courseB.id,
      );
      expect(published.status).toBe(CourseStatus.PUBLISHED);
    });
  });
});
