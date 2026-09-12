# Task 07: Instructor Course Management Workspace

## Objective

Provide instructors with a dedicated, secure management workspace to create courses, configure metadata, organize modules and lessons via an interactive curriculum builder with reordering controls, manage publishing lifecycles, and inspect student enrollment rosters—enforcing strict individual instructor resource ownership without invented tenancy or organization concepts.

---

## Scope

### In Scope
- Protected instructor routes under `/instructor/*` with Server Component role guards.
- **My Courses Dashboard** (`/instructor/courses`): list of authored courses with status badges (`DRAFT`, `PUBLISHED`, `ARCHIVED`), student counts, and quick actions.
- **Course Creation & Settings** (`/instructor/courses/new`, `/instructor/courses/[courseId]/settings`): title, slug, description, category, level, and cover image URL.
- **Curriculum Builder** (`/instructor/courses/[courseId]/curriculum`):
  - Module management (add, rename, delete, reorder).
  - Lesson management (add, rename, toggle free preview, delete, reorder).
  - Direct navigation into lesson content editor.
- **Course Publishing Controls**: Publish / Unpublish action with validation enforcing that courses have at least one module and one lesson.
- **Student Roster & Insights** (`/instructor/courses/[courseId]/students`): view of enrolled students, enrollment dates, and individual progress percentages.

### Out of Scope
- Tenant, Organization, or Workspace infrastructure (the platform operates on direct individual user resource ownership).
- Multi-instructor co-authoring or collaborative course permissions.
- Financial revenue charts or payment payouts.
- Video transcoding queues.

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: `ActionResult<T>` and auth/role helpers.
  - `Task 02`: User identity with instructor role check.
  - `Task 03`: Course and curriculum domain models and services.
  - `Task 04`: Lesson content authoring.
  - `Task 05`: Enrollment and progress services.
- **Packages**:
  - `lucide-react`, `react-hook-form`, `zod`, `@prisma/client`.

---

## Architecture Impact

```
/instructor/* (Server Components with Role Guard)
  ↓ verifies session has 'instructor' or 'admin' role
  ↓ queries courses strictly filtered by instructorId === session.userId
  ↓
Curriculum Builder (Client Component leaf for reordering & interactive state)
  ↓ calls
reorderCurriculumAction, publishCourseAction, updateCourseAction
  ↓
Services (CourseService, CurriculumService)
  ↓ Asserts course.instructorId === session.userId on every write
Concrete Repositories → Database
```

---

## Data Model Impact

No new database models. Consumes `Course`, `Module`, `Lesson`, `CourseEnrollment`, and `User`.

---

## Authorization Rules

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication & Role Check                         │
│    requireRole("instructor") enforces that user has    │
│    instructor or admin privileges.                     │
│    Students attempting access receive 403 Forbidden.   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Resource Ownership Enforcement                      │
│    All instructor queries and mutations are scoped to: │
│    where: { instructorId: session.userId }             │
│    Instructor A CANNOT view, edit, or delete           │
│    Instructor B's courses or curriculum!               │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Student Roster Privacy                              │
│    Student rosters can ONLY be viewed by the course's  │
│    authoring instructor or an admin.                   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Course State Integrity                              │
│    Course cannot be set to PUBLISHED unless it has:    │
│    • At least 1 module                                 │
│    • At least 1 lesson                                 │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Course & Curriculum Actions** validated via schemas from Task 03 (`createCourseSchema`, `createModuleSchema`, `createLessonSchema`, `reorderCurriculumSchema`).
- **Publishing Action**:
  ```typescript
  export const publishCourseSchema = z.object({
    courseId: z.string().cuid(),
    publish: z.boolean(),
  });
  export type PublishCourseInput = z.infer<typeof publishCourseSchema>;
  ```

---

## Error Handling

- **Forbidden Access**: Non-instructors attempting to access `/instructor` receive a 403 Forbidden page.
- **Cross-Instructor Modification**: Throws `ForbiddenError("You are not authorized to modify this course")`.
- **Premature Publishing**: Returns `ValidationError("A course must have at least one module and one lesson before publishing")`.

---

## UI / UX Requirements

- **Design Rules Compliance**:
  - Touch targets minimum 40x40px on all buttons and inputs.
  - Active press feedback (`active:scale-[0.98]`).
  - No em-dashes or en-dashes in UI copy.
  - Clear visual badges for course status:
    - Draft: Muted yellow badge
    - Published: Emerald green badge
    - Archived: Muted slate badge
- **Curriculum Builder UX**:
  - Accessible reordering: Up/Down arrow buttons for keyboard and screen-reader accessibility, alongside drag handles.
  - Inline editing for module and lesson titles with Enter to save, Escape to cancel.
  - Instant toggle switch for "Free Preview" status.

---

## Testing Strategy

- **Guard Integration Tests** (`src/app/(dashboard)/instructor/__tests__/guard.test.ts`):
  - Test student user accessing `/instructor/courses` receives 403 Forbidden.
  - Test instructor user accessing `/instructor/courses` receives 200 OK.
- **Ownership Isolation Tests** (`src/services/__tests__/instructor-ownership.test.ts`):
  - Test Instructor A cannot fetch or mutate courses belonging to Instructor B.
  - Test student roster queries reject unauthorized instructors.
- **Component Tests** (`src/components/instructor/__tests__/curriculum-builder.test.ts`):
  - Test adding a module immediately updates UI outline.
  - Test reordering items triggers reorder action with correct ID array.
  - Test publishing button displays validation warning if curriculum is empty.

---

## Documentation Updates

- Update `docs/Features/Instructor-Workspace.md` with route layout and curriculum builder specifications.
- Document instructor role requirements in `docs/Authentication.md`.

---

## Acceptance Criteria

- [x] `/instructor/*` routes are protected by instructor role check.
- [x] Instructors can view only their own authored courses.
- [x] Instructors can create, edit, and archive courses.
- [x] Curriculum builder supports adding, editing, and reordering modules and lessons.
- [x] Publishing validation blocks publishing empty courses.
- [x] Instructors can inspect the student enrollment roster and progress percentages.
- [x] Cross-instructor modification attempts are rejected with 403 Forbidden.
- [x] TypeScript check and lint pass with zero errors.

---

## Definition of Done

- [x] Layered architecture adhered to: `UI → Actions → Services → Concrete Repositories → DB`.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: All mutations validated with Zod schemas.
- [x] Authorized: Complete instructor resource ownership; roster privacy enforced.
- [x] Tested: Route guard, ownership isolation, and curriculum builder tests pass.
- [x] Accessible: Reordering accessible via keyboard up/down controls.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
- [x] Documented: Updated feature and authentication documentation.