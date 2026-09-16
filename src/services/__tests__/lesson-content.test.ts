import * as lessonContentService from "../lesson-content";
import * as lessonContentRepository from "@/repositories/lesson-content";
import * as authorizationService from "@/services/authorization";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { CourseStatus } from "@prisma/client";

jest.mock("@/repositories/lesson-content");
jest.mock("@/services/authorization");

const mockRepo = lessonContentRepository as jest.Mocked<
  typeof lessonContentRepository
>;
const mockAuth = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Lesson Content Service", () => {
  const instructorId = "instructor-1";
  const otherInstructorId = "instructor-2";
  const adminId = "admin-1";
  const studentId = "student-1";

  const mockHierarchy = {
    id: "lesson-1",
    title: "Lesson 1",
    isFreePreview: false,
    moduleId: "module-1",
    module: {
      id: "module-1",
      courseId: "course-1",
      course: {
        id: "course-1",
        instructorId,
        status: CourseStatus.DRAFT,
      },
    },
  };

  const mockContentRecord = {
    id: "content-1",
    lessonId: "lesson-1",
    bodyMarkdown: "# Hello World",
    bodyHtml: "<h1>Hello World</h1>",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resources: [{ name: "Slides", url: "https://example.com/slides.pdf" }],
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getLessonContent", () => {
    it("allows anonymous read when lesson is free preview and course is PUBLISHED", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue({
        ...mockHierarchy,
        isFreePreview: true,
        module: {
          ...mockHierarchy.module,
          course: {
            ...mockHierarchy.module.course,
            status: CourseStatus.PUBLISHED,
          },
        },
      });
      mockRepo.findLessonContentByLessonId.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.getLessonContent(
        null,
        "lesson-1",
      );
      expect(result.lessonTitle).toBe("Lesson 1");
      expect(result.bodyHtml).toBe("<h1>Hello World</h1>");
      expect(result.isFreePreview).toBe(true);
    });

    it("throws AuthenticationError for anonymous user if course is DRAFT even if preview is true", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue({
        ...mockHierarchy,
        isFreePreview: true,
        module: {
          ...mockHierarchy.module,
          course: {
            ...mockHierarchy.module.course,
            status: CourseStatus.DRAFT,
          },
        },
      });

      await expect(
        lessonContentService.getLessonContent(null, "lesson-1"),
      ).rejects.toThrow(AuthenticationError);
    });

    it("throws AuthenticationError for anonymous user if isFreePreview is false", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue({
        ...mockHierarchy,
        isFreePreview: false,
        module: {
          ...mockHierarchy.module,
          course: {
            ...mockHierarchy.module.course,
            status: CourseStatus.PUBLISHED,
          },
        },
      });

      await expect(
        lessonContentService.getLessonContent(null, "lesson-1"),
      ).rejects.toThrow(AuthenticationError);
    });

    it("throws AuthorizationError for non-owner student when isFreePreview is false", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockAuth.hasRole.mockResolvedValue(false);

      await expect(
        lessonContentService.getLessonContent(studentId, "lesson-1"),
      ).rejects.toThrow(AuthorizationError);
    });

    it("allows authoring instructor to read non-preview content in DRAFT", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockRepo.findLessonContentByLessonId.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.getLessonContent(
        instructorId,
        "lesson-1",
      );
      expect(result.lessonId).toBe("lesson-1");
      expect(result.bodyMarkdown).toBe("# Hello World");
    });

    it("allows admin to read content across any course status", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockAuth.hasRole.mockResolvedValue(true); // admin
      mockRepo.findLessonContentByLessonId.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.getLessonContent(
        adminId,
        "lesson-1",
      );
      expect(result.lessonId).toBe("lesson-1");
    });

    it("throws NotFoundError when lesson hierarchy is missing", async () => {
      mockRepo.findLessonHierarchy.mockResolvedValue(null);

      await expect(
        lessonContentService.getLessonContent(instructorId, "non-existent"),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateLessonContent", () => {
    const updateInput = {
      lessonId: "lesson-1",
      bodyMarkdown: "# Updated Markdown",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      resources: [{ name: "Notes", url: "https://example.com/notes.pdf" }],
    };

    it("allows authoring instructor to update content on DRAFT course", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockAuth.hasRole.mockResolvedValue(false);
      mockRepo.upsertLessonContent.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.updateLessonContent(
        instructorId,
        updateInput,
      );
      expect(result.id).toBe("content-1");
      expect(mockRepo.upsertLessonContent).toHaveBeenCalledWith(
        "lesson-1",
        expect.objectContaining({
          bodyMarkdown: "# Updated Markdown",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          bodyHtml: expect.stringContaining("<h1>Updated Markdown</h1>"),
        }),
      );
    });

    it("allows authoring instructor to update content on PUBLISHED course", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue({
        ...mockHierarchy,
        module: {
          ...mockHierarchy.module,
          course: {
            ...mockHierarchy.module.course,
            status: CourseStatus.PUBLISHED,
          },
        },
      });
      mockAuth.hasRole.mockResolvedValue(false);
      mockRepo.upsertLessonContent.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.updateLessonContent(
        instructorId,
        updateInput,
      );
      expect(result.id).toBe("content-1");
    });

    it("strictly blocks updating content on ARCHIVED course with ValidationError", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue({
        ...mockHierarchy,
        module: {
          ...mockHierarchy.module,
          course: {
            ...mockHierarchy.module.course,
            status: CourseStatus.ARCHIVED,
          },
        },
      });

      await expect(
        lessonContentService.updateLessonContent(instructorId, updateInput),
      ).rejects.toThrow(ValidationError);
      expect(mockRepo.upsertLessonContent).not.toHaveBeenCalled();
    });

    it("throws AuthorizationError when Instructor A attempts to update Instructor B lesson", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy); // owned by instructorId
      mockAuth.hasRole.mockResolvedValue(false); // not admin

      await expect(
        lessonContentService.updateLessonContent(
          otherInstructorId,
          updateInput,
        ),
      ).rejects.toThrow(AuthorizationError);
      expect(mockRepo.upsertLessonContent).not.toHaveBeenCalled();
    });

    it("allows admin to update lesson content regardless of course instructor", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockAuth.hasRole.mockResolvedValue(true); // admin
      mockRepo.upsertLessonContent.mockResolvedValue(mockContentRecord);

      const result = await lessonContentService.updateLessonContent(
        adminId,
        updateInput,
      );
      expect(result.id).toBe("content-1");
    });

    it("propagates NotFoundError if lesson does not exist", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue(null);

      await expect(
        lessonContentService.updateLessonContent(instructorId, updateInput),
      ).rejects.toThrow(NotFoundError);
    });

    it("propagates NotFoundError when repository throws NotFoundError due to concurrent deletion", async () => {
      mockAuth.requireAnyRole.mockResolvedValue();
      mockRepo.findLessonHierarchy.mockResolvedValue(mockHierarchy);
      mockAuth.hasRole.mockResolvedValue(false);
      mockRepo.upsertLessonContent.mockRejectedValue(
        new NotFoundError("Lesson not found"),
      );

      await expect(
        lessonContentService.updateLessonContent(instructorId, updateInput),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
