# Skill Router — Context-Efficient Agent Orchestration

This rule defines how Antigravity selects and loads skills. Its primary purpose is **context optimization** by preventing prompt and context window bloat.

---

## A. Routing Algorithm
When handling any user request, follow this sequential routing algorithm:
1. **Identify Task Intent:** What is the specific outcome? (e.g. adjust styling, fix a service calculation, add a schema field, build a page).
2. **Identify Affected Layers:** Which of the 5 layers are touched? (`UI`, `Actions/Routes`, `Services`, `Repositories`, `Database`).
3. **Identify Risk Area:** Does this touch security, authorization, data integrity, or public UI contracts?
4. **Select Minimum Sufficient Skills:** Pick only the primary skills required for the immediate task.
5. **Progressive Loading:** Load secondary skills only if implementation or verification evidence reveals a need.
6. **Exclude Non-Relevant Skills:** Never load database or auth skills for UI styling tasks; never load UI skills for service logic tasks.

---

## B. Skill Ecosystem Status

### 1. Planned Project Skills (To Be Implemented in Later Phases)
The router is designed around these targeted LMS skills:
- **`lms-domain`:** Course lifecycle, module/lesson hierarchy, enrollment, progress invariants.
- **`lms-architecture`:** 5-layer separation, dependency directions, Server/Client boundary.
- **`lms-nextjs`:** App Router, Server Components, Server Actions (`ActionResult<T>`), streaming.
- **`lms-database`:** Prisma repositories, Neon pooler, row locking (`FOR UPDATE`), P2002 retry loops.
- **`lms-auth-security`:** Better Auth, RBAC guards (`requireRole`), course ownership, input sanitization.
- **`lms-ui-ux`:** Preferred design tokens, concentric radii, 3-layer shadows, press feedback, 40×40px hit areas.
- **`lms-frontend-quality`:** Anti-slop detection, accessibility checks, dark mode consistency.
- **`lms-testing`:** Jest and React Testing Library strategy per layer.

### 2. Existing Installed Skills (Currently Available)
Use these existing installed skills when their specific domain is involved:
- **Better Auth Skills:** `better-auth-best-practices`, `better-auth-security-best-practices`, `create-auth`, `email-and-password-best-practices`, `organization-best-practices`, `two-factor-authentication-best-practices`.
- **`goey-toast`:** When implementing or updating toast notifications.
- **`next-dev-loop`:** When verifying runtime behavior in a running `next dev` instance.
- **`github-pr`:** When preparing pull requests via the GitHub CLI.

---

## C. Skill Routing Matrix

| Task Type | Primary Skills | Add When Needed | Explicitly Avoid |
|---|---|---|---|
| **UI styling only** (color, padding, font) | `lms-ui-ux` | `lms-frontend-quality` | `lms-database`, `lms-auth-security`, `lms-domain` |
| **New UI component** (Dialog, Card, Button) | `lms-ui-ux` | `lms-frontend-quality`, `lms-testing` | `lms-database`, `lms-domain` |
| **UI bug / state issue** (missing loading/empty) | `lms-ui-ux`, `lms-frontend-quality` | `lms-testing` | `lms-database`, `lms-architecture` |
| **Next.js page/layout/route** | `lms-nextjs` | `lms-architecture`, `lms-testing` | `lms-database` (DB belongs in repos) |
| **Server Action** | `lms-nextjs`, `lms-architecture` | `lms-auth-security`, `lms-testing` | `lms-ui-ux` |
| **Service / business logic** | `lms-domain`, `lms-architecture` | `lms-testing` | `lms-ui-ux`, `lms-nextjs` |
| **Course / curriculum behavior** | `lms-domain` | `lms-architecture`, `lms-testing` | `lms-ui-ux` |
| **Repository / data access** | `lms-database`, `lms-architecture` | `lms-testing` | `lms-ui-ux`, `lms-nextjs` |
| **Prisma schema / migration** | `lms-database`, `lms-architecture` | `lms-domain`, `lms-testing` | `lms-ui-ux`, `lms-nextjs` |
| **Auth / RBAC / security** | `lms-auth-security`, `lms-architecture` | `lms-testing`, Better Auth skills | `lms-ui-ux` |
| **Content sanitization** | `lms-auth-security` | `lms-domain`, `lms-testing` | `lms-database` |
| **Testing task** | `lms-testing` | Target layer skill (e.g. `lms-domain`) | Unrelated layer skills |
| **Full-stack feature** | Start: `lms-architecture`, `lms-domain` | Progressive: `lms-nextjs`, `lms-database`, `lms-auth-security`, `lms-ui-ux`, `lms-testing` | Loading all simultaneously at step 1 |
| **Code review** | `lms-architecture`, `lms-testing` | `lms-frontend-quality`, `lms-auth-security` | Generating new features |
| **PR preparation** | `lms-architecture`, `lms-testing` | `github-pr` | Unrelated editing skills |

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
