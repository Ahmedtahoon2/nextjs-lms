# ADR-002: Use Neon PostgreSQL with Prisma

## Status

Accepted

## Date

2026-07-20

## Context

The project needs a reliable, scalable database that works well with TypeScript and serverless deployment.

## Decision

We will use Neon PostgreSQL as the database provider with Prisma as the ORM (`@prisma/adapter-neon` via `@neondatabase/serverless`).

## Consequences

### Positive

- Serverless PostgreSQL scales automatically.
- Prisma provides type-safe database access.
- Neon adapter works with connection pooling.
- WebSocket support for serverless environments.

### Negative

- Neon-specific configuration required.
- Connection pooling adds complexity.
- WebSocket setup in `lib/db.ts` adds boilerplate.

## Alternatives Considered

- **Supabase**: Rejected. Prisma integration is less mature.
- **PlanetScale**: Rejected. MySQL, not PostgreSQL.
- **Railway**: Rejected. Not serverless-native.
