# Conventions Reference

> **Note:** The comprehensive, canonical coding and architectural standards are defined in **[Coding Standards](../Coding%20Standards.md)** and **[Architecture](../Architecture.md)**. Please refer to those documents as the primary source of truth.

---

## Quick Reference Summary

- **File Naming:** Components (`PascalCase.tsx`), Hooks (`useCamelCase.ts`), Utilities (`camelCase.ts`), Constants (`UPPER_SNAKE_CASE.ts`), Types (`types.ts`).
- **Imports:** Always use `@/...` path aliases. Never use deeply nested relative paths (`../../../../`).
- **Layers:** UI $\to$ Actions $\to$ Services $\to$ Repositories $\to$ Database. Business logic belongs strictly in Services.
- **Components:** Server Components by default; `"use client"` only for state, hooks, or browser event listeners.
- **Design Tokens:** Always use semantic tokens and `cn()`; no hardcoded hex/arbitrary values. See **[Design Tokens](../design/tokens.md)**.

---

## Documentation Change Tags

When updating repository documentation, use these standardized tags in commit messages and change logs:

- `feat` — New feature documentation.
- `fix` — Bug fix documentation or corrections.
- `docs` — Documentation-only modifications.
- `refactor` — Architecture, domain model, or convention changes.
- `perf` — Performance-related documentation.
- `test` — Testing documentation and verification suites.
