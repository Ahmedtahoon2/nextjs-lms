# Antigravity AI Guide — Next.js LMS

Canonical instruction entry point for AI coding agents in this repository.

## 1. Project Identity & Stack
- **Domain:** Production-grade Learning Management System (LMS).
- **Core Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Data & Auth:** Prisma ORM, Neon PostgreSQL (`@prisma/adapter-neon`), Better Auth.
- **Quality Tooling:** Biome (lint & format), Jest, Knip.

## 2. Architecture & Layer Boundaries
Strict downward dependency flow:
```
UI (Server & Client Components)
  ↓
Actions / Route Handlers (@/actions/*, @/app/api/*)
  ↓
Domain Services (@/services/*)
  ↓
Repositories (@/repositories/*)
  ↓
Database (Prisma + Neon PostgreSQL)
```
- **UI:** Presentation only. Never import Prisma or repositories directly.
- **Actions / Routes:** Input validation (Zod) and auth guards only. Must return `ActionResult<T>`. No business logic.
- **Services:** All business logic, transaction boundaries, and state transitions live here.
- **Repositories:** Data access and queries only. No business logic.
- **Database:** Managed via Prisma schema and Neon migrations.

## 3. Agent Operating Workflow
Antigravity must follow the operating system defined in:
`.agents/rules/operating-system.md`

Follow the 11-step cognitive cycle:
Understand → Inspect → Route Skills → Verify Architecture → Plan → Implement → Verify → Audit → Document → Git Review → Report.

## 4. Skill Routing & Context Control
Do NOT load all skills for every task. Consult:
`.agents/rules/skill-router.md`
Select the **minimum sufficient skill set** matching the task intent before reading detailed guides.

## 5. Source of Truth Hierarchy
1. **Actual Code & Tests:** Ground truth of runtime behavior and contracts.
2. **`docs/`:** Project documentation, architecture guides, and ADRs.
3. **`.agents/`:** Operating rules and specialized skill instructions.
4. **General AI Knowledge:** Fallback only. Never prioritize over repository evidence.
*If documentation conflicts with tested code, investigate and escalate instead of guessing.*

## 6. Safety & Behavior Invariants
- Never expose secrets, credentials, or private keys.
- Never claim a check or test passed if it was not executed.
- No destructive Git commands (`reset --hard`, `clean -fd`, `push --force`) without explicit approval.
- Minimal diffs only: touch strictly what is required for the user request.
- Preserve existing working behavior and tests.

## 7. Error Suppression Policy
Fix the root cause first. Avoid suppressions (`any`, unsafe casts, `@ts-ignore`, `@ts-expect-error`, `biome-ignore`, `eslint-disable`) as shortcuts.
A suppression is permissible only when technically justified, narrowly scoped, documented when non-obvious, and preferable to a worse workaround.

## 8. Escalation & Stop Rules
When encountering architectural conflicts, domain ambiguities, security boundary uncertainties (e.g., 403 vs 404), or destructive schema changes:
**STOP immediately** and report using the escalation protocol in `.agents/rules/operating-system.md`.
