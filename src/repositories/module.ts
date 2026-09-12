import { prisma } from "@/lib/db";
import { type Module, CourseStatus, Prisma } from "@prisma/client";
import { lockCourseForUpdate } from "./course";
import { NotFoundError, ValidationError, ConflictError } from "@/lib/errors";

export async function findModuleById(
  id: string,
  options?: { includeLessons?: boolean },
) {
  if (options?.includeLessons) {
    return prisma.module.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });
  }

  return prisma.module.findUnique({
    where: { id },
  });
}

export async function findModulesByCourseId(courseId: string) {
  return prisma.module.findMany({
    where: { courseId },
    orderBy: { orderIndex: "asc" },
  });
}

/**
 * Creates a module atomically with fresh-transaction P2002 retry on orderIndex collision.
 * Synchronizes through lockCourseForUpdate and asserts course status is DRAFT.
 */
export async function createModuleAtomic(
  data: {
    courseId: string;
    title: string;
    description?: string | null;
  },
  maxAttempts = 3,
): Promise<Module> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await prisma.$transaction(async (tx) => {
        const course = await lockCourseForUpdate(tx, data.courseId);
        if (course.status !== CourseStatus.DRAFT) {
          throw new ValidationError(
            "Cannot modify curriculum of a published or archived course",
          );
        }

        const maxModule = await tx.module.findFirst({
          where: { courseId: data.courseId },
          orderBy: { orderIndex: "desc" },
          select: { orderIndex: true },
        });

        const newIndex = maxModule !== null ? maxModule.orderIndex + 1 : 0;

        return await tx.module.create({
          data: {
            courseId: data.courseId,
            title: data.title,
            description: data.description,
            orderIndex: newIndex,
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
            "Failed to assign a unique order index for module after concurrent retries.",
          );
        }
        continue;
      }
      throw error;
    }
  }

  throw new ConflictError(
    "Failed to create module due to concurrency collision",
  );
}

/**
 * Updates a module atomically under the course row lock.
 */
export async function updateModuleAtomic(
  moduleId: string,
  courseId: string,
  data: {
    title?: string;
    description?: string | null;
  },
): Promise<Module> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    return tx.module.update({
      where: { id: moduleId },
      data,
    });
  });
}

/**
 * Deletes a module and re-indexes subsequent siblings in ascending order within an atomic transaction.
 */
export async function deleteModuleAtomic(
  moduleId: string,
  courseId: string,
): Promise<Module> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    const moduleToDelete = await tx.module.findUnique({
      where: { id: moduleId },
      select: { id: true, orderIndex: true },
    });

    if (!moduleToDelete) {
      throw new NotFoundError("Module not found");
    }

    const deleted = await tx.module.delete({
      where: { id: moduleId },
    });

    const siblings = await tx.module.findMany({
      where: {
        courseId,
        orderIndex: { gt: moduleToDelete.orderIndex },
      },
      orderBy: { orderIndex: "asc" },
      select: { id: true, orderIndex: true },
    });

    for (const sibling of siblings) {
      await tx.module.update({
        where: { id: sibling.id },
        data: { orderIndex: sibling.orderIndex - 1 },
      });
    }

    return deleted;
  });
}

/**
 * Reorders modules atomically using two-phase permutation under course row lock.
 * Sibling fetching and exact permutation validation run strictly inside the transaction.
 */
export async function reorderModulesAtomic(
  courseId: string,
  orderedIds: string[],
): Promise<Module[]> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);
    if (course.status !== CourseStatus.DRAFT) {
      throw new ValidationError(
        "Cannot modify curriculum of a published or archived course",
      );
    }

    const existingModules = await tx.module.findMany({
      where: { courseId },
      select: { id: true },
    });

    if (orderedIds.length !== existingModules.length) {
      throw new ValidationError(
        "Invalid reorder permutation: IDs count must match existing modules count",
      );
    }

    const uniqueOrderedIds = new Set(orderedIds);
    if (uniqueOrderedIds.size !== orderedIds.length) {
      throw new ValidationError(
        "Invalid reorder permutation: duplicate IDs are not allowed",
      );
    }

    const existingIdSet = new Set(existingModules.map((m) => m.id));
    const allExist = orderedIds.every((id) => existingIdSet.has(id));
    if (!allExist) {
      throw new ValidationError(
        "Invalid reorder permutation: all IDs must match existing module IDs",
      );
    }

    // Phase 1: Shift to temporary negative indexes to avoid transient unique constraint collisions
    for (let i = 0; i < orderedIds.length; i++) {
      await tx.module.update({
        where: { id: orderedIds[i] },
        data: { orderIndex: -1 - i },
      });
    }

    // Phase 2: Assign final sequential 0..N-1 indexes
    const updatedModules: Module[] = [];
    for (let i = 0; i < orderedIds.length; i++) {
      const updated = await tx.module.update({
        where: { id: orderedIds[i] },
        data: { orderIndex: i },
      });
      updatedModules.push(updated);
    }

    return updatedModules;
  });
}
