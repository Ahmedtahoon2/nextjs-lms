import { getCurrentSession } from "@/services/auth";
import {
  requireRole as requireUserRole,
  requireAnyRole as requireUserAnyRole,
} from "@/services/authorization";

/**
 * Ensures the caller is authenticated with an active session.
 * Throws an AuthenticationError if unauthenticated.
 */
export async function requireAuth() {
  const session = await getCurrentSession();
  return session;
}

/**
 * Ensures the caller is authenticated and holds the specified RBAC role.
 * Throws an AuthenticationError if unauthenticated, or AuthorizationError if the role is missing.
 */
export async function requireRole(roleName: string) {
  const session = await requireAuth();
  await requireUserRole(session.user.id, roleName);
  return session;
}

/**
 * Ensures the caller is authenticated and holds at least one of the specified RBAC roles.
 * Throws an AuthenticationError if unauthenticated, or AuthorizationError if none of the roles are held.
 */
export async function requireAnyRole(roleNames: string[]) {
  const session = await requireAuth();
  await requireUserAnyRole(session.user.id, roleNames);
  return session;
}

/**
 * Safe helper for Server Components to retrieve the current user without throwing.
 * Returns the user object if authenticated, or null otherwise.
 */
export async function getCurrentUser() {
  try {
    const session = await getCurrentSession();
    return session.user;
  } catch {
    return null;
  }
}
