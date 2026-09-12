# Instructor Course Management Workspace

The Instructor Course Management Workspace provides authorized educators with a dedicated dashboard to author courses, design and organize modular curricula with accessible drag/keyboard controls, manage publication lifecycles, and monitor student enrollment rosters with real-time completion percentages.

---

## 1. Role & Access Control

- **Required Roles**: Access to `/instructor/*` routes is strictly restricted to users holding the `instructor` or `admin` role.
- **Route Guard**: [src/app/(dashboard)/instructor/layout.tsx](file:///d:/dev%20folder/nextjs/nextjs/src/app/(dashboard)/instructor/layout.tsx) enforces authentication and role membership:
  - Unauthenticated requests are redirected to `/sign-in`.
  - Non-instructor users (e.g. students) trigger Next.js `forbidden()`, returning an authentic HTTP 403 response rendered via [src/app/forbidden.tsx](file:///d:/dev%20folder/nextjs/nextjs/src/app/forbidden.tsx).
- **Ownership Isolation**: Every course query and mutation strictly asserts that `course.instructorId === session.userId` or that the caller is an administrator. Instructors cannot view, modify, or inspect the rosters of courses authored by other instructors.

---

## 2. Route Map

| Route | Type | Description |
| :--- | :--- | :--- |
| `/instructor/courses` | Server Component | Dashboard listing authored courses with status badges, module counts, lesson counts, and student counts. |
| `/instructor/courses/new` | Server Component | Form to author a new course with initial `DRAFT` status and collision-safe slug generation. |
| `/instructor/courses/[courseId]/settings` | Server Component | Edit course metadata (title, description, level, category, cover image) and manage lifecycle state (archive / delete). |
| `/instructor/courses/[courseId]/curriculum` | Server Component | Interactive curriculum builder for managing modules, lessons, and reordering. |
| `/instructor/courses/[courseId]/lessons/[lessonId]` | Server Component | Direct navigation into lesson content editor for Markdown, video embedding, and companion resources. |
| `/instructor/courses/[courseId]/students` | Server Component | Student roster table displaying enrolled students, enrollment dates, completion dates, and progress percentages. |

---

## 3. Interactive Curriculum Builder

The curriculum builder ([src/components/instructor/curriculum-builder.tsx](file:///d:/dev%20folder/nextjs/nextjs/src/components/instructor/curriculum-builder.tsx)) is an interactive client component providing:

- **Inline Title Editing**: Double-click or click the edit icon to rename modules and lessons with keyboard shortcuts (Enter to save, Escape to cancel).
- **Accessible Reordering**: Keyboard and screen-reader accessible Up/Down arrow buttons with minimum 40x40px touch targets alongside responsive visual feedback (`active:scale-[0.98]`).
- **Atomic Two-Phase Reordering**: Reordering dispatches to PostgreSQL transactions holding `SELECT ... FOR UPDATE` locks on the parent course row, preventing concurrency anomalies.
- **Free Preview Toggles**: One-click toggling of `isFreePreview` for introductory lessons.
- **Publication Lifecycle Lock**: Structural modifications (adding, deleting, or reordering modules and lessons) are restricted to `DRAFT` courses. Published courses display an informative lock banner advising instructors to unpublish before modifying structure.

---

## 4. Publishing Lifecycles & Validation

A course cannot transition to `PUBLISHED` unless:
1. The caller is the course instructor or an administrator.
2. The course contains **at least one module**.
3. The course contains **at least one lesson**.

Both client-side validation ([PublishButton](file:///d:/dev%20folder/nextjs/nextjs/src/components/instructor/publish-button.tsx)) and server-side atomic transition validation ([CourseService.publishCourse](file:///d:/dev%20folder/nextjs/nextjs/src/services/course.ts)) verify these invariants under row-level database locks.

---

## 5. Performance & Zero N+1 Queries

- **Dashboard**: `findCoursesByInstructorId` utilizes Prisma's `_count` aggregation (`modules: true, enrollments: true`) and a bounded batch query for lesson counts, ensuring that loading $N$ courses requires exactly 2 SQL queries.
- **Student Roster**: `findEnrollmentsByCourseId` executes a single query with `include: { user: { select: ... } }`, retrieving the entire student roster with user profiles in a single round-trip.
