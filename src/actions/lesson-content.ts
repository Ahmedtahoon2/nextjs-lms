"use server";

import { requireAuth, getCurrentUser } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import {
  lessonIdSchema,
  updateLessonContentSchema,
} from "@/lib/validations/lesson-content";
import * as lessonContentService from "@/services/lesson-content";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import type { LessonContent } from "@prisma/client";

/**
 * Server Action to fetch lesson content.
 * Validates lessonId using dedicated lessonIdSchema.
 * Evaluates public preview vs instructor/admin authorization.
 */
export async function getLessonContentAction(
  lessonId: unknown,
): Promise<ActionResult<lessonContentService.LessonContentDetail>> {
  const parsedId = lessonIdSchema.safeParse(lessonId);
  if (!parsedId.success) {
    const firstMessage =
      parsedId.error.issues[0]?.message ?? "Invalid lesson ID";
    return actionFailure(firstMessage, "VALIDATION_ERROR", {
      lessonId: parsedId.error.flatten().formErrors,
    });
  }

  try {
    const user = await getCurrentUser();
    const content = await lessonContentService.getLessonContent(
      user?.id ?? null,
      parsedId.data,
    );
    return actionSuccess(content);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return actionFailure(error.message, "UNAUTHORIZED");
    }
    if (error instanceof AuthorizationError) {
      return actionFailure(error.message, "FORBIDDEN");
    }
    if (error instanceof NotFoundError) {
      return actionFailure(error.message, "NOT_FOUND");
    }
    if (error instanceof ValidationError) {
      return actionFailure(error.message, "VALIDATION_ERROR");
    }
    return actionFailure("Failed to retrieve lesson content", "INTERNAL_ERROR");
  }
}

/**
 * Server Action to update or create lesson content.
 * Requires active authentication and instructor/admin role.
 * Enforces parent course ownership and lifecycle state rules.
 */
export async function updateLessonContentAction(
  input: unknown,
): Promise<ActionResult<LessonContent>> {
  let session: Awaited<ReturnType<typeof requireAuth>>;
  try {
    session = await requireAuth();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return actionFailure(error.message, "UNAUTHORIZED");
    }
    return actionFailure("Authentication required", "UNAUTHORIZED");
  }

  const parsed = updateLessonContentSchema.safeParse(input);
  if (!parsed.success) {
    const firstMessage = parsed.error.issues[0]?.message ?? "Validation failed";
    return actionFailure(
      firstMessage,
      "VALIDATION_ERROR",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const updated = await lessonContentService.updateLessonContent(
      session.user.id,
      parsed.data,
    );
    return actionSuccess(updated);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return actionFailure(error.message, "UNAUTHORIZED");
    }
    if (error instanceof AuthorizationError) {
      return actionFailure(error.message, "FORBIDDEN");
    }
    if (error instanceof NotFoundError) {
      return actionFailure(error.message, "NOT_FOUND");
    }
    if (error instanceof ValidationError) {
      return actionFailure(error.message, "VALIDATION_ERROR");
    }
    return actionFailure("Failed to update lesson content", "INTERNAL_ERROR");
  }
}
