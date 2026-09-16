---
name: lms-auth-security
description: Authoritative LMS security specification covering the 4-Tier Authorization Doctrine (Auth, Role, Ownership, Lifecycle), Better Auth session guards, application security checks (secrets, injection, XSS, prototype pollution), and content sanitization. Use when securing routes, Server Actions, services, or reviewing security-sensitive code.
---

# LMS Authentication, Authorization & Application Security

This skill defines the mandatory security architecture, authorization doctrine, application vulnerability defenses, and input sanitization policies for this repository.

---

## 1. The 4-Tier Authorization Doctrine

Every server mutation and protected query must enforce security in depth across four consecutive tiers:

```text
[Tier 1: Authentication Guard]
  ↓ (Assert valid Better Auth session via requireAuth(); anonymous users denied)
[Tier 2: Role Authorization]
  ↓ (Assert required role via requireRole() or requireAnyRole(): "instructor" or "admin")
[Tier 3: Resource Ownership / IDOR Defense]
  ↓ (Assert ownership: course.instructorId === session.userId or admin override)
[Tier 4: Lifecycle State Guard]
  ↓ (Assert state invariants: DRAFT for curriculum edits; PUBLISHED for enrollment; ARCHIVED locked)
```

1. **Tier 1 (Authentication):** Enforced at the boundary (Server Action or Route Handler) using `requireAuth()` from `@/lib/auth-helpers`.
2. **Tier 2 (Role Authorization):** Enforced using `requireRole("instructor")` or service-level `requirePermission(userId, "...")`. Students cannot access authoring tools or instructor routes.
3. **Tier 3 (Resource Ownership):** Services strictly verify that callers own the resource they mutate. Instructors cannot modify courses, modules, or lessons belonging to other instructors. Students cannot mutate or query other students' progress.
4. **Tier 4 (Lifecycle State Constraints):** Courses must be in `DRAFT` status for curriculum mutations. Courses cannot be published without at least 1 module and 1 lesson. `ARCHIVED` courses are locked against modifications.

---

## 2. Server Boundary Authorization Guards (`@/lib/auth-helpers`)

All Server Actions and Route Handlers must guard execution at the top of the function:

```typescript
import { requireAuth, requireRole, requireAnyRole, getCurrentUser } from "@/lib/auth-helpers";

// 1. Authenticated session required (throws AuthenticationError / 401)
const session = await requireAuth();

// 2. Specific role required (throws AuthorizationError / 403)
const session = await requireRole("instructor");

// 3. One of multiple roles required
const session = await requireAnyRole(["instructor", "admin"]);

// 4. Safe optional user retrieval in Server Components (returns null if unauthenticated)
const user = await getCurrentUser();
```

---

## 3. RBAC & Service-Layer Permissions (`@/services/authorization`)

Authorization business rules live strictly in `@/services/authorization.ts`:

- **Role Queries:**
  - `getUserRoles(userId)`: Returns all roles assigned to user.
  - `hasRole(userId, roleName)`: Boolean check for specific role.
  - `hasAnyRole(userId, roleNames)`: Boolean check for multiple roles.
- **Permission Queries:**
  - `getUserPermissions(userId)`: Resolves full set of permissions via `RolePermission` relations.
  - `hasPermission(userId, permissionName)`: Boolean check.
  - `requirePermission(userId, permissionName)`: Throws `AuthorizationError` if missing.
- **Platform Roles:**
  - `student`: Default role on registration. Can browse catalog, enroll, and track progress.
  - `instructor`: Can author courses, manage curriculum, and view enrolled rosters for owned courses.
  - `admin`: Superuser. Can manage all courses, users, and platform settings.

---

## 4. Resource Ownership Verification Pattern

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

```text
Raw Markdown ──► marked.parse() ──► sanitize-html ──► Persisted bodyHtml ──► Safe UI Render
```

- **URL & Scheme Allowlist:**
  - Strictly allow `http:` and `https:`.
  - Reject all `javascript:`, `data:`, `file:`, `blob:` schemes.
- **Disallowed Attributes:** Strip all inline event handlers (`onload`, `onerror`, `onclick`, `onmouseover`).
- **Video Embed Allowlist:** If iframe embeds are supported, restrict `src` strictly to:
  - YouTube: `youtube.com`, `www.youtube.com`
  - Vimeo: `player.vimeo.com`, `vimeo.com`
  - Loom: `loom.com`, `www.loom.com`
- **Client Rendering Rule:** Never render raw user input using `dangerouslySetInnerHTML` without passing it through the verified sanitization pipeline.

---

## 7. Application Security Checks & Vulnerability Defenses

### A. Secrets & Credential Management
- Never commit or log secrets, API keys, database connection strings, or Better Auth secret keys.
- Access environment variables exclusively through verified configs or `@t3-oss/env-nextjs` schemas.
- Never log session tokens or user passwords in server diagnostic output.

### B. Injection Defense (SQL & NoSQL)
- Prisma ORM uses parameterized queries by default.
- **Rule:** Never use raw string interpolation (`${userInput}`) inside `$queryRaw` or `$executeRaw`. If raw queries are unavoidable, use Prisma's tagged template literal `Prisma.sql` to guarantee parameterization.

### C. Input Validation & Untrusted Data
- All external inputs (request body, route params, search params, Server Action arguments) must be treated as attacker-controlled.
- Validate all payloads using strict Zod schemas before passing them to Domain Services.
- Reject unknown properties (`.strict()`) where appropriate to prevent mass-assignment attacks.

### D. Prototype Pollution & Object Mutation
- Never merge untrusted client JSON directly into internal objects using unconstrained `Object.assign` or `lodash.merge`.
- Construct domain mutation payloads explicitly with defined object keys.

### E. Sensitive Data Exposure & Safe Error Messages
- Server Actions must never return raw database error messages or internal stack traces to the client.
- Always catch errors and return structured, user-safe messages via `actionFailure(userMessage, code)`.
- Sensitive database fields (`passwordHash`, internal tokens) must be omitted from query result projections.

---

## 8. Pre-PR Security Checklist

Before creating a PR or merging security-sensitive changes, verify each item:

- [ ] **Auth Guard:** All new Server Actions and Route Handlers invoke `requireAuth()` or `requireRole()`.
- [ ] **Ownership Verification:** Private resource mutations assert resource author or admin ownership.
- [ ] **Visibility Invariant:** Unauthorized access to unpublished/draft courses throws `404`, not `403`.
- [ ] **Input Validation:** All inputs validated with Zod schemas before reaching domain services.
- [ ] **No Raw Injections:** No string concatenation in Prisma `$queryRaw` or shell commands.
- [ ] **Content Sanitization:** Any user HTML/Markdown is sanitized with `sanitize-html` and embeds are allowlisted.
- [ ] **No Secret Leaks:** No credentials or environment secrets committed or printed to logs.
- [ ] **Error Masks:** No internal database errors leaked through `ActionResult<T>`.
