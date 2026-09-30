# Antigravity AI Guide — Next.js LMS

Canonical instruction entry point for AI coding agents in this repository.

## 1. Project Identity & Stack

- **Domain:** Production-grade Learning Management System (LMS).
- **Core Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Data & Auth:** Prisma ORM, Neon PostgreSQL (`@prisma/adapter-neon`), Better Auth.
- **Quality Tooling:** ESLint, Prettier, Jest, Knip.

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

Antigravity must follow the operating system and task governance specifications:

- **Operating System:** Orchestration & 11-Step Cognitive Cycle
- **Task Protocol:** Task Tiers, Scope Lock, Approval Gates, & Invariants

Follow the 11-step cognitive cycle:
Understand → Inspect → Route Skills → Verify Architecture → Plan → Implement → Verify → Audit → Document → Git Review → Report.

### 3.1 Risk-Based Task Tiers & Approval Gates

Tasks must be triaged by **risk profile** (architectural, security, database, API contract, domain, concurrency, dependency impact), NOT by line or file count:

- **Tier 1 (PATCH):** Low-risk, local, well-understood changes (typos, CSS polish, isolated bug fix, test adjustment, or an isolated refactor with zero behavior, contract, architectural, data, or security impact).
  - _Workflow:_ Inspect → Edit → Verify. No formal approval gate required.
- **Tier 2 (FEATURE):** Changes introducing or modifying meaningful application behavior using existing data models and security boundaries (new UI component, Server Action, service logic, repository query).
  - _Workflow:_ Inspect → Scoped Plan (with Scope Lock) → **HUMAN APPROVAL GATE** → Implement → Verify → Self-Review.
- **Tier 3 (ARCHITECTURE / HIGH RISK):** Significant architectural, security, database, infrastructure, or concurrency changes (Prisma schema/migrations, Better Auth, RBAC, 4-Layer Security adjustments, row locks, breaking API contracts, any dependency addition/removal).
  - _Workflow:_ Deep Inspect → Architectural Proposal / ADR → **STRICT HUMAN APPROVAL GATE** → Phased Implement → Full Verification → Self-Review → Human Final Review.

### 3.2 The Scope Lock Guardrail

Approval of a plan creates a strict, temporary boundary:

- Every Tier 2/3 plan must state **Allowed Changes** and **Protected / Out of Scope** areas.
- **Zero Unapproved Scope Creep:** If implementation reveals an out-of-scope change is necessary, the agent **MUST STOP IMMEDIATELY** and request approval via a `⚠️ SCOPE EXPANSION DETECTED` notice.

### 3.3 Dependency Installation Guardrail

AI agents must **NEVER** install, remove, upgrade, or downgrade project dependencies (`pnpm add`, `pnpm remove`, `pnpm update`, `npm install`, etc.) without prior explicit human approval. Any dependency addition is automatically **Tier 3**.

## 4. Skill Routing & Context Control

Do NOT load all skills for every task.
Select the **minimum sufficient skill set** matching the task intent before reading detailed guides.

## 5. Source of Truth Hierarchy

1. **Actual Code & Tests:** Ground truth of runtime behavior and contracts.
2. **`docs/`:** Project documentation, architecture guides, and ADRs.
3. **Agent Rules & Skills:** Operating rules and specialized skill instructions.
4. **General AI Knowledge:** Fallback only. Never prioritize over repository evidence.
   _If documentation conflicts with tested code, investigate and escalate instead of guessing._

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
**STOP immediately** and report using the escalation protocol.

## 9. Design Context

Interface design decisions are **not** improvised. Before any UI work:

- **`PRODUCT.md`** (project root) — strategic design context. Register: `product`. Platform: `web`. Primary users: students and instructors, equally. Personality: encouraging, generous, human, with Linear's restraint underneath. Read the five Design Principles before touching a screen. Two audiences are equally primary, so never optimize a screen for one at the cost of the other.
- **`DESIGN.md`** (project root) — the normative visual system. Tokens live in its YAML frontmatter; the six sections carry the rules. Non-negotiables: zero chroma on every neutral, hairline rings at rest with shadow only on hover, radii capped at 14px on cards, 16px floor for anything a user must read to decide something, no status communicated by color alone, and no gradient text / nested cards / side-stripe borders.
- **`.impeccable/design.json`** — machine-readable sidecar (shadow scale, motion tokens, tonal ramps, component snippets). Consult when a token is not in `globals.css`.
- **`src/app/globals.css`** — the OKLCH source of truth. Semantic tokens only; raw Tailwind palette colors are forbidden. `emerald-500` in the progress and sidebar components is a known un-tokenized violation.
- **`.agents/skills/lms-ui-ux/SKILL.md`** — interaction conventions (hit areas, press feedback, state coverage). Its three-layer shadow stack is superseded by `DESIGN.md`'s hairline-at-rest rule.

Accessibility floor for all UI: WCAG 2.2 AA, every animation has a `prefers-reduced-motion` path, and every state carries an icon or text so it survives color blindness and monochrome contexts.
