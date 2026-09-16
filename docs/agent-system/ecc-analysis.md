# Comprehensive Study of ECC & Architectural Improvements for our Next.js LMS Agent OS

> **Document Status:** Complete Architecture & Synthesis Report  
> **Author:** Antigravity AI Pair Programmer  
> **Target System:** Next.js LMS Agent Operating System  
> **Reference System:** Everything Claude Code (ECC) — [affaan-m/ecc](https://github.com/affaan-m/ecc)  
> **Scope:** Development & Agent Operating System (Workflow, Context, Tooling, Quality Gates)

---

## 1. Executive Summary

This report evaluates **Everything Claude Code (ECC)** as a reference architecture to improve the Agent Operating System in our Next.js LMS project. 

The objective of this analysis is **not** to replicate or transplant ECC into our repository. ECC is designed as a universal, multi-harness system comprising 68 agents, 292 skills, 94 legacy command shims, and complex hook runtimes across 7 different platforms. Blindly copying ECC into our codebase would cause severe context rot, operational bloat, tooling mismatches, and confusion between general-purpose patterns and our strict 5-layer LMS architecture.

Instead, our goal is to **learn from ECC's highest-value design patterns** and selectively adapt them to build a **smaller, tighter, more deterministic, and token-efficient Agent Operating System** specifically tailored to our stack:
- **Next.js 16 (App Router) & React 19**
- **TypeScript 5.9 (Strict Mode)**
- **Prisma ORM & Neon PostgreSQL** (`@prisma/adapter-neon`)
- **Better Auth 1.7** (Sessions, Roles, Permissions)
- **Biome 2.5** (Lint & Format), **Jest 30**, **Knip 6.34**, **pnpm 10.5**
- **Antigravity & OpenCode** runtime environments
- **GitHub CLI (`gh`)** for native version control

### Key Insights from ECC
1. **Context Window Economics Over Feature Count:** ECC's greatest operational lesson is that context is a finite, degrading resource. Massive always-loaded prompt rules and sprawling MCP schemas degrade model reasoning. Replacing bloated MCPs with targeted CLI tools (`gh`, `pnpm`, `prisma`) and shifting from always-loaded rules to on-demand skills yields dramatic token savings and reduces hallucinations.
2. **Specialized Fresh-Context Subagents for Review & Planning:** ECC excels at delegating high-load tasks (planning, multi-axis code review, security audits, dead-code detection) to isolated subagents so the main orchestrator conversation remains lean.
3. **Strict Separation of Concerns Across Agent Roles:** Separating the "builder" from the "reviewer" and isolating the "spec compliance" axis from the "standards compliance" axis prevents confirmation bias.
4. **Minimal Diff Doctrine in Fixers:** Error resolution specialists (e.g., build error resolvers) must prioritize the absolute smallest change to turn CI green, strictly forbidding architectural redesigns or tangential refactoring during repair cycles.

### What Must NOT Be Adopted
- **ECC's Monolithic Scale:** We reject importing 68 agents and 292 skills. Our repository needs a curated set of high-impact skills directly aligned with our 5-layer architecture.
- **Foreign Tooling & Command Mismatches:** ECC uses `npm`, `eslint`, `package-lock.json`, and `pytest`. Our project runs on `pnpm`, `biome`, and `jest`. (A previous raw copy of ECC's `build-error-resolver` into our repository proved this risk by erroneously prescribing `npm run build` and `npx eslint`).
- **Heavy Hook Daemons & Runtimes:** ECC's hook system requires platform-specific background daemons and JSON hook manifests. Antigravity and OpenCode do not require daemonized hook infrastructure; clean markdown behavioral contracts and git pre-commit gates achieve the same rigor without runtime fragility.
- **Pollution of Domain Invariants:** Universal agent concepts must never override or dilute our 5-layer downward dependency hierarchy, 4-tier authorization doctrine, or database locking patterns.

---

## 2. Existing Agent OS Assessment

### 2.1 Current Artifacts & State
Our repository already possesses a strong, thoughtful agent foundation:

1. **`AGENTS.md` (Root Entrypoint):**
   - Defines project identity, technology stack, 5-layer hierarchy, downward dependency direction, source-of-truth precedence, and safety invariants.
   - Extremely high signal-to-noise ratio.
2. **`.agents/rules/operating-system.md`:**
   - Defines an 11-step cognitive workflow: `Understand → Inspect → Route Skills → Verify Architecture → Plan → Implement → Verify → Audit → Document → Git Review → Final Report`.
   - Establishes an explicit Definition of Done (DoD), an error suppression policy (mandatory root-cause fix before suppression), and a 7-trigger Escalation/STOP protocol.
3. **`.agents/rules/skill-router.md`:**
   - Implements a decision tree to load the **minimum sufficient skill set** based on task intent and affected layers.
   - Prohibits loading orthogonal skills (e.g., no database skills for UI styling).
4. **`.agents/rules/github-safety.md`:**
   - Enforces non-destructive git workflows, pre-commit/pre-push inspection, and approval gates for pushing branches, force pushes, and PR merges.
5. **`.agents/rules/graphify.md`:**
   - Connects the agent to the `graphify-out/` AST knowledge graph for codebase navigation without burning context on blind searches.
6. **Project Skills (`.agents/skills/`):**
   - LMS core domain skills: `lms-architecture`, `lms-domain`, `lms-database`, `lms-auth-security`, `lms-nextjs`, `lms-ui-ux`, `lms-frontend-quality`, `lms-testing`.
   - Operational skills: `code-review` (Matt Pocock 2-axis model), `github-pr`, `handoff`, `improve-codebase-architecture`, `refactor-cleaner`, `security-best-practices`, `thermo-nuclear code quality review`, `web-design-guidelines`, `next-dev-loop`, `goey-toast`, `search-registry-items`, `caveman`.

### 2.2 Critical Gaps & Anti-Patterns in Our Current Setup
During our inspection, several specific weaknesses were uncovered:

1. **The Unadapted Copy-Paste Defect (`.agents/rules/build-error-resolver.md`):**
   - This file was placed in `.agents/rules/` (meaning it is treated as an always-loaded rule!).
   - It contains frontmatter (`model: sonnet`, `tools: Read, Write...`) indicating it was copied directly from an agent definition.
   - It prescribes `npm run build`, `npx eslint . --ext .ts,.tsx`, and `rm -rf package-lock.json && npm install`. This project uses `pnpm`, `biome`, and `tsc --noEmit`.
   - It references foreign agents (`when NOT to use: use refactor-cleaner, architect, planner, tdd-guide`).
   - *Impact:* Burns prompt context on every interaction while giving the agent incorrect instructions.
2. **Unanchored External Skill References:**
   - `.agents/skills/code-review/SKILL.md` references `docs/agents/issue-tracker.md` and `/setup-matt-pocock-skills`, which do not exist in this repository.
   - `.agents/skills/security-best-practices/SKILL.md` refers to a `references/` directory containing `<language>-<framework>-security.md` files that are missing.
   - *Impact:* The agent attempts to read missing files or halts with broken context.
3. **Missing Specialization in Review & Verification:**
   - While `operating-system.md` includes an "Audit" step, there is no standardized subagent prompt or checklist for TypeScript edge cases (Next 16 async params, Prisma nullability, Zod inference) or LMS security boundaries (4-tier auth check).
4. **Absence of a Dedicated TDD Workflow:**
   - `lms-testing` details testing libraries and mock patterns, but lacks the structured Red-Green-Refactor operational protocol that makes TDD repeatable in agent pairs.

---

## 3. Detailed ECC Study as a Reference Architecture

### 3.1 The 10 Target ECC Concepts
We analyzed the 10 specific ECC agent and workflow archetypes highlighted in the task:

| ECC Component | Core Responsibility in ECC | Architectural Mechanism | Strengths | Weaknesses / Risks for Our LMS |
|---|---|---|---|---|
| **`planner`** | High-level planning for features & refactors | Requirements breakdown, step-by-step sequencing, risk/mitigation analysis, phase estimation | Highly structured, requires explicit success criteria before code execution | Generates broad plans without layer-specific boundaries (doesn't know about our 5-layer stack) |
| **`architect`** | System design, modularity & trade-offs | Evaluates pros/cons/alternatives, documents trade-offs in ADR format, enforces modularity | High architectural discipline; prevents premature complexity | Can become academic if disconnected from actual database constraints and ORM schemas |
| **`code-reviewer`** | Multi-axis post-implementation audit | Separates Standards from Spec; audits Fowler smells, scope creep, and PR readiness | Two-axis separation prevents standard violations from hiding spec bugs | ECC's code-reviewer is generic and doesn't verify LMS layer boundaries or Prisma/Server Action contracts |
| **`security-reviewer`** | OWASP Top 10 & vulnerability scanner | Scans inputs, auth, secrets, SSRF, injection; uses `npm audit` and static analysis | Proactive vulnerability hunting before commit | References npm tools; does not enforce our 4-tier LMS authorization model or HTML sanitization pipeline |
| **`typescript-reviewer`** | Deep type safety & idiomatic TS review | Audits type inference, `any` leakage, async correctness, PR base branch diffs | Thorough TS hygiene, checks merge readiness before review | Heavy overlap with modern Biome + TypeScript compiler; can be slow if treated as a full agent |
| **`tdd-guide`** | Test-driven development enforcement | Red-Green-Refactor cycle: write failing test, verify failure, write minimal code, verify pass | Guaranteed test coverage; prevents untestable spaghetti code | Can create rigid cycles for simple UI tweaks; needs layer-awareness (service vs UI) |
| **`build-error-resolver`** | Minimal-diff build & type repair | Isolates compilation/type failures; forbids refactoring; makes surgical fixes | Extremely fast, prevents agents from breaking architecture while fixing types | Prone to copy-pasting wrong toolchains (as happened in our own repo previously) |
| **`doc-updater`** | Syncing documentation & codemaps | AST analysis, codemap generation, updating READMEs and ADRs | Prevents documentation drift; treats docs as first-class artifacts | Generates massive codemap markdown files that consume substantial repository space |
| **`spec-miner`** | Behavioral discovery from brownfield code | Extracts flat Requirement (WHEN→THEN) and Invariant blocks; sample-and-expand token strategy | Brilliant token budgeting; discovers implicit business rules without reading entire repo | Overkill for everyday greenfield/feature tasks; best reserved for undocumented legacy areas |
| **`e2e-runner`** | Critical user journey testing | Uses Agent Browser / Playwright; captures screenshots, traces; manages flaky tests | Validates real user experience across browser boundaries | Requires browser runner dependencies and running server; high overhead for unit-level changes |

### 3.2 Skills vs. Agents vs. Commands vs. Rules in ECC
ECC provides crucial clarity on how these concepts differ:
1. **Skills (Primary Workflow Surface):** Reusable, on-demand procedure bundles containing prompts, execution patterns, and domain references. Loaded *only when needed*.
2. **Subagents (Isolated Context Execution):** Ephemeral agent invocations with dedicated, sandboxed context and restricted tool sets. Used for deep-dive tasks (like 400-word code reviews or heavy planning) so the orchestrator's context window is not saturated.
3. **Commands (Legacy Shims):** User-facing shortcuts (`/plan`, `/tdd`) that delegate to underlying skills. ECC is transitioning to skills-first.
4. **Rules (Always-Loaded Constraints):** Global instructions loaded on *every single interaction*. ECC explicitly cautions against loading too many rules because every rule directly steals context window capacity and increases instruction drift.
5. **Hooks (Lifecycle Events):** Automation triggers on `PreToolUse`, `PostToolUse`, `Stop`, and `PreCompact`. ECC highlights using `Stop` hooks for memory persistence rather than `UserPromptSubmit` hooks to eliminate per-turn latency.

---

## 4. Comprehensive Comparison & Decision Matrix

Each significant capability from ECC is classified under one of five actionable verdicts:
- **`KEEP`**: Already implemented correctly in our project.
- **`ADAPT`**: A high-value idea from ECC, redesigned for our 5-layer Next.js LMS stack.
- **`ADD`**: A missing capability that delivers measurable value.
- **`REJECT`**: Inappropriate, redundant, overly complex, or incompatible with our environment.
- **`DEFER`**: Useful in the future but currently unjustified.

### 4.1 Comparative Analysis Table

| ECC Concept | Our Existing Equivalent | Gap in Existing System | Potential Improvement | Action | Justification |
|---|---|---|---|---|---|
| **Small Router Pattern** | `.agents/rules/skill-router.md` | Skill router contains planned skills that aren't fully integrated; some existing skills aren't mapped | Tighten router algorithm; ensure all real skills are routed; enforce strict layer isolation | **KEEP / ADAPT** | Our existing router is already well-designed. Adapting it to remove phantom references and include real tools keeps context minimal. |
| **Planner Agent** | Step 5 in `operating-system.md` & Planning Mode | Step 5 is generic; lacks structured 5-layer breakdown and phase-by-phase risk assessment | Add a structured LMS planning template to `lms-architecture` covering DB → Repo → Service → Action → UI | **ADAPT** | Planning is essential for our LMS. An adapted planning workflow enforces 5-layer separation from step 0. |
| **Architect Agent** | `lms-architecture` skill & `docs/decisions/` | `lms-architecture` defines boundaries, but lacks a guided trade-off evaluation & ADR creation workflow | Add ADR authoring workflow following `docs/decisions/TEMPLATE.md` directly within `lms-architecture` | **ADAPT** | A separate standalone architect agent is redundant, but embedding trade-off evaluation into `lms-architecture` elevates decision quality. |
| **Two-Axis Code Review** | `.agents/skills/code-review/SKILL.md` | Skill contains broken references to Matt Pocock setup and lacks LMS 5-layer boundary audit | Clean out external dependencies; anchor Standards axis in our 5 layers, Biome, and LMS invariants | **ADAPT** | The two-axis model (Standards vs Spec in parallel subagents) is brilliant because it prevents context pollution and bias. |
| **Security Reviewer** | `security-best-practices` & `lms-auth-security` | `security-best-practices` references nonexistent external files; missing 4-tier auth checks | Consolidate security checks into `lms-auth-security` covering OWASP + our 4-Tier Auth Doctrine & sanitization pipeline | **ADAPT** | Unifies security auditing into a single authoritative skill that knows both general web vulnerabilities and LMS invariants. |
| **TypeScript Reviewer** | Compiler checks (`pnpm typecheck`) & DoD | No dedicated review checklist for Next 16 async params, Prisma nullability, or Server Action types | Embed a TypeScript review checklist into the verification/audit pipeline rather than spawning an expensive agent | **ADAPT** | A dedicated TS agent burns excessive tokens when `pnpm typecheck` + Biome already catch 95% of issues. A checklist covers the rest. |
| **TDD Guide** | `lms-testing` skill | `lms-testing` documents Jest and mocks, but lacks a strict Red-Green-Refactor operational sequence | Add an explicit Red-Green-Refactor protocol to `lms-testing` for Service and Action mutations | **ADAPT** | TDD prevents brittle regressions in LMS domain services (e.g. curriculum reordering, progress tracking). |
| **Build Error Resolver** | `.agents/rules/build-error-resolver.md` | File is misplaced in `rules/`, loaded globally, uses `npm`/`eslint`, and references foreign agents | Move to `.agents/skills/build-error-resolver/SKILL.md`, update to `pnpm`/`biome`/`tsc`, enforce minimal-diff doctrine | **ADAPT** | The minimal-diff concept is vital for preventing agents from rewriting architecture during compilation fixes. |
| **Doc Updater & Codemaps** | `graphify-out/` AST graph & `docs/INDEX.md` | No automated synchronization between delivered PRs and `docs/decisions/` or `docs/Architecture.md` | Add a lightweight documentation sync checklist to `github-pr` and integrate `graphify update .` post-build | **ADAPT** | Full AST codemap generation is already handled by Graphify. A lightweight sync checklist prevents documentation drift. |
| **Spec Miner** | Hand-crafted docs in `docs/domain/` | No structured method to extract flat behavioral specs (Requirements & Invariants) from existing code | Document a "Sample-and-Expand" spec extraction workflow template in `docs/agent-system/` | **ADAPT** | Highly valuable technique for onboarding or auditing legacy modules without token blowout. Kept on-demand as a workflow guide. |
| **E2E Test Runner** | `next-dev-loop` & browser subagent tools | No Playwright test harness configured in `package.json`; E2E tests not yet formalized | Defer dedicated E2E runner until Playwright suite is added; continue using browser subagents for manual UI validation | **DEFER** | Cannot run automated E2E tests without test framework dependencies installed in the codebase. |
| **68 Specialized Agents** | Antigravity built-in roles & subagents | None — we don't have 68 agents | Keep our agent model unified; spawn specialized subagents on-demand using skills | **REJECT** | 68 agents is massive over-engineering. Antigravity handles diverse tasks using skills loaded into general-purpose subagents. |
| **292 Multi-Language Skills** | Curated `.agents/skills/` | None — we only support our TypeScript/Next.js/PostgreSQL stack | Restrict skills strictly to technologies in our `package.json` and architectural stack | **REJECT** | Retaining Go, Python, Django, Flutter, Rust, or C# skills adds pure noise and confusion to a Next.js LMS repo. |
| **Runtime Hooks Daemon** | Antigravity lifecycle & Git pre-commit | No background hook daemon | Rely on native Git hooks (Husky / lint-staged) and Antigravity workflow rules | **REJECT** | Background daemons add process instability and platform coupling. Git hooks and behavioral rules provide deterministic enforcement. |
| **Session Handoff / Memory** | `.agents/skills/handoff/SKILL.md` | Handoff skill exists but is basic; doesn't standardize evidence logging (worked / failed / pending) | Enhance `handoff` skill to record verified approaches, failed attempts, and remaining tasks | **ADAPT** | Preserves context across long debugging or refactoring sessions without stateful external databases. |
| **Refactor Cleaner** | `.agents/skills/refactor-cleaner/SKILL.md` | Skill mentions `npx eslint` and contains raw ECC agent frontmatter | Clean to use `pnpm knip`, `pnpm biome check`, and strictly scoped deletions | **ADAPT** | Dead code removal is critical, but the tooling commands must match our project. |

---

## 5. Universal vs. LMS-Specific Separation

To prevent the Universal Agent OS from being contaminated by project-specific details (and vice versa), the system is partitioned into two distinct architectural layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          UNIVERSAL AGENT OS                                 │
│  (Portable across Next.js, OpenCode, Antigravity, and future web projects)  │
├─────────────────────────────────────────────────────────────────────────────┤
│  • 11-Stage Cognitive Lifecycle (Understand → Inspect → Plan → ...)        │
│  • Context Optimization & Minimal Sufficient Context Doctrine               │
│  • Subagent Delegation Pattern (Isolated context for Reviews & Audits)      │
│  • Two-Axis Code Review (Standards vs. Spec Compliance)                     │
│  • Minimal Diff Doctrine for Error & Build Repair                           │
│  • Red-Green-Refactor TDD Sequence                                          │
│  • Safe GitHub CLI (`gh`) Pipeline & Pre-PR Quality Gates                   │
│  • Session Handoff & Memory Persistence Protocol                            │
│  • Error Suppression & Root-Cause Resolution Hierarchy                      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          LMS-SPECIFIC LAYER                                 │
│         (Bound strictly to this repository, domain, and dependencies)       │
├─────────────────────────────────────────────────────────────────────────────┤
│  • 5-Layer Architectural Hierarchy (UI → Actions → Services → Repos → DB)   │
│  • 4-Tier Authorization Doctrine (Auth → Role → Ownership → Lifecycle)      │
│  • Concurrency Invariant: Course Row Locking (SELECT ... FOR UPDATE)        │
│  • Atomic Two-Phase Curriculum Reordering Protocol                          │
│  • Explicit Media Sanitization Pipeline (marked → sanitize-html)            │
│  • Next.js 16 App Router & React 19 Server/Client Component Boundaries       │
│  • Better Auth Session & Role Enforcement Guards                            │
│  • Prisma ORM & Neon Connection Pooler Configuration                        │
│  • Tooling Suite: pnpm, Biome, Jest, Knip, TypeScript Strict Mode           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Invariant:
Universal rules must **never** reference Prisma models, LMS entities, or Better Auth tables.  
LMS skills must **strictly inherit** and enforce the Universal OS cognitive cycle and verification gates.

---

## 6. Target Agent Operating System Architecture

The improved Next.js LMS Agent OS organizes intelligence into three tiers:
1. **Always-Loaded Behavioral Rules (`.agents/rules/`):** Kept ultra-lightweight (< 500 total lines) to preserve token budget.
2. **Context-Efficient Skill Router (`.agents/rules/skill-router.md`):** Dispatches tasks to specific skills based on intent and affected layers.
3. **On-Demand Domain & Workflow Skills (`.agents/skills/`):** Loaded only when triggered, containing rich technical depth and executable guidance.

### 6.1 Architectural Topology

```
                                 [USER REQUEST]
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │         AGENTS.md (Root)          │
                     │  • Stack Identity & Layers        │
                     │  • Source of Truth Precedence     │
                     └─────────────────┬─────────────────┘
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │   .agents/rules/operating-system  │
                     │  • 11-Stage Cognitive Cycle       │
                     │  • Escalation & STOP Triggers     │
                     │  • Definition of Done             │
                     └─────────────────┬─────────────────┘
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │    .agents/rules/skill-router     │
                     │  • Intent & Layer Analysis        │
                     │  • Minimum Sufficient Loading     │
                     └─────────────────┬─────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
  [PLANNING & DESIGN]          [BUILD & EXECUTE]            [VERIFY & REVIEW]
  • lms-architecture           • lms-nextjs (UI/Actions)    • code-review (2-axis)
  • lms-domain                 • lms-database (Repos/Prisma)• lms-auth-security
  • (Ad-hoc spec-miner)        • lms-ui-ux (Tailwind/Radix) • build-error-resolver
                               • lms-testing (TDD/Jest)     • refactor-cleaner
                                                            • github-pr (gh CLI)
```

---

## 7. Operational Workflows & Pipelines

### 7.1 The End-to-End GitHub & Development Pipeline
Combining ECC's review discipline with our native `gh` workflow:

```
[1. Issue / Task Ingestion]
  ↓ (Categorize intent, inspect relevant files only)
[2. Architectural Verification & Planning]
  ↓ (Verify layer boundary; plan phases: DB → Repo → Service → Action → UI)
[3. TDD Cycle (Red-Green-Refactor)]
  ↓ (Write failing unit/service test → Minimal implementation → Pass → Refactor)
[4. Quality Gate 1: Local Change Verification]
  ↓ (Run change-aware checks: pnpm biome check <files>, pnpm typecheck, pnpm test)
[5. Quality Gate 2: Two-Axis Subagent Code Review]
  ↓ ┌─────────────────────────┐     ┌─────────────────────────┐
    │  Standards Subagent     │     │  Spec Subagent          │
    │  • 5-Layer compliance   │     │  • Requirements met     │
    │  • Biome / smell checks │     │  • Scope creep check    │
    └────────────┬────────────┘     └────────────┬────────────┘
                 └──────────────┬────────────────┘
                                ▼
[6. Quality Gate 3: Security Audit]
  ↓ (OWASP check + 4-Tier Auth Doctrine: Auth, Role, Ownership, Lifecycle + Sanitization)
[7. Quality Gate 4: Full Project CI Simulation]
  ↓ (Run: pnpm check && pnpm test)
[8. Git Commit & PR Preparation]
  ↓ (Inspect git diff --staged; ensure no secrets; create PR via gh pr create)
[9. PR Review, Fix & Merge]
  ↓ (Inspect PR checks: gh pr checks; review comments; merge: gh pr merge --squash)
```

### 7.2 Context & Token Economics Strategy
To ensure maximum reasoning capability and prevent context degradation:

1. **Rule File Budgeting:** No file in `.agents/rules/` shall exceed 200 lines. The total always-loaded rule footprint must stay under 8,000 tokens.
2. **Move Misplaced Rules to Skills:** `build-error-resolver.md` is immediately removed from `.agents/rules/` and moved to `.agents/skills/build-error-resolver/SKILL.md`. It must never be loaded unless a build error has occurred.
3. **Subagent Context Isolation:** Code reviews, security audits, and architectural scans must be delegated to ephemeral subagents. Returning a concise 400-word summary to the main thread saves 80–90% of the tokens that would otherwise be consumed by raw diffs and intermediate thinking.
4. **Prefer CLI Tools Over Heavy MCPs:** Never install redundant MCP servers (e.g., GitHub MCP, Postgres MCP, File System MCP) when standard CLI tools (`gh`, `pnpm`, `prisma`) and native agent tools (`run_command`, `view_file`) perform the work natively without injecting massive JSON tool schemas into every prompt.

---

## 8. Implementation Plan & File-by-File Changes

The improvements identified in this study will be executed cleanly in a dedicated execution phase, strictly touching agent configuration files without altering application logic or dependencies.

### 8.1 Files to Remove / Relocate
| Source File | Destination | Rationale |
|---|---|---|
| `.agents/rules/build-error-resolver.md` | `.agents/skills/build-error-resolver/SKILL.md` | **Fixes critical anti-pattern.** Stops this file from being loaded as an always-active rule; updates commands to `pnpm` and `biome`. |

### 8.2 Files to Modify & Improve
| Target File | Modifications | Rationale |
|---|---|---|
| `.agents/rules/operating-system.md` | • Integrate subagent review protocol into Step 8 (Audit).<br>• Add minimal-diff doctrine to Step 6/7.<br>• Clarify change-aware commands using actual `pnpm` scripts. | Elevates review rigor and operational discipline using ECC's best practices. |
| `.agents/rules/skill-router.md` | • Remove nonexistent skills and clean up table.<br>• Map `build-error-resolver` as an emergency reactive skill.<br>• Add subagent delegation guidance for heavy reviews. | Keeps the router lightweight and ensures 100% of referenced skills actually exist. |
| `.agents/skills/code-review/SKILL.md` | • Remove broken references to `docs/agents/issue-tracker.md` and Matt Pocock setup.<br>• Update Standards subagent prompt to explicitly audit LMS 5-layer boundaries and Biome rules.<br>• Retain the parallel two-axis execution structure. | Eliminates dead links and grounds the review skill in real repository contracts. |
| `.agents/skills/refactor-cleaner/SKILL.md` | • Remove `eslint` references and ECC-specific frontmatter.<br>• Configure to run `pnpm knip` and `pnpm biome check`.<br>• Enforce safety checklist before deletions. | Adapts ECC's dead-code specialist to our actual tooling stack. |
| `.agents/skills/lms-testing/SKILL.md` | • Add an explicit Red-Green-Refactor operational section.<br>• Define TDD steps for Domain Services and Server Actions. | Bridges the gap between test theory and practical test-first execution. |
| `.agents/skills/lms-auth-security/SKILL.md` | • Consolidate generic web vulnerability checks (OWASP Top 10) alongside our 4-Tier Authorization Doctrine.<br>• Add pre-commit security checklist. | Provides a complete, unified security review surface without needing external files. |
| `.agents/skills/handoff/SKILL.md` | • Structure handoff output into: Verified Approaches, Failed Attempts, Remaining Invariants, and Suggested Next Skills. | Adopts ECC's structured session memory pattern to eliminate context loss between agent sessions. |

### 8.3 Files to Clean / Remove (Housekeeping)
| Target File | Action | Rationale |
|---|---|---|
| `.agents/skills/security-best-practices/` | Retire / Consolidate into `lms-auth-security` | Empty shell referencing missing `references/` directory. Duplicate of `lms-auth-security`. |
| `.agents/skills/thermo-nuclear code quality review/` | Consolidate core heuristics into `code-review` and remove directory | Folder name with spaces is an antipattern; its best heuristics (no random spaghetti, < 1k line files) belong in our standard review. |

---

## 9. Risks, Trade-offs & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Context Bloat from Excessive Skills** | Slow responses, lost instructions, higher token cost | Enforce strict lazy-loading via `skill-router.md`. Keep rule files under 200 lines. |
| **Toolchain Desynchronization** | Agent runs nonexistent commands (e.g. `npm run build`), causing build failures | Strict review of all skill instructions against `package.json` scripts (`pnpm check`, `pnpm test`, `pnpm db:*`). |
| **Subagent Hallucination in Code Review** | Subagent misses real bugs or reports phantom violations | Ground subagent prompts with exact file paths, commit diffs, and explicit layer rules. |
| **Over-Engineering Agent Infrastructure** | Brittle workflows, hard-to-maintain agent rules | Ban custom daemons, external Python scripts, and unnecessary MCPs. Rely solely on Markdown contracts and standard CLI tools (`pnpm`, `gh`). |
| **Premature TDD on Rapid UI Prototyping** | Slows down purely visual styling adjustments | Scope TDD strictly to Domain Services, Server Actions, and Repositories. Allow UI components to use component test verification. |

---

## 10. Conclusion

By studying ECC, we have extracted its most potent capabilities — **two-axis subagent reviews, minimal-diff error resolution, context window economics, disciplined planning, and structured session memory** — while discarding its operational baggage (68 redundant agents, 292 irrelevant skills, platform daemons, and foreign package managers).

The resulting architecture strengthens our 5-layer Next.js LMS development process, guarantees strict layer and authorization enforcement, maximizes token efficiency, and remains completely compatible with Antigravity and OpenCode.
