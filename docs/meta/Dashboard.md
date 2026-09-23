# Project Dashboard

High-level status overview for the Next.js LMS platform.

---

## 1. Project Status

- **Stage:** LMS Domain & Architecture Active
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (Strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui primitives + OKLCH design tokens
- **Data & Storage:** Neon PostgreSQL with Prisma ORM (`@prisma/adapter-neon`)
- **Authentication:** Better Auth (RBAC, email/password, cookie-cached sessions)

---

## 2. Core Tech Stack Health

| Technology            | Role                                          | Status     |
| --------------------- | --------------------------------------------- | ---------- |
| **Next.js 16**        | Full-stack App Router framework               | Active     |
| **React 19**          | Component model (Server Components default)   | Active     |
| **TypeScript 5**      | Strict type safety & contract enforcement     | Active     |
| **Tailwind CSS v4**   | Semantic utility styling                      | Active     |
| **Prisma ORM**        | PostgreSQL schema & type-safe data access     | Active     |
| **ESLint & Prettier** | Linting and formatting (`pnpm check`)         | Active     |
| **Jest & RTL**        | Unit, service, and security integration tests | Active     |
| **Sentry**            | Error monitoring and performance tracing      | Configured |

---

## 3. Documentation Navigation

Comprehensive project documentation is structured and indexed in **[Master Index](../INDEX.md)**.
Formal architectural decisions are tracked in **[Decisions Index](../decisions/README.md)**.
