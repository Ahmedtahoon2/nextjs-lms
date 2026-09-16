---
name: lms-domain
description: LMS domain concepts, entity hierarchies, lifecycle state machines, enrollment rules, student progress calculations, and course ownership invariants. Load when working with courses, modules, lessons, student progress, enrollments, or instructor authoring workflows.
---

# LMS Domain Knowledge & Business Invariants

This skill captures the core domain models, relationships, state machines, and business invariants of this Learning Management System (LMS).

---

## 1. Domain Entities & Hierarchy

```text
User (Role: student | instructor | admin)
  │
  ├── AuthoredCourses (1..N)
  │     └── Course (Status: DRAFT | PUBLISHED | ARCHIVED)
  │           ├── Module (1..N, ordered by orderIndex)
  │           │     └── Lesson (1..N, ordered by orderIndex, isFreePreview: boolean)
  │           │           └── LessonContent (1..1, markdown, HTML, videoUrl, resources)
  │           └── CourseEnrollment (1..N, Status: ACTIVE | COMPLETED | ARCHIVED)
  │
  └── LessonProgress (1..N per Lesson, isCompleted: boolean)
```

---

## 2. Course Lifecycle State Machine

Courses exist in one of three states (`CourseStatus` enum):
- `DRAFT`: Initial state upon creation. Curriculum is editable. Visible only to authoring instructor and admin.
- `PUBLISHED`: Course is live. Visible to everyone. Curriculum editing is locked. Public can browse and enroll.
- `ARCHIVED`: Course is retired. Visible only to author and admin. No new enrollments allowed. Existing active enrollments can be preserved or concluded.

### State Transitions:
1. **`createCourse`**: Initial status is strictly `DRAFT`.
2. **`publishCourse` (`DRAFT → PUBLISHED`)**:
   - **Mandatory Invariant:** Must contain at least **1 module** and at least **1 lesson** (`ValidationError` if empty).
   - Must be executed under a course row lock (`lockCourseForUpdate`).
3. **`unpublishCourse` (`PUBLISHED → DRAFT`)**:
   - Reverts course to draft for curriculum updates.
4. **`archiveCourse` (`{DRAFT, PUBLISHED} → ARCHIVED`)**:
   - Terminal state for editing.

---

## 3. Curriculum Integrity & Concurrency Rules

1. **Curriculum Mutation Lock:**
   - Adding, updating, deleting, or reordering modules and lessons is permitted **only when the course is in `DRAFT` status**.
   - Every mutation must serialize through `lockCourseForUpdate(tx, courseId)`.
2. **Atomic Two-Phase Reordering:**
   - Both `module.orderIndex` and `lesson.orderIndex` have unique compound constraints (`[courseId, orderIndex]` and `[moduleId, orderIndex]`).
   - Reordering must use a two-phase transaction with temporary negative offsets (`-1 - i`) to prevent transient unique key collisions before applying contiguous zero-based indexes (`0..N-1`).
   - Sibling ID permutations must be strictly validated inside the transaction.

---

## 4. Slug Stability & SEO Invariant

- Course and lesson slugs are generated upon creation using `slugify()`.
- Slug collisions are resolved dynamically via retry loops catching Prisma `P2002` errors.
- **Critical Invariant:** Slugs are **never modified during course or lesson updates**. Slugs remain permanent to guarantee URL stability, student bookmark preservation, and SEO retention.

---

## 5. Security & Visibility Invariant (404 vs 403)

- **Public Catalog (`PUBLISHED`):** Accessible to all visitors (anonymous or authenticated).
- **Draft / Archived Courses (`DRAFT` / `ARCHIVED`):**
  - Accessible strictly to the course authoring instructor or an admin.
  - **The 404 Invariant:** If an unauthorized user or unauthenticated visitor requests a draft or archived course by ID or slug, the service **strictly throws `NotFoundError` (404), NOT `AuthorizationError` (403)**. This prevents resource enumeration and information leakage about draft courses.

---

## 6. Enrollment & Progress Invariants

1. **Enrollment Rules:**
   - Students can enroll only in courses with `CourseStatus.PUBLISHED`.
   - Enrollment is idempotent: attempting to enroll in an already enrolled course returns the existing enrollment without error or duplicate records.
2. **Student Progress Invariant:**
   - Only students with an active or completed enrollment can track progress (`toggleLessonCompletion`).
   - Progress mutations execute inside a Prisma interactive transaction:
     - Upserts `LessonProgress` (`isCompleted: boolean`).
     - Recalculates total completed lessons vs total lessons in the course.
     - Updates `CourseEnrollment.progressPercentage` (`0..100`).
     - When percentage reaches 100%, transitions enrollment status to `COMPLETED` and sets `completedAt`.

---

## 7. Lesson Content & Media Sanitization

- `LessonContent` holds markdown body, pre-sanitized HTML body, video URL, and resources.
- Input pipeline: `Markdown → marked.parse() → sanitize-html → persisted bodyHtml`.
- Allowed video embed domains: YouTube (`youtube.com`, `www.youtube.com`), Vimeo (`player.vimeo.com`, `vimeo.com`), Loom (`loom.com`, `www.loom.com`).
- Direct HTML injection on the client without the sanitization pipeline is strictly prohibited.
