import { auth } from "@/lib/auth";
import * as userRepository from "@/repositories/user";
import * as sessionRepository from "@/repositories/session";
import { AuthenticationError, NotFoundError } from "@/lib/errors";
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

export async function revokeSession(sessionId: string) {
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
