import * as enrollmentService from "../enrollment";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as courseRepository from "@/repositories/course";
import * as authorizationService from "@/services/authorization";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { CourseStatus, EnrollmentStatus } from "@prisma/client";

jest.mock("@/repositories/enrollment");
jest.mock("@/repositories/course");
jest.mock("@/services/authorization");

const mockEnrollmentRepo = enrollmentRepository as jest.Mocked<
  typeof enrollmentRepository
>;
const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Enrollment Service", () => {
  const studentId = "student-1";
  const courseId = "course-1";
  const instructorId = "instructor-1";
  const adminId = "admin-1";

  const mockPublishedCourse = {
    id: courseId,
    title: "Test Course",
    slug: "test-course",
    description: "A test course",
    thumbnailUrl: null,
    status: CourseStatus.PUBLISHED,
    level: "ALL_LEVELS" as const,
    category: null,
    instructorId,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  const mockDraftCourse = {
    ...mockPublishedCourse,
    status: CourseStatus.DRAFT,
  };

  const mockArchivedCourse = {
    ...mockPublishedCourse,
    status: CourseStatus.ARCHIVED,
  };

  const mockEnrollment = {
    id: "enrollment-1",
    userId: studentId,
    courseId,
    status: EnrollmentStatus.ACTIVE,
    progressPercentage: 0,
    enrolledAt: new Date("2026-01-01"),
    completedAt: null,
    lastAccessedAt: new Date("2026-01-01"),
    user: {
      id: studentId,
      name: "Student One",
      email: "student@example.com",
      image: null,
      avatarUrl: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("enrollInCourse", () => {
    it("enrolls student in a PUBLISHED course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockPublishedCourse);
      mockEnrollmentRepo.createEnrollment.mockResolvedValue(mockEnrollment);

      const result = await enrollmentService.enrollInCourse(
        studentId,
        courseId,
      );

      expect(result).toEqual(mockEnrollment);
      expect(mockCourseRepo.findCourseById).toHaveBeenCalledWith(courseId);
      expect(mockEnrollmentRepo.createEnrollment).toHaveBeenCalledWith(
        studentId,
        courseId,
      );
    });

    it("rejects enrollment in DRAFT course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockDraftCourse);

      await expect(
        enrollmentService.enrollInCourse(studentId, courseId),
      ).rejects.toThrow(ValidationError);
      await expect(
        enrollmentService.enrollInCourse(studentId, courseId),
      ).rejects.toThrow("Cannot enroll in an unpublished course");

      expect(mockEnrollmentRepo.createEnrollment).not.toHaveBeenCalled();
    });

    it("rejects enrollment in ARCHIVED course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockArchivedCourse);

      await expect(
        enrollmentService.enrollInCourse(studentId, courseId),
      ).rejects.toThrow(ValidationError);
      await expect(
        enrollmentService.enrollInCourse(studentId, courseId),
      ).rejects.toThrow("Cannot enroll in an unpublished course");

      expect(mockEnrollmentRepo.createEnrollment).not.toHaveBeenCalled();
    });

    it("returns existing enrollment on duplicate (idempotent)", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockPublishedCourse);
      mockEnrollmentRepo.createEnrollment.mockResolvedValue(mockEnrollment);

      const result = await enrollmentService.enrollInCourse(
        studentId,
        courseId,
      );

      expect(result).toEqual(mockEnrollment);
    });

    it("throws NotFoundError when course does not exist", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(null);

      await expect(
        enrollmentService.enrollInCourse(studentId, courseId),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("isUserEnrolled", () => {
    it("returns true for ACTIVE enrollment", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);

      const result = await enrollmentService.isUserEnrolled(
        studentId,
        courseId,
      );

      expect(result).toBe(true);
    });

    it("returns true for COMPLETED enrollment", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue({
        ...mockEnrollment,
        status: EnrollmentStatus.COMPLETED,
      });

      const result = await enrollmentService.isUserEnrolled(
        studentId,
        courseId,
      );

      expect(result).toBe(true);
    });

    it("returns false for ARCHIVED enrollment", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue({
        ...mockEnrollment,
        status: EnrollmentStatus.ARCHIVED,
      });

      const result = await enrollmentService.isUserEnrolled(
        studentId,
        courseId,
      );

      expect(result).toBe(false);
    });

    it("returns false when no enrollment exists", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      const result = await enrollmentService.isUserEnrolled(
        studentId,
        courseId,
      );

      expect(result).toBe(false);
    });
  });

  describe("getEnrollment", () => {
    it("returns enrollment when found", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);

      const result = await enrollmentService.getEnrollment(studentId, courseId);

      expect(result).toEqual(mockEnrollment);
    });

    it("returns null when no enrollment exists", async () => {
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      const result = await enrollmentService.getEnrollment(studentId, courseId);

      expect(result).toBeNull();
    });
  });

  describe("getUserEnrollments", () => {
    it("returns all enrollments for a user", async () => {
      mockEnrollmentRepo.findEnrollmentsByUserId.mockResolvedValue([
        mockEnrollment,
      ]);

      const result = await enrollmentService.getUserEnrollments(studentId);

      expect(result).toEqual([mockEnrollment]);
      expect(mockEnrollmentRepo.findEnrollmentsByUserId).toHaveBeenCalledWith(
        studentId,
      );
    });
  });

  describe("getCourseEnrollments", () => {
    it("allows course instructor to view enrollments", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockPublishedCourse);
      mockAuthService.hasRole.mockResolvedValue(false);
      mockEnrollmentRepo.findEnrollmentsByCourseId.mockResolvedValue([
        mockEnrollment,
      ]);

      const result = await enrollmentService.getCourseEnrollments(
        instructorId,
        courseId,
      );

      expect(result).toEqual([mockEnrollment]);
    });

    it("allows admin to view enrollments", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockPublishedCourse);
      mockAuthService.hasRole.mockResolvedValue(true);
      mockEnrollmentRepo.findEnrollmentsByCourseId.mockResolvedValue([
        mockEnrollment,
      ]);

      const result = await enrollmentService.getCourseEnrollments(
        adminId,
        courseId,
      );

      expect(result).toEqual([mockEnrollment]);
    });

    it("denies non-owner non-admin access", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockPublishedCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        enrollmentService.getCourseEnrollments(studentId, courseId),
      ).rejects.toThrow(AuthorizationError);
    });

    it("throws NotFoundError when course does not exist", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(null);

      await expect(
        enrollmentService.getCourseEnrollments(instructorId, courseId),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
