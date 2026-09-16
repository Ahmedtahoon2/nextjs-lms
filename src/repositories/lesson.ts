import { prisma } from "@/lib/db";
import { type Lesson, CourseStatus, Prisma } from "@prisma/client";
import { lockCourseForUpdate } from "./course";
import { NotFoundError, ValidationError, ConflictError } from "@/lib/errors";

export type LessonWithModule = Lesson & {
  module: {
    id: string;
    courseId: string;
  };
};

export async function findLessonById(id: string): Promise<Lesson | null> {
  return prisma.lesson.findUnique({
    where: { id },
  });
}

export async function findLessonWithModule(
  id: string,
): Promise<LessonWithModule | null> {
  return prisma.lesson.findUnique({
    where: { id },
    include: {
      module: {
        select: {
          id: true,
          courseId: true,
        },
      },
    },
  });
}

export async function findLessonsByModuleId(moduleId: string) {
  return prisma.lesson.findMany({
    where: { moduleId },
    orderBy: { orderIndex: "asc" },
  });
}

export async function findLessonByModuleIdAndSlug(
  moduleId: string,
  slug: string,
) {
  return prisma.lesson.findUnique({
    where: {
      moduleId_slug: {
        moduleId,
        slug,
      },
    },
  });
}

/**
 * Creates a lesson atomically with fresh-transaction P2002 retry on slug or orderIndex collision.
 * Synchronizes through lockCourseForUpdate and asserts course status is DRAFT.
 */
export async function createLessonAtomic(
  data: {
    moduleId: string;
    courseId: string;
    title: string;
    baseSlug: string;
    durationMinutes?: number | null;
    isFreePreview?: boolean;
  },
  maxAttempts = 5,
): Promise<Lesson> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const candidateSlug =
      attempt === 1 ? data.baseSlug : `${data.baseSlug}-${attempt}`;

    try {
      return await prisma.$transaction(async (tx) => {
        const course = await lockCourseForUpdate(tx, data.courseId);
        if (course.status !== CourseStatus.DRAFT) {
          throw new ValidationError(
            "Cannot modify curriculum of a published or archived course",
          );
        }

        const maxLesson = await tx.lesson.findFirst({
          where: { moduleId: data.moduleId },
          orderBy: { orderIndex: "desc" },
          select: { orderIndex: true },
        });

        const newIndex = maxLesson !== null ? maxLesson.orderIndex + 1 : 0;

        return await tx.lesson.create({
          data: {
            moduleId: data.moduleId,
            title: data.title,
            slug: candidateSlug,
            orderIndex: newIndex,
            durationMinutes: data.durationMinutes,
            isFreePreview: data.isFreePreview ?? false,
          },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        if (attempt === maxAttempts) {
          throw new ConflictError(
            "Failed to assign a unique order index or slug for lesson after concurrent retries.",
          );
        }
        continue;
      }
      throw error;
    }
  }

  throw new ConflictError(
    "Failed to create lesson due to concurrency collision",
  );
}

/**
 * Updates a lesson atomically under the course row lock.
 */
export async function updateLessonAtomic(
  lessonId: string,
  courseId: string,
  data: {
    title?: string;
    durationMinutes?: number | null;
    isFreePreview?: boolean;
  },
): Promise<Lesson> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    return tx.lesson.update({
      where: { id: lessonId },
      data,
    });
  });
}

/**
 * Deletes a lesson and re-indexes subsequent siblings in ascending order within an atomic transaction.
 */
export async function deleteLessonAtomic(
  lessonId: string,
  courseId: string,
): Promise<Lesson> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    const lessonToDelete = await tx.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, moduleId: true, orderIndex: true },
    });

    if (!lessonToDelete) {
      throw new NotFoundError("Lesson not found");
    }

    const deleted = await tx.lesson.delete({
      where: { id: lessonId },
    });

    const siblings = await tx.lesson.findMany({
      where: {
        moduleId: lessonToDelete.moduleId,
        orderIndex: { gt: lessonToDelete.orderIndex },
      },
      orderBy: { orderIndex: "asc" },
      select: { id: true, orderIndex: true },
    });

    for (const sibling of siblings) {
      await tx.lesson.update({
        where: { id: sibling.id },
        data: { orderIndex: sibling.orderIndex - 1 },
      });
    }

    return deleted;
  });
}

/**
 * Reorders lessons atomically using two-phase permutation under course row lock.
 * Sibling fetching and exact permutation validation run strictly inside the transaction.
 */
export async function reorderLessonsAtomic(
  moduleId: string,
  courseId: string,
  orderedIds: string[],
): Promise<Lesson[]> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    const existingLessons = await tx.lesson.findMany({
      where: { moduleId },
      select: { id: true },
    });

    if (orderedIds.length !== existingLessons.length) {
      throw new ValidationError(
        "Invalid reorder permutation: IDs count must match existing lessons count",
      );
    }

    const uniqueOrderedIds = new Set(orderedIds);
    if (uniqueOrderedIds.size !== orderedIds.length) {
      throw new ValidationError(
        "Invalid reorder permutation: duplicate IDs are not allowed",
      );
    }

    const existingIdSet = new Set(existingLessons.map((l) => l.id));
    const allExist = orderedIds.every((id) => existingIdSet.has(id));
    if (!allExist) {
      throw new ValidationError(
        "Invalid reorder permutation: all IDs must match existing lesson IDs",
      );
    }

    // Phase 1: Shift to temporary negative indexes to avoid transient unique constraint collisions
    for (let i = 0; i < orderedIds.length; i++) {
      await tx.lesson.update({
        where: { id: orderedIds[i] },
        data: { orderIndex: -1 - i },
      });
    }

    // Phase 2: Assign final sequential 0..N-1 indexes
    const updatedLessons: Lesson[] = [];
    for (let i = 0; i < orderedIds.length; i++) {
      const updated = await tx.lesson.update({
        where: { id: orderedIds[i] },
        data: { orderIndex: i },
      });
      updatedLessons.push(updated);
    }

    return updatedLessons;
  });
}
