# Skill Router — Context-Efficient Agent Orchestration

This rule defines how Antigravity selects and loads skills. Its primary purpose is **context optimization** by preventing prompt and context window bloat.

---

## A. Routing Algorithm & Task Classification

When handling any user request, classify the operational mode first:

```text
Normal task ──────────────► Direct execution / Target layer skill
Build/type failure ───────► Reactive: build-error-resolver
Security-sensitive change ► Guarded: lms-auth-security
Testing/domain behavior ──► TDD: lms-testing + lms-domain
Cross-cutting review ─────► Two-axis: code-review (+ isolated subagents)
```

Follow this sequential decision sequence:
1. **Detect Emergency / Reactive Trigger:** Is there an active compilation, type, or Biome failure? If yes, route immediately to `build-error-resolver` under the minimal-diff doctrine.
2. **Identify Task Intent:** What is the specific outcome? (e.g. adjust styling, fix a service calculation, add a schema field, build a page).
3. **Identify Affected Layers:** Which of the 5 layers are touched? (`UI`, `Actions/Routes`, `Services`, `Repositories`, `Database`).
4. **Evaluate Subagent Delegation (Multi-Factor Heuristic):**
   > **Important Rule:** Diff size is a routing signal, NOT a hard delegation threshold. Never use rigid rules like "diff > 500 lines = subagent".  
   Evaluate multiple risk factors:
   - Diff size and line churn.
   - Number of files touched.
   - Number of architectural layers crossed.
   - Security sensitivity (auth, permissions, sanitization).
   - Database/schema impact (Prisma migrations, transaction boundaries).
   - Complexity and risk of context window pollution.  
   *Example:* A 100-line security or role-checking change may warrant an isolated subagent review. A 700-line generated or localization change may not. Use engineering judgment.
5. **Select Minimum Sufficient Skills:** Load only the primary skills required for the immediate task.
6. **Progressive Loading:** Load secondary skills only if implementation or verification evidence reveals a genuine need.
7. **Exclude Orthogonal Skills:** Never load database or auth skills for UI styling tasks; never load UI skills for service logic tasks.

---

## B. Active Skill Inventory

### 1. LMS Domain & Architectural Skills
- **`lms-architecture`:** 5-layer separation, downward dependency rules, Server/Client boundary, `ActionResult<T>`.
- **`lms-domain`:** Course lifecycle, module/lesson hierarchy, enrollment, progress invariants.
- **`lms-nextjs`:** App Router, Server Components, Server Actions, streaming, async params.
- **`lms-database`:** Prisma repositories, Neon pooler, row locking (`FOR UPDATE`), atomic curriculum reordering.
- **`lms-auth-security`:** 4-tier auth doctrine (Auth, Role, Ownership, Lifecycle), Better Auth, sanitization pipeline, web vulnerability checks.
- **`lms-ui-ux`:** Preferred design tokens, concentric radii, 3-layer shadows, hit areas, visual hierarchy.
- **`lms-frontend-quality`:** Anti-slop detection, accessibility checks, dark mode consistency.
- **`lms-testing`:** Jest and React Testing Library strategy, layer mocks, and operational TDD cycle.

### 2. Operational & Workflow Skills
- **`build-error-resolver`:** Reactive on-demand build/type fix specialist enforcing minimal diffs.
- **`code-review`:** Two-axis subagent review (Standards vs Spec) with structural maintainability heuristics.
- **`refactor-cleaner`:** Conservative dead code and unused export cleanup via `pnpm knip` and `pnpm biome check`.
- **`handoff`:** Cross-agent structured session state persistence.
- **`github-pr`:** Pull request preparation and verification via `gh` CLI.
- **`next-dev-loop`:** Runtime verification in a running `next dev` instance.
- **`goey-toast`:** Toast notifications implementation.

---

## C. Skill Routing Matrix

| Task Type | Primary Skills | Add When Needed | Explicitly Avoid |
|---|---|---|---|
| **Build or TypeScript failure** | `build-error-resolver` | Relevant layer skill (only if diagnostic demands it) | Refactoring or redesign skills |
| **UI styling only** (color, padding, font) | `lms-ui-ux` | `lms-frontend-quality` | `lms-database`, `lms-auth-security`, `lms-domain` |
| **New UI component** (Dialog, Card, Button) | `lms-ui-ux` | `lms-frontend-quality`, `lms-testing` | `lms-database`, `lms-domain` |
| **UI bug / state issue** (missing loading/empty) | `lms-ui-ux`, `lms-frontend-quality` | `lms-testing` | `lms-database`, `lms-architecture` |
| **Next.js page/layout/route** | `lms-nextjs` | `lms-architecture`, `lms-testing` | `lms-database` (DB belongs in repos) |
| **Server Action** | `lms-nextjs`, `lms-architecture` | `lms-auth-security`, `lms-testing` | `lms-ui-ux` |
| **Service / business logic** | `lms-domain`, `lms-architecture` | `lms-testing` (TDD workflow) | `lms-ui-ux`, `lms-nextjs` |
| **Course / curriculum behavior** | `lms-domain` | `lms-architecture`, `lms-testing` | `lms-ui-ux` |
| **Repository / data access** | `lms-database`, `lms-architecture` | `lms-testing` | `lms-ui-ux`, `lms-nextjs` |
| **Prisma schema / migration** | `lms-database`, `lms-architecture` | `lms-domain`, `lms-testing` | `lms-ui-ux`, `lms-nextjs` |
| **Auth / RBAC / security audit** | `lms-auth-security` | `lms-architecture`, `lms-testing` | `lms-ui-ux` |
| **Content sanitization** | `lms-auth-security` | `lms-domain`, `lms-testing` | `lms-database` |
| **Testing task** | `lms-testing` | Target layer skill (e.g. `lms-domain`) | Unrelated layer skills |
| **Dead code cleanup** | `refactor-cleaner` | Target layer skill | Editing active features |
| **Full-stack feature** | Start: `lms-architecture`, `lms-domain` | Progressive: `lms-nextjs`, `lms-database`, `lms-auth-security`, `lms-ui-ux`, `lms-testing` | Loading all simultaneously at step 1 |
| **Code review (local or PR)** | `code-review` | Spawn parallel subagents: Standards + Spec | Unrelated editing skills |
| **Session transition / handoff** | `handoff` | None | Broad codebase edits |

---

## D. Practical Routing Examples

### Example 1: Change button spacing or color
- **Intent:** Visual presentation polish.
- **Load:** `lms-ui-ux` (optionally `lms-frontend-quality` if auditing layout variance).
- **Do NOT Load:** `lms-database`, `lms-auth-security`, `lms-domain`.

### Example 2: Add course publishing validation rule
- **Intent:** Domain business logic in `src/services/course.ts`.
- **Load:** `lms-domain`, `lms-architecture`, `lms-testing`.
- **Do NOT Load:** `lms-ui-ux`, `lms-nextjs`. Add `lms-database` only if repository transactions are modified.

### Example 3: Add instructor-only Server Action
- **Intent:** Action layer boundary with role check and result wrapper.
- **Load:** `lms-architecture`, `lms-auth-security`, `lms-testing`.
- **Add:** `lms-domain` if curriculum or course invariants are touched.

### Example 4: Add new field to Prisma schema
- **Intent:** Database model change and repository adaptation.
- **Load:** `lms-database`, `lms-architecture`, `lms-testing`.
- **Add:** `lms-domain` if the field alters domain business rules.

### Example 5: Full-stack course creation feature
- **Intent:** End-to-end feature across all layers.
- **Progressive Strategy:**
  1. Planning & Domain Phase: Load `lms-architecture` + `lms-domain`.
  2. Data Layer Phase: Load `lms-database`.
  3. Action & Auth Phase: Load `lms-auth-security` + `lms-nextjs`.
  4. UI Presentation Phase: Load `lms-ui-ux` + `lms-frontend-quality`.
  5. Verification Phase: Load `lms-testing`.
- *Do not frontload all skills simultaneously.*

---

## E. Skill Dependency Graph

```text
lms-nextjs ──────────► lms-architecture
lms-database ────────► lms-architecture
lms-auth-security ───► lms-architecture
lms-frontend-quality ► lms-ui-ux
lms-testing ─────────► Target layer skill
lms-domain ──────────► (Independent domain model)
```
- **Invariant:** No circular dependencies exist.
- Each skill focuses strictly on its own responsibility and delegates upward constraints to `lms-architecture`.

---

## F. Core Router Principle
The router is a **disciplined decision mechanism**, not a static checklist.
Before opening any skill or documentation file, the Agent must explicitly ask:
> *"What is the absolute smallest set of skills that gives me enough project-specific context to complete this task safely and correctly?"*
