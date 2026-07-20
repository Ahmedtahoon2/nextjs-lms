# AI Development Guide

This document defines how AI coding assistants should work inside this repository.

Supported assistants include:

- ChatGPT
- Codex
- Claude Code
- Cursor
- OpenCode
- GitHub Copilot
- Any OpenAI-compatible coding agent

---

# Mission

Build maintainable, production-grade software.

Readable code is preferred over clever code.

Correctness is preferred over speed.

Consistency is preferred over personal preference.

---

# Technology Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Prisma ORM
- PostgreSQL
- Neon Database
- Zod
- React Hook Form

---

## Architecture Rules

Always follow this architecture:

```
UI
↓

Actions / Routes
↓

Services

↓

Repositories

↓

Database
```

Business logic must never exist inside UI components.

Database access must never happen directly inside UI components.

---

# Before Writing Code

Always understand:

- Existing architecture
- Current conventions
- File organization
- Naming conventions
- Existing abstractions

Never introduce a second pattern when one already exists.

---

# Component Rules

Components should:

- Have a single responsibility.
- Stay small.
- Prefer composition over inheritance.
- Avoid duplicated logic.
- Avoid unnecessary props.

---

# TypeScript Rules

- Never use `any`.
- Prefer inferred types.
- Use Zod for runtime validation.
- Export reusable types.
- Keep types close to the feature.

---

# Next.js Rules

- Prefer Server Components.
- Use Client Components only when required.
- Keep business logic outside UI.
- Use Server Actions when appropriate.
- Keep routes thin.

---

# UI Rules

Use existing shadcn/ui components whenever appropriate.

Prefer:

- Accessible components
- Consistent spacing
- Responsive layouts
- Semantic HTML

Avoid generic AI-generated layouts.

Every UI should feel intentional.

---

# Design Quality Rules

Every UI must follow the anti-slop rules defined in `docs/Design Rules.md`.

Key rules:

- Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
- One accent color per page. No purple-to-blue gradients.
- Body text: `max-w-[65ch]`, `text-wrap: pretty`.
- Headlines: `text-wrap: balance`.
- Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
- Shadows over borders. Three-layer shadow composition.
- Always honor `prefers-reduced-motion`.
- Break the uniform grid intentionally.
- No cards nested inside cards.
- No em-dashes or en-dashes in visible text.

Flag these anti-patterns immediately:

- Inter used for everything without justification.
- Purple-to-blue gradient backgrounds.
- Uniform equal spacing everywhere.
- Default Tailwind colors used without customization.

Full rules: `docs/Design Rules.md`

---

# Styling Rules

- Use Tailwind consistently.
- Reuse design tokens from globals.css.
- Avoid arbitrary values unless justified.
- Maintain consistent spacing.
- Prefer shadows over borders for visual separation.

---

# Performance

Always optimize for:

- Small bundles
- Lazy loading
- Minimal hydration
- Server rendering
- Efficient data fetching

---

# Documentation

Whenever architecture changes:

- Update documentation.
- Keep README accurate.
- Document new conventions.

---

# Before Finishing

Verify:

- TypeScript passes
- ESLint passes
- Build succeeds
- No dead code
- No duplicated logic
- Naming is consistent
- Imports are clean
- Documentation updated if required

If something can be simplified without changing behavior, simplify it.

---

# Philosophy

Readable code is more valuable than clever code.

Consistency is more valuable than personal preference.

Long-term maintainability is more important than short-term speed.
