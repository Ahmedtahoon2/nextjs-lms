import * as lessonContentActions from "../lesson-content";
import * as lessonContentService from "@/services/lesson-content";
import * as authHelpers from "@/lib/auth-helpers";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

jest.mock("@/services/lesson-content");
jest.mock("@/lib/auth-helpers");

const mockService = lessonContentService as jest.Mocked<
  typeof lessonContentService
>;
const mockAuth = authHelpers as jest.Mocked<typeof authHelpers>;

describe("Lesson Content Server Actions", () => {
  const validCuid = "clh1234567890123456789012";

  const mockUser = {
    id: "user-123",
    email: "instructor@example.com",
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

  const mockDetail: lessonContentService.LessonContentDetail = {
    lessonId: validCuid,
    lessonTitle: "Introduction to Next.js",
    courseId: "course-123",
    bodyMarkdown: "# Introduction",
    bodyHtml: "<h1>Introduction</h1>",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resources: [{ name: "Resource 1", url: "https://example.com/res1" }],
    isFreePreview: true,
  };

  const mockRecord = {
    id: "content-1",
    lessonId: validCuid,
    bodyMarkdown: "# Introduction",
    bodyHtml: "<h1>Introduction</h1>",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resources: [{ name: "Resource 1", url: "https://example.com/res1" }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getLessonContentAction", () => {
    it("returns VALIDATION_ERROR when lessonId is invalid", async () => {
      const result =
        await lessonContentActions.getLessonContentAction("not-a-cuid");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("returns UNAUTHORIZED when service throws AuthenticationError", async () => {
      mockAuth.getCurrentUser.mockResolvedValue(null);
      mockService.getLessonContent.mockRejectedValue(
        new AuthenticationError("Authentication required"),
      );

      const result =
        await lessonContentActions.getLessonContentAction(validCuid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
    });

    it("returns FORBIDDEN when service throws AuthorizationError", async () => {
      mockAuth.getCurrentUser.mockResolvedValue(mockUser);
      mockService.getLessonContent.mockRejectedValue(
        new AuthorizationError("Forbidden"),
      );

      const result =
        await lessonContentActions.getLessonContentAction(validCuid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
      }
    });

    it("returns NOT_FOUND when lesson does not exist", async () => {
      mockAuth.getCurrentUser.mockResolvedValue(mockUser);
      mockService.getLessonContent.mockRejectedValue(
        new NotFoundError("Lesson not found"),
      );

      const result =
        await lessonContentActions.getLessonContentAction(validCuid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("NOT_FOUND");
      }
    });

    it("returns success with content detail when authorized", async () => {
      mockAuth.getCurrentUser.mockResolvedValue(mockUser);
      mockService.getLessonContent.mockResolvedValue(mockDetail);

      const result =
        await lessonContentActions.getLessonContentAction(validCuid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonTitle).toBe("Introduction to Next.js");
      }
    });
  });

  describe("updateLessonContentAction", () => {
    const validPayload = {
      lessonId: validCuid,
      bodyMarkdown: "# New Markdown",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      resources: [{ name: "PDF", url: "https://example.com/file.pdf" }],
    };

    it("returns UNAUTHORIZED when caller is unauthenticated", async () => {
      mockAuth.requireAuth.mockRejectedValue(new AuthenticationError());

      const result =
        await lessonContentActions.updateLessonContentAction(validPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
    });

    it("returns VALIDATION_ERROR when input schema fails", async () => {
      mockAuth.requireAuth.mockResolvedValue(mockSession);

      const result = await lessonContentActions.updateLessonContentAction({
        lessonId: "invalid",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("returns FORBIDDEN when user is not owner", async () => {
      mockAuth.requireAuth.mockResolvedValue(mockSession);
      mockService.updateLessonContent.mockRejectedValue(
        new AuthorizationError("Forbidden"),
      );

      const result =
        await lessonContentActions.updateLessonContentAction(validPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
      }
    });

    it("returns VALIDATION_ERROR when course is archived", async () => {
      mockAuth.requireAuth.mockResolvedValue(mockSession);
      mockService.updateLessonContent.mockRejectedValue(
        new ValidationError("Cannot modify archived course"),
      );

      const result =
        await lessonContentActions.updateLessonContentAction(validPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("returns success with updated record when valid", async () => {
      mockAuth.requireAuth.mockResolvedValue(mockSession);
      mockService.updateLessonContent.mockResolvedValue(mockRecord);

      const result =
        await lessonContentActions.updateLessonContentAction(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("content-1");
      }
    });
  });
});
