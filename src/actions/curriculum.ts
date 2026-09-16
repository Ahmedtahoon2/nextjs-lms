"use server";

import { requireAuth } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import {
  createModuleSchema,
  updateModuleSchema,
  reorderModulesSchema,
  createLessonSchema,
  updateLessonSchema,
  reorderLessonsSchema,
} from "@/lib/validations/course";
import * as curriculumService from "@/services/curriculum";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ConflictError,
} from "@/lib/errors";
import type { Module, Lesson } from "@prisma/client";

function handleActionError(error: unknown, defaultMessage: string) {
  if (error instanceof AuthenticationError) {
    return actionFailure("Authentication required", "UNAUTHORIZED");
  }
  if (error instanceof AuthorizationError) {
    return actionFailure(error.message, "FORBIDDEN");
  }
  if (error instanceof NotFoundError) {
    return actionFailure(error.message, "NOT_FOUND");
  }
  if (error instanceof ValidationError) {
    return actionFailure(error.message, "VALIDATION_ERROR", error.errors);
  }
  if (error instanceof ConflictError) {
    return actionFailure(error.message, "CONFLICT");
  }
  return actionFailure(defaultMessage);
}

export async function createModuleAction(
  input: unknown,
): Promise<ActionResult<Module>> {
  try {
    const session = await requireAuth();

    const parsed = createModuleSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const created = await curriculumService.createModule(
      session.user.id,
      parsed.data,
    );
    return actionSuccess(created);
  } catch (error) {
    return handleActionError(error, "Failed to create module");
  }
}

export async function updateModuleAction(
  moduleId: string,
  input: unknown,
): Promise<ActionResult<Module>> {
  try {
    const session = await requireAuth();

    const parsed = updateModuleSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const updated = await curriculumService.updateModule(
      session.user.id,
      moduleId,
      parsed.data,
    );
    return actionSuccess(updated);
  } catch (error) {
    return handleActionError(error, "Failed to update module");
  }
}

export async function deleteModuleAction(
  moduleId: string,
): Promise<ActionResult<Module>> {
  try {
    const session = await requireAuth();
    const deleted = await curriculumService.deleteModule(
      session.user.id,
      moduleId,
    );
    return actionSuccess(deleted);
  } catch (error) {
    return handleActionError(error, "Failed to delete module");
  }
}

export async function reorderModulesAction(
  input: unknown,
): Promise<ActionResult<Module[]>> {
  try {
    const session = await requireAuth();

    const parsed = reorderModulesSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const reordered = await curriculumService.reorderModules(
      session.user.id,
      parsed.data.courseId,
      parsed.data.orderedIds,
    );
    return actionSuccess(reordered);
  } catch (error) {
    return handleActionError(error, "Failed to reorder modules");
  }
}

export async function createLessonAction(
  input: unknown,
): Promise<ActionResult<Lesson>> {
  try {
    const session = await requireAuth();

    const parsed = createLessonSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const created = await curriculumService.createLesson(
      session.user.id,
      parsed.data,
    );
    return actionSuccess(created);
  } catch (error) {
    return handleActionError(error, "Failed to create lesson");
  }
}

export async function updateLessonAction(
  lessonId: string,
  input: unknown,
): Promise<ActionResult<Lesson>> {
  try {
    const session = await requireAuth();

    const parsed = updateLessonSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const updated = await curriculumService.updateLesson(
      session.user.id,
      lessonId,
      parsed.data,
    );
    return actionSuccess(updated);
  } catch (error) {
    return handleActionError(error, "Failed to update lesson");
  }
}

export async function deleteLessonAction(
  lessonId: string,
): Promise<ActionResult<Lesson>> {
  try {
    const session = await requireAuth();
    const deleted = await curriculumService.deleteLesson(
      session.user.id,
      lessonId,
    );
    return actionSuccess(deleted);
  } catch (error) {
    return handleActionError(error, "Failed to delete lesson");
  }
}

export async function reorderLessonsAction(
  input: unknown,
): Promise<ActionResult<Lesson[]>> {
  try {
    const session = await requireAuth();

    const parsed = reorderLessonsSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const reordered = await curriculumService.reorderLessons(
      session.user.id,
      parsed.data.moduleId,
      parsed.data.orderedIds,
    );
    return actionSuccess(reordered);
  } catch (error) {
    return handleActionError(error, "Failed to reorder lessons");
  }
}
