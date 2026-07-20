# Full Stack Build Flow

Workflow for building full-stack features with React 19, Server Actions, and Prisma.

---

# Steps

## 1. Define the Feature

- What does the user need?
- What data is required?
- What interactions are needed?

## 2. Design the Data Model

- Add Prisma schema changes.
- Run `pnpm prisma migrate dev`.
- Update `lib/db.ts` if needed.

## 3. Create the Repository

- File: `lib/repositories/[feature].ts`.
- CRUD operations only.
- No business logic.
- Use Prisma Client.

## 4. Create the Service

- File: `lib/services/[feature].ts`.
- Business rules and workflows.
- Coordinate between repositories.
- Validate with Zod.

## 5. Create the Server Action

- File: `app/[route]/actions.ts`.
- Input validation with Zod.
- Authentication check.
- Call service layer.
- Return typed response.

## 6. Create the UI

- Server Component by default.
- Client Component only when required.
- Use shadcn/ui primitives.
- Apply design rules.

## 7. Wire It Together

```
UI Component
↓
Server Action
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL (Neon)
```

## 8. Test

- Unit tests for service logic.
- Integration tests for actions.
- Component tests for UI.

## 9. Document

- Update API documentation.
- Update component inventory.
- Document design decisions.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
