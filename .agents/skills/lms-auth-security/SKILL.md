---
name: lms-auth-security
description: Better Auth integration, session management, RBAC enforcement (roles/permissions), route and action authorization guards, resource ownership checks, and content sanitization. Load when protecting routes, managing user roles, creating or modifying Server Actions, or handling user input and rich media.
---

# LMS Authentication, RBAC & Security Patterns

This skill defines the authentication mechanics, role-based authorization (RBAC), resource ownership validation, and input sanitization policies for this application.

---

## 1. Authentication Architecture (Better Auth)

- **Library:** Better Auth 1.7 with `@prisma/adapter-neon` via `@/lib/db`.
- **Config Entry:** `@/lib/auth.ts`:
  - Default Registration Hook: All new users automatically receive the `"student"` role via an upsert in `databaseHooks.user.create.after`.
  - Session Lifetime: 7 days (`60 * 60 * 24 * 7`), cookie cache 5 minutes.
  - Cookie Security: `useSecureCookies: process.env.NODE_ENV === "production"`.
  - Route Handler: Mounted at `@/app/api/auth/[...all]/route.ts`.
- **Session Types:**
  ```typescript
  import { auth } from "@/lib/auth";
  export type Session = typeof auth.$Infer.Session;
  ```

---

## 2. Server Boundary Authorization Guards (`@/lib/auth-helpers`)

All Server Actions and Route Handlers must guard execution using standard helpers:

```typescript
import { requireAuth, requireRole, requireAnyRole, getCurrentUser } from "@/lib/auth-helpers";

// 1. Authenticated session required
const session = await requireAuth();

// 2. Specific role required (e.g. instructor or admin)
const session = await requireRole("instructor");

// 3. One of multiple roles required
const session = await requireAnyRole(["instructor", "admin"]);

// 4. Safe optional user retrieval in Server Components (does NOT throw)
const user = await getCurrentUser();
```

---

## 3. RBAC & Service-Layer Permissions (`@/services/authorization`)

Authorization logic lives strictly in `@/services/authorization.ts`:

- **Role Queries:**
  - `getUserRoles(userId)`: Returns all roles assigned to the user.
  - `hasRole(userId, roleName)`: Boolean check for specific role.
  - `hasAnyRole(userId, roleNames)`: Boolean check for multiple roles.
- **Permission Queries:**
  - `getUserPermissions(userId)`: Resolves full set of permissions via `RolePermission` relations.
  - `hasPermission(userId, permissionName)`: Boolean check.
  - `requirePermission(userId, permissionName)`: Throws `AuthorizationError` if missing.
- **Role Hierarchy / Roles in Schema:**
  - `student`: Default role on registration. Can browse published catalog, enroll, and track progress.
  - `instructor`: Can author courses, manage curriculum, and view enrolled rosters for owned courses.
  - `admin`: Superuser. Can manage all courses, users, and platform settings.

---

## 4. Resource Ownership Verification Invariant

When modifying or accessing private resources (e.g. course curriculum, instructor dashboard, rosters):
- **Rule:** The user must be the resource author OR hold the `"admin"` role.
- **Standard Service Pattern:**
  ```typescript
  async function assertCourseOwnership(
    userId: string,
    course: { instructorId: string }
  ) {
    if (course.instructorId === userId) return;
    const isAdmin = await hasRole(userId, "admin");
    if (!isAdmin) {
      throw new AuthorizationError("You do not have permission to manage this course");
    }
  }
  ```

---

## 5. Security & Visibility Invariant: 404 vs. 403

To prevent ID enumeration, metadata harvesting, and leaking draft existence:
- **Rule:** If an unauthenticated user or non-author student attempts to access a `DRAFT` or `ARCHIVED` course by ID or slug, the service must throw `NotFoundError (404)`, **NOT** `AuthorizationError (403)`.
- Returning `403` informs the attacker that the resource exists; `404` completely obscures it.

---

## 6. Content & Media Sanitization Pipeline

User-submitted markdown, rich text, and embedded media must be sanitized before persistence:

- **Pipeline:**
  $$\text{Raw Markdown} \longrightarrow \text{marked.parse()} \longrightarrow \text{sanitize-html} \longrightarrow \text{persisted bodyHtml}$$
- **URL & Embed Rules:**
  - Schemes: `http:` and `https:` strictly allowed. Reject all `javascript:`, `data:`, `file:`, `blob:`.
  - Disallow inline event handlers (`onload`, `onerror`, `onclick`).
  - Whitelist Video Embed Domains:
    - YouTube: `youtube.com`, `www.youtube.com`
    - Vimeo: `player.vimeo.com`, `vimeo.com`
    - Loom: `loom.com`, `www.loom.com`
  - Never render raw user input using `dangerouslySetInnerHTML` on the client without prior pipeline sanitization.
