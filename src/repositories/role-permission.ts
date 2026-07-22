import { prisma } from "@/lib/db";

export async function assignPermissionToRole(
  roleId: string,
  permissionId: string,
) {
  return prisma.rolePermission.create({
    data: { roleId, permissionId },
  });
}

export async function removePermissionFromRole(
  roleId: string,
  permissionId: string,
) {
  return prisma.rolePermission.delete({
    where: { roleId_permissionId: { roleId, permissionId } },
  });
}

export async function findRolePermission(roleId: string, permissionId: string) {
  return prisma.rolePermission.findUnique({
    where: { roleId_permissionId: { roleId, permissionId } },
  });
}
