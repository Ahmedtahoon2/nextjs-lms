# LMS Domain Model & Business Invariants

Canonical reference for the Learning Management System domain models, entity relationships, lifecycle state machines, and business rules.

---

## 1. Domain Entities & Relational Schema

```text
User (Role: student | instructor | admin)
  │
  ├── AuthoredCourses (1..N)
  │     └── Course (Status: DRAFT | PUBLISHED | ARCHIVED, Level, Category, Slug)
  │           ├── Module (1..N, orderIndex: Int)
  │           │     └── Lesson (1..N, orderIndex: Int, isFreePreview: Boolean)
  │           │           └── LessonContent (1..1, markdown, HTML, videoUrl, resources)
  │           └── CourseEnrollment (1..N, Status: ACTIVE | COMPLETED | ARCHIVED)
  │
  └── LessonProgress (1..N per Lesson, isCompleted: Boolean)
```

---

## 2. Course Lifecycle State Machine

1. **`DRAFT` (Initial State):**
   - Authoring instructors build modules, lessons, and content.
   - Visible strictly to the course author and system admins.
   - Curriculum mutations (create, edit, delete, reorder) are permitted **only** in this state.
2. **`PUBLISHED` (Live State):**
   - Publicly readable and discoverable in the course catalog (`/courses`).
   - Open for student enrollments.
   - **Publishing Invariant:** Cannot transition `DRAFT → PUBLISHED` unless the course contains **at least 1 module** and **at least 1 lesson**.
   - Must be executed under a course row lock (`lockCourseForUpdate`).
3. **`ARCHIVED` (Retired State):**
   - Course is retired from the public catalog.
   - No new enrollments permitted.
   - Visible only to the author and admins.
   - Terminal state for curriculum editing.

---

## 3. The 5 Core Domain Invariants

### Invariant 1: Slug Stability & Immutability
- Slugs for courses and lessons are generated on initial creation via `slugify()`.
- Uniqueness is enforced at the database level with collision retries on `P2002`.
- **Rule:** Slugs are **permanently immutable**. Updates to course or lesson titles never modify existing slugs. This protects bookmarks, student URLs, and search rankings.

### Invariant 2: The 404 Security Policy (Obscured Existence)
- When an unauthorized user (anonymous visitor or unauthenticated student) requests a `DRAFT` or `ARCHIVED` course by slug or ID, the service strictly throws `NotFoundError (404)`, **not** `AuthorizationError (403)`.
- Returning `403` leaks that a private or unreleased draft exists; `404` completely obscures it.

### Invariant 3: Parent Course Row Locking (`SELECT ... FOR UPDATE`)
- All curriculum mutations (adding/editing/deleting/reordering modules or lessons) and status transitions serialize through the parent course row lock (`lockCourseForUpdate`).
- This prevents race conditions where curriculum is mutated concurrently while another process publishes or archives the course.

### Invariant 4: Two-Phase Atomic Curriculum Reordering
- Both `[courseId, orderIndex]` and `[moduleId, orderIndex]` have unique compound constraints.
- Reordering operations verify that the incoming ID array is an exact permutation of existing siblings, assign temporary negative offsets (`-1 - i`) in phase 1, and then assign contiguous sequential zero-based indexes (`0..N-1`) in phase 2.

### Invariant 5: Idempotent Enrollment & Atomic Progress Tracking
- **Enrollment:** Any authenticated user can enroll in a `PUBLISHED` course. Attempting to enroll when already enrolled is idempotent and safely returns the existing record.
- **Progress Tracking:** Enrolled students toggle lesson completion (`toggleLessonCompletion`). The upsert of `LessonProgress`, recalculation of completed lessons, and update of `CourseEnrollment.progressPercentage` execute within a single atomic Prisma transaction. Reaching 100% automatically sets status to `COMPLETED` and records `completedAt`.

---

## 4. Content & Video Sanitization Pipeline

- Rich content pipeline: `Raw Markdown → marked.parse() → sanitize-html → persisted bodyHtml`.
- Allowed URL schemes: `http:`, `https:` only.
- Whitelisted iframe video hosts:
  - YouTube (`youtube.com`, `www.youtube.com`)
  - Vimeo (`player.vimeo.com`, `vimeo.com`)
  - Loom (`loom.com`, `www.loom.com`)
- The client must never render unsanitized user markdown with `dangerouslySetInnerHTML`.
