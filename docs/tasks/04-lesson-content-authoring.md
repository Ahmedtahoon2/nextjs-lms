# Task 04: Lesson Content Authoring & Media Handling

## Objective

Implement a requirement-driven lesson content authoring system, enabling instructors to author educational lesson materials (markdown/text, code blocks, and video embed URLs) with server-side HTML sanitization and parent course ownership verification, avoiding premature storage provider frameworks.

---

## Scope

### In Scope
- Prisma model `LessonContent` linked 1-to-1 with `Lesson` to isolate heavy textual content from lightweight curriculum queries.
- Requirement-driven content fields: `bodyMarkdown`, sanitized `bodyHtml`, and `videoUrl`.
- Resource attachment references stored as simple structured URLs (`name`, `url`) without complex multi-provider upload engines.
- Server-side HTML sanitization pipeline stripping unsafe script tags, inline event handlers, and dangerous iframe targets.
- Video URL normalizer supporting YouTube, Vimeo, Loom, and direct video embeds.
- `LessonContentService` and concrete `LessonContentRepository` enforcing parent course instructor ownership.
- Focused authoring UI component with markdown/text editing, code snippet support, and video preview.

### Out of Scope
- S3 / cloud storage provider abstraction layers, presigned URL pipelines, or custom file upload infrastructure.
- Real-time collaborative document editing.
- Video transcoding queues or custom video streaming servers.

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: `ActionResult<T>`, `requireAuth()`, error hierarchy.
  - `Task 02`: User identity and instructor persona.
  - `Task 03`: `Lesson`, `Module`, and `Course` domain models and hierarchy.
- **Packages**:
  - `@prisma/client`, `zod`, `lucide-react`.
  - Sanitization package for server-side HTML cleaning.

---

## Architecture Impact

```
Lesson Content Editor (Client Component leaf)
  ↓ calls
updateLessonContentAction (src/actions/lesson-content.ts)
  ↓ requireAuth(), Zod parse
LessonContentService (src/services/lesson-content.ts)
  ↓ Traverses Lesson → Module → Course, verifies course.instructorId === session.userId
  ↓ Normalizes video URL & executes server-side HTML sanitization
LessonContentRepository (src/repositories/lesson-content.ts)
  ↓ concrete Prisma upsert
Database (PostgreSQL)
```

---

## Data Model Impact

```prisma
model LessonContent {
  id           String   @id @default(cuid())
  lessonId     String   @unique
  lesson       Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  bodyMarkdown String?
  bodyHtml     String?
  videoUrl     String?
  resources    Json?    // Array of { name: string, url: string }
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("lesson_content")
}
```

### Model Specifications
- **Why it exists**: Isolates large textual content and video URLs from lightweight curriculum navigation queries.
- **Requirement**: Delivering structured educational text, code, and video lessons.
- **Ownership**: Inferred from parent `Lesson → Module → Course.instructorId`.
- **Read Permissions**:
  - If `lesson.isFreePreview === true`: Publicly readable.
  - If `lesson.isFreePreview === false`: Enrolled students (Task 05), authoring instructor, or admin only.
- **Mutation Permissions**: Authoring instructor only (`session.userId === course.instructorId`).
- **Constraints**: 1-to-1 unique relation on `lessonId`.
- **Status**: Core MVP.

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
│    Caller must hold 'instructor' or 'admin' role.      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Parent Course Resource Ownership Check              │
│    LessonContentService fetches parent Lesson, Module, │
│    and Course in a single query.                       │
│    Asserts: course.instructorId === session.userId.    │
│    Instructor A CANNOT edit Lesson in Instructor B's   │
│    course!                                             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Read Access Enforcement                             │
│    Unenrolled users attempting to read non-preview     │
│    LessonContent are rejected with 403 Forbidden.      │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Content Schema** (`src/lib/validations/lesson-content.ts`):
  ```typescript
  export const updateLessonContentSchema = z.object({
    lessonId: z.string().cuid(),
    bodyMarkdown: z.string().max(50000).optional(),
    videoUrl: z.string().trim().url("Invalid video URL").max(500).optional().or(z.literal("")),
    resources: z
      .array(
        z.object({
          name: z.string().trim().min(1).max(100),
          url: z.string().url("Invalid resource URL"),
        }),
      )
      .max(10)
      .optional(),
  });
  export type UpdateLessonContentInput = z.infer<typeof updateLessonContentSchema>;
  ```

---

## Error Handling

- **Ownership Mismatch**: Throws `ForbiddenError("You are not authorized to edit this lesson content")`.
- **Invalid Video URL**: Returns `actionFailure("Unsupported video URL format. Use YouTube, Vimeo, Loom, or direct video link.")`.
- **Malicious Content**: Dangerous script tags or invalid protocols are stripped during sanitization; severe schema errors return `ValidationError`.

---

## UI / UX Requirements

- Simple, focused editor interface:
  - Clean markdown / structured text area with code block preview.
  - Video URL input field with instant embed preview.
  - Resource link list showing attachment names with direct links.
  - Autosave debouncing with visual status indicator ("Saved", "Saving...", "Unsaved changes").
- Compliant with Design Rules (40x40px touch targets, active press feedback, no em-dashes).

---

## Testing Strategy

- **Service Unit Tests** (`src/services/__tests__/lesson-content.test.ts`):
  - Test ownership check: Instructor A cannot update content for a lesson owned by Instructor B.
  - Test video URL normalizer correctly parses YouTube watch/shorts URLs, Vimeo IDs, and Loom URLs into embed format.
  - Test server-side sanitization strips `<script>`, `onerror`, and `javascript:` pseudo-protocols from generated HTML.
- **Repository Integration Tests** (`src/repositories/__tests__/lesson-content.test.ts`):
  - Test upsert creates `LessonContent` if none exists, and updates if already present.

---

## Documentation Updates

- Update `docs/reference/Entities.md` with `LessonContent` schema.
- Document supported video embed formats in `docs/Coding Standards.md`.

---

## Acceptance Criteria

- [x] `LessonContent` model migration applied with 1-to-1 unique index on `lessonId`.
- [x] Server-side sanitization eliminates XSS vectors from lesson text.
- [x] Video embed normalization supports YouTube, Vimeo, and Loom.
- [x] `LessonContentService` strictly verifies parent course instructor ownership.
- [x] Unenrolled users cannot read non-preview lesson content.
- [x] Unit tests cover ownership enforcement, video normalization, and HTML sanitization.
- [x] TypeScript check and lint pass cleanly.

---

## Definition of Done

- [x] Layered architecture adhered to: `UI → Actions → Services → Concrete Repositories → DB`.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: Zod schema enforces length and URL constraints.
- [x] Authorized: Parent course ownership verified on every update.
- [x] Tested: Sanitization and ownership test suites pass with 100% success rate.
- [x] Minimal: No speculative storage engines or complex editor ecosystems.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
