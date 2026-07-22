"use server";

import { auth } from "@/lib/auth";
import * as authService from "@/services/auth";
import * as authorizationService from "@/services/authorization";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validations/auth";
import { AuthenticationError } from "@/lib/errors";
import { headers } from "next/headers";

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
    const result = await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: await headers(),
    });

    return { success: true, data: result as unknown as void };
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
    const result = await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
      },
      headers: await headers(),
    });

    return { success: true, data: result as unknown as void };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Sign up failed" };
  }
}

export async function signOutAction(): Promise<ActionResponse> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

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
  try {
    await authService.revokeSession(sessionId);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { success: false, error: "Not authenticated" };
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
