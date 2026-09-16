# ADR-004: Use Dedicated Curriculum, Enrollment, and Isolated Progress Models

## Status
Accepted

## Date
2026-09-12

## Context
A production-grade Learning Management System (LMS) must handle multi-tenant educational workflows across multiple user roles: instructors authoring curriculum, administrators supervising platforms, and students progressing through structured lessons. The data architecture must support:
- Hierarchical course outlines (modules and lessons) with deterministic ordering.
- Heavy instructional content (markdown, compiled HTML, video embeds, downloadable resources).
- Many-to-many enrollment tracking with aggregate completion metrics.
- Fine-grained per-student lesson progress tracking without cross-user leakage.
- Concurrency control preventing unique constraint collisions during reordering and publishing.

## Problem
Naive LMS architectures suffer from several architectural flaws:
1. **Global Progress Flags**: Storing `isCompleted` directly on the `Lesson` entity prevents multi-student progress tracking and leaks completion state across users.
2. **Bloated Syllabus Queries**: Inlining rich markdown bodies, sanitized HTML, and resource attachments directly in the `Lesson` table degrades catalog and curriculum navigation query performance.
3. **Ordering Drift & Collisions**: Relying on unconstrained `orderIndex` fields causes duplicate positions, gaps, and race conditions during concurrent curriculum editing.
4. **IDOR Vulnerabilities**: Lacking strict parent-child verification permits students to modify other students' progress or access unpublished lesson content.

## Decision
We adopt a dedicated 4-tier domain model implemented via Prisma ORM on Neon PostgreSQL:

```
Course (Metadata, Lifecycle Status, Level, Instructor Relation)
  └── Module (Section Header, Sequential orderIndex) [@@unique([courseId, orderIndex])]
        └── Lesson (Lightweight Navigation, Slug, Preview Flag) [@@unique([moduleId, orderIndex])]
              └── LessonContent (1-to-1 Isolated Heavy Payload: Markdown, HTML, Video, Resources)

User
  ├── CourseEnrollment (Many-to-Many Join: Status, Aggregate Progress %, Timestamps)
  └── LessonProgress (Granular Join: [userId, lessonId], isCompleted, completedAt)
```

Key Architectural Invariants:
1. **Isolated Heavy Payloads**: `LessonContent` is stored in a dedicated 1-to-1 table with cascade deletion, keeping the primary `Lesson` entity lightweight for fast curriculum tree fetching.
2. **Composite Uniqueness for Curriculum Order**: `[courseId, orderIndex]` and `[moduleId, orderIndex]` enforce sequential integrity at the database engine level.
3. **Two-Phase Reordering & Row Locking**: Curriculum reordering employs two-phase updates with negative offsets under an exclusive parent row lock (`SELECT ... FOR UPDATE`), preventing transient unique key violations (`P2002`).
4. **Strict Progress Isolation**: Student progress exists solely in the `LessonProgress` join table scoped strictly to `(userId, lessonId)` with composite uniqueness `@@unique([userId, lessonId])`. It is NEVER stored on the curriculum entity.
5. **Multi-Tier Authorization (IDOR Defense)**: Every mutation asserts caller ownership (`instructorId === session.userId` or `admin`). Player endpoints strictly verify cross-course boundaries (`hierarchy.module.course.id === course.id`).

## Alternatives Considered
- **Single Monolithic Lesson Table**: Combining metadata and body content into a single table.
  *Rejected*: Degrades query performance for syllabus views and player sidebar navigation where lesson body is unnecessary.
- **Embedded Document Store (JSONB for Modules/Lessons)**: Storing the entire curriculum outline as a JSONB array on the `Course` model.
  *Rejected*: Eliminates relational foreign keys, complicates incremental progress tracking, prevents atomic transactions on individual lessons, and hinders SQL indexing.
- **Client-Driven Reorder Swaps**: Swapping adjacent indices on client requests.
  *Rejected*: Susceptible to race conditions, out-of-order networks, and gaps when multiple items are reordered.

## Reason
This model provides the optimal balance of relational integrity, high-throughput query performance, and ironclad multi-tenant security:
- Syllabus and sidebar queries fetch only lightweight metadata (`id`, `title`, `orderIndex`, `isFreePreview`).
- Student progress is completely partitioned, preventing data leaks.
- Database constraints guarantee collision-free ordering.

## Consequences
### Positive
- Zero risk of cross-student progress leakage.
- High-performance course catalog and player navigation.
- Deterministic, collision-safe curriculum reordering.
- Clear separation between public preview material and restricted content.

### Negative / Trade-offs
- Creating and reordering curriculum items requires database transactions and parent course row locks.
- Reading full lesson content requires a relational join or secondary lookup.

## Evidence / References
- [Architecture.md](file:///d:/dev%20folder/nextjs/nextjs/docs/Architecture.md)
- [Entities.md](file:///d:/dev%20folder/nextjs/nextjs/docs/reference/Entities.md)
- `prisma/schema.prisma`
- Automated test suites: `src/__tests__/security/idor.test.ts`, `src/services/__tests__/concurrency.test.ts`
