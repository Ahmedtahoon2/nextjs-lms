# Development Guide

Practical workflow guide for developers working on the Next.js LMS platform.

---

## 1. Quick Start

```bash
pnpm install
cp .env.example .env       # Set DATABASE_URL and auth secrets
pnpm db:generate           # Generate Prisma client
pnpm db:push               # Push schema to local/Neon database
pnpm dev                   # Start development server on http://localhost:3000
```

**Prerequisites:** Node.js 22+, pnpm 9+, PostgreSQL (Neon or local).

---

## 2. Core Conventions & Architecture

To avoid duplication and drift, full specifications live in their authoritative documents:

- **Architecture & Layer Hierarchy:** Follow the 5-layer downward rule (`UI → Actions/Routes → Services → Repositories → Database`). See **[Architecture Guide](Architecture.md)**.
- **Coding Standards:** Strict TypeScript (no `any`), Zod runtime validation, and naming rules. See **[Coding Standards](Coding%20Standards.md)**.
- **Design System & Anti-Slop:** Design tokens, component contracts, and aesthetic doctrine. See **[Design Tokens](design/tokens.md)** and **[Anti-Slop Doctrine](design/anti-slop.md)**.
- **Git & Release Workflow:** Branching strategy (`master` / `dev` / `dev/<feature>`), commit conventions, and release tagging. See **[Git Workflow Guide](Development/Git.md)**.
- **Master Documentation Index:** See **[Master Index](INDEX.md)**.

---

## 3. Common Development Commands

```bash
# Code quality & verification
pnpm check                          # Run full verification: Biome + tsc + knip
pnpm lint                           # Biome linting
pnpm format                         # Biome formatting
pnpm typecheck                      # TypeScript typecheck (tsc --noEmit)
pnpm test                           # Run Jest test suite

# Database workflows
pnpm db:generate                    # Regenerate Prisma client
pnpm db:push                        # Fast push schema to database
pnpm db:migrate:dev                 # Create and apply new Prisma migration
pnpm db:studio                      # Open Prisma Studio web GUI

# Adding UI components
pnpx shadcn@latest add <component>  # Add a shadcn/ui primitive
```

> [!TIP]
> When adding new environment variables, remember to update `.env.example`, your local `.env`, and validate them in `src/lib/env.ts` using Zod.

---

## 4. Debugging & Error Monitoring (Sentry)

This project integrates **Sentry** for client, server, and edge exception tracking and performance telemetry.

### Configuration Files

- `sentry.client.config.ts`: Client-side telemetry, session replay, and tracing.
- `sentry.server.config.ts`: Server-side Node.js runtime exception capture and performance spans.
- `sentry.edge.config.ts`: Edge runtime exception handling.
- `src/instrumentation.ts`: Hooks Next.js server error instrumentation (`onRequestError = Sentry.captureRequestError`).
- `src/app/global-error.tsx`: Root React Error Boundary capturing unhandled layout crashes.

### Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | Client DSN URL | Production |
| `SENTRY_DSN` | Server DSN URL (falls back to `NEXT_PUBLIC_SENTRY_DSN`) | Production |
| `SENTRY_ORG` | Sentry organization slug | CI / Build |
| `SENTRY_PROJECT` | Sentry project slug | CI / Build |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source map uploads | CI / Build |

### Logging Notes
- Server Component and Server Action errors log to the **terminal** console, not the browser devtools.
- Prisma query logging can be enabled in `src/lib/db.ts` via `new PrismaClient({ log: ["query", "error", "warn"] })`.

---

## 5. Performance Checklist

- [ ] Prefer Server Components by default; keep Client Components (`"use client"`) as thin leaf nodes.
- [ ] Wrap asynchronous boundaries with React `Suspense` and dedicated `loading.tsx` skeletons.
- [ ] Optimize all images using `next/image` with explicit dimensions or fill attributes.
- [ ] Ensure database queries in repositories have index backing and use cursor pagination for unbounded lists.
