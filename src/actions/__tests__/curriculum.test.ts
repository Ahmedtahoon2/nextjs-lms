import * as curriculumActions from "../curriculum";
import * as curriculumService from "@/services/curriculum";
import * as authHelpers from "@/lib/auth-helpers";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

jest.mock("@/services/curriculum");
jest.mock("@/lib/auth-helpers");

const mockCurriculumService = curriculumService as jest.Mocked<
  typeof curriculumService
>;
const mockAuthHelpers = authHelpers as jest.Mocked<typeof authHelpers>;

describe("Curriculum Server Actions", () => {
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

  const mockModule = {
    id: "clh1234567890123456789012",
    courseId: "clh1234567890123456789011",
    title: "Module 1",
    description: "Description",
    orderIndex: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLesson = {
    id: "clh1234567890123456789013",
    moduleId: mockModule.id,
    title: "Lesson 1",
    slug: "lesson-1",
    orderIndex: 0,
    durationMinutes: 30,
    isFreePreview: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createModuleAction", () => {
    it("returns UNAUTHORIZED when unauthenticated", async () => {
      mockAuthHelpers.requireAuth.mockRejectedValue(
        new AuthenticationError("Authentication required"),
      );

      const result = await curriculumActions.createModuleAction({
        courseId: mockModule.courseId,
        title: "New Module",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
    });

    it("returns VALIDATION_ERROR when input is invalid", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);

      const result = await curriculumActions.createModuleAction({
        courseId: "not-a-cuid",
        title: "M",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("returns success with created module", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.createModule.mockResolvedValue(mockModule);

      const result = await curriculumActions.createModuleAction({
        courseId: mockModule.courseId,
        title: "Module 1",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(mockModule.id);
      }
    });
  });

  describe("updateModuleAction", () => {
    it("returns FORBIDDEN when user is not authorized", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.updateModule.mockRejectedValue(
        new AuthorizationError("Forbidden"),
      );

      const result = await curriculumActions.updateModuleAction(mockModule.id, {
        title: "Updated",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("deleteModuleAction", () => {
    it("returns NOT_FOUND when module does not exist", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.deleteModule.mockRejectedValue(
        new NotFoundError("Module not found"),
      );

      const result = await curriculumActions.deleteModuleAction(mockModule.id);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("reorderModulesAction", () => {
    it("maps ValidationError to VALIDATION_ERROR", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.reorderModules.mockRejectedValue(
        new ValidationError("Invalid reorder permutation"),
      );

      const result = await curriculumActions.reorderModulesAction({
        courseId: mockModule.courseId,
        orderedIds: [mockModule.id],
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });
  });

  describe("createLessonAction", () => {
    it("returns success with created lesson", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.createLesson.mockResolvedValue(mockLesson);

      const result = await curriculumActions.createLessonAction({
        moduleId: mockModule.id,
        title: "Lesson 1",
        durationMinutes: 30,
        isFreePreview: false,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(mockLesson.id);
      }
    });
  });

  describe("updateLessonAction & deleteLessonAction", () => {
    it("successfully updates lesson", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.updateLesson.mockResolvedValue({
        ...mockLesson,
        title: "Updated Lesson",
      });

      const result = await curriculumActions.updateLessonAction(mockLesson.id, {
        title: "Updated Lesson",
      });

      expect(result.success).toBe(true);
    });

    it("successfully deletes lesson", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.deleteLesson.mockResolvedValue(mockLesson);

      const result = await curriculumActions.deleteLessonAction(mockLesson.id);
      expect(result.success).toBe(true);
    });
  });

  describe("reorderLessonsAction", () => {
    it("successfully reorders lessons", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockCurriculumService.reorderLessons.mockResolvedValue([mockLesson]);

      const result = await curriculumActions.reorderLessonsAction({
        moduleId: mockModule.id,
        orderedIds: [mockLesson.id],
      });

      expect(result.success).toBe(true);
    });
  });
});
