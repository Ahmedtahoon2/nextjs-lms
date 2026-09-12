---
name: lms-testing
description: Jest and React Testing Library conventions, layer-specific test strategies (Services, Actions, Components), mock patterns, and verification commands. Load when writing unit or integration tests, diagnosing test failures, or validating feature changes.
---

# LMS Testing Strategy & Quality Assurance

This skill defines the testing standards, coverage priorities, mocking patterns, and verification procedures using Jest and React Testing Library.

---

## 1. Testing Stack & Setup

- **Runner:** Jest 30 with `next/jest.js` (`jest.config.ts`).
- **Environment:** `jsdom` with `@testing-library/jest-dom` extensions in `jest.setup.ts`.
- **Test Co-location:** Tests are co-located in `__tests__/` subdirectories adjacent to the target code:
  - Actions: `src/actions/__tests__/*.test.ts`
  - Services: `src/services/__tests__/*.test.ts`
  - Components: `src/components/**/__tests__/*.test.tsx`
  - Lib / Helpers: `src/lib/**/__tests__/*.test.ts`

---

## 2. Testing Strategy by Architectural Layer

### A. Domain Services (`src/services/__tests__`) — Highest Priority
Services contain all critical business rules, permissions, state transitions, and concurrency locks.
- **What to Test:**
  - Happy path for every domain operation (e.g. `createCourse`, `publishCourse`, `enrollInCourse`).
  - Boundary conditions and validation errors (e.g. publishing course without lessons throws `ValidationError`).
  - Security and ownership gates (e.g. non-authors calling `updateCourse` throws `AuthorizationError`).
  - Obscured error invariant: draft course lookups by unauthorized users strictly throw `NotFoundError (404)`.
  - Concurrency locks: verify `lockCourseForUpdate` is invoked within transactions.

### B. Server Actions (`src/actions/__tests__`)
Actions handle input parsing and auth guards.
- **What to Test:**
  - Unauthenticated access returns `{ success: false, error: ... }` with appropriate error codes.
  - Invalid inputs rejected by Zod schema return validation details.
  - Successful service completion wraps result in `actionSuccess(data)`.
  - Typed exceptions (`AppError`) mapped to safe user messages without leaking database internals.

### C. UI Components (`src/components/**/__tests__`)
Components render presentation and handle client interaction.
- **What to Test:**
  - Render states: default view, loading skeleton, empty state, and error message.
  - Interactive events: button clicks, form inputs, modal opens, and tab switches.
  - Accessibility: components accessible via role queries (`getByRole('button', { name: ... })`).
- **Forbidden Habit:** Do NOT write brittle snapshot tests (`toMatchSnapshot()`) that break on minor CSS class changes. Test user-observable behavior.

---

## 3. Standard Mocking Patterns

### Mocking Authentication & Sessions
```typescript
jest.mock("@/lib/auth-helpers", () => ({
  requireAuth: jest.fn().mockResolvedValue({
    user: { id: "user-123", email: "student@example.com" },
    session: { id: "session-123" },
  }),
  requireRole: jest.fn().mockResolvedValue({
    user: { id: "instructor-123", email: "instructor@example.com" },
  }),
  getCurrentUser: jest.fn().mockResolvedValue({
    id: "user-123",
    email: "student@example.com",
  }),
}));
```

### Mocking Repositories in Service Tests
```typescript
jest.mock("@/repositories/course", () => ({
  findCourseById: jest.fn(),
  updateCourse: jest.fn(),
  lockCourseForUpdate: jest.fn().mockResolvedValue({ id: "course-1" }),
}));
```

---

## 4. Change-Aware Test Execution

Execute only the tests relevant to your changes during feature development:

```bash
# Test a specific file
pnpm test -- src/services/__tests__/course.test.ts

# Test a feature group
pnpm test -- src/actions/__tests__/

# Test all component tests
pnpm test -- src/components/

# Run full project test suite before commit/PR
pnpm test
```
