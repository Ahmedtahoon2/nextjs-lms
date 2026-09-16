import * as profileService from "@/services/profile";
import * as courseService from "@/services/course";
import * as curriculumService from "@/services/curriculum";
import * as lessonContentService from "@/services/lesson-content";
import * as progressService from "@/services/progress";
import * as userRepository from "@/repositories/user";
import * as courseRepository from "@/repositories/course";
import * as moduleRepository from "@/repositories/module";
import * as lessonRepository from "@/repositories/lesson";
import * as lessonContentRepository from "@/repositories/lesson-content";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as lessonProgressRepository from "@/repositories/lesson-progress";
import * as authorizationService from "@/services/authorization";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";
import { CourseStatus, EnrollmentStatus } from "@prisma/client";

// Mock all underlying repositories and auth service
jest.mock("@/repositories/user");
jest.mock("@/repositories/course");
jest.mock("@/repositories/module");
jest.mock("@/repositories/lesson");
jest.mock("@/repositories/lesson-content");
jest.mock("@/repositories/enrollment");
jest.mock("@/repositories/lesson-progress");
jest.mock("@/services/authorization");
jest.mock("@/lib/db", () => ({
  prisma: {
    $transaction: jest.fn((callback) => callback({})),
  },
}));

const mockUserRepo = userRepository as jest.Mocked<typeof userRepository>;
const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockModuleRepo = moduleRepository as jest.Mocked<typeof moduleRepository>;
const mockLessonRepo = lessonRepository as jest.Mocked<typeof lessonRepository>;
const mockLessonContentRepo = lessonContentRepository as jest.Mocked<
  typeof lessonContentRepository
>;
const mockEnrollmentRepo = enrollmentRepository as jest.Mocked<
  typeof enrollmentRepository
>;
const mockProgressRepo = lessonProgressRepository as jest.Mocked<
  typeof lessonProgressRepository
>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Security Audit: IDOR & Cross-Resource Authorization Tests", () => {
  const userA = "user-a";
  const userB = "user-b";
  const instructorA = "instructor-a";
  const instructorB = "instructor-b";
  const adminUser = "admin-user";
  const studentA = "student-a";

  const courseB = {
    id: "course-b-id",
    title: "Course B Title",
    slug: "course-b",
    description: "Course B Description",
    thumbnailUrl: null,
    status: CourseStatus.DRAFT,
    level: "ALL_LEVELS" as const,
    category: "Development",
    instructorId: instructorB,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const moduleB = {
    id: "module-b-id",
    title: "Module B",
    description: "Description B",
    orderIndex: 0,
    courseId: courseB.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const lessonB = {
    id: "lesson-b-id",
    title: "Lesson B",
    slug: "lesson-b",
    orderIndex: 0,
    durationMinutes: 10,
    isFreePreview: false,
    moduleId: moduleB.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const lessonBHierarchy = {
    ...lessonB,
    module: {
      ...moduleB,
      course: courseB,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ──────────────────────────────────────────────
  // 1. User Profile IDOR Tests
  // ──────────────────────────────────────────────
  describe("1. User Profile IDOR Penetration", () => {
    it("strictly blocks User A from updating User B's profile", async () => {
      await expect(
        profileService.updateUserProfile(userA, userB, {
          name: "Malicious Tamper",
          bio: "Hacked bio",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockUserRepo.updateUserProfile).not.toHaveBeenCalled();
    });

    it("allows User A to update their own profile", async () => {
      mockUserRepo.findUserById.mockResolvedValue({
        id: userA,
        name: "User A",
        email: "user-a@example.com",
        emailVerified: true,
        image: null,
        headline: null,
        bio: null,
        avatarUrl: null,
        website: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepo.updateUserProfile.mockResolvedValue({
        id: userA,
        name: "User A Updated",
        email: "user-a@example.com",
        emailVerified: true,
        image: null,
        headline: "Engineer",
        bio: "Updated bio",
        avatarUrl: null,
        website: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const updated = await profileService.updateUserProfile(userA, userA, {
        name: "User A Updated",
        headline: "Engineer",
        bio: "Updated bio",
      });

      expect(updated.name).toBe("User A Updated");
      expect(mockUserRepo.updateUserProfile).toHaveBeenCalledWith(
        userA,
        expect.objectContaining({ name: "User A Updated" }),
      );
    });
  });

  // ──────────────────────────────────────────────
  // 2. Course Management IDOR Tests
  // ──────────────────────────────────────────────
  describe("2. Course Management IDOR Penetration", () => {
    beforeEach(() => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockAuthService.hasRole.mockResolvedValue(false); // default not admin
    });

    it("strictly blocks Instructor A from updating Instructor B's course", async () => {
      await expect(
        courseService.updateCourse(instructorA, courseB.id, {
          title: "Tampered Course Title",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockCourseRepo.updateCourse).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from deleting Instructor B's course", async () => {
      await expect(
        courseService.deleteCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);

      expect(mockCourseRepo.deleteCourseAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from publishing Instructor B's course", async () => {
      await expect(
        courseService.publishCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);

      expect(
        mockCourseRepo.executeCourseStatusTransition,
      ).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from archiving Instructor B's course", async () => {
      await expect(
        courseService.archiveCourse(instructorA, courseB.id),
      ).rejects.toThrow(AuthorizationError);

      expect(
        mockCourseRepo.executeCourseStatusTransition,
      ).not.toHaveBeenCalled();
    });

    it("allows admin user to manage Instructor B's course", async () => {
      mockAuthService.hasRole.mockImplementation(
        async (_uid, role) => role === "admin",
      );
      mockCourseRepo.updateCourse.mockResolvedValue({
        ...courseB,
        title: "Admin Supervised Title",
      });

      const result = await courseService.updateCourse(adminUser, courseB.id, {
        title: "Admin Supervised Title",
      });

      expect(result.title).toBe("Admin Supervised Title");
      expect(mockCourseRepo.updateCourse).toHaveBeenCalled();
    });
  });

  // ──────────────────────────────────────────────
  // 3. Curriculum Management IDOR Tests
  // ──────────────────────────────────────────────
  describe("3. Curriculum Management IDOR Penetration", () => {
    beforeEach(() => {
      mockCourseRepo.findCourseById.mockResolvedValue(courseB);
      mockModuleRepo.findModuleById.mockResolvedValue(moduleB);
      mockLessonRepo.findLessonById.mockResolvedValue(lessonB);
      mockLessonRepo.findLessonWithModule.mockResolvedValue({
        ...lessonB,
        module: moduleB,
      });
      mockAuthService.hasRole.mockResolvedValue(false); // not admin
    });

    it("strictly blocks Instructor A from creating a module in Instructor B's course", async () => {
      await expect(
        curriculumService.createModule(instructorA, {
          courseId: courseB.id,
          title: "Injected Module",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockModuleRepo.createModuleAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from updating a module in Instructor B's course", async () => {
      await expect(
        curriculumService.updateModule(instructorA, moduleB.id, {
          title: "Tampered Module",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockModuleRepo.updateModuleAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from deleting a module in Instructor B's course", async () => {
      await expect(
        curriculumService.deleteModule(instructorA, moduleB.id),
      ).rejects.toThrow(AuthorizationError);

      expect(mockModuleRepo.deleteModuleAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from reordering modules in Instructor B's course", async () => {
      await expect(
        curriculumService.reorderModules(instructorA, courseB.id, [
          "module-1",
          "module-2",
        ]),
      ).rejects.toThrow(AuthorizationError);

      expect(mockModuleRepo.reorderModulesAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from creating a lesson in Instructor B's module", async () => {
      await expect(
        curriculumService.createLesson(instructorA, {
          moduleId: moduleB.id,
          title: "Injected Lesson",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockLessonRepo.createLessonAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from deleting a lesson in Instructor B's module", async () => {
      await expect(
        curriculumService.deleteLesson(instructorA, lessonB.id),
      ).rejects.toThrow(AuthorizationError);

      expect(mockLessonRepo.deleteLessonAtomic).not.toHaveBeenCalled();
    });

    it("strictly blocks Instructor A from reordering lessons in Instructor B's module", async () => {
      await expect(
        curriculumService.reorderLessons(instructorA, moduleB.id, [
          "lesson-1",
          "lesson-2",
        ]),
      ).rejects.toThrow(AuthorizationError);

      expect(mockLessonRepo.reorderLessonsAtomic).not.toHaveBeenCalled();
    });
  });

  // ──────────────────────────────────────────────
  // 4. Lesson Content IDOR & Access Gate Tests
  // ──────────────────────────────────────────────
  describe("4. Lesson Content IDOR & Access Gate Penetration", () => {
    beforeEach(() => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonBHierarchy,
      );
      mockAuthService.hasRole.mockResolvedValue(false);
      mockAuthService.requireAnyRole.mockResolvedValue();
    });

    it("strictly blocks Instructor A from updating lesson content of Instructor B's lesson", async () => {
      await expect(
        lessonContentService.updateLessonContent(instructorA, {
          lessonId: lessonB.id,
          bodyMarkdown: "# Tampered Content",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockLessonContentRepo.upsertLessonContent).not.toHaveBeenCalled();
    });

    it("strictly blocks unenrolled student from viewing non-preview lesson content in published course", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue({
        ...lessonBHierarchy,
        isFreePreview: false,
        module: {
          ...moduleB,
          course: {
            ...courseB,
            status: CourseStatus.PUBLISHED,
          },
        },
      });

      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      await expect(
        lessonContentService.getLessonContent(studentA, lessonB.id),
      ).rejects.toThrow(AuthorizationError);
    });

    it("strictly blocks anonymous user from viewing non-preview lesson content", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue({
        ...lessonBHierarchy,
        isFreePreview: false,
        module: {
          ...moduleB,
          course: {
            ...courseB,
            status: CourseStatus.PUBLISHED,
          },
        },
      });

      await expect(
        lessonContentService.getLessonContent(null, lessonB.id),
      ).rejects.toThrow(AuthenticationError);
    });
  });

  // ──────────────────────────────────────────────
  // 5. Student Progress IDOR Tests
  // ──────────────────────────────────────────────
  describe("5. Student Progress IDOR Penetration", () => {
    it("strictly blocks student from toggling completion on a course they are not enrolled in", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonBHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      await expect(
        progressService.toggleLessonCompletion(studentA, lessonB.id, true),
      ).rejects.toThrow(AuthorizationError);

      expect(mockProgressRepo.upsertLessonProgress).not.toHaveBeenCalled();
    });

    it("strictly blocks student from toggling completion when enrollment is ARCHIVED", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonBHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue({
        id: "enrollment-archived",
        userId: studentA,
        courseId: courseB.id,
        status: EnrollmentStatus.ARCHIVED,
        progressPercentage: 50,
        enrolledAt: new Date(),
        completedAt: null,
        lastAccessedAt: new Date(),
      });

      await expect(
        progressService.toggleLessonCompletion(studentA, lessonB.id, true),
      ).rejects.toThrow(AuthorizationError);

      expect(mockProgressRepo.upsertLessonProgress).not.toHaveBeenCalled();
    });

    it("returns NotFoundError when querying progress for an unenrolled course", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      await expect(
        progressService.getCourseProgress(studentA, courseB.id),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // ──────────────────────────────────────────────
  // 6. Cross-Course ID Enumeration / Tampering Tests
  // ──────────────────────────────────────────────
  describe("6. Cross-Course Isolation & Anti-Probing Boundary", () => {
    it("strictly throws NotFoundError when lesson does not belong to the requested course slug", async () => {
      const courseA = {
        id: "course-a-id",
        title: "Course A",
        slug: "course-a",
        status: CourseStatus.PUBLISHED,
        instructorId: instructorA,
      };

      // Attacker tries /courses/course-a/lessons/lesson-b-id
      mockCourseRepo.findCourseBySlug.mockResolvedValue(courseA as never);
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonBHierarchy,
      ); // lessonB belongs to courseB

      await expect(
        lessonContentService.getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: lessonB.id,
          userId: studentA,
        }),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
