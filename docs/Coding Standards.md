# Coding Standards

## General

TypeScript strict mode. Readable > clever. Simple > abstract. Never duplicate business logic.

## File Naming

| Type       | Convention            |
| ---------- | --------------------- |
| Components | `PascalCase.tsx`      |
| Hooks      | `useCamelCase.ts`     |
| Utilities  | `camelCase.ts`        |
| Constants  | `UPPER_SNAKE_CASE.ts` |
| Types      | `types.ts`            |

## Imports

Always use path aliases (`@/...`). Never relative paths crossing multiple directories.

## Components

**Prefer:** Server Components, small size, composition, single responsibility.
**Avoid:** huge components, nested conditionals, business logic in UI.

## Styling

Tailwind only. No inline styles. No CSS duplication.

## State Management (priority order)

1. Server state
2. URL state (search/route params)
3. Local state (`useState`)
4. Context (only for truly global: theme, auth)

No premature global state.

## Business Logic

Business logic lives only in Services. Never in components, hooks, or repositories.

## Database

All DB access through repositories. Never call Prisma from UI.

## Error Handling

Validate inputs. Return meaningful errors. Handle unexpected failures.

## Performance

Server Components, lazy loading, memoize only when measured to help. No premature optimization.

## Security

Validate server input. Sanitize user content. Secrets in env vars. Least privilege.

## Testing

Every important business rule has tests. Critical UI flows have component or integration tests.

## Documentation

Architecture changes require doc updates. Docs must reflect current reality.
