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

## Git Workflow

This project uses a **trunk-based development workflow** with `master` (production) and `dev` (integration) branches.

### Branching Strategy

```text
master (production)
  ↑
  │ merge after full verification
  │
 dev (integration)
  ↑
  │ merge via PR
  │
dev/<feature> (your work)
```

### Quick Workflow

```bash
# 1. Start feature from dev
git checkout dev && git pull && git checkout -b dev/my-feature

# 2. Work and commit
git commit -m "feat(scope): description"

# 3. Verify before PR
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# 4. Create PR to dev branch
git push origin dev/my-feature
```

### Commit Convention

Use **Conventional Commits**: `type(scope): description`

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`

Examples:

```bash
feat(auth): add email verification
fix(navbar): resolve mobile menu issue
docs(readme): update installation steps
```

### Pre-commit Hooks

Husky runs automatically on `git commit`:

- ESLint fix on staged files
- Prettier format
- TypeScript check

Skip only when necessary: `git commit --no-verify`

### Release Process

When `dev` is ready:

1. Verify: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
2. Update version in `package.json` (Semantic Versioning)
3. Create PR: `dev` → `master`
4. After merge, tag release: `git tag -a v0.2.0 -m "Release v0.2.0"`
5. Deploy to production

**Semantic Versioning:**

- **PATCH** (0.1.1) - Bug fixes
- **MINOR** (0.2.0) - New features (backward-compatible)
- **MAJOR** (1.0.0) - Breaking changes

See **[Git Workflow Guide](Development/Git.md)** for complete details on branching, releases, and best practices.

## Common Tasks

```bash
pnpx shadcn@latest add button       # add shadcn component
pnpm prisma migrate dev --name X    # create migration
pnpm typecheck                      # check types
```

New env var: add to `.env.example`, `.env`, and `src/lib/env.ts` (Zod).

## Debugging & Error Monitoring (Sentry)

This project uses **Sentry** for client, server, and edge error monitoring and performance tracking.

### Configuration

- `sentry.client.config.ts`: Client-side telemetry, replay integrations, and session tracing.
- `sentry.server.config.ts`: Server-side Node.js runtime exception capture and performance spans.
- `sentry.edge.config.ts`: Edge runtime exception handling.
- `src/instrumentation.ts`: Hooks server error instrumentation (`onRequestError = Sentry.captureRequestError`).
- `src/app/global-error.tsx`: Root React Error Boundary capturing unhandled layout crashes.

### Environment Variables

| Variable                 | Description                                             | Required   |
| ------------------------ | ------------------------------------------------------- | ---------- |
| `NEXT_PUBLIC_SENTRY_DSN` | Client DSN URL                                          | Production |
| `SENTRY_DSN`             | Server DSN URL (falls back to `NEXT_PUBLIC_SENTRY_DSN`) | Production |
| `SENTRY_ORG`             | Sentry organization slug (for source map uploads)       | CI / Build |
| `SENTRY_PROJECT`         | Sentry project slug (for source map uploads)            | CI / Build |
| `SENTRY_AUTH_TOKEN`      | Sentry auth token (for source map uploads)              | CI / Build |

- Server Component errors log to **terminal**, not browser.
- Enable Prisma logging: `new PrismaClient({ log: ["query", "error", "warn"] })`.

## Performance Checklist

- [ ] Server Components by default
- [ ] Loading states + Suspense boundaries
- [ ] `next/image` for images
- [ ] Dynamic imports for heavy components
- [ ] DB indexes + cursor pagination
