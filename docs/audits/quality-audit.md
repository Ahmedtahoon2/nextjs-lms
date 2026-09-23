# Pre-Flight Quality Audit Checklist

Run this systematic audit before declaring any task complete or opening a Pull Request.

---

## 1. Architectural Integrity

- [ ] **5-Layer Boundary Respected:** Did any database queries leak into UI components or Server Actions?
- [ ] **Downward Dependency Flow:** Do repositories remain free of service imports?
- [ ] **Thin Server Actions:** Do Actions restrict themselves to Zod validation, auth checks, and calling domain services?
- [ ] **Action Result Uniformity:** Does every Server Action return a typed `ActionResult<T>`?

---

## 2. Type Safety & Suppressions

- [ ] **No Unjustified `any`:** Are all domain models, props, and input shapes explicitly typed?
- [ ] **Zero Suppressions as Shortcuts:** Are there any unneeded `@ts-ignore`, `@ts-expect-error`, `biome-ignore`, or `eslint-disable` comments?
- [ ] **Typecheck Passes:** Does `pnpm typecheck` exit with code `0`?

---

## 3. Next.js 16 App Router

- [ ] **Async Segment Props Awaited:** Are `params` and `searchParams` properly awaited in pages and metadata?
- [ ] **RSC by Default:** Are `"use client"` directives restricted strictly to interactive leaf components?
- [ ] **Cache Invalidation:** Is `revalidatePath` called inside Server Actions after data mutations?
- [ ] **Boundary Coverage:** Are `loading.tsx` and `error.tsx` present for dynamic routes?

---

## 4. UI/UX & Anti-Slop Discipline

- [ ] **No Generic AI Tells:** Are cards-inside-cards, generic purple-blue gradients, and arbitrary px classes eliminated?
- [ ] **Semantic Tokens Used:** Are colors, borders, and backgrounds mapped to `globals.css` semantic tokens?
- [ ] **Dark Mode Verified:** Does the component render with clear contrast under `.dark`?
- [ ] **Tactile Press Feedback:** Do interactive buttons include `active:scale-[0.96]`?
- [ ] **Hit Areas $\ge 40\times 40\text{px}$:** Are all clickable icons and buttons adequately sized?
- [ ] **Typography Flow:** Do headings use `text-wrap: balance` and body text use `text-wrap: pretty`?

---

## 5. Security & Authorization

- [ ] **Auth Guards Present:** Are private routes and actions protected with `requireAuth()` or `requireRole()`?
- [ ] **Ownership Checked:** Are instructor mutations verified against `assertCourseOwnership()`?
- [ ] **404 vs 403 Policy:** Do lookups for unauthorized draft or archived courses strictly return `NotFoundError (404)`?
- [ ] **Content Sanitized:** Is all user markdown and iframe embedding sanitized via the approved pipeline?

---

## 6. Testing & Honest Verification

- [ ] **Relevant Tests Pass:** Did you execute the change-aware test command (`pnpm test -- <path>`)?
- [ ] **Domain Rules Covered:** Are critical business branches and edge cases tested?
- [ ] **Honest Reporting:** Are any skipped or unverified checks explicitly disclosed in the final report?

---

## 7. Documentation & Decisions

- [ ] **Docs Synchronized:** If domain invariants or architecture changed, were `docs/` files updated?
- [ ] **ADR Recorded:** If a major architectural decision or dependency was introduced, was an ADR added to `docs/decisions/`?
- [ ] **Clean Diff:** Did you review `git status` and `git diff` to ensure no unrelated files or debug code were committed?
