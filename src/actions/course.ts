"use server";

import { requireAuth } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import {
  createCourseSchema,
  updateCourseSchema,
} from "@/lib/validations/course";
import * as courseService from "@/services/course";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ConflictError,
} from "@/lib/errors";
import type { Course } from "@prisma/client";

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

export async function createCourseAction(
  input: unknown,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();

    const parsed = createCourseSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const course = await courseService.createCourse(
      session.user.id,
      parsed.data,
    );
    return actionSuccess(course);
  } catch (error) {
    return handleActionError(error, "Failed to create course");
  }
}

export async function updateCourseAction(
  courseId: string,
  input: unknown,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();

    const parsed = updateCourseSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const updated = await courseService.updateCourse(
      session.user.id,
      courseId,
      parsed.data,
    );
    return actionSuccess(updated);
  } catch (error) {
    return handleActionError(error, "Failed to update course");
  }
}

export async function deleteCourseAction(
  courseId: string,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();
    const deleted = await courseService.deleteCourse(session.user.id, courseId);
    return actionSuccess(deleted);
  } catch (error) {
    return handleActionError(error, "Failed to delete course");
  }
}

export async function publishCourseAction(
  courseId: string,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();
    const published = await courseService.publishCourse(
      session.user.id,
      courseId,
    );
    return actionSuccess(published);
  } catch (error) {
    return handleActionError(error, "Failed to publish course");
  }
}

export async function unpublishCourseAction(
  courseId: string,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();
    const unpublished = await courseService.unpublishCourse(
      session.user.id,
      courseId,
    );
    return actionSuccess(unpublished);
  } catch (error) {
    return handleActionError(error, "Failed to unpublish course");
  }
}

export async function archiveCourseAction(
  courseId: string,
): Promise<ActionResult<Course>> {
  try {
    const session = await requireAuth();
    const archived = await courseService.archiveCourse(
      session.user.id,
      courseId,
    );
    return actionSuccess(archived);
  } catch (error) {
    return handleActionError(error, "Failed to archive course");
  }
}
