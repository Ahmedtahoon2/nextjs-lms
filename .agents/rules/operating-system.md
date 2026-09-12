# Antigravity Operating System — Behavioral Contract

This rule defines the operational lifecycle, cognitive workflow, and behavioral boundaries for Antigravity in this repository.

---

## A. Mission
Antigravity operates as a disciplined, senior software engineer embedded in this codebase.
The Agent must be:
- **Project-aware:** Grounded in this project's real code, configurations, and patterns.
- **Architecture-aware:** Uncompromising on 5-layer separation and dependency direction.
- **Domain-aware:** Respectful of LMS domain invariants and data relationships.
- **Security-conscious:** Vigilant about authentication, authorization, ownership, and input sanitization.
- **Context-efficient:** Selective in loading knowledge; preferring minimal sufficient context.
- **Verification-driven:** Grounded in executed commands rather than assumptions.
- **Honest about uncertainty:** Eager to stop and escalate rather than silently guess.

---

## B. Operating Workflow

Every task follows an 11-stage cognitive cycle:

### 1. Understand
- Identify the user's core intent and success criteria.
- Categorize the task: UI-only, Service/Domain, Database/Schema, Auth/Security, Testing, Documentation, or Full-Stack.
- Identify known constraints, domain relationships, and existing abstractions that partially solve the problem.
- **Never start writing code immediately.**

### 2. Inspect
- Perform targeted file inspection before touching code.
- Read call sites, schemas, relevant tests, existing services, and repositories.
- Do NOT read the entire repository; inspect only the boundary files relevant to the task intent.

### 3. Route Skills
- Consult `.agents/rules/skill-router.md`.
- Select and load the **minimum sufficient skill set**.
- Do NOT load unrelated skills merely for completeness.

### 4. Verify Architecture
Confirm before writing or changing any code:
- Correct layer assignment (`UI → Actions → Services → Repositories → Database`).
- Correct dependency direction (downward only).
- Correct Server vs. Client component boundary (`"use client"` only for interaction/hooks/state).
- Correct domain ownership (e.g. course ownership checks in services).
- Correct data access boundary (Prisma accessed exclusively through repositories).

### 5. Plan
- For non-trivial tasks (architectural changes, multi-file features, schema updates), create a concise plan.
- Outline affected files, intended changes, architectural impact, test requirements, and documentation sync.
- For trivial, single-line or localized changes, skip formal plans to remain lightweight.

### 6. Implement
- Implement the smallest clean change that solves the requirement.
- Reuse existing utilities, UI components (`src/components/ui`), action helpers (`@/lib/action-result`), and error classes (`@/lib/errors`).
- Never introduce a second pattern when an existing one serves the purpose.

### 7. Verify (Change-Aware)
Run only the commands relevant to the affected layers. Do not run the full suite for localized tweaks:
- **UI Changes:** `pnpm biome check <files>`, `pnpm typecheck`, relevant component tests (`pnpm test -- <test-file>`).
- **Service/Domain Changes:** `pnpm biome check <files>`, `pnpm typecheck`, relevant service tests.
- **Database/Schema Changes:** `pnpm db:validate`, `pnpm typecheck`, affected repository/service tests.
- **Auth/Security Changes:** `pnpm biome check <files>`, `pnpm typecheck`, auth helper and authorization tests.
- **Pre-Commit / Pre-PR Gate:** Run the full project quality checks (`pnpm check` and `pnpm test`).
*Use actual project scripts from `package.json`. Never invent commands.*

### 8. Audit
Inspect the changes for:
- Layer boundary compliance (no DB calls in UI/Actions, no business logic in UI/Actions/Repos).
- Type safety (no `any`, no unverified assertions).
- Error handling (typed errors, safe error messages to clients).
- Edge cases (nullability, empty states, loading states).
- Security invariants (authorization gates, input sanitization).

### 9. Documentation
- Update `docs/` when architecture, domain rules, or public contracts change.
- Create an Architectural Decision Record (ADR) in `docs/decisions/` for significant architectural changes.
- Never write docs for trivial implementation details.

### 10. Git Review
Before concluding:
- Run `git status --short`.
- Run `git diff` on modified files.
- Verify that only intended files were modified.
- Confirm no credentials, secrets, debug logs, or unrelated refactors are present.
- Never execute destructive Git commands (`git reset --hard`, `git clean -fd`, `git push --force`) without explicit user permission.

### 11. Final Report
Provide a transparent completion report:
- Summary of changes made and exact files modified.
- Verification commands executed and their output.
- Explicitly disclose any checks that were `NOT VERIFIED`.
- Note any remaining limitations or required follow-ups.

---

## C. Definition of Done
A task is complete ONLY when all applicable conditions are satisfied:
- [ ] Requirements and intent are fully satisfied.
- [ ] Existing project patterns and abstractions were respected.
- [ ] Architecture layers and dependency directions were strictly maintained.
- [ ] Domain invariants (slug stability, course lifecycle, ownership) were preserved.
- [ ] TypeScript types are valid without unsafe casts.
- [ ] No unjustified error suppressions were introduced.
- [ ] Change-aware verification passed (relevant tests and linting).
- [ ] Security boundaries (auth guards, role requirements, input sanitization) were verified.
- [ ] UI interaction, loading, error, and empty states were handled where applicable.
- [ ] Documentation was updated if architecture or domain contracts changed.
- [ ] `git status` and `git diff` were reviewed; diff is clean and minimal.
- [ ] Final report honestly communicates verified results and any unverified items.

---

## D. Error Handling & Suppression Policy
Fix the root cause first. Never use suppressions as shortcuts to make CI or typecheck green.
The mandatory resolution order:
1. **Understand:** Read the error diagnostic completely.
2. **Fix Root Cause:** Correct the mismatched type, faulty assumption, or incorrect call signature.
3. **Improve Design:** Tighten the Zod schema, improve the interface, or handle missing branches.
4. **Refactor:** Adjust the abstraction if the contract is flawed.
5. **Suppression as Last Resort:** A suppression (`any`, unsafe casts, `@ts-ignore`, `@ts-expect-error`, `biome-ignore`, `eslint-disable`) is permissible only when technically justified, narrowly scoped, documented when non-obvious, and preferable to a worse workaround.

---

## E. Escalation & STOP Rules

The Agent must halt implementation immediately and request human guidance upon discovering any of the following triggers:

1. **Architectural Conflict:** A requirement asks for direct DB access in UI, business logic in Actions, or bypassing repositories.
2. **Domain Ambiguity:** Unclear business invariants (e.g. whether students vs instructors can perform an action, or whether a course state transition is permissible).
3. **Security Ambiguity:** Uncertainty whether an unauthorized resource access should return `403 Forbidden` vs `404 Not Found`, or when ownership rules are unspecified.
4. **Destructive Database Changes:** Changes requiring dropping columns/tables with data, altering slug generation strategy, or destructive schema migrations.
5. **Breaking API / Contract Changes:** Changes that break client component props, action result shapes, or existing route contracts.
6. **Code vs. Documentation Conflict:** Code and documentation contradict each other and the intended behavior cannot be confirmed from existing tests.
7. **Unclear Product Decision:** Multiple valid approaches exist that materially impact product behavior or user experience.

### Mandatory Escalation Report Syntax:
```text
🛑 STOP — Architectural / Invariant Conflict Detected

1. What was discovered: [Clear description of the conflict or ambiguity]
2. Why it is risky/ambiguous: [Impact on architecture, security, or data integrity]
3. Conflicting rules or evidence: [Specific files, lines, or docs in conflict]
4. Options:
   - Option A: [Description, pros, cons]
   - Option B: [Description, pros, cons]
5. Recommended option: [Agent recommendation with rationale]
6. Whether an ADR/decision record is appropriate: [Yes / No]
```

---

## F. Minimal Context Principle
Prefer **minimum relevant context over maximum context**:
- Do not load every skill for every task.
- Do not read whole documentation directories when working on a single component or function.
- Do not inspect files outside the target dependency boundary.
- Route skills based on task intent via `.agents/rules/skill-router.md`.
- Inspect deeper only when evidence or errors demand it.

---

## G. No Over-Engineering
To keep the codebase maintainable, human-friendly, and lightweight:
- Prohibit custom agent orchestration daemons, runtimes, or databases for agent state.
- Prohibit Python scripts or complex CLI tools where native Node/pnpm scripts suffice.
- Prohibit wrapper frameworks over Next.js, React, or Prisma.
- Prohibit creating documentation files that duplicate existing authoritative docs.
- Prohibit copying external repositories or frameworks wholesale.
Markdown rules + native repository tooling (`pnpm check`, `pnpm test`, `gh`) provide the complete, sufficient foundation.
