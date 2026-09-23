# Architecture

## Layers

```
UI → Actions/Routes → Services → Repositories → Database (Prisma + PostgreSQL)
```

## Responsibilities

| Layer            | Does                                                     | Must NOT                                 |
| ---------------- | -------------------------------------------------------- | ---------------------------------------- |
| **UI**           | Render, user interaction                                 | Business logic, direct DB access         |
| **Actions**      | Auth, input validation (Zod), call services              | Business logic, direct repo access       |
| **Services**     | Business rules, multi-repo workflows, complex validation | Know about HTTP, depend on UI frameworks |
| **Repositories** | Queries, CRUD, data mapping                              | Business logic, business rules           |
| **Database**     | Persistence                                              | —                                        |

## Domain Services & Repositories Registry

| Domain Area                | Service Layer (`@/services/*`)     | Concrete Repositories (`@/repositories/*`)                       | Primary Responsibilities                                     |
| -------------------------- | ---------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **Authentication & Users** | `auth.ts`, `session.ts`, `user.ts` | `user.ts`, `session.ts`                                          | Credentials, session management, user lifecycle              |
| **RBAC Authorization**     | `authorization.ts`                 | `role.ts`, `permission.ts`, `user-role.ts`, `role-permission.ts` | Role checks (`admin`, `instructor`, `student`), permissions  |
| **Profile Management**     | `profile.ts`                       | `user.ts`                                                        | Self-ownership profile updates and avatar metadata           |
| **Courses & Publishing**   | `course.ts`                        | `course.ts`                                                      | Course CRUD, slug generation, publishing state machines      |
| **Curriculum Structure**   | `curriculum.ts`                    | `module.ts`, `lesson.ts`                                         | Modules, lessons, atomic two-phase reordering                |
| **Lesson Content & Media** | `lesson-content.ts`                | `lesson-content.ts`                                              | Markdown compilation, HTML sanitization, video normalization |
| **Enrollment**             | `enrollment.ts`                    | `enrollment.ts`                                                  | Student course enrollment, batch status decoration           |
| **Progress & Completion**  | `progress.ts`                      | `lesson-progress.ts`, `enrollment.ts`                            | Atomic progress tracking, percent calculation, next lesson   |

---

## 4-Tier Authorization Doctrine

Every server operation enforces security in depth across four distinct layers:

```
[Tier 1: Authentication Guard]
  ↓ (Assert valid Better Auth session; anonymous users denied on protected routes)
[Tier 2: Role Authorization]
  ↓ (Assert required roles: "instructor" or "admin" for authoring operations)
[Tier 3: Resource Ownership]
  ↓ (Assert resource ownership: course.instructorId === session.userId or sessionUserId === targetUserId)
[Tier 4: Lifecycle State Guard]
  ↓ (Assert state invariants: DRAFT for curriculum edits; PUBLISHED for enrollment; ARCHIVED locked)
```

1. **Tier 1 (Authentication):** Enforced via `requireAuth()` in Server Actions and route handlers. Anonymous users cannot mutate data.
2. **Tier 2 (Role Authorization):** Enforced via `requireRole(...)` or `requireAnyRole(...)`. Students cannot access instructor workspaces or authoring endpoints.
3. **Tier 3 (Resource Ownership / IDOR Defense):** Services strictly verify that callers own the resource they are mutating. Instructors cannot modify courses, modules, lessons, or content belonging to other instructors. Students cannot mutate or query other students' progress.
4. **Tier 4 (Lifecycle State Constraints):** Courses must be in `DRAFT` status for curriculum mutations. Courses cannot be published without at least 1 module and 1 lesson. `ARCHIVED` courses are locked against modifications and denied to regular students.

---

## Principles

1. **Separation of concerns** — business logic only in services; data access only in repos.
2. **Dependency direction** — flows downward only. Repositories never import services.
3. **Server Components first** — use Client Components only for state, effects, event handlers, browser APIs.
4. **Thin routes** — pages compose components and call actions/services; no logic in pages.
5. **Reusable abstractions** — never introduce a second pattern when one exists.

## When to Add Each Layer

- **Repository:** every DB table.
- **Service:** any business rule, multi-step workflow, or operation touching multiple repos.
- **Action:** every user-initiated mutation and any client-component data fetch.

## Type Safety

- Never `any`.
- Export reusable types close to the feature.
- Zod for runtime validation; infer TS types from schemas.

---

## Concurrency & Transaction Patterns

### 1. Parent Course Row Locking (`SELECT ... FOR UPDATE`)

All curriculum mutations and course lifecycle transitions are serialized through an explicit parent course row lock (`lockCourseForUpdate(tx, courseId)`):

```
BEGIN TRANSACTION
  ↓
SELECT * FROM course WHERE id = :courseId FOR UPDATE
  ↓ (Status must remain DRAFT for curriculum mutations)
Execute mutation / Verify state
  ↓
COMMIT
```

This synchronization boundary guarantees that:

- Concurrent curriculum mutations cannot occur while a course is being published or archived.
- A course cannot be published concurrently with a module/lesson creation, reorder, or deletion.
- Cascading `deleteCourse` is safely serialized against concurrent curriculum mutations.

### 2. Atomic Curriculum Reordering

Reordering of modules and lessons guarantees exact sequential ordering `0..N-1` with no duplicates or gaps:

- **In-Transaction Verification:** The current sibling list is fetched inside the transaction after acquiring the lock. The provided ID array must be an exact permutation of existing siblings (no foreign, duplicate, or missing IDs).
- **Two-Phase Update:** When unique constraints on `[parentId, orderIndex]` exist, reordering assigns temporary negative offsets (`-1 - i`) in phase 1, followed by final contiguous zero-based indexes (`0..N-1`) in phase 2, preventing transient unique key violations.

### 3. Concurrency-Safe Retries (`P2002`)

- For operations susceptible to concurrent insert collisions (slug generation, sequential `orderIndex` assignment), retries wrap the entire `prisma.$transaction(...)` boundary.
- Each retry attempt begins a completely fresh transaction after full rollback of the preceding attempt, ensuring consistent reads of the latest committed state.

---

## Course Catalog & Learning Player Architecture

### 1. Catalog & Overview Routes

- **`/courses`**: Server Component reading validated query params (`search`, `category`, `level`, `sort`, `page`). Queries published courses via bounded pagination (`limit=12`) with batch enrollment decoration. Zero client-side fetching libraries or external search engines.
- **`/courses/[slug]`**: Server Component presenting course metadata, instructor credentials, and full curriculum outline (`CourseSyllabus`). Enforces public visibility for published courses, requiring instructor author or admin authorization for draft/archived previews.
- **`/courses/[slug]/learn`**: Deterministic server-side redirect entry. Routes enrolled students to their next incomplete lesson (or lesson 1 if 100% completed), or first free preview lesson for anonymous/unenrolled visitors.

### 2. Student Learning Player (`/courses/[slug]/lessons/[lessonId]`)

- **Security & Authorization Invariants:**
  - Mandatory cross-course boundary check: verifies `lesson.module.course.id === course.id`. Cross-course lesson requests strictly return `NotFoundError` (preventing ID enumeration).
  - Enrollment & Preview Gate: Unenrolled visitors can only access lessons where `isFreePreview === true`. Non-preview lesson requests by unenrolled users safely redirect to `/courses/[slug]?enrolled=false`.
  - Archived Course Protection: Enrolled students cannot access lessons of archived courses.
- **Player Component Layout:**
  - `PlayerHeader`: Breadcrumbs, back-to-overview link, mobile curriculum drawer toggle.
  - `PlayerSidebar`: Desktop sticky sidebar and mobile drawer with course progress bar, module accordions, completion checkmarks, locked indicators, and active lesson indicator.
  - `PlayerVideo`: Secure sandboxed 16:9 iframe embed supporting YouTube, Vimeo, Loom.
  - `PlayerContent`: Sanitized lesson markdown reader using typography tokens.
  - `PlayerResources`: Validated downloadable and reference links (http/https only).
  - `PlayerFooter`: Persistent previous/next lesson navigation and `LessonCompletionButton`.
