# Architecture

## Layers

```
UI → Actions/Routes → Services → Repositories → Database (Prisma + PostgreSQL)
```

## Responsibilities

| Layer            | Does                                                     | Must NOT                                 |
| ---------------- | -------------------------------------------------------- | ---------------------------------------- |
| **UI**           | Render, user interaction                                 | Business logic, direct DB access         |
| **Actions**      | Auth, input validation (Zod), call services              | Business logic, direct repo access       |
| **Services**     | Business rules, multi-repo workflows, complex validation | Know about HTTP, depend on UI frameworks |
| **Repositories** | Queries, CRUD, data mapping                              | Business logic, business rules           |
| **Database**     | Persistence                                              | —                                        |

## Principles

1. **Separation of concerns** — business logic only in services; data access only in repos.
2. **Dependency direction** — flows downward only. Repositories never import services.
3. **Server Components first** — use Client Components only for state, effects, event handlers, browser APIs.
4. **Thin routes** — pages compose components and call actions/services; no logic in pages.
5. **Reusable abstractions** — never introduce a second pattern when one exists.

## When to Add Each Layer

- **Repository:** every DB table.
- **Service:** any business rule, multi-step workflow, or operation touching multiple repos.
- **Action:** every user-initiated mutation and any client-component data fetch.

## Type Safety

- Never `any`.
- Export reusable types close to the feature.
- Zod for runtime validation; infer TS types from schemas.
