import { prisma } from "@/lib/db";
import type { LessonProgress, Prisma } from "@prisma/client";

/**
 * Upserts a lesson progress record.
 * Sets completedAt to now() when marking complete, clears to null when unmarking.
 * Updates lastAccessedAt on every call.
 * Accepts an optional transaction client for use within a $transaction boundary.
 */
export async function upsertLessonProgress(
  userId: string,
  lessonId: string,
  isCompleted: boolean,
  tx?: Prisma.TransactionClient,
): Promise<LessonProgress> {
  const client = tx ?? prisma;
  const now = new Date();

  return client.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId, lessonId },
    },
    create: {
      userId,
      lessonId,
      isCompleted,
      completedAt: isCompleted ? now : null,
      lastAccessedAt: now,
    },
    update: {
      isCompleted,
      completedAt: isCompleted ? now : null,
      lastAccessedAt: now,
    },
  });
}

/**
 * Finds a single lesson progress record.
 */
export async function findLessonProgress(
  userId: string,
  lessonId: string,
): Promise<LessonProgress | null> {
  return prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: { userId, lessonId },
    },
  });
}

/**
 * Finds all lesson progress records for a user within a specific course.
 * Scoped through lesson → module → courseId.
 */
export async function findProgressByUserAndCourse(
  userId: string,
  courseId: string,
  tx?: Prisma.TransactionClient,
): Promise<LessonProgress[]> {
  const client = tx ?? prisma;
  return client.lessonProgress.findMany({
    where: {
      userId,
      lesson: {
        module: { courseId },
      },
    },
  });
}

/**
 * Counts completed lessons for a user within a specific course.
 * Accepts an optional transaction client for atomic aggregation.
 */
export async function countCompletedLessons(
  userId: string,
  courseId: string,
  tx?: Prisma.TransactionClient,
): Promise<number> {
  const client = tx ?? prisma;
  return client.lessonProgress.count({
    where: {
      userId,
      isCompleted: true,
      lesson: {
        module: { courseId },
      },
    },
  });
}

/**
 * Counts total lessons in a course (across all modules).
 * Accepts an optional transaction client for atomic aggregation.
 */
export async function countTotalLessons(
  courseId: string,
  tx?: Prisma.TransactionClient,
): Promise<number> {
  const client = tx ?? prisma;
  return client.lesson.count({
    where: {
      module: { courseId },
    },
  });
}
