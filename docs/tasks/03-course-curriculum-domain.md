# Task 03: Course & Curriculum Domain

## Objective

Implement the foundational domain models, concrete repositories, business logic services, and Server Actions for the core LMS hierarchy: **Course → Module → Lesson**, enforcing strict instructor resource ownership, deterministic sequential ordering (`orderIndex`), and course publication lifecycle prerequisites.

---

## Scope

### In Scope
- Prisma models: `Course`, `Module`, and `Lesson` with explicit integer `orderIndex` and lifecycle states (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- Concrete domain repositories: `CourseRepository`, `ModuleRepository`, and `LessonRepository` (no generic base classes).
- `CourseService`: course creation with auto-slug generation, metadata updates, deletion, and publication validation (enforcing >= 1 module and >= 1 lesson).
- `CurriculumService`: module/lesson creation, title updates, atomic reordering via Prisma transactions, and parent course ownership verification.
- Server Actions for course and curriculum mutations with Zod input parsing and standardized `ActionResult<T>` returns.

### Out of Scope
- Lesson content body storage and rich text editing (dedicated to Task 04).
- Student enrollment and progress tracking (dedicated to Task 05).
- Course catalog browsing UI (dedicated to Task 06).
- Instructor management UI views (dedicated to Task 07).

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: `ActionResult<T>`, `requireAuth()`, `requireRole()`, error hierarchy.
  - `Task 02`: User identity with instructor role and author relations.
- **Existing Packages**:
  - `@prisma/client`, `zod`.

---

## Architecture Impact

Strictly follows layered architecture:
```
Actions (src/actions/course.ts, src/actions/curriculum.ts)
  ↓ requireAuth(), Zod parse
Services (src/services/course.ts, src/services/curriculum.ts)
  ↓ Enforces Authentication, Instructor Role, Resource Ownership & State Validation
Concrete Repositories (src/repositories/course.ts, module.ts, lesson.ts)
  ↓ Concrete Prisma queries
Database (PostgreSQL)
```

---

## Data Model Impact

```prisma
enum CourseStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  ALL_LEVELS
}

model Course {
  id           String             @id @default(cuid())
  title        String
  slug         String             @unique
  description  String?
  thumbnailUrl String?
  status       CourseStatus       @default(DRAFT)
  level        CourseLevel        @default(ALL_LEVELS)
  category     String?
  instructorId String
  instructor   User               @relation("AuthoredCourses", fields: [instructorId], references: [id], onDelete: Cascade)
  modules      Module[]
  enrollments  CourseEnrollment[]
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt

  @@index([instructorId])
  @@index([status])
  @@index([slug])
  @@map("course")
}

model Module {
  id          String   @id @default(cuid())
  title       String
  description String?
  orderIndex  Int      @default(0)
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons     Lesson[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([courseId])
  @@index([courseId, orderIndex])
  @@map("module")
}

model Lesson {
  id              String           @id @default(cuid())
  title           String
  slug            String
  orderIndex      Int              @default(0)
  durationMinutes Int?
  isFreePreview   Boolean          @default(false)
  moduleId        String
  module          Module           @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  content         LessonContent?
  progressRecords LessonProgress[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@unique([moduleId, slug])
  @@index([moduleId])
  @@index([moduleId, orderIndex])
  @@map("lesson")
}
```

### Model Specifications
- **Course**:
  - *Why*: Represents the top-level educational curriculum offering.
  - *Requirement*: Educational course management and cataloging.
  - *Ownership*: Owned by the authoring instructor (`instructorId`).
  - *Read*: Public if `status === PUBLISHED`; authoring instructor and admin if `DRAFT`/`ARCHIVED`.
  - *Mutate*: Authoring instructor only (`session.userId === course.instructorId`) or admin.
- **Module**:
  - *Why*: Structural grouping of lessons with sequential order (`orderIndex`).
  - *Ownership*: Inferred from parent `Course.instructorId`.
  - *Mutate*: Parent course instructor only.
- **Lesson**:
  - *Why*: Atomic lesson unit within a module.
  - *Ownership*: Inferred from parent `Module → Course.instructorId`.
  - *Mutate*: Parent course instructor only.

---

## Authorization Rules

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication Check                                │
│    requireAuth() verifies active session.              │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Role Check                                          │
│    Caller must hold 'instructor' or 'admin' role to    │
│    create or manage courses and curriculum.            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Resource Ownership Check                            │
│    - CourseService asserts:                            │
│      course.instructorId === session.userId            │
│    - CurriculumService queries parent Course and       │
│      asserts caller is the authoring instructor.       │
│    - Instructor A CANNOT edit Instructor B's course.   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Resource State Validation                           │
│    - Course publishing requires >= 1 module and        │
│      >= 1 lesson in the curriculum.                    │
│    - Unenrolled students cannot access non-preview     │
│      lessons or unpublished courses.                   │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Course & Curriculum Schemas** (`src/lib/validations/course.ts`):
  ```typescript
  export const createCourseSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(100),
    description: z.string().trim().max(1000).optional(),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL_LEVELS"]).default("ALL_LEVELS"),
    category: z.string().trim().max(50).optional(),
    thumbnailUrl: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  });

  export const createModuleSchema = z.object({
    courseId: z.string().cuid(),
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().max(500).optional(),
  });

  export const createLessonSchema = z.object({
    moduleId: z.string().cuid(),
    title: z.string().trim().min(2).max(100),
    durationMinutes: z.number().int().nonnegative().max(600).optional(),
    isFreePreview: z.boolean().default(false),
  });

  export const reorderCurriculumSchema = z.object({
    courseId: z.string().cuid(),
    orderedIds: z.array(z.string().cuid()).min(1),
  });
  ```

---

## Error Handling

- **Ownership Mismatch**: Throws `ForbiddenError("You are not authorized to modify this course")`.
- **Publishing Without Content**: Throws `ValidationError("Cannot publish a course without at least one module and one lesson")`.
- **Duplicate Slugs**: Handled deterministically by appending incremental suffixes (`slug-2`).
- **Missing Resource**: Throws `NotFoundError` with resource details.

---

## UI / UX Requirements

No user-facing views built in this task. Establishes data models, schemas, and Server Actions consumed by the Student Experience (Task 06) and Instructor Workspace (Task 07).

---

## Testing Strategy

- **Service Unit Tests** (`src/services/__tests__/course.test.ts`, `curriculum.test.ts`):
  - Test course creation automatically assigns `instructorId` from session.
  - Test Instructor A cannot update or delete Instructor B's course (throws `ForbiddenError`).
  - Test publishing fails if course has 0 modules or 0 lessons.
  - Test publishing succeeds when valid curriculum exists.
  - Test module reordering executes atomic `orderIndex` updates.
  - Test lesson reordering updates sequence numbers within a module.
- **Repository Integration Tests** (`src/repositories/__tests__/course.test.ts`):
  - Test `findManyPublished` filters out `DRAFT` and `ARCHIVED` courses.
  - Test cascade deletion removes modules and lessons when course is deleted.

---

## Documentation Updates

- Update `docs/reference/Entities.md` with `Course`, `Module`, and `Lesson` schemas.
- Document atomic curriculum reordering patterns in `docs/Architecture.md`.

---

## Acceptance Criteria

- [x] Prisma migration applies `Course`, `Module`, and `Lesson` models cleanly.
- [x] Slugs are generated server-side from title with duplicate collision resolution.
- [x] Concrete repositories (`CourseRepository`, `ModuleRepository`, `LessonRepository`) implemented without generic base class abstractions.
- [x] `CourseService` and `CurriculumService` enforce role, ownership, and state validation.
- [x] Module and lesson reordering updates `orderIndex` in an atomic Prisma transaction.
- [x] Unit and integration tests cover ownership boundaries, publishing checks, and reordering.
- [x] Zero TypeScript errors (`pnpm typecheck`) and clean lint (`pnpm lint`).

---

## Definition of Done

- [x] Layered architecture adhered to: `UI → Actions → Services → Concrete Repositories → DB`.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: Zod schemas validate all inputs at the Action boundary.
- [x] Authorized: 4-tier authorization (authentication, role, ownership, state) tested and enforced.
- [x] Tested: Unit tests verify ownership violation, valid curriculum building, and publishing constraints.
- [x] Documented: Entity reference updated in docs.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
