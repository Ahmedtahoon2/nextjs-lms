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

## Server Actions & Error Handling

All Server Actions must return a standardized `ActionResult<T>`:

```typescript
export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      code?: string;
      details?: Record<string, string[]>;
    };
```

- Use `actionSuccess(data)` and `actionFailure(error, code, details)` from `@/lib/action-result`.
- Use `requireAuth()` and `requireRole(roleName)` from `@/lib/auth-helpers` for action boundary guards.
- Validate inputs with Zod schemas before calling Services.
- Catch typed `AppError` exceptions and map to user-friendly messages without leaking database internals.

## Performance

Server Components, lazy loading, memoize only when measured to help. No premature optimization.

## Security

Validate server input. Sanitize user content. Secrets in env vars. Least privilege.

## Media & HTML Content Sanitization

- **Explicit Sanitization Pipeline:**
  - `Markdown Input → marked.parse() → sanitize-html → persisted bodyHtml → UI`.
  - The client must never render unsanitized Markdown or HTML with `dangerouslySetInnerHTML`.
- **Security Policy:**
  - Schemes: `http:` and `https:` only. Reject all `javascript:`, `data:`, `file:`, `blob:`.
  - No inline event-handlers (`onload`, `onerror`, `onclick`).
  - Strict WHATWG URL parsing for `<iframe>` and `<img>` sources.
  - Video embed whitelist: YouTube (`youtube.com`, `www.youtube.com`), Vimeo (`player.vimeo.com`, `vimeo.com`), Loom (`loom.com`, `www.loom.com`).
  - No generic cloud storage provider frameworks in Task 04.

## Testing

Every important business rule has tests. Critical UI flows have component or integration tests.

## Documentation

Architecture changes require doc updates. Docs must reflect current reality.
