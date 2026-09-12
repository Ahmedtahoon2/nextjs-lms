# Task 01: Core Architecture & Foundation Hardening

## Objective

Harden the existing architectural foundation to support the LMS domain by establishing a lightweight, standardized Server Action response structure (`ActionResult<T>`), session extraction helpers, role verification utilities, and a basic pagination schema—without introducing speculative or generic repository abstractions.

---

## Scope

### In Scope
- Lightweight `ActionResult<T>` discriminated union type (`ActionSuccess<T> | ActionFailure`) with basic builder helpers.
- Server Action authentication helper `requireAuth()` extracting and verifying the active Better Auth session.
- Server Action role helper `requireRole(roleName)` checking assigned user roles.
- Standard Zod pagination schema (`page`, `limit`) for clean list queries.
- Concrete repository error-handling convention (mapping Prisma exceptions to typed `AppError` instances).

### Out of Scope
- Generic or abstract repository base classes (`BaseRepository<T>`, `GenericRepository<T>`, or repository factories).
- TanStack Query / React Query client caching.
- External caching infrastructure (Redis/Memcached).
- Over-engineered authorization DSLs or permission engines.

---

## Dependencies

- **Existing Project Dependencies**:
  - `better-auth`: Session verification (`src/lib/auth.ts`).
  - `zod`: Schema validation.
  - `@prisma/client`: Concrete database access and errors (`PrismaClientKnownRequestError`).
  - `src/lib/errors/`: Existing `AppError` hierarchy (`NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ValidationError`).
- **Preceding Tasks**: None (foundation task).

---

## Architecture Impact

Establishes a predictable boundary for Server Actions:
```
UI Component
  ↓ calls
Server Action (requireAuth(), parse Zod input, call Service, catch errors)
  ↓ returns
ActionResult<T> = { success: true, data: T } | { success: false, error: string, code?: string }
```
- Actions remain thin transport adapters.
- Business logic stays in Services.
- Repositories remain concrete domain modules (`UserRepository`, `SessionRepository`, etc.).

---

## Data Model Impact

No database migrations. Consumes existing Better Auth (`User`, `Session`) and RBAC (`Role`, `Permission`, `UserRole`) models.

---

## Authorization Rules

Establishes foundational authentication and role verification primitives:

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication Level                                │
│    requireAuth() verifies active Better Auth session.  │
│    Missing/expired session → throws UnauthorizedError  │
│    or returns actionFailure("UNAUTHORIZED").           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Role Level                                          │
│    requireRole(roleName) verifies caller holds role    │
│    via AuthorizationService.                           │
│    Missing role → throws ForbiddenError.               │
└────────────────────────────────────────────────────────┘
```
*Note: Resource-level ownership (e.g., does Instructor A own Course X?) is enforced strictly inside domain services (Tasks 03–07), not in generic auth helpers.*

---

## Validation

- **Pagination Schema** (`src/lib/validations/pagination.ts`):
  ```typescript
  export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(12),
  });
  export type PaginationInput = z.infer<typeof paginationSchema>;
  ```

---

## Error Handling

- **Error-to-Action Mapping**:
  - `ValidationError` → code `VALIDATION_ERROR` with field details.
  - `UnauthorizedError` → code `UNAUTHORIZED`.
  - `ForbiddenError` → code `FORBIDDEN`.
  - `NotFoundError` → code `NOT_FOUND`.
  - Unhandled exceptions → logged to Sentry, returns generic message to client without leaking database stack traces.

---

## UI / UX Requirements

No user-facing UI in this task. Provides shared utilities consumed by UI components in subsequent tasks.

---

## Testing Strategy

- **Unit Tests** (`src/lib/__tests__/action-result.test.ts`):
  - Test `actionSuccess(data)` creates valid `{ success: true, data }`.
  - Test `actionFailure(error, code, details)` creates valid failure payload.
- **Auth Helper Tests** (`src/lib/__tests__/auth-helpers.test.ts`):
  - Test `requireAuth()` succeeds with mock active session.
  - Test `requireAuth()` fails when session is null/expired.
  - Test `requireRole()` allows users with matching role and rejects others.
- **Validation Tests** (`src/lib/validations/__tests__/pagination.test.ts`):
  - Test pagination defaults and boundary values (page 1, limit 12, max limit 100).

---

## Documentation Updates

- Document Server Action patterns and `ActionResult<T>` conventions in `docs/Coding Standards.md`.
- Document session extraction in `docs/Authentication.md`.

---

## Acceptance Criteria

- [x] `ActionResult<T>` type and builder functions created in `src/lib/action-result.ts`.
- [x] `requireAuth()` and `requireRole()` utilities implemented in `src/lib/auth-helpers.ts`.
- [x] Simple pagination validation schema created in `src/lib/validations/pagination.ts`.
- [x] No generic repository base classes (`BaseRepository<T>`) introduced.
- [x] Unit tests pass cleanly with 100% success rate.
- [x] `pnpm typecheck` and `pnpm lint` pass with zero errors.

---

## Definition of Done

- [x] Layered architecture adhered to: Helpers isolated in `src/lib/`.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: Zod parses all helper inputs.
- [x] Authorized: Auth helpers reject unauthenticated/unauthorized callers.
- [x] Tested: Full test suite passes.
- [x] Documented: Coding standards updated.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
