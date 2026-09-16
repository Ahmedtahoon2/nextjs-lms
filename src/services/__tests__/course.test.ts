import * as courseService from "../course";
import * as courseRepository from "@/repositories/course";
import * as authorizationService from "@/services/authorization";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { CourseLevel, CourseStatus, type Prisma } from "@prisma/client";

jest.mock("@/repositories/course");
jest.mock("@/services/authorization");

const mockCourseRepository = courseRepository as jest.Mocked<
  typeof courseRepository
>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Course Service", () => {
  const instructorId = "instructor-1";
  const adminId = "admin-1";
  const otherInstructorId = "instructor-2";
  const studentId = "student-1";

  const mockCourse = {
    id: "course-123",
    title: "Introduction to Next.js",
    slug: "introduction-to-next-js",
    description: "Learn Next.js App Router.",
    thumbnailUrl: "https://example.com/thumb.jpg",
    status: CourseStatus.DRAFT,
    level: CourseLevel.BEGINNER,
    category: "Web Development",
    instructorId,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCourse - Role Authorization", () => {
    const input = {
      title: "New Course",
      description: "Description",
      level: CourseLevel.BEGINNER,
    };

    it("allows instructor to create a course", async () => {
      mockAuthService.requireAnyRole.mockResolvedValue(undefined);
      mockCourseRepository.createCourseWithSlugRetry.mockResolvedValue({
        ...mockCourse,
        title: "New Course",
        slug: "new-course",
      });

      const result = await courseService.createCourse(instructorId, input);

      expect(result.title).toBe("New Course");
      expect(mockAuthService.requireAnyRole).toHaveBeenCalledWith(
        instructorId,
        ["instructor", "admin"],
      );
      expect(
        mockCourseRepository.createCourseWithSlugRetry,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Course",
          instructorId,
        }),
        "new-course",
      );
    });

    it("allows admin to create a course", async () => {
      mockAuthService.requireAnyRole.mockResolvedValue(undefined);
      mockCourseRepository.createCourseWithSlugRetry.mockResolvedValue({
        ...mockCourse,
        instructorId: adminId,
      });

      const result = await courseService.createCourse(adminId, input);
      expect(result.instructorId).toBe(adminId);
    });

    it("rejects unauthorized users from creating a course", async () => {
      mockAuthService.requireAnyRole.mockRejectedValue(
        new AuthorizationError("Missing required role"),
      );

      await expect(
        courseService.createCourse(studentId, input),
      ).rejects.toThrow(AuthorizationError);

      expect(
        mockCourseRepository.createCourseWithSlugRetry,
      ).not.toHaveBeenCalled();
    });
  });

  describe("updateCourse - Ownership & Slug Stability", () => {
    it("allows owner to update course metadata without changing the slug", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.updateCourse.mockResolvedValue({
        ...mockCourse,
        title: "Updated Title",
      });

      const updated = await courseService.updateCourse(
        instructorId,
        mockCourse.id,
        {
          title: "Updated Title",
        },
      );

      expect(updated.title).toBe("Updated Title");
      expect(mockCourseRepository.updateCourse).toHaveBeenCalledWith(
        mockCourse.id,
        {
          title: "Updated Title",
        },
      );
    });

    it("allows admin to update any course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(true); // admin check
      mockCourseRepository.updateCourse.mockResolvedValue({
        ...mockCourse,
        title: "Admin Updated",
      });

      const updated = await courseService.updateCourse(adminId, mockCourse.id, {
        title: "Admin Updated",
      });

      expect(updated.title).toBe("Admin Updated");
    });

    it("rejects non-owner instructor from updating course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false); // not admin

      await expect(
        courseService.updateCourse(otherInstructorId, mockCourse.id, {
          title: "Intruder Update",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockCourseRepository.updateCourse).not.toHaveBeenCalled();
    });
  });

  describe("deleteCourse - Atomicity & Ownership", () => {
    it("allows owner to delete course atomically", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.deleteCourseAtomic.mockResolvedValue(mockCourse);

      const deleted = await courseService.deleteCourse(
        instructorId,
        mockCourse.id,
      );

      expect(deleted.id).toBe(mockCourse.id);
      expect(mockCourseRepository.deleteCourseAtomic).toHaveBeenCalledWith(
        mockCourse.id,
      );
    });

    it("allows admin to delete any course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(true);
      mockCourseRepository.deleteCourseAtomic.mockResolvedValue(mockCourse);

      const deleted = await courseService.deleteCourse(adminId, mockCourse.id);
      expect(deleted.id).toBe(mockCourse.id);
    });

    it("rejects non-owner instructor from deleting course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        courseService.deleteCourse(otherInstructorId, mockCourse.id),
      ).rejects.toThrow(AuthorizationError);

      expect(mockCourseRepository.deleteCourseAtomic).not.toHaveBeenCalled();
    });
  });

  describe("Public Read vs. Restricted Draft/Archived Access", () => {
    it("allows anonymous user to view a PUBLISHED course", async () => {
      const publishedCourse = {
        ...mockCourse,
        status: CourseStatus.PUBLISHED,
      };
      mockCourseRepository.findCourseById.mockResolvedValue(publishedCourse);

      const course = await courseService.getCourseById(null, mockCourse.id);
      expect(course.status).toBe(CourseStatus.PUBLISHED);
    });

    it("throws NotFoundError when anonymous user attempts to view a DRAFT course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse); // DRAFT

      await expect(
        courseService.getCourseById(null, mockCourse.id),
      ).rejects.toThrow(NotFoundError);
    });

    it("throws NotFoundError when unauthorized user attempts to view a DRAFT course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        courseService.getCourseById(otherInstructorId, mockCourse.id),
      ).rejects.toThrow(NotFoundError);
    });

    it("allows course owner to view their own DRAFT course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);

      const course = await courseService.getCourseById(
        instructorId,
        mockCourse.id,
      );
      expect(course.id).toBe(mockCourse.id);
    });

    it("allows admin to view any DRAFT course", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(true);

      const course = await courseService.getCourseById(adminId, mockCourse.id);
      expect(course.id).toBe(mockCourse.id);
    });
  });

  describe("Course State Machine Transitions", () => {
    it("successfully publishes a DRAFT course meeting prerequisites", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepository.countCurriculumItems.mockResolvedValue({
              moduleCount: 2,
              lessonCount: 5,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return {
            ...mockCourse,
            status: CourseStatus.PUBLISHED,
          };
        },
      );

      const published = await courseService.publishCourse(
        instructorId,
        mockCourse.id,
      );
      expect(published.status).toBe(CourseStatus.PUBLISHED);
    });

    it("rejects publishing when course has 0 modules", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepository.countCurriculumItems.mockResolvedValue({
              moduleCount: 0,
              lessonCount: 0,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return mockCourse;
        },
      );

      await expect(
        courseService.publishCourse(instructorId, mockCourse.id),
      ).rejects.toThrow(ValidationError);
    });

    it("rejects publishing when course has modules but 0 lessons", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.executeCourseStatusTransition.mockImplementation(
        async (_id, _from, _to, validator) => {
          if (validator) {
            mockCourseRepository.countCurriculumItems.mockResolvedValue({
              moduleCount: 1,
              lessonCount: 0,
            });
            await validator({} as unknown as Prisma.TransactionClient);
          }
          return mockCourse;
        },
      );

      await expect(
        courseService.publishCourse(instructorId, mockCourse.id),
      ).rejects.toThrow(ValidationError);
    });

    it("unpublishes a PUBLISHED course back to DRAFT", async () => {
      const publishedCourse = {
        ...mockCourse,
        status: CourseStatus.PUBLISHED,
      };
      mockCourseRepository.findCourseById.mockResolvedValue(publishedCourse);
      mockCourseRepository.executeCourseStatusTransition.mockResolvedValue({
        ...publishedCourse,
        status: CourseStatus.DRAFT,
      });

      const unpublished = await courseService.unpublishCourse(
        instructorId,
        mockCourse.id,
      );
      expect(unpublished.status).toBe(CourseStatus.DRAFT);
    });

    it("archives a course from DRAFT or PUBLISHED", async () => {
      mockCourseRepository.findCourseById.mockResolvedValue(mockCourse);
      mockCourseRepository.executeCourseStatusTransition.mockResolvedValue({
        ...mockCourse,
        status: CourseStatus.ARCHIVED,
      });

      const archived = await courseService.archiveCourse(
        instructorId,
        mockCourse.id,
      );
      expect(archived.status).toBe(CourseStatus.ARCHIVED);
    });
  });
});
