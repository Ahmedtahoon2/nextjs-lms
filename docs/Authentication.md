# Authentication Architecture

Better Auth integration and RBAC authorization for the LMS.

---

# Why Better Auth

- Open-source, self-hosted, no vendor lock-in.
- Built-in Prisma adapter for PostgreSQL/Neon.
- Database-backed sessions with cookie cache.
- Email/password, OAuth, and plugin ecosystem.
- Active maintenance and strong TypeScript support.

---

# Architecture

```
Actions
    ↓
Services
    ↓
Repositories
    ↓
Better Auth
    ↓
Prisma
    ↓
PostgreSQL (Neon)
```

- **Actions** validate input, invoke services, return structured results.
- **Services** contain business logic and authorization decisions.
- **Repositories** own persistence and database queries.
- **Better Auth** handles authentication infrastructure only.

---

# Domain Separation

Authentication Layer (Better Auth)

- Sessions
- Accounts
- Verification
- Password Reset
- Email Verification

Domain Layer (Application)

- User
- Roles
- Permissions
- UserRole
- RolePermission

The application communicates through Services and Repositories, never directly with Better Auth.

---

# RBAC Model

- One User may have multiple Roles (many-to-many).
- Roles: Student, Instructor, Admin.
- Permissions are inherited from Roles.
- Architecture supports future direct user permissions.

Tables:

- `user` - Better Auth user model
- `role` - Role definitions
- `permission` - Permission definitions
- `user_role` - User-to-role assignments
- `role_permission` - Role-to-permission assignments

---

# File Structure

```
src/
    lib/
        auth.ts              # Better Auth server config
        auth-client.ts       # Better Auth React client
        db.ts                # Prisma client singleton
        env.ts               # Environment variable validation
        errors/              # Typed domain errors
        validations/         # Zod validation schemas

    repositories/
        user.ts              # User persistence
        role.ts              # Role persistence
        permission.ts        # Permission persistence
        user-role.ts         # User-role assignments
        role-permission.ts   # Role-permission assignments
        session.ts           # Session persistence

    services/
        auth.ts              # Authentication workflows
        authorization.ts     # RBAC authorization
        session.ts           # Session management
        user.ts              # User business logic

    actions/
        auth.ts              # Authentication server actions

middleware.ts            # Route protection (root)
```

---

# Environment Variables

| Variable             | Description                              |
| -------------------- | ---------------------------------------- |
| `DATABASE_URL`       | Neon pooled connection string            |
| `DIRECT_URL`         | Neon direct connection for Prisma CLI    |
| `BETTER_AUTH_SECRET` | Encryption secret (min 32 chars)         |
| `BETTER_AUTH_URL`    | Base URL (e.g., `http://localhost:3000`) |

---

# Migration

```bash
pnpm prisma migrate dev --name add-better-auth-and-rbac
```

---

# Related Documentation

- [Architecture and Stack](rules/Architecture%20and%20Stack.md)
- [Tech Stack](Tech%20Stack.md)
- [CONVENTIONS](meta/CONVENTIONS.md)
