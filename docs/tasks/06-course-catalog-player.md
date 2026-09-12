# Task 06: Course Catalog & Student Learning Player

## Objective

Deliver the public course catalog with simple database filtering (`contains`), the comprehensive course syllabus preview, and the distraction-free student learning player—built with Server Components first, without separate search infrastructure or client query libraries.

---

## Scope

### In Scope
- Public course catalog page (`/courses`) with basic keyword filtering (Prisma `contains`), category filter, difficulty level filter, and pagination.
- Course overview and syllabus page (`/courses/[slug]`) displaying course metadata, instructor credentials, curriculum outline, and enrollment CTA.
- Distraction-free learning player layout (`/learn/[courseSlug]/[lessonSlug]`):
  - Collapsible curriculum outline sidebar with module accordions and visual completion checkmarks.
  - Focused content stage with responsive video embed or sanitized markdown/text reader.
  - Downloadable lesson attachments list.
  - Bottom navigation bar ("Previous Lesson", "Mark Complete & Next", "Next Lesson").
- Strict enrollment guard: verifies student enrollment before delivering non-preview lesson content.

### Out of Scope
- External search engine integrations (Algolia, Meilisearch, or Elasticsearch). Basic database query filtering is sufficient.
- Social course reviews, 5-star rating systems, or student comment threads.
- TanStack / React Query client cache setups (Server Components handle data natively).

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: Pagination schemas and action helpers.
  - `Task 02`: User/instructor profile display.
  - `Task 03`: Course, Module, and Lesson hierarchy.
  - `Task 04`: Sanitized lesson content and video embed normalizer.
  - `Task 05`: Enrollment access check and progress completion services.
- **Packages**:
  - `lucide-react`, `@prisma/client`, `zod`.

---

## Architecture Impact

```
/courses and /courses/[slug] (Next.js 16 Server Components)
  ↓ directly calls
CourseService & CurriculumService (Server Component data fetch)
  ↓
Concrete Repositories → Database

/learn/[courseSlug]/[lessonSlug] (Server Component Layout & Page)
  ↓ verifies enrollment via EnrollmentService
  ↓ renders Server Component text content
  ↓ mounts Client Component Leaves for interactive player & sidebar:
      • PlayerSidebar (collapsible state, active highlights)
      • MarkCompleteButton (calls toggleLessonCompletionAction)
      • VideoEmbedPlayer (iframe mounting)
```

---

## Data Model Impact

No new database models. Consumes existing `Course`, `Module`, `Lesson`, `LessonContent`, `CourseEnrollment`, and `LessonProgress`.

---

## Authorization Rules

```
┌────────────────────────────────────────────────────────┐
│ 1. Catalog & Syllabus Access                           │
│    Publicly viewable by unauthenticated visitors and   │
│    students. Queries strictly filter status=PUBLISHED. │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Free Preview Lesson Access                          │
│    Lessons with isFreePreview=true are viewable in the │
│    player by any user, even if unenrolled.             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Restricted Lesson Paywall / Enrollment Gate         │
│    If isFreePreview=false:                             │
│    • User must be authenticated (requireAuth()).       │
│    • User must have an ACTIVE CourseEnrollment, or be  │
│      the authoring instructor, or be an admin.         │
│    • If unauthorized: Redirects to /courses/[slug]     │
│      with enrollment prompt.                           │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Catalog Query Schema** (`src/lib/validations/catalog.ts`):
  ```typescript
  export const catalogQuerySchema = z.object({
    search: z.string().trim().max(100).optional(),
    category: z.string().trim().max(50).optional(),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL_LEVELS"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(12),
  });
  export type CatalogQueryInput = z.infer<typeof catalogQuerySchema>;
  ```

---

## Error Handling

- **Unenrolled Access**: Redirects to `/courses/[slug]` with an informational message indicating enrollment is required.
- **Course or Lesson Not Found**: Renders standard Next.js `notFound()` (404) page.
- **Unpublished Course Access**: Returns 404 for unauthenticated visitors and non-author students.

---

## UI / UX Requirements

- **Design Rules Compliance**:
  - No em-dashes or en-dashes in visible copy.
  - Interactive controls minimum 40x40px hit area.
  - Active press feedback (`active:scale-[0.98]`).
  - Dark mode protocol with consistent tokens from `globals.css`.
  - Body text formatted with `max-w-[65ch]` and `text-wrap: pretty`.
  - Headlines formatted with `text-wrap: balance`.
  - `prefers-reduced-motion` honored on sidebar transitions and checkmark animations.
- **Player Layout**:
  - Header: Course title, progress bar, exit button.
  - Sidebar: Module accordions with lesson items and completed checkmark icons.
  - Canvas: Video player with 16:9 aspect ratio container or clean reading typography.
  - Footer: Previous, Complete & Next, Next buttons.

---

## Testing Strategy

- **Integration Tests** (`src/app/(learning)/__tests__/learn-access.test.ts`):
  - Test unenrolled student accessing restricted lesson is redirected to course page.
  - Test unenrolled visitor accessing free preview lesson succeeds.
  - Test enrolled student accessing lesson succeeds and returns content.
- **Component Tests** (`src/components/learning/__tests__/player-sidebar.test.ts`):
  - Test active lesson item is highlighted.
  - Test completed lessons show green checkmark icon.
  - Test sidebar toggle expands/collapses properly.
- **Catalog Query Tests** (`src/repositories/__tests__/catalog.test.ts`):
  - Test search filter queries title and description with `contains`.
  - Test level and category filters accurately constrain results.

---

## Documentation Updates

- Update `docs/Features/Course-Player.md` with route structures and player component hierarchy.
- Document catalog URL query parameter contracts.

---

## Acceptance Criteria

- [x] Catalog page renders published courses with simple database filtering (search, category, level).
- [x] Course detail page displays curriculum outline and instructor credentials.
- [x] Unenrolled students are blocked from reading non-preview lesson content.
- [x] Enrolled students can navigate seamlessly between lessons in the player.
- [x] Clicking "Mark as Complete & Next" records progress and advances to the next lesson.
- [x] Responsive drawer allows mobile students to access curriculum outline.
- [x] Design rules verified (40px hit targets, no em-dashes, press feedback).
- [x] TypeScript check and lint pass with zero errors.

---

## Definition of Done

- [x] Implemented with Server Components first; no unnecessary client bundle overhead.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: Zod parses and sanitizes catalog query parameters.
- [x] Authorized: Enrollment gate strictly prevents unauthorized content access.
- [x] Tested: Component and access gate integration tests pass.
- [x] Design verified: All design rules and accessibility checks satisfied.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
