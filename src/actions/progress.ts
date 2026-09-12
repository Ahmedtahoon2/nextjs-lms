"use server";

import { requireAuth } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import {
  toggleLessonProgressSchema,
  courseIdSchema,
} from "@/lib/validations/progress";
import * as progressService from "@/services/progress";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";

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
  return actionFailure(defaultMessage);
}

export async function toggleLessonCompletionAction(
  input: unknown,
): Promise<ActionResult<progressService.ToggleResult>> {
  try {
    const session = await requireAuth();

    const parsed = toggleLessonProgressSchema.safeParse(input);
    if (!parsed.success) {
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR");
    }

    const result = await progressService.toggleLessonCompletion(
      session.user.id,
      parsed.data.lessonId,
      parsed.data.completed,
    );
    return actionSuccess(result);
  } catch (error) {
    return handleActionError(error, "Failed to update lesson progress");
  }
}

export async function getCourseProgressAction(
  courseId: unknown,
): Promise<ActionResult<progressService.CourseProgressDetail>> {
  try {
    const session = await requireAuth();

    const parsedId = courseIdSchema.safeParse(courseId);
    if (!parsedId.success) {
      const firstMessage =
        parsedId.error.issues[0]?.message ?? "Invalid course ID";
      return actionFailure(firstMessage, "VALIDATION_ERROR");
    }

    const progress = await progressService.getCourseProgress(
      session.user.id,
      parsedId.data,
    );
    return actionSuccess(progress);
  } catch (error) {
    return handleActionError(error, "Failed to retrieve course progress");
  }
}

export async function getNextLessonAction(
  courseId: unknown,
): Promise<ActionResult<progressService.NextLessonResult | null>> {
  try {
    const session = await requireAuth();

    const parsedId = courseIdSchema.safeParse(courseId);
    if (!parsedId.success) {
      const firstMessage =
        parsedId.error.issues[0]?.message ?? "Invalid course ID";
      return actionFailure(firstMessage, "VALIDATION_ERROR");
    }

    const nextLesson = await progressService.getNextLesson(
      session.user.id,
      parsedId.data,
    );
    return actionSuccess(nextLesson);
  } catch (error) {
    return handleActionError(error, "Failed to retrieve next lesson");
  }
}
