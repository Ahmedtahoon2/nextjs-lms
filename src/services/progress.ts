import { prisma } from "@/lib/db";
import * as lessonContentRepository from "@/repositories/lesson-content";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as lessonProgressRepository from "@/repositories/lesson-progress";
import * as courseRepository from "@/repositories/course";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import {
  EnrollmentStatus,
  type CourseEnrollment,
  type LessonProgress,
} from "@prisma/client";

export type ToggleResult = {
  progress: LessonProgress;
  enrollment: CourseEnrollment;
  percentage: number;
};

export type CourseProgressDetail = {
  enrollment: CourseEnrollment;
  completedLessonIds: string[];
  totalLessons: number;
  nextLesson: { id: string; title: string; moduleTitle: string } | null;
};

export type NextLessonResult = {
  id: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
};

/**
 * Toggles lesson completion for the authenticated student.
 * The entire mutation (upsert progress + count + update enrollment) runs
 * inside a single Prisma interactive transaction for atomicity.
 *
 * No row locks, no raw SQL, no special isolation level.
 */
export async function toggleLessonCompletion(
  userId: string,
  lessonId: string,
  completed: boolean,
): Promise<ToggleResult> {
  const hierarchy = await lessonContentRepository.findLessonHierarchy(lessonId);
  if (!hierarchy) {
    throw new NotFoundError("Lesson not found");
  }

  const courseId = hierarchy.module.courseId;

  const enrollment = await enrollmentRepository.findEnrollment(
    userId,
    courseId,
  );
  if (!enrollment || enrollment.status === EnrollmentStatus.ARCHIVED) {
    throw new AuthorizationError(
      "You must enroll in this course to track progress",
    );
  }

  return prisma.$transaction(async (tx) => {
    const progress = await lessonProgressRepository.upsertLessonProgress(
      userId,
      lessonId,
      completed,
      tx,
    );

    const completedCount = await lessonProgressRepository.countCompletedLessons(
      userId,
      courseId,
      tx,
    );
    const totalCount = await lessonProgressRepository.countTotalLessons(
      courseId,
      tx,
    );

    const percentage =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    const isFullyComplete = percentage === 100;

    const updatedEnrollment = await enrollmentRepository.updateEnrollment(
      enrollment.id,
      {
        progressPercentage: percentage,
        completedAt: isFullyComplete ? new Date() : null,
        status: isFullyComplete
          ? EnrollmentStatus.COMPLETED
          : EnrollmentStatus.ACTIVE,
        lastAccessedAt: new Date(),
      },
      tx,
    );

    return { progress, enrollment: updatedEnrollment, percentage };
  });
}

/**
 * Retrieves course progress for a student, including completed lesson IDs
 * and the next uncompleted lesson.
 */
export async function getCourseProgress(
  userId: string,
  courseId: string,
): Promise<CourseProgressDetail> {
  const enrollment = await enrollmentRepository.findEnrollment(
    userId,
    courseId,
  );
  if (!enrollment) {
    throw new NotFoundError("Enrollment not found");
  }

  const progressRecords =
    await lessonProgressRepository.findProgressByUserAndCourse(
      userId,
      courseId,
    );

  const completedLessonIds = progressRecords
    .filter((p) => p.isCompleted)
    .map((p) => p.lessonId);

  const totalLessons =
    await lessonProgressRepository.countTotalLessons(courseId);

  const nextLesson = await getNextLesson(userId, courseId);

  return {
    enrollment,
    completedLessonIds,
    totalLessons,
    nextLesson,
  };
}

/**
 * Finds the first uncompleted lesson in sequential module/lesson order.
 * Uses two efficient Prisma queries: one for curriculum structure, one for progress.
 * No N+1 pattern.
 */
export async function getNextLesson(
  userId: string,
  courseId: string,
): Promise<NextLessonResult | null> {
  const course = await courseRepository.findCourseById(courseId, {
    includeCurriculum: true,
  });
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  const courseWithModules = course as typeof course & {
    modules: Array<{
      id: string;
      title: string;
      orderIndex: number;
      lessons: Array<{
        id: string;
        title: string;
        orderIndex: number;
      }>;
    }>;
  };

  if (!courseWithModules.modules || courseWithModules.modules.length === 0) {
    return null;
  }

  const progressRecords =
    await lessonProgressRepository.findProgressByUserAndCourse(
      userId,
      courseId,
    );
  const completedSet = new Set(
    progressRecords.filter((p) => p.isCompleted).map((p) => p.lessonId),
  );

  for (const mod of courseWithModules.modules) {
    for (const lesson of mod.lessons) {
      if (!completedSet.has(lesson.id)) {
        return {
          id: lesson.id,
          title: lesson.title,
          moduleId: mod.id,
          moduleTitle: mod.title,
        };
      }
    }
  }

  return null;
}
