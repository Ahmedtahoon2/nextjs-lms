import * as sessionRepository from "@/repositories/session";
import { NotFoundError } from "@/lib/errors";

export async function getSessionByToken(token: string) {
  const session = await sessionRepository.findSessionByToken(token);

  if (!session) {
    throw new NotFoundError("Session not found");
  }

  return session;
}

export async function getUserSessions(userId: string) {
  return sessionRepository.findSessionsByUserId(userId);
}

export async function revokeSession(sessionId: string) {
  return sessionRepository.deleteSession(sessionId);
}

export async function revokeAllUserSessions(userId: string) {
  return sessionRepository.deleteSessionsByUserId(userId);
}

export async function revokeExpiredSessions() {
  return sessionRepository.deleteExpiredSessions();
}

export async function isSessionValid(session: {
  expiresAt: Date;
}): Promise<boolean> {
  return session.expiresAt > new Date();
}
