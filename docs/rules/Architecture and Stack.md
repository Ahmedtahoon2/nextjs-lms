# Architecture and Stack

This document defines the structural architectural rules for the Next.js App Router project.

---

# Architecture Layers

```
UI (Server Components)
↓

Actions / Routes
↓

Services

↓

Repositories

↓

Database (Prisma + Neon PostgreSQL)
```

---

# Layer Responsibilities

## UI Layer

- Renders the interface.
- Handles user interactions.
- Displays application state.
- Must never contain business logic.
- Must never access the database directly.

## Actions / Routes

- Receives requests.
- Handles authentication and authorization.
- Validates input with Zod.
- Calls services.
- Returns responses.

## Service Layer

- Contains all business rules.
- Orchestrates workflows.
- Coordinates between repositories.
- Remains independent from UI.

## Repository Layer

- Handles database queries.
- Performs CRUD operations.
- Manages data persistence.
- The only layer allowed to call Prisma directly.

## Database Layer

- Prisma models and migrations.
- PostgreSQL hosted on Neon.
- No application logic belongs here.

---

# Technology Integration

## Next.js 16 App Router

- Server Components by default.
- Client Components only when required (state, browser APIs, event handlers).
- Server Actions for mutations.
- Route Handlers for API endpoints.
- Metadata API for SEO.

## Prisma + Neon

- Serverless PostgreSQL via Neon.
- Connection pooling via `@prisma/adapter-neon`.
- WebSocket connections via `ws`.
- Singleton Prisma client in `lib/db.ts`.
- Never instantiate Prisma directly in components.

## Zod Validation

- Runtime validation for all external input.
- Type inference from schemas.
- Used in Server Actions and Route Handlers.
- Environment variable validation via `@t3-oss/env-nextjs`.

## Tailwind CSS v4

- Utility-first styling.
- Design tokens as CSS custom properties in `globals.css`.
- oklch color space for perceptually uniform colors.
- Dark mode via `.dark` class.
- `cn()` utility via `clsx` + `tailwind-merge`.

---

# Rules

- Business logic must never exist inside UI components.
- Database access must never happen directly inside UI components.
- Every external input must be validated with Zod.
- Never use `any`. Prefer inferred types.
- Prefer Server Components. Use Client Components only when required.
- Keep routes thin. Delegate to services.
- Never modify production databases manually. Use Prisma migrations.
- Never expose secrets, password hashes, or internal identifiers.

---

# Data Flow

```
Request
↓
Validation (Zod)
↓
Action / Route Handler
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL (Neon)
↓
Repository
↓
Service
↓
Response
```

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
