import { getCourseLessonForPlayer } from "../lesson-content";
import * as courseRepository from "@/repositories/course";
import type { CourseWithCurriculum } from "@/repositories/course";
import * as lessonContentRepository from "@/repositories/lesson-content";
import type { LessonHierarchy } from "@/repositories/lesson-content";
import * as enrollmentService from "@/services/enrollment";
import * as authorizationService from "@/services/authorization";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";
import { CourseLevel, CourseStatus } from "@prisma/client";

jest.mock("@/repositories/course");
jest.mock("@/repositories/lesson-content");
jest.mock("@/services/enrollment");
jest.mock("@/services/authorization");

const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockLessonContentRepo = lessonContentRepository as jest.Mocked<
  typeof lessonContentRepository
>;
const mockEnrollmentService = enrollmentService as jest.Mocked<
  typeof enrollmentService
>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Player Security & Cross-Course Isolation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthService.hasRole.mockResolvedValue(false);
  });

  const now = new Date();

  const courseA: CourseWithCurriculum = {
    id: "course-a-id",
    title: "Course A",
    slug: "course-a",
    description: "Course A Description",
    thumbnailUrl: null,
    status: CourseStatus.PUBLISHED,
    level: CourseLevel.BEGINNER,
    category: "Dev",
    instructorId: "instructor-a",
    createdAt: now,
    updatedAt: now,
    modules: [
      {
        id: "mod-a",
        title: "Module A",
        description: null,
        courseId: "course-a-id",
        orderIndex: 0,
        createdAt: now,
        updatedAt: now,
        lessons: [
          {
            id: "lesson-a",
            title: "Lesson A",
            slug: "lesson-a",
            durationMinutes: null,
            moduleId: "mod-a",
            orderIndex: 0,
            isFreePreview: false,
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
    ],
  };

  const lessonAHierarchy: LessonHierarchy = {
    id: "lesson-a",
    title: "Lesson A",
    isFreePreview: false,
    moduleId: "mod-a",
    module: {
      id: "mod-a",
      courseId: "course-a-id",
      course: {
        id: "course-a-id",
        instructorId: "instructor-a",
        status: CourseStatus.PUBLISHED,
      },
    },
  };

  const lessonBHierarchy: LessonHierarchy = {
    id: "lesson-b",
    title: "Lesson B",
    isFreePreview: false,
    moduleId: "mod-b",
    module: {
      id: "mod-b",
      courseId: "course-b-id",
      course: {
        id: "course-b-id",
        instructorId: "instructor-b",
        status: CourseStatus.PUBLISHED,
      },
    },
  };

  describe("Mandatory Cross-Course Isolation Guardrail", () => {
    it("strictly blocks cross-course lesson access when lesson belongs to another course", async () => {
      // User requests /courses/course-a/lessons/lesson-b
      mockCourseRepo.findCourseBySlug.mockResolvedValue(courseA);
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonBHierarchy,
      );

      await expect(
        getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: "lesson-b",
          userId: "student-1",
        }),
      ).rejects.toThrow(NotFoundError);

      await expect(
        getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: "lesson-b",
          userId: "student-1",
        }),
      ).rejects.toThrow("Lesson not found in this course");
    });
  });

  describe("Student Access & Authorization Boundary", () => {
    beforeEach(() => {
      mockCourseRepo.findCourseBySlug.mockResolvedValue(courseA);
      mockCourseRepo.findCourseById.mockResolvedValue(courseA);
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        lessonAHierarchy,
      );
      mockLessonContentRepo.findLessonContentByLessonId.mockResolvedValue({
        id: "content-a",
        lessonId: "lesson-a",
        bodyMarkdown: "# Content",
        bodyHtml: "<p>Content</p>",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: [
          { name: "Safe PDF", url: "https://example.com/safe.pdf" },
          { name: "Malicious XSS", url: "javascript:alert(1)" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    it("allows anonymous visitor to view a free preview lesson", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue({
        ...lessonAHierarchy,
        isFreePreview: true,
      });

      const result = await getCourseLessonForPlayer({
        courseSlug: "course-a",
        lessonId: "lesson-a",
        userId: null,
      });

      expect(result.lesson.lessonTitle).toBe("Lesson A");
      expect(result.lesson.isFreePreview).toBe(true);
    });

    it("blocks anonymous visitor from viewing a restricted (non-preview) lesson", async () => {
      await expect(
        getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: "lesson-a",
          userId: null,
        }),
      ).rejects.toThrow(AuthenticationError);
    });

    it("allows an enrolled student to access a restricted lesson", async () => {
      mockEnrollmentService.isUserEnrolled.mockResolvedValue(true);

      const result = await getCourseLessonForPlayer({
        courseSlug: "course-a",
        lessonId: "lesson-a",
        userId: "student-1",
      });

      expect(result.lesson.lessonTitle).toBe("Lesson A");
      expect(result.course.id).toBe("course-a-id");
    });

    it("blocks an unenrolled authenticated user from a restricted lesson", async () => {
      mockEnrollmentService.isUserEnrolled.mockResolvedValue(false);

      await expect(
        getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: "lesson-a",
          userId: "student-1",
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it("denies student access to an ARCHIVED course even if enrolled", async () => {
      mockCourseRepo.findCourseBySlug.mockResolvedValue({
        ...courseA,
        status: CourseStatus.ARCHIVED,
      });
      mockEnrollmentService.isUserEnrolled.mockResolvedValue(true);

      await expect(
        getCourseLessonForPlayer({
          courseSlug: "course-a",
          lessonId: "lesson-a",
          userId: "student-1",
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it("allows the authoring instructor to access their own archived course", async () => {
      mockCourseRepo.findCourseBySlug.mockResolvedValue({
        ...courseA,
        status: CourseStatus.ARCHIVED,
      });

      const result = await getCourseLessonForPlayer({
        courseSlug: "course-a",
        lessonId: "lesson-a",
        userId: "instructor-a",
      });

      expect(result.lesson.lessonTitle).toBe("Lesson A");
    });

    it("allows an admin to access any course lesson unconditionally", async () => {
      mockCourseRepo.findCourseBySlug.mockResolvedValue({
        ...courseA,
        status: CourseStatus.DRAFT,
      });
      mockAuthService.hasRole.mockResolvedValue(true);

      const result = await getCourseLessonForPlayer({
        courseSlug: "course-a",
        lessonId: "lesson-a",
        userId: "admin-1",
      });

      expect(result.lesson.lessonTitle).toBe("Lesson A");
    });

    it("sanitizes resources to ensure only HTTP/HTTPS protocols are exposed", async () => {
      mockEnrollmentService.isUserEnrolled.mockResolvedValue(true);

      const result = await getCourseLessonForPlayer({
        courseSlug: "course-a",
        lessonId: "lesson-a",
        userId: "student-1",
      });

      // The malicious javascript: URI should have been safely stripped out by parseSafeResources
      expect(result.lesson.resources).toHaveLength(1);
      expect(result.lesson.resources[0]).toEqual({
        name: "Safe PDF",
        url: "https://example.com/safe.pdf",
      });
    });
  });
});
