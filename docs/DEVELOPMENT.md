# Development Guide

## Setup

```bash
pnpm install
cp .env.example .env       # set DATABASE_URL
pnpm prisma:generate
pnpm prisma db push
pnpm dev
```

Requires: Node 20+, pnpm 8+, PostgreSQL (or Neon).

## Coding Standards

**TypeScript:** strict mode, no `any`, prefer inference, use Zod for runtime validation.

**Naming:**

| Type       | Convention            |
| ---------- | --------------------- |
| Components | `PascalCase.tsx`      |
| Hooks      | `useCamelCase.ts`     |
| Utilities  | `camelCase.ts`        |
| Constants  | `UPPER_SNAKE_CASE.ts` |

**Imports:** use path aliases (`@/...`), never relative paths crossing multiple directories.

**Components:** Server by default; client only for state/effects/events/browser APIs. Keep small, single responsibility, prefer composition.

**State priority:** Server → URL → Local → Context (Context only for truly global like theme/auth).

**Styling:** Tailwind utilities, design tokens from `globals.css`, no hardcoded colors, use CVA for variants.

## Layer Roles

- **Action:** user mutations, auth checks, Zod validation, calls service.
- **Service:** business logic, multi-repo workflows, complex validation.
- **Repository:** one per DB table, queries, data mapping only.

## Feature Workflow

1. Zod schema in `src/lib/validations/`.
2. Repository functions in `src/repositories/`.
3. Service orchestration in `src/services/`.
4. Server Action in `src/actions/` (auth → validate → service).
5. UI component calling the action.

## Testing

Mock repositories in service tests. Use `@testing-library/react` for components.

```ts
jest.mock("@/repositories/user-repository");
```

## Git

Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`). Husky runs lint+format+typecheck pre-commit. Skip with `--no-verify` only when necessary.

## Common Tasks

```bash
pnpx shadcn@latest add button       # add shadcn component
pnpm prisma migrate dev --name X    # create migration
pnpm typecheck                      # check types
```

New env var: add to `.env.example`, `.env`, and `src/lib/env.ts` (Zod).

## Debugging

- Server Component errors log to **terminal**, not browser.
- Enable Prisma logging: `new PrismaClient({ log: ["query", "error", "warn"] })`.

## Performance Checklist

- [ ] Server Components by default
- [ ] Loading states + Suspense boundaries
- [ ] `next/image` for images
- [ ] Dynamic imports for heavy components
- [ ] DB indexes + cursor pagination
