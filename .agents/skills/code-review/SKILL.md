---
name: code-review
description: Review changes since a fixed point (commit, branch, tag, or merge-base) along two separate axes — Standards (LMS 5-layer architecture, maintainability, ESLint/Prettier, security boundaries) and Spec (fidelity to requirements and acceptance criteria). Runs both reviews in parallel subagents.
---

# Two-Axis Code Review

This skill performs a rigorous, two-axis code review of changes between `HEAD` and a specified fixed point (branch, commit, or PR base).

```text
                    REVIEW
                       │
              ┌────────┴────────┐
              │                 │
          STANDARDS            SPEC
              │                 │
       Architecture       Requirements
       Maintainability    Behavior
       Security            Acceptance
       ESLint/Prettier     Edge cases
       Layer boundaries    Regression
```

Both axes run as **isolated parallel subagents** to prevent context window saturation and confirmation bias.

---

## 1. Review Process

### Step 1: Pin the Fixed Point & Scope
1. Determine the comparison base:
   - For PR review: query base branch with `gh pr view --json baseRefName` or default to upstream merge-base (`git merge-base main HEAD`).
   - For local branch review: user-specified ref (`main`, `HEAD~3`, commit SHA).
2. Validate diff resolution:
   ```bash
   git rev-parse <fixed-point>
   git diff --stat <fixed-point>...HEAD
   git log <fixed-point>..HEAD --oneline
   ```
   *If the diff is empty or invalid, stop immediately.*

### Step 2: Identify the Spec Source
Locate the originating requirements in priority order:
1. Issue or PR description via `gh pr view` or `gh issue view <id>`.
2. Commit message body and task description provided in the user prompt.
3. Feature or architecture docs under `docs/` matching the branch or feature.
4. If no written spec exists, prompt the user or instruct the Spec reviewer to report "No spec available — verifying baseline sanity and regressions only."

### Step 3: Standards Axis Grounding

The Standards reviewer evaluates the diff against our canonical LMS architectural rules and maintainability heuristics:

#### A. 5-Layer Architectural Hierarchy & Boundaries
```text
UI (Server & Client Components: @/app/*, @/components/*)
  ↓
Actions / Route Handlers (@/actions/*, @/app/api/*)
  ↓
Domain Services (@/services/*)
  ↓
Repositories (@/repositories/*)
  ↓
Database (Prisma + Neon PostgreSQL)
```
- **Strict Downward Dependency:** Repositories never import services; services never import actions or UI; UI never imports repositories or Prisma client directly.
- **Server Actions Contract:** All Server Actions must return `ActionResult<T>` from `@/lib/action-result`.
- **Component Boundaries:** Server Components by default; `"use client"` restricted strictly to leaves requiring state, hooks, or DOM events.
- **Canonical Helpers:** Reuse `@/lib/action-result`, `@/lib/auth-helpers`, `@/lib/errors`. Never introduce bespoke near-duplicate helpers.

#### B. Maintainability & Structural Quality Heuristics
- **Approaching or Exceeding ~1,000 Lines:** Treat a file crossing or approaching ~1,000 lines as a strong maintainability signal requiring investigation and potential decomposition, NOT as an automatic mechanical violation.
- **Spaghetti Prevention:** No ad-hoc conditionals, scattered special cases, or one-off boolean flags bolted onto shared paths. Push complex conditional branching into dedicated domain policies or state machines.
- **Direct, Boring Code:** Prefer direct, legible code over "magic" mechanisms or thin identity wrappers that add indirection without buying clarity.
- **Type Cleanliness:** Zero `any`, no unverified type assertions, explicit return types on public service methods.

#### C. Smell Baseline (Fowler Heuristics)
- **Mysterious Name:** Identifier doesn't reveal intent.
- **Duplicated Code:** Identical logic in multiple hunks.
- **Feature Envy:** Method reaches into another module's data more than its own.
- **Data Clumps:** Fields or parameters that consistently travel together.
- **Shotgun Surgery:** One logical change scattered across many unrelated files.

---

## 2. Parallel Subagent Delegation

Spawn both subagents in parallel with dedicated, scoped prompts:

### Standards Subagent Prompt
```text
Role: Standards Auditor for Next.js LMS.
Task: Review git diff <fixed-point>...HEAD against repository standards.
Inspect:
1. 5-Layer compliance (UI → Actions → Services → Repositories → Database). Downward dependencies only.
2. Server Action contracts (ActionResult<T>) and Server/Client component separation.
3. Maintainability: No random spaghetti conditionals, canonical helper reuse, investigation of files approaching ~1k lines.
4. Type safety: No 'any', ESLint/Prettier compliance.
Report format: Max 400 words. Group findings by severity (Blocker / Warning / Suggestion) citing file + line number.
```

### Spec Subagent Prompt
```text
Role: Spec Fidelity Auditor.
Task: Compare git diff <fixed-point>...HEAD against the feature requirements / spec.
Inspect:
1. Missing requirements: What did the spec request that was omitted or only partially done?
2. Scope creep: What behaviors exist in the diff that were NOT requested?
3. Edge case handling: Nullability, empty states, error branches.
4. Regressions: Unintended changes to existing behavior.
Report format: Max 400 words. Cite spec requirements and corresponding code lines.
```

---

## 3. Aggregate Review Report

Present the findings under separate headings without collapsing or re-ranking across axes:

```markdown
## Standards Review
[Verbatim or structured findings from Standards subagent]

## Spec Review
[Verbatim or structured findings from Spec subagent]

## Summary
- Standards Findings: [Count] (Worst: [Brief description or None])
- Spec Findings: [Count] (Worst: [Brief description or None])
- Merge Readiness: [Ready / Action Required]
```

### Why Two Axes?
- Code that strictly follows every standard but implements the wrong behavior → **Standards Pass, Spec Fail.**
- Code that perfectly implements the issue but breaks architectural boundaries → **Spec Pass, Standards Fail.**
Reporting them independently ensures neither failure mode is masked.
