import { getLessonNavigation } from "../lesson-content";
import * as courseRepository from "@/repositories/course";
import type { CourseWithCurriculum } from "@/repositories/course";
import { NotFoundError } from "@/lib/errors";
import { CourseLevel, CourseStatus } from "@prisma/client";

jest.mock("@/repositories/course");

const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;

describe("Lesson Content Service - Player Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const now = new Date();

  const mockCourseWithCurriculum: CourseWithCurriculum = {
    id: "course-1",
    title: "Course 1",
    slug: "course-1",
    description: "Test Course",
    thumbnailUrl: null,
    status: CourseStatus.PUBLISHED,
    level: CourseLevel.BEGINNER,
    category: "Dev",
    instructorId: "inst-1",
    createdAt: now,
    updatedAt: now,
    modules: [
      {
        id: "module-1",
        title: "Module 1",
        description: null,
        courseId: "course-1",
        orderIndex: 0,
        createdAt: now,
        updatedAt: now,
        lessons: [
          {
            id: "lesson-1",
            title: "Lesson 1",
            slug: "lesson-1",
            durationMinutes: null,
            moduleId: "module-1",
            orderIndex: 0,
            isFreePreview: false,
            createdAt: now,
            updatedAt: now,
          },
          {
            id: "lesson-2",
            title: "Lesson 2",
            slug: "lesson-2",
            durationMinutes: null,
            moduleId: "module-1",
            orderIndex: 1,
            isFreePreview: false,
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
      {
        id: "module-2",
        title: "Module 2",
        description: null,
        courseId: "course-1",
        orderIndex: 1,
        createdAt: now,
        updatedAt: now,
        lessons: [
          {
            id: "lesson-3",
            title: "Lesson 3",
            slug: "lesson-3",
            durationMinutes: null,
            moduleId: "module-2",
            orderIndex: 0,
            isFreePreview: false,
            createdAt: now,
            updatedAt: now,
          },
          {
            id: "lesson-4",
            title: "Lesson 4",
            slug: "lesson-4",
            durationMinutes: null,
            moduleId: "module-2",
            orderIndex: 1,
            isFreePreview: false,
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
    ],
  };

  it("resolves navigation for the first lesson (no previous lesson)", async () => {
    mockCourseRepo.findCourseById.mockResolvedValue(mockCourseWithCurriculum);

    const nav = await getLessonNavigation("course-1", "lesson-1");

    expect(nav.previousLesson).toBeNull();
    expect(nav.nextLesson).toEqual({ id: "lesson-2", title: "Lesson 2" });
    expect(nav.totalLessons).toBe(4);
    expect(nav.currentIndex).toBe(1);
  });

  it("resolves navigation across modules (middle lesson)", async () => {
    mockCourseRepo.findCourseById.mockResolvedValue(mockCourseWithCurriculum);

    // lesson-2 is at end of module-1; next lesson should be lesson-3 in module-2
    const nav = await getLessonNavigation("course-1", "lesson-2");

    expect(nav.previousLesson).toEqual({ id: "lesson-1", title: "Lesson 1" });
    expect(nav.nextLesson).toEqual({ id: "lesson-3", title: "Lesson 3" });
    expect(nav.currentIndex).toBe(2);
  });

  it("resolves navigation for the last lesson (no next lesson)", async () => {
    mockCourseRepo.findCourseById.mockResolvedValue(mockCourseWithCurriculum);

    const nav = await getLessonNavigation("course-1", "lesson-4");

    expect(nav.previousLesson).toEqual({ id: "lesson-3", title: "Lesson 3" });
    expect(nav.nextLesson).toBeNull();
    expect(nav.currentIndex).toBe(4);
  });

  it("handles a single-lesson course correctly", async () => {
    mockCourseRepo.findCourseById.mockResolvedValue({
      ...mockCourseWithCurriculum,
      modules: [
        {
          id: "mod-1",
          title: "Mod 1",
          description: null,
          courseId: "course-1",
          orderIndex: 0,
          createdAt: now,
          updatedAt: now,
          lessons: [
            {
              id: "solo-lesson",
              title: "Solo",
              slug: "solo-lesson",
              durationMinutes: null,
              moduleId: "mod-1",
              orderIndex: 0,
              isFreePreview: false,
              createdAt: now,
              updatedAt: now,
            },
          ],
        },
      ],
    });

    const nav = await getLessonNavigation("course-1", "solo-lesson");

    expect(nav.previousLesson).toBeNull();
    expect(nav.nextLesson).toBeNull();
    expect(nav.totalLessons).toBe(1);
    expect(nav.currentIndex).toBe(1);
  });

  describe("Security: Cross-Course Navigation Isolation", () => {
    it("strictly rejects a lesson ID that belongs to another course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourseWithCurriculum);

      // lesson-from-course-b is not in course-1's curriculum
      await expect(
        getLessonNavigation("course-1", "lesson-from-course-b"),
      ).rejects.toThrow(NotFoundError);
      await expect(
        getLessonNavigation("course-1", "lesson-from-course-b"),
      ).rejects.toThrow("Lesson does not belong to this course");
    });
  });
});
