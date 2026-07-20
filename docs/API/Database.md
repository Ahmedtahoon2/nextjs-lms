# Database

This document describes the database architecture used by the project.

---

# Database Engine

PostgreSQL

Hosted on:

- Neon

---

# ORM

Prisma ORM

Responsibilities:

- Type-safe database access
- Schema management
- Migrations
- Query generation

---

# Design Principles

The database should remain:

- Simple
- Normalized
- Scalable
- Easy to maintain

Business logic must never exist inside the database.

---

# Current Schema

## User

| Field     | Type     | Description               |
| --------- | -------- | ------------------------- |
| id        | String   | Primary Key (CUID)        |
| email     | String   | Unique email address      |
| name      | String?  | Optional display name     |
| image     | String?  | Optional profile image    |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Last update timestamp     |

---

# Data Access Flow

```
UI

↓

Actions

↓

Services

↓

Repositories

↓

Prisma

↓

PostgreSQL
```

Repositories are the only layer allowed to communicate directly with Prisma.

---

# Migration Strategy

Always create migrations using Prisma.

Never modify production databases manually.

Commands:

```bash
pnpm prisma migrate dev
```

Generate Prisma Client

```bash
pnpm prisma generate
```

Open Prisma Studio

```bash
pnpm prisma studio
```

---

# Naming Conventions

Tables

- Singular PascalCase models

Fields

- camelCase

Relations

- Explicit relation names where necessary

---

# Future Tables

Expected future models include:

- Session
- Account
- VerificationToken
- Role
- Permission
- Notification
- AuditLog

These models will be introduced only when required.

---

# Performance

Guidelines:

- Add indexes only when justified.
- Avoid unnecessary joins.
- Use pagination for large datasets.
- Select only required fields.

---

# Security

Never expose:

- Password hashes
- Secrets
- Internal identifiers without reason

Always validate user input before database operations.

---

# Backup Strategy

Production backups are managed by the hosting provider.

Database migrations must always be version-controlled.

---

# Documentation Rules

Every significant change should update the relevant documentation.
