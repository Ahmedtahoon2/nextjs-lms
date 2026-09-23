# Authentication

Better Auth integration with RBAC.

## Why Better Auth

Open-source, self-hosted, no vendor lock-in. Built-in Prisma adapter. DB-backed sessions with cookie cache. Email/password + OAuth + plugin ecosystem. Strong TS support.

## Flow

```
Actions → Services → Repositories → Better Auth → Prisma → PostgreSQL (Neon)
```

- **Actions:** validate input, invoke services, return structured results.
- **Services:** business logic + authorization decisions.
- **Repositories:** persistence only.
- **Better Auth:** auth infrastructure only — app talks to it through services/repos.

## Domain Separation

- **Auth layer (Better Auth):** sessions, accounts, verification, password reset, email verification.
- **Domain layer (app):** user, roles, permissions, user-role, role-permission.

App never talks to Better Auth directly except via configured clients.

## RBAC

One user → many roles (many-to-many). Permissions inherited from roles. Architecture supports future direct user permissions.

Default roles: `student`, `instructor`, `admin`.

Role assignment is strictly restricted: only users with the `admin` role (or possessing `roles:assign` permission) can assign or remove roles from users. Self-elevation of roles by non-admins is strictly prevented in `AuthorizationService`.

### Instructor Role & Workspace Guards

- Access to the `/instructor/*` workspace is guarded at the Server Component layout level ([src/app/(dashboard)/instructor/layout.tsx](<file:///d:/dev%20folder/nextjs/nextjs/src/app/(dashboard)/instructor/layout.tsx>)) using `requireAnyRole(session.user.id, ["instructor", "admin"])`.
- Unauthenticated requests are redirected to `/sign-in`.
- Authenticated non-instructors (such as students) trigger Next.js `forbidden()`, returning HTTP 403 status code rendered by [src/app/forbidden.tsx](file:///d:/dev%20folder/nextjs/nextjs/src/app/forbidden.tsx).
- All instructor domain services strictly enforce individual resource ownership (`course.instructorId === session.userId` or admin role) on both read queries and write mutations.

## File Map

```
src/lib/
  auth.ts            # Better Auth server config
  auth-client.ts     # Better Auth React client
  auth-helpers.ts    # requireAuth, requireRole, getCurrentUser
  action-result.ts   # ActionResult discriminated union and builders
  db.ts              # Prisma client singleton
  env.ts             # Zod-validated env vars
  errors/            # Typed domain errors
  validations/       # Zod schemas (auth, profile, pagination)
src/repositories/
  user.ts, role.ts, permission.ts, user-role.ts, role-permission.ts, session.ts
src/services/
  auth.ts, authorization.ts, session.ts, user.ts, profile.ts
src/actions/
  auth.ts, profile.ts
src/components/
  profile/           # Profile form components
middleware.ts        # Route protection (root)
```

## Environment

| Variable             | Purpose                          |
| -------------------- | -------------------------------- |
| `DATABASE_URL`       | Neon pooled connection           |
| `DIRECT_URL`         | Neon direct (for Prisma CLI)     |
| `BETTER_AUTH_SECRET` | Encryption secret (min 32 chars) |
| `BETTER_AUTH_URL`    | Base URL                         |

## Migration

```bash
pnpm prisma migrate dev --name add-better-auth-and-rbac
```
