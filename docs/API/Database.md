# Database

PostgreSQL on Neon. Prisma ORM. Repositories are the only layer that talks to Prisma.

## Principles

Simple, normalized, scalable, easy to maintain. **No business logic in the database.**

## Access Flow

```
UI → Actions → Services → Repositories → Prisma → PostgreSQL
```

## Schema

### User

| Field     | Type     | Notes     |
| --------- | -------- | --------- |
| id        | String   | PK (CUID) |
| email     | String   | Unique    |
| name      | String?  | Optional  |
| image     | String?  | Optional  |
| createdAt | DateTime | —         |
| updatedAt | DateTime | —         |

## Commands

```bash
pnpm prisma migrate dev     # create + apply migration
pnpm prisma generate        # generate Prisma Client
pnpm prisma studio          # open Prisma Studio
```

Never modify production DBs manually. Always version-control migrations.

## Naming

- Models: singular PascalCase.
- Fields: camelCase.
- Relations: explicit names where needed.

## Future Models (added when needed)

Session, Account, VerificationToken, Role, Permission, Notification, AuditLog.

## Performance

Add indexes only when justified. Avoid unnecessary joins. Paginate large results. Select only required fields.

## Security

Never expose password hashes, secrets, or internal identifiers without need. Validate input before any DB op.
