---
name: lms-architecture
description: 5-layer architectural boundaries, downward dependency rules, Server/Client component separation, Server Action contracts, repository patterns, and cross-layer naming conventions. Load when implementing features, creating actions, modifying services, adding repositories, or defining layer boundaries.
---

# LMS Architecture & Layer Boundaries

This skill defines the structural contracts, boundary rules, and downward dependency hierarchy of the Next.js LMS application.

---

## 1. The 5-Layer Hierarchy

```text
UI (Server & Client Components: @/app/*, @/components/*)
  ↓
Actions / Route Handlers (@/actions/*, @/app/api/*)
  ↓
Domain Services (@/services/*)
  ↓
Repositories (@/repositories/*)
  ↓
Database (Prisma Client + Neon PostgreSQL: @/lib/db)
```

---

## 2. Layer Responsibilities & Strict Boundaries

| Layer | Responsibilities | Forbidden Patterns |
|---|---|---|
| **UI** | Rendering DOM, layout, interactive state, client event handlers. | NEVER import Prisma or repositories directly. NEVER execute business logic or mutations. |
| **Actions / Routes** | Input validation (Zod schemas), auth/session extraction (`requireAuth`), calling services, returning `ActionResult<T>`. | NEVER implement domain logic or state transitions. NEVER call Prisma or repositories directly. |
| **Services** | All business logic, lifecycle transitions, multi-repository coordination, transactions, authorization & ownership validation. | NEVER know about HTTP requests/responses. NEVER depend on UI frameworks or React hooks. |
| **Repositories** | Prisma queries, atomic transactions, SQL locks, raw data mapping. | NEVER contain domain business logic or authorization rules. NEVER import services. |
| **Database** | Persistence, relational integrity, unique constraints, Neon connection pool. | Managed strictly via Prisma migrations and schema. |

---

## 3. Downward Dependency Direction

Dependencies flow strictly downward. Inversions are prohibited:
- `Repositories` never import `Services` or `Actions`.
- `Services` never import `Actions` or `UI`.
- `UI` never imports `Repositories` or Prisma client.

---

## 4. Server Actions Contract (`ActionResult<T>`)

All Server Actions must return a standardized `ActionResult<T>`:

```typescript
import { actionSuccess, actionFailure, type ActionResult } from "@/lib/action-result";
import { requireAuth, requireRole } from "@/lib/auth-helpers";
import { mySchema } from "@/lib/validations/my-feature";
import * as myService from "@/services/my-service";

export async function myAction(rawInput: unknown): Promise<ActionResult<MyData>> {
  try {
    const session = await requireAuth();
    const validated = mySchema.parse(rawInput);
    const data = await myService.doWork(session.user.id, validated);
    return actionSuccess(data);
  } catch (error) {
    if (error instanceof AppError) {
      return actionFailure(error.message, error.code);
    }
    return actionFailure("An unexpected error occurred", "INTERNAL_ERROR");
  }
}
```

---

## 5. Server vs. Client Component Boundaries

1. **Server Components by Default:**
   - All page layouts, view templates, and data-fetching components must remain Server Components.
   - Fetch initial data directly in Server Components by calling domain services.
2. **Client Components (`"use client"`):**
   - Reserve strictly for interactive elements: event handlers (`onClick`, `onChange`), React state (`useState`, `useReducer`), effects (`useEffect`), and browser APIs.
   - Keep Client Components at the leaves of the render tree. Pass data down as serialized props or invoke Server Actions for mutations.

---

## 6. Standard Error Hierarchy (`@/lib/errors`)

All domain and operational exceptions derive from typed classes:
- `AuthenticationError`: User is not authenticated or session is expired (`401`).
- `AuthorizationError`: User lacks necessary role, permission, or resource ownership (`403`).
- `NotFoundError`: Requested entity does not exist or access is obscured (`404`).
- `ValidationError`: Input data violates business rules (`400`).
- `ConflictError`: State transition conflict or duplicate key collision (`409`).
- `DatabaseError`: Unhandled database query or connection failure (`500`).

---

## 7. File & Code Conventions

- **Path Aliases:** Always use `@/...` path aliases. Never use relative imports that traverse multiple directories (`../../..`).
- **Naming Conventions:**
  - Components: `PascalCase.tsx`
  - Actions: `src/actions/<domain>.ts`
  - Services: `src/services/<domain>.ts`
  - Repositories: `src/repositories/<domain>.ts`
  - Validations: `src/lib/validations/<domain>.ts`
  - Tests: `__tests__/<feature>.test.ts` (co-located or mirrored in `__tests__`)
