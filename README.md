# Next.js LMS Platform

> A production-grade Learning Management System (LMS) built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma ORM, Neon PostgreSQL, and Better Auth.

---

## Key Features

- **Role-Based Access Control (RBAC):** Multi-tier authorization supporting Students, Instructors, and Administrators via Better Auth with session management and route guards.
- **Course Catalog & Discovery:** Server-side search, category and proficiency level filtering, sorting, and bounded pagination with automatic enrollment state decoration.
- **Student Learning Player:** Interactive course player featuring dynamic curriculum sidebar navigation, video embeds (YouTube, Vimeo, Loom), server-sanitized markdown reader, downloadable resources, and granular per-lesson progress completion tracking.
- **Instructor Course Management:** Dedicated instructor authoring workspace for course creation, curriculum organization (modules and lessons), atomic two-phase curriculum reordering, rich markdown editor with live sanitized preview, and publishing state machines.
- **User Profiles:** Self-service profile management with bio, headline, website, and avatar customization.
- **Enterprise Security & Concurrency:** IDOR protection on all resources, server-side XSS sanitization (`sanitize-html` and `marked`), parent course row locking (`SELECT ... FOR UPDATE`), and atomic database transactions.

---

## Tech Stack

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| **Framework**        | Next.js 16 (App Router)                 |
| **Language**         | TypeScript 5.9                          |
| **UI Library**       | React 19                                |
| **Styling**          | Tailwind CSS v4 + tw-animate-css        |
| **Components**       | shadcn/ui (base-nova) + Lucide Icons    |
| **Database**         | PostgreSQL (Neon serverless)            |
| **ORM**              | Prisma 7.10                             |
| **Authentication**   | Better Auth 1.7                         |
| **Validation**       | Zod                                     |
| **Forms**            | React Hook Form + `@hookform/resolvers` |
| **Testing**          | Jest 30 + React Testing Library         |
| **Tooling & Linter** | ESLint 9 + Prettier 3 + Knip            |
| **Monitoring**       | Sentry (`@sentry/nextjs`)               |

---

## Architecture

This project strictly adheres to a **5-layer architecture** with downward-only dependency flow:

```
UI Layer (Server & Client Components)
  ↓
Actions / Routes (@/actions/*, @/app/api/*)
  ↓
Domain Services (@/services/*)
  ↓
Repositories (@/repositories/*)
  ↓
Database (Prisma + Neon PostgreSQL)
```

- **UI:** Pure presentation. Never queries database or repositories directly. Interactive elements are isolated client leaves (`"use client"`).
- **Actions / Routes:** Input validation via Zod schemas and session/role guards. Standardized `ActionResult<T>` responses.
- **Domain Services:** Centralized business logic, transactions, state machines, and 4-tier authorization.
- **Repositories:** Clean data access, queries, and atomic database mutations.
- **Database:** Managed via Prisma schemas with indexes supporting foreign keys and query paths.

---

## Quick Start

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd nextjs
pnpm install
```

### 2. Configure Environment Variables

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

Ensure the following variables are configured:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secure-random-secret-key-at-least-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Sentry (Optional for local dev)
NEXT_PUBLIC_SENTRY_DSN=""
```

### 3. Database Migration & Client Generation

```bash
pnpm db:generate
pnpm db:push
# or run migrations:
# pnpm db:migrate
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command            | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `pnpm dev`         | Start Next.js development server                                          |
| `pnpm build`       | Create production build                                                   |
| `pnpm start`       | Start production server                                                   |
| `pnpm test`        | Run complete Jest test suite (unit, integration, security)                |
| `pnpm typecheck`   | Run TypeScript compiler check without emitting files                      |
| `pnpm lint`        | Run ESLint across codebase                                                |
| `pnpm format`      | Format files using Prettier                                               |
| `pnpm check`       | Run full quality gate: ESLint, TypeScript check, Knip, and Prettier check |
| `pnpm db:generate` | Regenerate Prisma Client                                                  |
| `pnpm db:push`     | Sync Prisma schema with Neon database                                     |
| `pnpm db:studio`   | Open Prisma Studio database viewer                                        |

---

## Project Structure

```
src/
├── actions/             # Server Actions (Zod parsing, auth guards, ActionResult)
├── app/                 # Next.js App Router (pages, layouts, route handlers)
│   ├── (auth)/          # Authentication routes (/sign-in, /sign-up)
│   ├── (dashboard)/     # Protected instructor & user dashboards
│   ├── (marketing)/     # Public landing & static pages
│   ├── courses/         # Course catalog, syllabus, and learning player
│   └── api/             # API route handlers (Better Auth, webhooks)
├── components/
│   ├── features/        # Domain-scoped UI components (auth, catalog, player, etc.)
│   ├── global/          # Global layout, header, footer, theme providers
│   └── ui/              # shadcn/ui design primitives (button, card, dialog, etc.)
├── lib/                 # Core utilities, errors, validators, auth config
├── providers/           # React context providers (Theme, Auth)
├── repositories/        # Concrete data access layer (Prisma models)
├── services/            # Domain business logic & transaction boundaries
└── __tests__/           # Security penetration tests (IDOR, XSS)
```

---

## Documentation Links

- **[Master Index](docs/INDEX.md)** — Canonical project documentation hub
- **[Architecture Guide](docs/Architecture.md)** — Detailed 5-layer boundaries and concurrency patterns
- **[Domain Entities Reference](docs/reference/Entities.md)** — Comprehensive entity and relation definitions
- **[ADR 001: Layered Architecture](docs/decisions/001-use-layered-architecture.md)**
- **[ADR 002: Neon with Prisma](docs/decisions/002-use-neon-with-prisma.md)**
- **[ADR 003: shadcn/ui Component Strategy](docs/decisions/003-use-shadcn-ui.md)**
- **[ADR 004: LMS Domain Model](docs/decisions/004-lms-domain-model.md)**

---

## License

MIT
