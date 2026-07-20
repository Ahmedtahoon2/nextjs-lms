# Conventions

Coding and naming conventions followed throughout the project.

---

# File Naming

Components: `PascalCase.tsx`

Hooks: `useSomething.ts`

Utilities: `camelCase.ts`

Constants: `UPPER_SNAKE_CASE.ts`

Types: `types.ts`

Actions: `action.ts` or `actions.ts`

Services: `service.ts` or `services.ts`

Repositories: `repository.ts` or `repositories.ts`

---

# Component Naming

- PascalCase for component files and exports.
- One component per file.
- Named exports preferred over default exports.
- Co-locate related types in the same file or `types.ts`.

---

# Import Conventions

Always use path aliases:

```ts
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/db";
```

Never use relative paths that traverse multiple directories:

```ts
// Avoid
import Button from "../../../../components/ui/button";
```

---

# Tailwind Conventions

- Use the `cn()` utility for conditional classes.
- Never hardcode color values. Use design tokens.
- Avoid arbitrary values unless justified.
- Prefer Tailwind utilities over custom CSS.
- Use `@apply` sparingly and only for repeated patterns.

---

# TypeScript Conventions

- Never use `any`.
- Prefer inferred types.
- Export reusable types.
- Keep types close to the feature.
- Use Zod for runtime validation.

---

# Server vs Client Components

Server Components (default):

- Data fetching.
- Database access.
- Static content.
- SEO-critical pages.

Client Components (when required):

- State management.
- Browser APIs.
- Event handlers.
- Interactive UI.

---

# Documentation Tags

Use these tags when updating documentation:

- `feat` - New feature documentation.
- `fix` - Bug fix documentation.
- `docs` - Documentation-only changes.
- `refactor` - Architecture or convention changes.
- `perf` - Performance-related documentation.
- `test` - Testing documentation.
