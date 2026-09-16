import {
  enrollInCourseAction,
  getMyEnrollmentsAction,
  getEnrollmentStatusAction,
} from "../enrollment";
import * as authHelpers from "@/lib/auth-helpers";
import * as enrollmentService from "@/services/enrollment";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { EnrollmentStatus } from "@prisma/client";

jest.mock("@/lib/auth-helpers");
jest.mock("@/services/enrollment");

const mockAuthHelpers = authHelpers as jest.Mocked<typeof authHelpers>;
const mockEnrollmentService = enrollmentService as jest.Mocked<
  typeof enrollmentService
>;

describe("Enrollment Actions", () => {
  const mockSession = {
    user: {
      id: "student-1",
      email: "student@test.com",
      name: "Student",
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    session: {
      id: "session-1",
      token: "token",
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "student-1",
    },
  };

  const mockEnrollment = {
    id: "enrollment-1",
    userId: "student-1",
    courseId: "course-1",
    status: EnrollmentStatus.ACTIVE,
    progressPercentage: 0,
    enrolledAt: new Date("2026-01-01"),
    completedAt: null,
    lastAccessedAt: new Date("2026-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
  });

  describe("enrollInCourseAction", () => {
    it("succeeds with valid courseId", async () => {
      mockEnrollmentService.enrollInCourse.mockResolvedValue(mockEnrollment);

      const result = await enrollInCourseAction({
        courseId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      });

      // Use a valid cuid for the test
      expect(result.success).toBe(true);
    });

    it("fails with invalid courseId format", async () => {
      const result = await enrollInCourseAction({ courseId: "invalid" });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("fails with missing courseId", async () => {
      const result = await enrollInCourseAction({});

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("maps ValidationError from service", async () => {
      mockEnrollmentService.enrollInCourse.mockRejectedValue(
        new ValidationError("Cannot enroll in an unpublished course"),
      );

      const result = await enrollInCourseAction({
        courseId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
        expect(result.error).toBe("Cannot enroll in an unpublished course");
      }
    });

    it("maps NotFoundError from service", async () => {
      mockEnrollmentService.enrollInCourse.mockRejectedValue(
        new NotFoundError("Course not found"),
      );

      const result = await enrollInCourseAction({
        courseId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("getMyEnrollmentsAction", () => {
    it("returns enrollments for authenticated user", async () => {
      mockEnrollmentService.getUserEnrollments.mockResolvedValue([
        mockEnrollment,
      ]);

      const result = await getMyEnrollmentsAction();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual([mockEnrollment]);
      }
    });
  });

  describe("getEnrollmentStatusAction", () => {
    it("returns enrolled=false for unauthenticated user", async () => {
      mockAuthHelpers.getCurrentUser.mockResolvedValue(null);

      const result = await getEnrollmentStatusAction(
        "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.enrolled).toBe(false);
        expect(result.data.enrollment).toBeNull();
      }
    });

    it("returns enrolled=true for ACTIVE enrollment", async () => {
      mockAuthHelpers.getCurrentUser.mockResolvedValue({
        id: "student-1",
        email: "student@test.com",
        name: "Student",
        emailVerified: true,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockEnrollmentService.getEnrollment.mockResolvedValue(mockEnrollment);

      const result = await getEnrollmentStatusAction(
        "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.enrolled).toBe(true);
      }
    });

    it("fails with invalid courseId format", async () => {
      const result = await getEnrollmentStatusAction("invalid");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });
  });
});
