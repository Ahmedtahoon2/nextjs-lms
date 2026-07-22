import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export async function findRoleByName(name: string) {
  return prisma.role.findUnique({ where: { name } });
}

export async function findRoleById(id: string) {
  return prisma.role.findUnique({
    where: { id },
    include: {
      rolePermissions: {
        include: { permission: true },
      },
    },
  });
}

export async function createRole(data: Prisma.RoleCreateInput) {
  return prisma.role.create({ data });
}

export async function deleteRole(id: string) {
  return prisma.role.delete({ where: { id } });
}

export async function findAllRoles() {
  return prisma.role.findMany({
    include: {
      _count: { select: { userRoles: true } },
    },
  });
}
