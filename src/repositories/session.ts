import { prisma } from "@/lib/db";

export async function findSessionByToken(token: string) {
  return prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function findSessionById(id: string) {
  return prisma.session.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function findSessionsByUserId(userId: string) {
  return prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteSession(id: string) {
  return prisma.session.delete({ where: { id } });
}

export async function deleteSessionsByUserId(userId: string) {
  return prisma.session.deleteMany({ where: { userId } });
}

export async function deleteExpiredSessions() {
  return prisma.session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
}
