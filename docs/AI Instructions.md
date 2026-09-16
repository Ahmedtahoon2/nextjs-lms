# AI Instructions

> **Tool Compatibility (generalized):** Applies to any AI coding assistant. Verified to work with ChatGPT, Codex, Claude Code, Cursor, OpenCode, GitHub Copilot, Aider, Windsurf, Continue.dev, Cline, Roo Code, Tabnine, and any agent supporting the `AGENTS.md` convention or MCP tool servers.

---

# Loading

1. **Preferred:** read `AGENTS.md` at the repo root (auto-detected by Cursor, Claude Code, Aider, Codex CLI, OpenCode).
2. **Tool-specific mirrors** (kept identical to `AGENTS.md`): `CLAUDE.md` (Claude Code), `.cursor/rules/AGENTS.md` or `.cursorrules` (Cursor), `.github/copilot-instructions.md` (Copilot), `.windsurfrules` (Windsurf), `.clinerules` (Cline/Roo), `.continuerc.json` reference (Continue).
3. **MCP agents:** use filesystem MCP to read `AGENTS.md` and `docs/`.

> **Canonical location:** `AGENTS.md` at repo root. All tool-specific wrappers must be thin references to it.

---

# Objective

Generate production-quality code following the project's architecture and standards. Maintainability over speed.

**Always:** read existing code first, reuse utilities, respect architecture, prefer composition, keep types strong.
**Never:** add unnecessary deps, duplicate logic, ignore lint, disable TypeScript, mix business logic with UI.

---

# Architecture

```
UI → Actions → Services → Repositories → Database
```

Business logic only in Services. Data access only in Repositories.

---

# Components & Next.js

- Small, single responsibility, reusable, props-driven, no side effects.
- **Server Components by default.** Client only for: state, browser APIs, event handlers.
- Thin routes, Server Actions when appropriate.

---

# TypeScript

- No `any`. Prefer inference. Zod for runtime validation. Export reusable types close to feature.

---

# Styling & Design

- Tailwind v4 + shadcn/ui + CSS variables from `globals.css`. No inline styles, no hardcoded colors.
- Read `docs/Design Rules.md` before any UI. Key rules: three dials before layout, one accent color, `max-w-[65ch]` body / `text-wrap: balance` headlines, 40×40 hit areas, `scale(0.96)` press feedback, shadows over borders, honor `prefers-reduced-motion`, no em-dashes/en-dashes in UI text.

---

# Database

Prisma only through repositories. Never query DB from components.

---

# Performance

Server rendering, lazy loading, streaming, partial rendering, minimal client JS.

---

# Error Handling

Validate inputs, return meaningful errors, handle edge cases, fail gracefully.

---

# Documentation

When architecture/conventions/folders/workflows change → update the docs.

---

# Code Review Checklist

- [ ] Builds, Biome check passes, TypeScript passes
- [ ] No duplicated logic, no dead code
- [ ] Architecture respected, no business logic in UI
- [ ] No anti-slop design patterns (see `docs/Design Rules.md`)
- [ ] UI follows three dials, press states, hit areas
- [ ] Docs updated

---

# Philosophy

Readable > clever. Consistency > personal style. Long-term maintainability > short-term speed.
