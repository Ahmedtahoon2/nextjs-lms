# Entities

Documentation of foundational tools and frameworks used in this project.

---

# Next.js

- Version: 16.2.10
- Role: React framework for server rendering, routing, and API.
- Repository: vercel/next.js.
- License: MIT.

---

# React

- Version: 19.2.4
- Role: UI library.
- Repository: facebook/react.
- License: MIT.

---

# Tailwind CSS

- Version: v4
- Role: Utility-first CSS framework.
- Repository: tailwindlabs/tailwindcss.
- License: MIT.

---

# shadcn/ui

- Style: base-nova
- Role: Reusable UI components.
- Repository: shadcn-ui/ui.
- License: MIT.

---

# Prisma

- Version: 7.8.0
- Role: TypeScript ORM for PostgreSQL.
- Repository: prisma/prisma.
- License: Apache-2.0.

---

# Zod

- Version: 4.4.3
- Role: Runtime validation.
- Repository: colinhacks/zod.
- License: MIT.

---

# React Hook Form

- Version: 7.87.0
- Role: Form management.
- Repository: react-hook-form/react-hook-form.
- License: MIT.

---

# @hookform/resolvers

- Version: ^5.9.1
- Role: Standard schema validation resolvers for React Hook Form (Zod adapter).
- Repository: react-hook-form/resolvers.
- License: MIT.

---

# Better Auth

- Version: 1.7.3
- Role: Authentication and session management framework.
- Repository: better-auth/better-auth.
- License: MIT.

---

# Jest

- Version: 30.5.1
- Role: Unit testing.
- Repository: jestjs/jest.
- License: MIT.

---

# Biome

- Version: 2.5.12
- Role: Static analysis and code formatting.
- Repository: biomejs/biome.
- License: MIT.

---

# Domain Entities

## User
- Primary entity for system accounts and profiles.
- Table: `user`
- Core fields:
  - `id`: Unique identifier (String)
  - `name`: Display name (String)
  - `email`: Unique email address (String)
  - `emailVerified`: Email verification status (Boolean)
  - `image`: Auth provider avatar image URL (String, optional)
- Profile fields (Task 02):
  - `headline`: Professional headline, max 100 characters (String, optional)
  - `bio`: Biography summary, max 1000 characters (String, optional)
  - `avatarUrl`: Custom profile avatar URL (String, optional)
  - `website`: Portfolio/personal website URL (String, optional)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `userRoles`: `UserRole[]`
  - `sessions`: `Session[]`
  - `accounts`: `Account[]`
  - `authoredCourses`: `Course[]` (Authored courses)
  - `enrollments`: `CourseEnrollment[]`
  - `lessonProgress`: `LessonProgress[]`

---

## Role
- Role-based access control role identifier.
- Table: `role`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `name`: Role name (`admin`, `instructor`, `student`) (String, unique)
  - `description`: Role description (String, optional)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `userRoles`: `UserRole[]`
  - `rolePermissions`: `RolePermission[]`

---

## Permission
- Granular action/resource entitlement.
- Table: `permission`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `name`: Permission name (String, unique)
  - `description`: Permission description (String, optional)
  - `resource`: Target resource domain (String)
  - `action`: Permitted action (String)
- Constraints:
  - `@@unique([resource, action])`
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `rolePermissions`: `RolePermission[]`

---

## UserRole
- Join table associating Users with Roles.
- Table: `user_role`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `userId`: Reference to User (String)
  - `roleId`: Reference to Role (String)
- Constraints:
  - `@@unique([userId, roleId])`
  - `@@index([userId])`
  - `@@index([roleId])`
- Relations:
  - `user`: `User` (Cascade delete)
  - `role`: `Role` (Cascade delete)

---

## RolePermission
- Join table mapping Roles to Permissions.
- Table: `role_permission`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `roleId`: Reference to Role (String)
  - `permissionId`: Reference to Permission (String)
- Constraints:
  - `@@unique([roleId, permissionId])`
  - `@@index([roleId])`
  - `@@index([permissionId])`
- Relations:
  - `role`: `Role` (Cascade delete)
  - `permission`: `Permission` (Cascade delete)

---

## Course
- Core curriculum container representing a complete educational course.
- Table: `course`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `title`: Course title (String, 3..100 characters)
  - `slug`: URL-friendly identifier, unique globally (String, auto-generated from title with collision avoidance)
  - `description`: Detailed course summary (String, optional, max 1000 characters)
  - `thumbnailUrl`: Cover image URL (String, optional)
  - `status`: Lifecycle state (`DRAFT` | `PUBLISHED` | `ARCHIVED`, default: `DRAFT`)
  - `level`: Target audience proficiency level (`BEGINNER` | `INTERMEDIATE` | `ADVANCED` | `ALL_LEVELS`, default: `ALL_LEVELS`)
  - `category`: Subject taxonomy categorization (String, optional, max 50 characters)
  - `instructorId`: Reference to author User account (String)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `instructor`: `User` (Cascade delete)
  - `modules`: `Module[]` (Ordered by `orderIndex`)
- Indexes:
  - `@@index([instructorId])`
  - `@@index([status])`
  - Unique: `slug`

---

## Module
- Section/chapter grouping a sequence of lessons within a course.
- Table: `module`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `title`: Section title (String, 2..100 characters)
  - `description`: Module description (String, optional, max 500 characters)
  - `orderIndex`: Zero-based contiguous sequential position within parent course (Int)
  - `courseId`: Parent course identifier (String)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `course`: `Course` (Cascade delete)
  - `lessons`: `Lesson[]` (Ordered by `orderIndex`)
- Constraints:
  - `@@unique([courseId, orderIndex])`: Guarantees deterministic, collision-free ordering per course
  - `@@index([courseId])`

---

## Lesson
- Atomic unit of instruction within a curriculum module.
- Table: `lesson`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `title`: Lesson title (String, 2..100 characters)
  - `slug`: URL-friendly identifier within parent module (String, unique per module)
  - `orderIndex`: Zero-based contiguous sequential position within parent module (Int)
  - `durationMinutes`: Estimated duration (Int, optional, 1..600 minutes)
  - `isFreePreview`: Whether accessible without enrollment/payment (Boolean, default: `false`)
  - `moduleId`: Parent module identifier (String)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `module`: `Module` (Cascade delete)
  - `content`: `LessonContent?` (1-to-1, cascade delete)
- Constraints:
  - `@@unique([moduleId, slug])`: Enforces module-scoped slug uniqueness
  - `@@unique([moduleId, orderIndex])`: Guarantees deterministic, collision-free ordering per module
  - `@@index([moduleId])`

---

## LessonContent
- Heavy educational material payload linked 1-to-1 with a Lesson.
- Table: `lesson_content`
- Purpose: Isolates large markdown notes, code blocks, server-sanitized HTML, video embed links, and resource attachments from lightweight curriculum navigation queries.
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `lessonId`: Parent lesson identifier (String, unique)
  - `bodyMarkdown`: Author markdown text with code snippets (String, optional, max 50,000 characters)
  - `bodyHtml`: Server-compiled and sanitized HTML string (String, optional)
  - `videoUrl`: Normalized video embed URL from YouTube, Vimeo, or Loom (String, optional, max 500 characters)
  - `resources`: Array of resource attachments `{ name: string, url: string }` (Json, optional, max 10 attachments)
- Timestamps: `createdAt`, `updatedAt`
- Relations:
  - `lesson`: `Lesson` (Cascade delete, 1-to-1)
- Constraints:
  - `@@unique([lessonId])`
- Access Control:
  - Mutation: Authoring instructor or admin; allowed on `DRAFT` and `PUBLISHED` courses, strictly blocked on `ARCHIVED` courses.
  - Read: Public if `lesson.isFreePreview === true` AND `course.status === PUBLISHED`; otherwise restricted to authoring instructor, admin, or enrolled students (Task 05).

---

## Curriculum Enums

### CourseStatus
- `DRAFT`: Course under development; editable by instructor. Default state.
- `PUBLISHED`: Publicly discoverable and enrollable. Requires >= 1 module and >= 1 lesson to transition. Curriculum mutations locked under draft state.
- `ARCHIVED`: Deprecated course; no new enrollments.

### CourseLevel
- `BEGINNER`: Introductory material.
- `INTERMEDIATE`: Requires foundational knowledge.
- `ADVANCED`: Mastery-level technical topics.
- `ALL_LEVELS`: Suitable for any audience. Default level.

### EnrollmentStatus
- `ACTIVE`: Student is actively enrolled and progressing through the course.
- `COMPLETED`: Student has completed all lessons (100% progress). `completedAt` timestamp is set.
- `ARCHIVED`: Enrollment is archived; student can no longer track progress.

---

## CourseEnrollment
- Tracks a student's enrollment in a course with aggregate progress metrics.
- Table: `course_enrollment`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `userId`: Reference to enrolled student (String)
  - `courseId`: Reference to enrolled course (String)
  - `status`: Enrollment lifecycle state (`ACTIVE` | `COMPLETED` | `ARCHIVED`, default: `ACTIVE`)
  - `progressPercentage`: Aggregate course completion percentage (Int, 0 to 100, default: 0)
  - `enrolledAt`: Timestamp of initial enrollment (DateTime, auto-set)
  - `completedAt`: Timestamp when 100% completion is reached (DateTime, optional, cleared on revert)
  - `lastAccessedAt`: Timestamp of most recent progress activity (DateTime, auto-set)
- Timestamps: `enrolledAt`, `lastAccessedAt`
- Relations:
  - `user`: `User` (Cascade delete)
  - `course`: `Course` (Cascade delete)
- Constraints:
  - `@@unique([userId, courseId])`: One enrollment per student per course
  - `@@index([userId])`
  - `@@index([courseId])`
- Access Control:
  - Enroll: Any authenticated user, only in `PUBLISHED` courses.
  - Read (self): Student can view their own enrollments.
  - Read (course): Instructor or admin can view all enrollments for their course.
  - Mutate: System-level only (progress aggregation updates).
- Concurrency: Duplicate enrollment handled idempotently via `P2002` on unique constraint.

---

## LessonProgress
- Per-user, per-lesson completion tracking. Progress is strictly user-scoped and never shared.
- Table: `lesson_progress`
- Core fields:
  - `id`: Unique identifier (String, cuid)
  - `userId`: Reference to student (String)
  - `lessonId`: Reference to lesson (String)
  - `isCompleted`: Whether the lesson is marked complete (Boolean, default: `false`)
  - `completedAt`: Timestamp when lesson was marked complete (DateTime, optional, cleared on unmark)
  - `lastAccessedAt`: Timestamp of most recent interaction (DateTime, auto-set)
- Relations:
  - `user`: `User` (Cascade delete)
  - `lesson`: `Lesson` (Cascade delete)
- Constraints:
  - `@@unique([userId, lessonId])`: One progress record per student per lesson
  - `@@index([userId])`
  - `@@index([lessonId])`
- Access Control:
  - Read/Mutate: Student self only (`session.userId === progress.userId`).
  - Requires active enrollment in the parent course.
- Critical Invariant: Progress is NEVER stored as a global flag on the `Lesson` entity. It exists only in the `LessonProgress` join table scoped to `(userId, lessonId)`.
