import { auth } from "@/lib/auth";
import * as userRepository from "@/repositories/user";
import * as sessionRepository from "@/repositories/session";
import * as authorizationService from "@/services/authorization";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";
import { headers } from "next/headers";

export async function getCurrentSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new AuthenticationError();
  }

  return session;
}

export async function signIn(email: string, password: string) {
  return auth.api.signInEmail({
    body: { email, password },
    headers: await headers(),
  });
}

export async function signUp(email: string, password: string, name: string) {
  return auth.api.signUpEmail({
    body: { email, password, name },
    headers: await headers(),
  });
}

export async function signOut() {
  return auth.api.signOut({
    headers: await headers(),
  });
}

export async function getUserById(id: string) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export async function getUserByEmail(email: string) {
  return userRepository.findUserByEmail(email);
}

export async function getUserWithRoles(id: string) {
  const user = await userRepository.findUserWithRoles(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export async function getUserSessions(userId: string) {
  return sessionRepository.findSessionsByUserId(userId);
}

export async function revokeSession(sessionId: string, currentUserId: string) {
  // Find the session to verify it exists and get its owner
  const session = await sessionRepository.findSessionById(sessionId);

  if (!session) {
    throw new NotFoundError("Session not found");
  }

  // Check if user owns this session
  const ownsSession = session.userId === currentUserId;

  // Check if user has admin permission to revoke any session
  const hasAdminPermission = await authorizationService.hasPermission(
    currentUserId,
    "sessions:revoke:any",
  );

  // User must either own the session or have explicit admin permission
  if (!ownsSession && !hasAdminPermission) {
    throw new AuthorizationError(
      "You do not have permission to revoke this session",
    );
  }

  return sessionRepository.deleteSession(sessionId);
}

export async function revokeAllSessions(userId: string) {
  return sessionRepository.deleteSessionsByUserId(userId);
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string },
) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return userRepository.updateUser(id, data);
}
