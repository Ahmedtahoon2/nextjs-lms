# Task 05: Enrollment & Learning Progress Tracking

## Objective

Implement the student course enrollment lifecycle and individual, user-isolated lesson progress tracking—strictly enforcing that progress is student-specific and cannot leak across users—while calculating aggregate course completion percentages and computing sequential lesson progression.

---

## Scope

### In Scope
- Prisma models:
  - `CourseEnrollment`: tracks user-course enrollment state (`ACTIVE`, `COMPLETED`, `ARCHIVED`) and aggregate completion percentage.
  - `LessonProgress`: individual per-user lesson completion state.
- Concrete domain repositories: `EnrollmentRepository` and `LessonProgressRepository`.
- `EnrollmentService`: handles student enrollment, verifies course publishing state, and checks access rights.
- `ProgressService`: toggles lesson completion, recalculates course completion percentage in an atomic transaction, marks course completion upon reaching 100%, and determines the next sequential lesson.
- Server Actions for enrollment and lesson completion toggling.
- UI components for enrollment CTA, lesson completion checkbox/button, and animated course progress bar.

### Out of Scope
- Payment processing or subscription checkout for paid enrollments (postponed to Future Considerations).
- Automated certificate generation upon completion (postponed to Future Considerations).
- Bulk CSV enrollment imports for institutional accounts.

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: `ActionResult<T>`, `requireAuth()`, error hierarchy.
  - `Task 02`: User identity and student persona.
  - `Task 03`: `Course`, `Module`, and `Lesson` hierarchy with ordering.
- **Packages**:
  - `@prisma/client`, `zod`, `lucide-react`.

---

## Architecture Impact

```
Lesson Player UI (Client Component leaf)
  ↓ calls
toggleLessonCompletionAction (src/actions/progress.ts)
  ↓ requireAuth(), Zod parse
ProgressService (src/services/progress.ts)
  ↓ Enforces session.userId ownership on progress records
  ↓ Recalculates total lessons vs completed in course
  ↓ Updates CourseEnrollment.progressPercentage inside a Prisma transaction
Concrete Repositories (LessonProgressRepository & EnrollmentRepository)
  ↓ atomic database writes
PostgreSQL Database
```

---

## Data Model Impact

```prisma
enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  ARCHIVED
}

model CourseEnrollment {
  id                 String           @id @default(cuid())
  userId             String
  courseId           String
  status             EnrollmentStatus @default(ACTIVE)
  progressPercentage Int              @default(0) // 0 to 100
  enrolledAt         DateTime         @default(now())
  completedAt        DateTime?
  lastAccessedAt     DateTime         @default(now())
  user               User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  course             Course           @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
  @@index([userId])
  @@index([courseId])
  @@map("course_enrollment")
}

model LessonProgress {
  id             String    @id @default(cuid())
  userId         String
  lessonId       String
  isCompleted    Boolean   @default(false)
  completedAt    DateTime?
  lastAccessedAt DateTime  @default(now())
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson         Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
  @@map("lesson_progress")
}
```

### Model Specifications & Invariant Rules
- **CRITICAL INVARIANT: Learning Progress Is User-Specific**:
  - Legacy anti-pattern (`Section.complete: Boolean`) is strictly prohibited.
  - Progress exists **only** in `LessonProgress` scoped to `(userId, lessonId)`.
- **CourseEnrollment**:
  - *Why*: Establishes student access to course lessons and tracks overall completion metrics.
  - *Requirement*: Student enrollment and course progress aggregation.
  - *Ownership*: Joint relation between `User` and `Course`.
  - *Read*: Student self, course authoring instructor, and admin.
  - *Mutate*: Student self (enroll) or System (progress aggregation).
- **LessonProgress**:
  - *Why*: Stores individual lesson completion state and last accessed timestamp.
  - *Ownership*: Owned exclusively by the individual student (`userId`).
  - *Read/Mutate*: Student self only (`session.userId === progress.userId`).

---

## Authorization Rules

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication Check                                │
│    requireAuth() ensures valid session.                │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Course Publishing Check                             │
│    Students can ONLY enroll in PUBLISHED courses.      │
│    Attempting to enroll in DRAFT course returns 400.   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Progress Ownership Isolation                        │
│    Student A CANNOT view or mutate Student B's         │
│    progress! All progress queries and writes are       │
│    strictly forced to session.userId.                  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Lesson Content Access Check                         │
│    A student must have an ACTIVE enrollment in the     │
│    parent course to access restricted lesson content.  │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Enrollment & Progress Schemas** (`src/lib/validations/progress.ts`):
  ```typescript
  export const enrollCourseSchema = z.object({
    courseId: z.string().cuid(),
  });

  export const toggleLessonProgressSchema = z.object({
    lessonId: z.string().cuid(),
    completed: z.boolean(),
  });
  ```

---

## Error Handling

- **Unpublished Course Enrollment**: Throws `ValidationError("Cannot enroll in an unpublished course")`.
- **Duplicate Enrollment**: Idempotent; if already enrolled, returns existing enrollment record gracefully without error.
- **Lesson Not Found**: Throws `NotFoundError("Lesson does not exist")`.
- **Unenrolled Access**: Throws `ForbiddenError("You must enroll in this course to access this lesson")`.

---

## UI / UX Requirements

- **Enrollment Button**: Clear call to action with loading state and immediate transition to "Enrolled".
- **Lesson Completion Button**:
  - "Mark as Complete" (with active press feedback `active:scale-[0.98]`).
  - When completed: Checkmark icon with green accent styling and "Completed" state.
- **Course Progress Bar**:
  - Visual progress bar displaying current percentage (`XX% Complete`).
  - Celebration visual when reaching 100% completion.

---

## Testing Strategy

- **Service Unit Tests** (`src/services/__tests__/enrollment.test.ts`, `progress.test.ts`):
  - Test student enrollment in published course succeeds.
  - Test student enrollment in draft course fails.
  - Test duplicate enrollment is idempotent.
  - Test marking lesson complete updates only the authenticated student's progress.
  - Test progress percentage calculation:
    - 0 of 4 lessons complete = 0%
    - 2 of 4 lessons complete = 50%
    - 4 of 4 lessons complete = 100% and sets `completedAt`.
  - Test unmarking lesson complete correctly decrements percentage and clears `completedAt`.
  - Test `getNextLesson()` correctly identifies the next uncompleted lesson in sequence.

---

## Documentation Updates

- Update `docs/reference/Entities.md` with `CourseEnrollment` and `LessonProgress` models.
- Document progress calculation formulas in `docs/Architecture.md`.

---

## Acceptance Criteria

- [ ] Database migration applies `CourseEnrollment` and `LessonProgress` tables with unique compound indexes.
- [ ] Students can enroll in published courses; enrollment in draft courses is blocked.
- [ ] Marking lessons complete tracks per-user progress without any global data leakage.
- [ ] Course completion percentage recalculates accurately on every progress change.
- [ ] Reaching 100% completion records `completedAt` timestamp on the enrollment record.
- [ ] Next lesson progression algorithm navigates sequentially through modules.
- [ ] Unit test suite covers enrollment and progress calculations with 100% pass rate.
- [ ] TypeScript check and lint pass with zero errors.

---

## Definition of Done

- [ ] Layered architecture adhered to: `UI → Actions → Services → Concrete Repositories → DB`.
- [ ] Type-safe: Strict TypeScript, zero `any`.
- [ ] Validated: Zod schemas validate courseId and lessonId inputs.
- [ ] Authorized: Complete user progress isolation; unpublished course protection.
- [ ] Tested: Unit tests verify calculation math, race conditions, and user isolation.
- [ ] Invariant verified: Absolutely no global completion boolean on lesson entity.
- [ ] Clean quality gate: Passes lint, typecheck, and test checks.
