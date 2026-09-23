# ADR-001: Use Layered Architecture

## Status

Accepted

## Date

2026-07-20

## Context

The project needs a clear separation of concerns to maintain code quality as it grows. Business logic must be isolated from the presentation layer.

## Decision

We will follow a 5-layer architecture with strict downward dependencies:

```
UI (Server & Client Components)
  ↓
Actions / Routes (@/actions/*, @/app/api/*)
  ↓
Domain Services (@/services/*)
  ↓
Repositories (@/repositories/*)
  ↓
Database (Prisma + Neon PostgreSQL)
```

## Consequences

### Positive

- Clear separation of concerns.
- Business logic is testable in isolation.
- Database access is centralized in repositories.
- UI remains a thin presentation layer.

### Negative

- More files and folders for simple features.
- Requires discipline to maintain the layers.
- Adds indirection for simple data fetching.

## Alternatives Considered

- **Direct Prisma in components**: Rejected. Violates separation of concerns.
- **Service-only architecture**: Rejected. Mixes data access with business logic.
- **Feature-based architecture**: Future consideration. Can coexist with layers.
