# LMS Domain Entity Reference

Comprehensive specification of relational entities, fields, constraints, relations, and invariants in the Next.js LMS platform.

---

## 1. Authentication & RBAC Entities

### User

- Primary entity for system accounts and instructor/student profiles.
- **Table:** `user`
- **Core fields:**
  - `id`: Unique identifier (String, cuid)
  - `name`: Display name (String)
  - `email`: Unique email address (String)
  - `emailVerified`: Email verification status (Boolean)
  - `image`: Auth provider avatar image URL (String, optional)
- **Profile fields:**
  - `headline`: Professional headline, max 100 chars (String, optional)
  - `bio`: Biography summary, max 1000 chars (String, optional)
  - `avatarUrl`: Custom profile avatar URL (String, optional)
  - `website`: Portfolio/personal website URL (String, optional)
- **Relations:** `userRoles[]`, `sessions[]`, `accounts[]`, `authoredCourses[]`, `enrollments[]`, `lessonProgress[]`

### Role & Permission

- **Role (`role`):** Standard RBAC roles (`admin`, `instructor`, `student`).
- **Permission (`permission`):** Granular entitlements `resource:action` with `@@unique([resource, action])`.
- **Join Tables:** `user_role` (`@@unique([userId, roleId])`) and `role_permission` (`@@unique([roleId, permissionId])`).

---

## 2. Curriculum Entities

### Course

- Core curriculum container representing an educational course.
- **Table:** `course`
- **Fields:**
  - `id`: CUID (PK)
  - `title`: String (3..100 chars)
  - `slug`: Globally unique string (immutable, auto-generated from title)
  - `description`: Text (optional, max 1000 chars)
  - `thumbnailUrl`: String (optional)
  - `status`: `CourseStatus` (`DRAFT` | `PUBLISHED` | `ARCHIVED`, default: `DRAFT`)
  - `level`: `CourseLevel` (`BEGINNER` | `INTERMEDIATE` | `ADVANCED` | `ALL_LEVELS`)
  - `category`: String (optional, max 50 chars)
  - `instructorId`: FK $\to$ `User`
- **Relations:** `instructor` (User), `modules` (`Module[]`, ordered by `orderIndex`)
- **Indexes:** `@@index([instructorId])`, `@@index([status])`, unique `slug`

### Module

- Section/chapter grouping lessons within a course.
- **Table:** `module`
- **Fields:** `id`, `title` (2..100 chars), `description` (optional), `orderIndex` (Int, 0-based), `courseId` (FK $\to$ Course)
- **Constraints:** `@@unique([courseId, orderIndex])` (guarantees contiguous, deterministic ordering)
- **Relations:** `course` (Cascade delete), `lessons` (`Lesson[]`, ordered by `orderIndex`)

### Lesson

- Atomic unit of instruction within a curriculum module.
- **Table:** `lesson`
- **Fields:** `id`, `title` (2..100 chars), `slug` (unique per module), `orderIndex` (Int, 0-based), `durationMinutes` (optional), `isFreePreview` (Boolean, default `false`), `moduleId` (FK $\to$ Module)
- **Constraints:** `@@unique([moduleId, slug])`, `@@unique([moduleId, orderIndex])`
- **Relations:** `module` (Cascade delete), `content` (`LessonContent?`, 1-to-1)

### LessonContent

- Heavy educational content isolated from lightweight navigation queries.
- **Table:** `lesson_content`
- **Fields:** `id`, `lessonId` (FK $\to$ Lesson, unique), `bodyMarkdown` (optional, max 50k chars), `bodyHtml` (compiled/sanitized), `videoUrl` (YouTube/Vimeo/Loom), `resources` (JSON array of `{ name, url }`)
- **Access:** Editable by author/admin on `DRAFT` and `PUBLISHED`. Readable publicly if `isFreePreview === true` & `PUBLISHED`, otherwise enrolled students/author/admin only.

---

## 3. Enrollment & Progress Entities

### CourseEnrollment

- Student enrollment in a course with aggregate completion metrics.
- **Table:** `course_enrollment`
- **Fields:** `id`, `userId` (FK $\to$ User), `courseId` (FK $\to$ Course), `status` (`ACTIVE` | `COMPLETED` | `ARCHIVED`), `progressPercentage` (Int 0..100), `enrolledAt`, `completedAt`, `lastAccessedAt`
- **Constraints:** `@@unique([userId, courseId])` (one active enrollment per student per course)

### LessonProgress

- Per-user, per-lesson progress tracking. Strictly user-scoped and never shared.
- **Table:** `lesson_progress`
- **Fields:** `id`, `userId` (FK $\to$ User), `lessonId` (FK $\to$ Lesson), `isCompleted` (Boolean), `completedAt`, `lastAccessedAt`
- **Constraints:** `@@unique([userId, lessonId])`
- **Critical Invariant:** Progress is NEVER a column on `Lesson`; it is always user-isolated via `LessonProgress`.
