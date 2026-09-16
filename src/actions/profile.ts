"use server";

import { requireAuth } from "@/lib/auth-helpers";
import {
  actionSuccess,
  actionFailure,
  type ActionResult,
} from "@/lib/action-result";
import { updateProfileSchema } from "@/lib/validations/profile";
import * as profileService from "@/services/profile";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";

/**
 * Server Action to fetch the current authenticated user's profile.
 */
export async function getProfileAction(): Promise<
  ActionResult<profileService.UserProfile>
> {
  try {
    const session = await requireAuth();
    const profile = await profileService.getUserProfile(session.user.id);
    return actionSuccess(profile);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return actionFailure("Authentication required", "UNAUTHORIZED");
    }
    if (error instanceof NotFoundError) {
      return actionFailure("User not found", "NOT_FOUND");
    }
    return actionFailure("Failed to load profile");
  }
}

/**
 * Server Action to update the authenticated user's profile.
 * Strictly verifies authentication, validates input via Zod, and enforces self-ownership.
 */
export async function updateProfileAction(
  input: unknown,
): Promise<ActionResult<profileService.UserProfile>> {
  try {
    const session = await requireAuth();

    const parsed = updateProfileSchema.safeParse(input);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage = parsed.error.issues[0]?.message ?? "Invalid input";
      return actionFailure(firstMessage, "VALIDATION_ERROR", fieldErrors);
    }

    const updatedProfile = await profileService.updateUserProfile(
      session.user.id,
      session.user.id,
      parsed.data,
    );

    return actionSuccess(updatedProfile);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return actionFailure("Authentication required", "UNAUTHORIZED");
    }
    if (error instanceof AuthorizationError) {
      return actionFailure(error.message, "FORBIDDEN");
    }
    if (error instanceof NotFoundError) {
      return actionFailure("User not found", "NOT_FOUND");
    }
    return actionFailure("Failed to update profile");
  }
}
