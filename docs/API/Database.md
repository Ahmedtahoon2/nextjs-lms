# Database

PostgreSQL on Neon. Prisma ORM. Repositories are the only layer that talks to Prisma.

## Principles

Simple, normalized, scalable, easy to maintain. **No business logic in the database.**

## Access Flow

```
UI → Actions → Services → Repositories → Prisma → PostgreSQL
```

## Schema

### Authentication Models (Better Auth)

#### User

| Field         | Type     | Notes         |
| ------------- | -------- | ------------- |
| id            | String   | PK (CUID)     |
| email         | String   | Unique        |
| name          | String?  | Optional      |
| emailVerified | Boolean  | Default false |
| image         | String?  | Optional      |
| createdAt     | DateTime | Auto          |
| updatedAt     | DateTime | Auto          |

Relations: `sessions[]`, `accounts[]`, `userRoles[]`

#### Session

| Field     | Type     | Notes     |
| --------- | -------- | --------- |
| id        | String   | PK        |
| token     | String   | Unique    |
| userId    | String   | FK → User |
| expiresAt | DateTime | —         |
| ipAddress | String?  | Optional  |
| userAgent | String?  | Optional  |
| createdAt | DateTime | Auto      |
| updatedAt | DateTime | Auto      |

Relations: `user`

#### Account

| Field                 | Type      | Notes     |
| --------------------- | --------- | --------- |
| id                    | String    | PK        |
| accountId             | String    | —         |
| providerId            | String    | —         |
| userId                | String    | FK → User |
| accessToken           | String?   | Optional  |
| refreshToken          | String?   | Optional  |
| idToken               | String?   | Optional  |
| accessTokenExpiresAt  | DateTime? | Optional  |
| refreshTokenExpiresAt | DateTime? | Optional  |
| scope                 | String?   | Optional  |
| password              | String?   | Hashed    |
| createdAt             | DateTime  | Auto      |
| updatedAt             | DateTime  | Auto      |

Relations: `user`

#### Verification

| Field      | Type     | Notes |
| ---------- | -------- | ----- |
| id         | String   | PK    |
| identifier | String   | —     |
| value      | String   | —     |
| expiresAt  | DateTime | —     |
| createdAt  | DateTime | Auto  |
| updatedAt  | DateTime | Auto  |

### Authorization Models (RBAC)

#### Role

| Field       | Type     | Notes     |
| ----------- | -------- | --------- |
| id          | String   | PK (CUID) |
| name        | String   | Unique    |
| description | String?  | Optional  |
| createdAt   | DateTime | Auto      |
| updatedAt   | DateTime | Auto      |

Relations: `userRoles[]`, `rolePermissions[]`

#### Permission

| Field       | Type     | Notes         |
| ----------- | -------- | ------------- |
| id          | String   | PK (CUID)     |
| name        | String   | Unique        |
| resource    | String   | Resource type |
| action      | String   | Action type   |
| description | String?  | Optional      |
| createdAt   | DateTime | Auto          |
| updatedAt   | DateTime | Auto          |

Relations: `rolePermissions[]`

Unique constraint: `[resource, action]`

#### UserRole

| Field     | Type     | Notes     |
| --------- | -------- | --------- |
| id        | String   | PK (CUID) |
| userId    | String   | FK → User |
| roleId    | String   | FK → Role |
| createdAt | DateTime | Auto      |

Relations: `user`, `role`

Unique constraint: `[userId, roleId]`

#### RolePermission

| Field        | Type     | Notes           |
| ------------ | -------- | --------------- |
| id           | String   | PK (CUID)       |
| roleId       | String   | FK → Role       |
| permissionId | String   | FK → Permission |
| createdAt    | DateTime | Auto            |

Relations: `role`, `permission`

Unique constraint: `[roleId, permissionId]`

## Commands

```bash
pnpm prisma migrate dev     # create + apply migration
pnpm prisma generate        # generate Prisma Client
pnpm prisma studio          # open Prisma Studio
pnpm prisma db push         # push schema changes (dev only)
```

Never modify production DBs manually. Always version-control migrations.

## Naming

- Models: singular PascalCase.
- Fields: camelCase.
- Relations: explicit names where needed.

## Authorization Flow

```
User → UserRole → Role → RolePermission → Permission
```

Example permissions:

- `users:read` - Read user data
- `users:write` - Create/update users
- `users:delete` - Delete users
- `sessions:revoke:any` - Revoke any user's session (admin)

## Performance

Add indexes only when justified. Avoid unnecessary joins. Paginate large results. Select only required fields.

Existing indexes:

- `Session.userId`
- `Account.userId`
- `Verification.identifier`
- `UserRole.userId`, `UserRole.roleId`
- `RolePermission.roleId`, `RolePermission.permissionId`

## Security

- Never expose password hashes, secrets, or internal identifiers without authorization
- Validate input before any DB operation
- All authorization checks happen server-side in services
- Session ownership must be verified before revocation
- Never trust client-provided user IDs, roles, or permissions
