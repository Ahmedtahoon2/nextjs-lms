# Next.js Modern Starter

> A production-ready Next.js starter with TypeScript, Prisma, Tailwind CSS v4, and shadcn/ui.

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
pnpm db:generate

# Start development server
pnpm dev
```

Visit `http://localhost:3000`

## Tech Stack

| Category   | Technology        |
| ---------- | ----------------- |
| Framework  | Next.js 16        |
| Language   | TypeScript        |
| UI         | React 19          |
| Styling    | Tailwind CSS v4   |
| Components | shadcn/ui         |
| Database   | PostgreSQL (Neon) |
| ORM        | Prisma            |
| Auth       | Better Auth       |
| Monitoring | Sentry            |
| Validation | Zod               |
| Forms      | React Hook Form   |
| Testing    | Jest              |
| Linting    | ESLint + Prettier |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── layout/      # Layout components
│   └── shared/      # Shared components
├── lib/             # Utilities and configurations
├── actions/         # Server Actions
├── services/        # Business logic
├── repositories/    # Data access layer
└── providers/       # React Context providers

prisma/
└── schema.prisma    # Database schema

docs/                # Project documentation
```

## Architecture

This project follows a **layered architecture** to separate concerns:

```
UI Layer (React Components)
         ↓
Actions/Routes (Server Actions, API Routes)
         ↓
Services (Business Logic)
         ↓
Repositories (Data Access)
         ↓
Database (Prisma + PostgreSQL)
```

**Key Principles:**

- Business logic lives in **Services**, never in UI components
- Database access happens only through **Repositories**
- Prefer **Server Components** by default
- Use **Client Components** only when needed (state, events, browser APIs)

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm typecheck    # Run TypeScript type checking
pnpm test         # Run Jest tests
```

## Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - Detailed architecture guide
- **[Development Guide](docs/DEVELOPMENT.md)** - Development workflows and best practices
- **[API Documentation](docs/API/)** - API references
- **[ADRs](docs/ADR/)** - Architecture Decision Records

## Project Goals

- Clean, maintainable architecture
- Type-safe code throughout
- Excellent developer experience
- AI-friendly codebase
- Performance-optimized
- Accessible by default

## Git Workflow

This project uses a trunk-based workflow:

- **`master`** - Production/stable branch (protected)
- **`dev`** - Development/integration branch (protected)
- **`dev/<feature>`** - Feature branches

### Quick Start

```bash
# Start new feature
git checkout dev && git pull && git checkout -b dev/my-feature

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Verify before PR
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# Push and create PR to dev
git push origin dev/my-feature
```

See **[Git Workflow Guide](docs/Development/Git.md)** for complete branching, release, and versioning guidelines.

## Contributing

1. Create feature branches from `dev` (never from `master`)
2. Follow Conventional Commits: `type(scope): description`
3. Ensure all checks pass: lint, typecheck, tests, build
4. Create PR targeting `dev` branch
5. Delete feature branch after merge

See [Development Guide](docs/DEVELOPMENT.md) for coding standards.

## License

MIT
