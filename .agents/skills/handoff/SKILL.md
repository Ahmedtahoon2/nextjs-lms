---
name: handoff
description: Standardize session progress into a durable handoff document for another agent or fresh context to pick up. Captures verified approaches, failed attempts, invariants, and recommended next skills.
argument-hint: "What will the next session be used for?"
---

# Session Handoff Protocol

Use this skill when preparing to end a session, switch agent harnesses (Antigravity, OpenCode, Kilo, Claude Code), or reset context on a complex, multi-stage task.

The handoff document must be completely self-contained so a fresh agent with zero conversation memory can resume work safely and deterministically.

---

## 1. Handoff Document Structure

Save the handoff markdown file to a location designated by the user (or temporary OS directory / `.scratch/handoff-<timestamp>.md`). The document must follow this exact section structure:

```markdown
# Session Handoff: [Feature / Task Name]

**Date / Timestamp:** [ISO 8601 string]  
**Originating Harness:** [Antigravity / OpenCode / Claude Code]  
**Primary Branch:** [branch name]  

---

## Current State
- Concise summary of what has been accomplished in this session.
- Exact files modified, created, or deleted.
- Git status and current HEAD commit summary (`git status --short`, `git log -1 --oneline`).

## Verified Approaches
List all implementations or changes that are verified working, accompanied by empirical evidence:
- **[Approach Name / Change Description]**
  - Command: `pnpm test -- <file>` or `pnpm check`
  - Result: Exit code 0, all tests passed.
  - Proof: [Specific test name or compiler output snippet].

## Failed Approaches
Document every failed attempt, bug, or dead end so the next agent does not repeat it:
- **[Attempted Solution]**
  - What was attempted: [Description].
  - Why it failed: [Error diagnostic, invariant violation, or regression].
  - What NOT to repeat: [Explicit prohibition / guidance].

## Pending Invariants
List the non-negotiable architectural and domain constraints the next agent must preserve:
- [ ] 5-layer hierarchy: Downward dependencies only (`UI → Actions → Services → Repositories → Database`).
- [ ] Concurrency: Parent course row locking (`SELECT ... FOR UPDATE`) inside transactions.
- [ ] Authorization: 4-Tier Doctrine (Auth, Role, Ownership, Lifecycle).
- [ ] Type Safety: Strict TypeScript, zero `any`, ESLint/Prettier compliance.

## Recommended Next Skills
Explicitly recommend the minimum sufficient skills the incoming agent should load:
1. `lms-...` — [Reason for loading].
2. `...` — [Reason for loading].
- Immediate next action: [Precise command or file edit to execute first].
```

---

## 2. Invariants & Security

- **Redact All Secrets:** Never include API keys, database connection strings, passwords, or session tokens in handoff documents.
- **Reference Over Duplication:** Do not paste thousands of lines of code or diffs. Reference specific files and line numbers (`@/src/...#L10-L40`).
