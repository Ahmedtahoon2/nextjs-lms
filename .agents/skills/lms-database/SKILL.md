---
name: lms-database
description: Prisma ORM repository patterns, Neon PostgreSQL adapter, parent row locking, atomic transactions, unique constraint collision retries (P2002), and two-phase curriculum reordering. Load when modifying database schemas, writing migrations, creating or updating repositories, or working with database transactions.
---

# LMS Database & Prisma Repository Patterns

This skill defines data access patterns, concurrency controls, transaction boundaries, and Neon PostgreSQL adapters in this LMS project.

---

## 1. Database Stack & Client Instance

- **ORM:** Prisma 7.10.
- **Engine / Adapter:** Neon serverless WebSocket pooler (`@prisma/adapter-neon` + `@neondatabase/serverless`).
- **Client Entrypoint:** `@/lib/db`:
  ```typescript
  import { prisma } from "@/lib/db";
  ```
- **Rule:** Never instantiate `new PrismaClient()`. Always import the singleton `prisma` instance.
- **Rule:** Never import `prisma` in the UI or Actions layers. All queries must run through `@/repositories/*`.

---

## 2. Repository Pattern & Transaction Participation

Repositories provide clean data access functions and optionally accept a Prisma transaction client (`tx`):

```typescript
import { prisma } from "@/lib/db";
import type { Prisma, Course } from "@prisma/client";

export async function findCourseById(
  courseId: string,
  tx?: Prisma.TransactionClient,
): Promise<Course | null> {
  const db = tx ?? prisma;
  return db.course.findUnique({
    where: { id: courseId },
  });
}
```

---

## 3. Concurrency Patterns & Row Locking

### Parent Course Row Lock (`SELECT ... FOR UPDATE`)
All curriculum modifications (modules, lessons) and course lifecycle transitions serialize through the parent course row lock to prevent race conditions during concurrent publishes or curriculum edits:

```typescript
export async function lockCourseForUpdate(
  tx: Prisma.TransactionClient,
  courseId: string,
): Promise<Course | null> {
  const rows = await tx.$queryRaw<Course[]>`
    SELECT * FROM "course"
    WHERE id = ${courseId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}
```

**Usage Rule:** Always acquire the row lock before reading siblings or checking curriculum status within a transaction.

---

## 4. Two-Phase Atomic Reordering (Negative Offsets)

Because `[courseId, orderIndex]` and `[moduleId, orderIndex]` have unique compound constraints, sequential reordering must be executed in two phases to avoid transient key collisions:

1. **Verification:** Inside the transaction, query current siblings and verify that the provided `orderedIds` is an exact permutation.
2. **Phase 1 (Temporary Offsets):** Assign temporary negative numbers to each record:
   ```typescript
   for (let i = 0; i < orderedIds.length; i++) {
     await tx.module.update({
       where: { id: orderedIds[i] },
       data: { orderIndex: -1 - i },
     });
   }
   ```
3. **Phase 2 (Contiguous Indexing):** Assign final contiguous zero-based indexes:
   ```typescript
   for (let i = 0; i < orderedIds.length; i++) {
     await tx.module.update({
       where: { id: orderedIds[i] },
       data: { orderIndex: i },
     });
   }
   ```

---

## 5. Collision-Safe Retries (`P2002`)

For operations where collisions can occur due to concurrent inserts (e.g. generating unique slugs):
- Wrap the entire operation in a retry loop.
- Catch `PrismaClientKnownRequestError` with `code === "P2002"`.
- Each retry attempt must execute a fresh transaction to read the latest committed database state:

```typescript
const MAX_RETRIES = 5;
for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  try {
    return await prisma.$transaction(async (tx) => {
      // attempt create with slug variation
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      if (attempt === MAX_RETRIES) throw error;
      // modify slug suffix and retry
      continue;
    }
    throw error;
  }
}
```

---

## 6. Verification Commands

When database models, migrations, or repositories are changed:
- `pnpm db:validate` — Validates the Prisma schema.
- `pnpm db:generate` — Regenerates Prisma Client types.
- `pnpm db:format` — Formats schema according to standard conventions.
- `pnpm typecheck` — Confirms repository return types and client calls match.
