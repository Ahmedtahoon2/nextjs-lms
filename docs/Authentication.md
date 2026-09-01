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

Default roles: Student, Instructor, Admin.

## File Map

```
src/lib/
  auth.ts            # Better Auth server config
  auth-client.ts     # Better Auth React client
  db.ts              # Prisma client singleton
  env.ts             # Zod-validated env vars
  errors/            # Typed domain errors
  validations/       # Zod schemas
src/repositories/
  user.ts, role.ts, permission.ts, user-role.ts, role-permission.ts, session.ts
src/services/
  auth.ts, authorization.ts, session.ts, user.ts
src/actions/
  auth.ts
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
