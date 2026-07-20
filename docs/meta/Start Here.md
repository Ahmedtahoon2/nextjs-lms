# Start Here

Quick start guide for developers and AI agents working on this project.

---

# Environment Setup

1. Clone the repository.
2. Install dependencies: `pnpm install`.
3. Copy `.env.example` to `.env` and fill in environment variables.
4. Run `pnpm run dev` to start the development server.
5. Run `pnpm run prepare` to set up Husky git hooks.

---

# Development Commands

```bash
pnpm run dev          # Start development server
pnpm run build        # Production build
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run test         # Run Jest tests
pnpm run format       # Run Prettier
```

---

# Prisma Commands

```bash
pnpm prisma migrate dev     # Create and apply migration
pnpm prisma generate        # Generate Prisma Client
pnpm prisma studio          # Open Prisma Studio
pnpm prisma db push         # Push schema changes (dev only)
```

---

# Husky Git Hooks

Pre-commit hooks run automatically:

- ESLint on staged files.
- TypeScript type checking.
- Prettier formatting.
- lint-staged for targeted checks.

---

# Project Structure

```
nextjs/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   └── ui/               # shadcn/ui components
├── docs/                 # Documentation hub
├── lib/                  # Utilities and shared code
│   ├── db.ts             # Prisma client singleton
│   └── utils.ts          # cn() and other utilities
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── env.ts                # Environment variable validation
└── package.json          # Dependencies and scripts
```

---

# Documentation Structure

```
docs/
├── rules/          # Architecture and design rules (Priority 1)
├── meta/           # Project metadata and conventions (Priority 1)
├── skills/         # Design skill references (Priority 1)
├── flows/          # Build and audit workflows (Priority 2)
├── audits/         # Quality checks and pre-flight (Priority 2)
├── deliverables/   # Checklists and cheat sheets (Priority 2)
├── concepts/       # Design theory and micro-details (Priority 3)
├── decisions/      # Architecture decisions (Priority 3)
└── reference/      # Research and source tracking (Priority 4)
```

---

# First Steps for AI Agents

1. Read this file.
2. Read `docs/rules/Architecture and Stack.md`.
3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
4. Read `docs/skills/Taste Skill Project.md`.
5. Read `docs/meta/CONVENTIONS.md`.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
