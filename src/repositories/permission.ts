import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export async function findPermissionByName(name: string) {
  return prisma.permission.findUnique({ where: { name } });
}

export async function findPermissionById(id: string) {
  return prisma.permission.findUnique({ where: { id } });
}

export async function createPermission(data: Prisma.PermissionCreateInput) {
  return prisma.permission.create({ data });
}

export async function deletePermission(id: string) {
  return prisma.permission.delete({ where: { id } });
}

export async function findAllPermissions() {
  return prisma.permission.findMany();
}
