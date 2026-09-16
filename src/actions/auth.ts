"use server";

import * as authService from "@/services/auth";
import * as authorizationService from "@/services/authorization";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validations/auth";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function signInAction(
  input: SignInInput,
): Promise<ActionResponse> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    await authService.signIn(parsed.data.email, parsed.data.password);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Sign in failed" };
  }
}

export async function signUpAction(
  input: SignUpInput,
): Promise<ActionResponse> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    await authService.signUp(
      parsed.data.email,
      parsed.data.password,
      parsed.data.name,
      parsed.data.role,
    );

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Sign up failed" };
  }
}

export async function signOutAction(): Promise<ActionResponse> {
  try {
    await authService.signOut();
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Sign out failed" };
  }
}

export async function getSessionAction() {
  try {
    const session = await authService.getCurrentSession();
    return { success: true, data: session };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
    }
    return { success: false, error: "Failed to get session" };
  }
}

export async function getUserRolesAction() {
  try {
    const session = await authService.getCurrentSession();
    const roles = await authorizationService.getUserRoles(session.user.id);
    return { success: true, data: roles };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
    }
    return { success: false, error: "Failed to get roles" };
  }
}

export async function getUserPermissionsAction() {
  try {
    const session = await authService.getCurrentSession();
    const permissions = await authorizationService.getUserPermissions(
      session.user.id,
    );
    return { success: true, data: permissions };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
    }
    return { success: false, error: "Failed to get permissions" };
  }
}

export async function revokeSessionAction(
  sessionId: string,
): Promise<ActionResponse> {
  // Validate input
  if (!sessionId || typeof sessionId !== "string") {
    return { success: false, error: "Invalid session ID" };
  }

  try {
    // Get current authenticated user
    const session = await authService.getCurrentSession();

    // Verify ownership and authorization in service layer
    await authService.revokeSession(sessionId, session.user.id);

    return { success: true };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
    }
    if (error instanceof AuthorizationError) {
      return { success: false, error: error.message };
    }
    if (error instanceof NotFoundError) {
      return { success: false, error: "Session not found" };
    }
    return { success: false, error: "Failed to revoke session" };
  }
}

export async function revokeAllSessionsAction(): Promise<ActionResponse> {
  try {
    const session = await authService.getCurrentSession();
    await authService.revokeAllSessions(session.user.id);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
    }
    return { success: false, error: "Failed to revoke sessions" };
  }
}

export async function assignInitialRoleAction(
  role: "student" | "instructor",
): Promise<ActionResponse> {
  try {
    const session = await authService.getCurrentSession();
    await authorizationService.assignInitialUserRole(session.user.id, role);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to assign initial role" };
  }
}
