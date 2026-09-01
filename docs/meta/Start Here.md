# Start Here

## Setup

```bash
pnpm install
cp .env.example .env       # set DATABASE_URL
pnpm prisma:generate
pnpm run dev
```

## Commands

```bash
pnpm run dev | build | start | lint | test | format
pnpm prisma migrate dev | generate | studio | db push
pnpm run prepare          # set up Husky hooks
```

Pre-commit: ESLint + Prettier + TypeScript on staged files via lint-staged.

## Project Structure

```
nextjs/
├── src/
│   ├── app/                  # App Router pages
│   ├── actions/              # Server Actions
│   ├── components/           # React components
│   │   └── ui/               # shadcn/ui
│   ├── lib/
│   │   ├── auth.ts           # Better Auth server
│   │   ├── auth-client.ts    # Better Auth client
│   │   ├── db.ts             # Prisma singleton
│   │   ├── env.ts            # Env validation
│   │   ├── errors/           # Typed domain errors
│   │   └── validations/      # Zod schemas
│   ├── repositories/         # Data access
│   ├── services/             # Business logic
│   └── utils.ts
├── docs/                     # Docs hub
├── prisma/                   # Schema + migrations
├── public/
├── middleware.ts             # Route protection
└── package.json
```

## First Steps for AI Agents (tool-agnostic)

1. Read this file.
2. Read `AGENTS.md` at repo root (or your tool's equivalent mirror: `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, etc.).
3. Read `docs/rules/Architecture and Stack.md`.
4. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
5. Read `docs/skills/Taste Skill Project.md`.
6. Read `docs/meta/CONVENTIONS.md`.

## Documentation Rules

Update docs on every significant change. ADRs before implementation when possible. Docs always reflect current state.
