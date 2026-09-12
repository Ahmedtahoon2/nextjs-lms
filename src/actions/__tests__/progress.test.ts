import {
  toggleLessonCompletionAction,
  getCourseProgressAction,
  getNextLessonAction,
} from "../progress";
import * as authHelpers from "@/lib/auth-helpers";
import * as progressService from "@/services/progress";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import { EnrollmentStatus } from "@prisma/client";

jest.mock("@/lib/auth-helpers");
jest.mock("@/services/progress");

const mockAuthHelpers = authHelpers as jest.Mocked<typeof authHelpers>;
const mockProgressService = progressService as jest.Mocked<
  typeof progressService
>;

describe("Progress Actions", () => {
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

  const mockToggleResult: progressService.ToggleResult = {
    progress: {
      id: "progress-1",
      userId: "student-1",
      lessonId: "lesson-1",
      isCompleted: true,
      completedAt: new Date(),
      lastAccessedAt: new Date(),
    },
    enrollment: {
      id: "enrollment-1",
      userId: "student-1",
      courseId: "course-1",
      status: EnrollmentStatus.ACTIVE,
      progressPercentage: 25,
      enrolledAt: new Date(),
      completedAt: null,
      lastAccessedAt: new Date(),
    },
    percentage: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
  });

  describe("toggleLessonCompletionAction", () => {
    it("succeeds with valid input", async () => {
      mockProgressService.toggleLessonCompletion.mockResolvedValue(
        mockToggleResult,
      );

      const result = await toggleLessonCompletionAction({
        lessonId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
        completed: true,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.percentage).toBe(25);
      }
    });

    it("fails with invalid lessonId format", async () => {
      const result = await toggleLessonCompletionAction({
        lessonId: "invalid",
        completed: true,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("fails with missing completed field", async () => {
      const result = await toggleLessonCompletionAction({
        lessonId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });

    it("maps AuthorizationError from service", async () => {
      mockProgressService.toggleLessonCompletion.mockRejectedValue(
        new AuthorizationError(
          "You must enroll in this course to track progress",
        ),
      );

      const result = await toggleLessonCompletionAction({
        lessonId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
        completed: true,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
        expect(result.error).toBe(
          "You must enroll in this course to track progress",
        );
      }
    });

    it("maps NotFoundError from service", async () => {
      mockProgressService.toggleLessonCompletion.mockRejectedValue(
        new NotFoundError("Lesson not found"),
      );

      const result = await toggleLessonCompletionAction({
        lessonId: "clxxxxxxxxxxxxxxxxxxxxxxxxx",
        completed: true,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("getCourseProgressAction", () => {
    it("succeeds with valid courseId", async () => {
      const mockProgress: progressService.CourseProgressDetail = {
        enrollment: mockToggleResult.enrollment,
        completedLessonIds: ["lesson-1"],
        totalLessons: 4,
        nextLesson: {
          id: "lesson-2",
          title: "Lesson 2",
          moduleTitle: "Module 1",
        },
      };
      mockProgressService.getCourseProgress.mockResolvedValue(mockProgress);

      const result = await getCourseProgressAction(
        "clxxxxxxxxxxxxxxxxxxxxxxxxx",
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.totalLessons).toBe(4);
      }
    });

    it("fails with invalid courseId", async () => {
      const result = await getCourseProgressAction("invalid");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });
  });

  describe("getNextLessonAction", () => {
    it("succeeds and returns next lesson", async () => {
      const mockNext: progressService.NextLessonResult = {
        id: "lesson-2",
        title: "Lesson 2",
        moduleId: "module-1",
        moduleTitle: "Module 1",
      };
      mockProgressService.getNextLesson.mockResolvedValue(mockNext);

      const result = await getNextLessonAction("clxxxxxxxxxxxxxxxxxxxxxxxxx");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockNext);
      }
    });

    it("succeeds and returns null when all complete", async () => {
      mockProgressService.getNextLesson.mockResolvedValue(null);

      const result = await getNextLessonAction("clxxxxxxxxxxxxxxxxxxxxxxxxx");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeNull();
      }
    });

    it("fails with invalid courseId", async () => {
      const result = await getNextLessonAction("invalid");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
      }
    });
  });
});
