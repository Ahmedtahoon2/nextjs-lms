import { prisma } from "@/lib/db";

export async function assignRoleToUser(userId: string, roleId: string) {
  return prisma.userRole.create({
    data: { userId, roleId },
  });
}

export async function removeRoleFromUser(userId: string, roleId: string) {
  return prisma.userRole.delete({
    where: { userId_roleId: { userId, roleId } },
  });
}

export async function findUserRole(userId: string, roleId: string) {
  return prisma.userRole.findUnique({
    where: { userId_roleId: { userId, roleId } },
  });
}

export async function findUserRoles(userId: string) {
  return prisma.userRole.findMany({
    where: { userId },
    include: { role: true },
  });
}
