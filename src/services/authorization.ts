import { cache } from "react";
import * as userRepository from "@/repositories/user";
import * as userRoleRepository from "@/repositories/user-role";
import * as roleRepository from "@/repositories/role";
import { AuthorizationError, NotFoundError } from "@/lib/errors";

export const getUserPermissions = cache(
  async (userId: string): Promise<string[]> => {
    const user = await userRepository.findUserWithRoles(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const permissions = new Set<string>();

    for (const userRole of user.userRoles) {
      for (const rolePermission of userRole.role.rolePermissions) {
        permissions.add(rolePermission.permission.name);
      }
    }

    return Array.from(permissions);
  },
);

export const getUserRoles = cache(async (userId: string) => {
  const userRoles = await userRoleRepository.findUserRoles(userId);
  return userRoles.map((ur) => ur.role);
});

export async function hasPermission(
  userId: string,
  permissionName: string,
): Promise<boolean> {
  const permissions = await getUserPermissions(userId);
  return permissions.includes(permissionName);
}

export async function hasAnyPermission(
  userId: string,
  permissionNames: string[],
): Promise<boolean> {
  const permissions = await getUserPermissions(userId);
  return permissionNames.some((name) => permissions.includes(name));
}

export async function hasAllPermissions(
  userId: string,
  permissionNames: string[],
): Promise<boolean> {
  const permissions = await getUserPermissions(userId);
  return permissionNames.every((name) => permissions.includes(name));
}

export async function hasRole(
  userId: string,
  roleName: string,
): Promise<boolean> {
  const roles = await getUserRoles(userId);
  return roles.some((role) => role.name === roleName);
}

export async function hasAnyRole(
  userId: string,
  roleNames: string[],
): Promise<boolean> {
  const roles = await getUserRoles(userId);
  return roles.some((role) => roleNames.includes(role.name));
}

export async function requirePermission(
  userId: string,
  permissionName: string,
) {
  const allowed = await hasPermission(userId, permissionName);

  if (!allowed) {
    throw new AuthorizationError(
      `Missing required permission: ${permissionName}`,
    );
  }
}

export async function requireAnyPermission(
  userId: string,
  permissionNames: string[],
) {
  const allowed = await hasAnyPermission(userId, permissionNames);

  if (!allowed) {
    throw new AuthorizationError(
      `Missing required permissions: ${permissionNames.join(", ")}`,
    );
  }
}

export async function requireAllPermissions(
  userId: string,
  permissionNames: string[],
) {
  const allowed = await hasAllPermissions(userId, permissionNames);

  if (!allowed) {
    throw new AuthorizationError(
      `Missing required permissions: ${permissionNames.join(", ")}`,
    );
  }
}

export async function requireRole(userId: string, roleName: string) {
  const allowed = await hasRole(userId, roleName);

  if (!allowed) {
    throw new AuthorizationError(`Missing required role: ${roleName}`);
  }
}

export async function requireAnyRole(userId: string, roleNames: string[]) {
  const allowed = await hasAnyRole(userId, roleNames);

  if (!allowed) {
    throw new AuthorizationError(
      `Missing required role: one of [${roleNames.join(", ")}] is required`,
    );
  }
}

export async function assignRole(userId: string, roleId: string) {
  const existing = await userRoleRepository.findUserRole(userId, roleId);

  if (existing) {
    return existing;
  }

  return userRoleRepository.assignRoleToUser(userId, roleId);
}

export async function removeRole(userId: string, roleId: string) {
  const existing = await userRoleRepository.findUserRole(userId, roleId);

  if (!existing) {
    throw new NotFoundError("Role assignment not found");
  }

  return userRoleRepository.removeRoleFromUser(userId, roleId);
}

export async function assignRoleToUserByName(
  actorUserId: string,
  targetUserId: string,
  roleName: string,
) {
  await requireRole(actorUserId, "admin");

  const role = await roleRepository.findRoleByName(roleName);
  if (!role) {
    throw new NotFoundError(`Role not found: ${roleName}`);
  }

  return assignRole(targetUserId, role.id);
}

export async function removeRoleFromUserByName(
  actorUserId: string,
  targetUserId: string,
  roleName: string,
) {
  await requireRole(actorUserId, "admin");

  const role = await roleRepository.findRoleByName(roleName);
  if (!role) {
    throw new NotFoundError(`Role not found: ${roleName}`);
  }

  return removeRole(targetUserId, role.id);
}

export async function assignInitialUserRole(
  userId: string,
  roleName: "student" | "instructor",
) {
  const role = await roleRepository.findRoleByName(roleName);
  if (!role) {
    throw new NotFoundError(`Role not found: ${roleName}`);
  }

  return assignRole(userId, role.id);
}
