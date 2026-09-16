"use server";

import { requireAuth, getCurrentUser } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import { enrollCourseSchema, courseIdSchema } from "@/lib/validations/progress";
import * as enrollmentService from "@/services/enrollment";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import type { CourseEnrollment } from "@prisma/client";

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

export async function enrollInCourseAction(
  input: unknown,
): Promise<ActionResult<CourseEnrollment>> {
  try {
    const session = await requireAuth();

    const parsed = enrollCourseSchema.safeParse(input);
    if (!parsed.success) {
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR");
    }

    const enrollment = await enrollmentService.enrollInCourse(
      session.user.id,
      parsed.data.courseId,
    );
    return actionSuccess(enrollment);
  } catch (error) {
    return handleActionError(error, "Failed to enroll in course");
  }
}

export async function getMyEnrollmentsAction(): Promise<
  ActionResult<CourseEnrollment[]>
> {
  try {
    const session = await requireAuth();
    const enrollments = await enrollmentService.getUserEnrollments(
      session.user.id,
    );
    return actionSuccess(enrollments);
  } catch (error) {
    return handleActionError(error, "Failed to retrieve enrollments");
  }
}

export async function getEnrollmentStatusAction(
  courseId: unknown,
): Promise<
  ActionResult<{ enrolled: boolean; enrollment: CourseEnrollment | null }>
> {
  const parsedId = courseIdSchema.safeParse(courseId);
  if (!parsedId.success) {
    const firstMessage =
      parsedId.error.issues[0]?.message ?? "Invalid course ID";
    return actionFailure(firstMessage, "VALIDATION_ERROR");
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return actionSuccess({ enrolled: false, enrollment: null });
    }

    const enrollment = await enrollmentService.getEnrollment(
      user.id,
      parsedId.data,
    );
    const enrolled = enrollment
      ? enrollment.status === "ACTIVE" || enrollment.status === "COMPLETED"
      : false;

    return actionSuccess({ enrolled, enrollment });
  } catch (error) {
    return handleActionError(error, "Failed to check enrollment status");
  }
}
