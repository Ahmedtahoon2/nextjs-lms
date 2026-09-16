import * as progressService from "../progress";
import * as lessonContentRepository from "@/repositories/lesson-content";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as lessonProgressRepository from "@/repositories/lesson-progress";
import * as courseRepository from "@/repositories/course";
import { prisma } from "@/lib/db";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import { CourseStatus, EnrollmentStatus } from "@prisma/client";

jest.mock("@/repositories/lesson-content");
jest.mock("@/repositories/enrollment");
jest.mock("@/repositories/lesson-progress");
jest.mock("@/repositories/course");
jest.mock("@/lib/db");

const mockLessonContentRepo = lessonContentRepository as jest.Mocked<
  typeof lessonContentRepository
>;
const mockEnrollmentRepo = enrollmentRepository as jest.Mocked<
  typeof enrollmentRepository
>;
const mockProgressRepo = lessonProgressRepository as jest.Mocked<
  typeof lessonProgressRepository
>;
const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockPrisma = prisma as jest.Mocked<typeof prisma>;

describe("Progress Service", () => {
  const studentId = "student-1";
  const courseId = "course-1";
  const lessonId = "lesson-1";
  const moduleId = "module-1";

  const mockHierarchy = {
    id: lessonId,
    title: "Lesson 1",
    isFreePreview: false,
    moduleId,
    module: {
      id: moduleId,
      courseId,
      course: {
        id: courseId,
        instructorId: "instructor-1",
        status: CourseStatus.PUBLISHED,
      },
    },
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
  };

  const mockProgress = {
    id: "progress-1",
    userId: studentId,
    lessonId,
    isCompleted: true,
    completedAt: new Date("2026-01-02"),
    lastAccessedAt: new Date("2026-01-02"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock $transaction to execute the callback with a fake tx client
    (mockPrisma.$transaction as jest.Mock).mockImplementation(
      async (cb: (tx: unknown) => Promise<unknown>) => {
        const fakeTx = {};
        return cb(fakeTx);
      },
    );
  });

  describe("toggleLessonCompletion", () => {
    it("marks lesson as complete and updates enrollment percentage", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue(mockProgress);
      mockProgressRepo.countCompletedLessons.mockResolvedValue(2);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 50,
        status: EnrollmentStatus.ACTIVE,
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        true,
      );

      expect(result.percentage).toBe(50);
      expect(result.progress).toEqual(mockProgress);
      expect(result.enrollment.progressPercentage).toBe(50);
    });

    it("marks lesson as incomplete and clears completedAt", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue({
        ...mockProgress,
        isCompleted: false,
        completedAt: null,
      });
      mockProgressRepo.countCompletedLessons.mockResolvedValue(1);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 25,
        status: EnrollmentStatus.ACTIVE,
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        false,
      );

      expect(result.percentage).toBe(25);
      expect(mockProgressRepo.upsertLessonProgress).toHaveBeenCalledWith(
        studentId,
        lessonId,
        false,
        expect.anything(),
      );
    });

    it("throws NotFoundError when lesson does not exist", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(null);

      await expect(
        progressService.toggleLessonCompletion(studentId, lessonId, true),
      ).rejects.toThrow(NotFoundError);
    });

    it("throws AuthorizationError when user is not enrolled", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(null);

      await expect(
        progressService.toggleLessonCompletion(studentId, lessonId, true),
      ).rejects.toThrow(AuthorizationError);
      await expect(
        progressService.toggleLessonCompletion(studentId, lessonId, true),
      ).rejects.toThrow("You must enroll in this course to track progress");
    });

    it("throws AuthorizationError when enrollment is ARCHIVED", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue({
        ...mockEnrollment,
        status: EnrollmentStatus.ARCHIVED,
      });

      await expect(
        progressService.toggleLessonCompletion(studentId, lessonId, true),
      ).rejects.toThrow(AuthorizationError);
    });

    it("calculates 0% when 0 of 4 lessons complete", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue({
        ...mockProgress,
        isCompleted: false,
        completedAt: null,
      });
      mockProgressRepo.countCompletedLessons.mockResolvedValue(0);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 0,
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        false,
      );

      expect(result.percentage).toBe(0);
    });

    it("calculates 50% when 2 of 4 lessons complete", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue(mockProgress);
      mockProgressRepo.countCompletedLessons.mockResolvedValue(2);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 50,
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        true,
      );

      expect(result.percentage).toBe(50);
    });

    it("calculates 100% and sets completedAt when 4 of 4 lessons complete", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue(mockProgress);
      mockProgressRepo.countCompletedLessons.mockResolvedValue(4);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 100,
        status: EnrollmentStatus.COMPLETED,
        completedAt: new Date(),
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        true,
      );

      expect(result.percentage).toBe(100);
      expect(mockEnrollmentRepo.updateEnrollment).toHaveBeenCalledWith(
        mockEnrollment.id,
        expect.objectContaining({
          progressPercentage: 100,
          status: EnrollmentStatus.COMPLETED,
          completedAt: expect.any(Date),
        }),
        expect.anything(),
      );
    });

    it("reverts from 100% to lower percentage and clears completedAt", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 100,
        status: EnrollmentStatus.COMPLETED,
        completedAt: new Date(),
      });
      mockProgressRepo.upsertLessonProgress.mockResolvedValue({
        ...mockProgress,
        isCompleted: false,
        completedAt: null,
      });
      mockProgressRepo.countCompletedLessons.mockResolvedValue(3);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 75,
        status: EnrollmentStatus.ACTIVE,
        completedAt: null,
      });

      const result = await progressService.toggleLessonCompletion(
        studentId,
        lessonId,
        false,
      );

      expect(result.percentage).toBe(75);
      expect(mockEnrollmentRepo.updateEnrollment).toHaveBeenCalledWith(
        mockEnrollment.id,
        expect.objectContaining({
          progressPercentage: 75,
          status: EnrollmentStatus.ACTIVE,
          completedAt: null,
        }),
        expect.anything(),
      );
    });

    it("executes upsert + count + enrollment update inside one transaction", async () => {
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
      mockEnrollmentRepo.findEnrollment.mockResolvedValue(mockEnrollment);
      mockProgressRepo.upsertLessonProgress.mockResolvedValue(mockProgress);
      mockProgressRepo.countCompletedLessons.mockResolvedValue(1);
      mockProgressRepo.countTotalLessons.mockResolvedValue(4);
      mockEnrollmentRepo.updateEnrollment.mockResolvedValue({
        ...mockEnrollment,
        progressPercentage: 25,
      });

      await progressService.toggleLessonCompletion(studentId, lessonId, true);

      // Verify $transaction was called
      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);

      // Verify all operations received a transaction client (not undefined)
      const txArg = (
        mockProgressRepo.upsertLessonProgress.mock.calls[0] as unknown[]
      )[3];
      expect(txArg).toBeDefined();

      const countCompletedTx = (
        mockProgressRepo.countCompletedLessons.mock.calls[0] as unknown[]
      )[2];
      expect(countCompletedTx).toBeDefined();

      const countTotalTx = (
        mockProgressRepo.countTotalLessons.mock.calls[0] as unknown[]
      )[1];
      expect(countTotalTx).toBeDefined();

      const updateEnrollmentTx = (
        mockEnrollmentRepo.updateEnrollment.mock.calls[0] as unknown[]
      )[2];
      expect(updateEnrollmentTx).toBeDefined();
    });
  });

  describe("getNextLesson", () => {
    const mockCourseWithCurriculum = {
      id: courseId,
      title: "Test Course",
      slug: "test-course",
      description: null,
      thumbnailUrl: null,
      status: CourseStatus.PUBLISHED,
      level: "ALL_LEVELS" as const,
      category: null,
      instructorId: "instructor-1",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
      modules: [
        {
          id: "module-1",
          title: "Module 1",
          orderIndex: 0,
          lessons: [
            { id: "lesson-1", title: "Lesson 1", orderIndex: 0 },
            { id: "lesson-2", title: "Lesson 2", orderIndex: 1 },
          ],
        },
        {
          id: "module-2",
          title: "Module 2",
          orderIndex: 1,
          lessons: [
            { id: "lesson-3", title: "Lesson 3", orderIndex: 0 },
            { id: "lesson-4", title: "Lesson 4", orderIndex: 1 },
          ],
        },
      ],
    };

    it("returns first uncompleted lesson across modules", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(
        mockCourseWithCurriculum as ReturnType<
          typeof courseRepository.findCourseById
        > extends Promise<infer T>
          ? T
          : never,
      );
      mockProgressRepo.findProgressByUserAndCourse.mockResolvedValue([
        {
          id: "p1",
          userId: studentId,
          lessonId: "lesson-1",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
      ]);

      const result = await progressService.getNextLesson(studentId, courseId);

      expect(result).toEqual({
        id: "lesson-2",
        title: "Lesson 2",
        moduleId: "module-1",
        moduleTitle: "Module 1",
      });
    });

    it("returns lesson from next module when first module is complete", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(
        mockCourseWithCurriculum as ReturnType<
          typeof courseRepository.findCourseById
        > extends Promise<infer T>
          ? T
          : never,
      );
      mockProgressRepo.findProgressByUserAndCourse.mockResolvedValue([
        {
          id: "p1",
          userId: studentId,
          lessonId: "lesson-1",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
        {
          id: "p2",
          userId: studentId,
          lessonId: "lesson-2",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
      ]);

      const result = await progressService.getNextLesson(studentId, courseId);

      expect(result).toEqual({
        id: "lesson-3",
        title: "Lesson 3",
        moduleId: "module-2",
        moduleTitle: "Module 2",
      });
    });

    it("returns null when all lessons are completed", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(
        mockCourseWithCurriculum as ReturnType<
          typeof courseRepository.findCourseById
        > extends Promise<infer T>
          ? T
          : never,
      );
      mockProgressRepo.findProgressByUserAndCourse.mockResolvedValue([
        {
          id: "p1",
          userId: studentId,
          lessonId: "lesson-1",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
        {
          id: "p2",
          userId: studentId,
          lessonId: "lesson-2",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
        {
          id: "p3",
          userId: studentId,
          lessonId: "lesson-3",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
        {
          id: "p4",
          userId: studentId,
          lessonId: "lesson-4",
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
      ]);

      const result = await progressService.getNextLesson(studentId, courseId);

      expect(result).toBeNull();
    });

    it("returns first lesson when no progress exists", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(
        mockCourseWithCurriculum as ReturnType<
          typeof courseRepository.findCourseById
        > extends Promise<infer T>
          ? T
          : never,
      );
      mockProgressRepo.findProgressByUserAndCourse.mockResolvedValue([]);

      const result = await progressService.getNextLesson(studentId, courseId);

      expect(result).toEqual({
        id: "lesson-1",
        title: "Lesson 1",
        moduleId: "module-1",
        moduleTitle: "Module 1",
      });
    });

    it("throws NotFoundError when course does not exist", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(null);

      await expect(
        progressService.getNextLesson(studentId, courseId),
      ).rejects.toThrow(NotFoundError);
    });

    it("skips incomplete progress records when finding next lesson", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(
        mockCourseWithCurriculum as ReturnType<
          typeof courseRepository.findCourseById
        > extends Promise<infer T>
          ? T
          : never,
      );
      // lesson-1 has progress but isCompleted=false
      mockProgressRepo.findProgressByUserAndCourse.mockResolvedValue([
        {
          id: "p1",
          userId: studentId,
          lessonId: "lesson-1",
          isCompleted: false,
          completedAt: null,
          lastAccessedAt: new Date(),
        },
      ]);

      const result = await progressService.getNextLesson(studentId, courseId);

      // Should return lesson-1 since it's not completed
      expect(result).toEqual({
        id: "lesson-1",
        title: "Lesson 1",
        moduleId: "module-1",
        moduleTitle: "Module 1",
      });
    });
  });
});
