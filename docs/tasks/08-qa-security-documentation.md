# Task 08: Final QA, Security Audit & Documentation

## Objective

Execute the final holistic verification phase across the entire LMS platform: validating that per-feature security and tests function in concert across the integrated system, conducting an end-to-end security audit (IDOR, CSRF, XSS), verifying database indexes and build performance, and synchronizing project architecture documentation and ADRs.

---

## Scope

### In Scope
- **Holistic Test Suite Execution**: Running all unit, integration, and component tests across the repository (`pnpm test`) to guarantee zero regressions.
- **Security Audit & Verification**:
  - Verification of multi-tier authorization across all Server Actions and route handlers.
  - Automated IDOR penetration tests (verifying cross-instructor and cross-student resource isolation).
  - CSRF header and origin validation check.
  - Server-side HTML sanitization audit on lesson content.
- **Performance & Database Audit**:
  - Database index verification in `prisma/schema.prisma` ensuring index coverage for foreign keys and queries.
  - Bundle size analysis: verifying Client Components are minimal leaves and Server Components handle heavy rendering.
- **Documentation & Architecture Synchronization**:
  - Creating `docs/decisions/004-lms-domain-model.md`.
  - Updating `docs/Architecture.md` with active LMS services and repositories.
  - Updating `docs/reference/Entities.md` with domain models.
  - Updating `README.md` to document the completed LMS features.

### Out of Scope
- Introducing new product features or speculative extensions.
- Modifying previously verified domain business logic unless a security or regression defect is identified.

---

## Dependencies

- **Preceding Tasks**: Tasks 01 through 07 must be implemented and feature-level tested before running this final verification phase.

---

## Architecture Impact

Confirms and locks down the completed layered architecture:
```
UI (Clean Server Components, accessible Client leaves)
 ↓
Actions / Route Handlers (Standardized ActionResult<T>, Zod input parsing, auth guards)
 ↓
Services (Strict 4-tier authorization, business logic, transactions)
 ↓
Concrete Repositories (Concrete domain modules, clean Prisma mapping)
 ↓
Database (Neon PostgreSQL with verified indexes)
```

---

## Data Model Impact

No schema changes. Verifies index efficiency on existing models (`Course`, `Module`, `Lesson`, `LessonContent`, `CourseEnrollment`, `LessonProgress`).

---

## Authorization Rules

Audits the enforcement of the 4-tier authorization doctrine across all routes and Server Actions:
1. **Authentication**: All protected endpoints require valid Better Auth sessions.
2. **Role Authorization**: Privileged teaching endpoints require `instructor` or `admin` roles.
3. **Resource Ownership**: No instructor can mutate another instructor's course; no student can mutate another student's progress.
4. **Resource State**: Courses cannot be published without valid curriculum; draft courses cannot be enrolled.

---

## Validation

Verifies that all Server Actions parse inputs strictly through Zod schemas before reaching the Service layer, preventing unvalidated parameters from reaching business logic or database queries.

---

## Error Handling

Verifies that no raw database errors or stack traces leak to the client; all exceptions are properly transformed into user-friendly `ActionResult<T>` responses and tracked in Sentry.

---

## UI / UX Requirements

- Verify all interactive controls across catalog, player, and instructor workspace meet Design Rules (40x40px hit areas, press feedback, no em-dashes).
- Verify dark mode contrast ratios and `prefers-reduced-motion` adherence.

---

## Testing Strategy

1. **IDOR Penetration Test Suite** (`src/__tests__/security/idor.test.ts`):
   - Simulated test matrix:
     - User A attempts to update User B's profile → asserts 403 Forbidden.
     - Instructor A attempts to update Instructor B's course → asserts 403 Forbidden.
     - Instructor A attempts to delete Instructor B's module/lesson → asserts 403 Forbidden.
     - Student A attempts to query or mutate Student B's progress → asserts 403 Forbidden.
     - Unenrolled student attempts to read restricted lesson content → asserts 403 Forbidden.
2. **XSS Sanitization Audit** (`src/__tests__/security/xss.test.ts`):
   - Test injection payloads (`<script>`, `<img src=x onerror=...>`, `<a href="javascript:...">`, `<iframe>`) through `LessonContentService` and assert they are sanitized before storage or rendering.
3. **CSRF & Origin Verification**:
   - Verify Better Auth CSRF token and Origin header checks reject cross-origin form submissions.
4. **Full Suite Execution**:
   - `pnpm test`
   - `pnpm typecheck`
   - `pnpm lint`

---

## Documentation Updates

1. **`docs/decisions/004-lms-domain-model.md`**:
   - Title: Use Dedicated Curriculum, Enrollment, and Isolated Progress Models.
   - Decision: Model Course → Module → Lesson with explicit `orderIndex`, explicit `CourseEnrollment`, and isolated `LessonProgress`.
   - Status: Accepted.
2. **`docs/Architecture.md`**:
   - Update layer diagrams and document service/repository responsibilities.
3. **`docs/reference/Entities.md`**:
   - Document `Course`, `Module`, `Lesson`, `LessonContent`, `CourseEnrollment`, `LessonProgress`.
4. **`README.md`**:
   - Synchronize with actual platform features, installation instructions, and testing commands.

---

## Acceptance Criteria

- [x] All unit, integration, and security tests pass with 100% success rate.
- [x] Automated IDOR tests verify complete user, instructor, and student resource isolation.
- [x] XSS sanitization penetration tests pass.
- [x] Database indexes match all active query and ordering paths.
- [x] `docs/decisions/004-lms-domain-model.md` is created and approved.
- [x] Documentation accurately describes the final implemented state.

---

## Definition of Done

- [x] Security audited: IDOR, XSS, and CSRF verified and passing.
- [x] Quality gate: `pnpm check` (biome, tsc, knip) passes cleanly.
- [x] Build verified: Next.js components cleanly structured without invalid dependencies.
- [x] Test coverage: Comprehensive coverage across all services, actions, and UI components.
- [x] Documented: ADR 004 created, Architecture.md and README.md updated.
- [x] Zero technical debt: No dead code, no `any` types, no leftover console logs.
