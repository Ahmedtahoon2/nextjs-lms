import * as courseActions from "../course";
import * as courseService from "@/services/course";
import * as authHelpers from "@/lib/auth-helpers";
import {
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  ConflictError,
} from "@/lib/errors";
import { CourseLevel, CourseStatus } from "@prisma/client";

jest.mock("@/services/course");
jest.mock("@/lib/auth-helpers");

const mockCourseService = courseService as jest.Mocked<typeof courseService>;
const mockAuthHelpers = authHelpers as jest.Mocked<typeof authHelpers>;

describe("Course Server Actions", () => {
  const mockUser = {
    id: "user-123",
    email: "user@example.com",
    name: "Instructor User",
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSession = {
    session: {
      id: "sess-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: mockUser.id,
      expiresAt: new Date(Date.now() + 100000),
      token: "token",
      ipAddress: null,
      userAgent: null,
    },
    user: mockUser,
  };

  const mockCourse = {
    id: "course-123",
    title: "Course Title",
    slug: "course-title",
    description: "Description",
    thumbnailUrl: null,
    status: CourseStatus.DRAFT,
    level: CourseLevel.BEGINNER,
    category: null,
    instructorId: mockUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCourseAction", () => {
    it("returns UNAUTHORIZED when caller is unauthenticated", async () => {
      mockAuthHelpers.requireAuth.mockRejectedValue(
        new AuthenticationError("Authentication required"),
      );

      const result = await courseActions.createCourseAction({
        title: "Test Course",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
    });

    it("returns VALIDATION_ERROR when input schema fails validation", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);

      const result = await courseActions.createCourseAction({
        title: "ab", // Too short (min 3)
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
        expect(result.details).toBeDefined();
      }
    });

    it("returns success with course data when valid", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.createCourse.mockResolvedValue(mockCourse);

      const result = await courseActions.createCourseAction({
        title: "Valid Course Title",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(mockCourse.id);
      }
    });

    it("maps ConflictError to CONFLICT code", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.createCourse.mockRejectedValue(
        new ConflictError("Slug collision"),
      );

      const result = await courseActions.createCourseAction({
        title: "Collision Course",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("CONFLICT");
      }
    });
  });

  describe("updateCourseAction", () => {
    it("returns VALIDATION_ERROR when forbidden field (status) is passed", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);

      const result = await courseActions.updateCourseAction(mockCourse.id, {
        title: "Updated Title",
        status: "PUBLISHED", // Strict rejection!
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("maps AuthorizationError to FORBIDDEN", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.updateCourse.mockRejectedValue(
        new AuthorizationError("Forbidden"),
      );

      const result = await courseActions.updateCourseAction(mockCourse.id, {
        title: "Updated Title",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("deleteCourseAction", () => {
    it("successfully calls deleteCourse service", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.deleteCourse.mockResolvedValue(mockCourse);

      const result = await courseActions.deleteCourseAction(mockCourse.id);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(mockCourse.id);
      }
    });
  });

  describe("publishCourseAction & state transitions", () => {
    it("maps ValidationError from publish prerequisite check to VALIDATION_ERROR", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.publishCourse.mockRejectedValue(
        new ValidationError("Cannot publish course without modules"),
      );

      const result = await courseActions.publishCourseAction(mockCourse.id);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("unpublishCourseAction returns success", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.unpublishCourse.mockResolvedValue({
        ...mockCourse,
        status: CourseStatus.DRAFT,
      });

      const result = await courseActions.unpublishCourseAction(mockCourse.id);
      expect(result.success).toBe(true);
    });

    it("archiveCourseAction returns success", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCourseService.archiveCourse.mockResolvedValue({
        ...mockCourse,
        status: CourseStatus.ARCHIVED,
      });

      const result = await courseActions.archiveCourseAction(mockCourse.id);
      expect(result.success).toBe(true);
    });
  });
});
