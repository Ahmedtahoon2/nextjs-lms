# AI Instructions

This document defines how AI assistants should contribute to the project.

Supported tools include:

- ChatGPT
- Codex
- Claude Code
- Cursor
- OpenCode
- GitHub Copilot

---

# Primary Objective

Generate production-quality code that follows the project's architecture and coding standards.

The AI should prioritize maintainability over speed.

---

# General Rules

Always:

- Read existing code before making changes.
- Reuse existing utilities.
- Respect the current architecture.
- Prefer composition.
- Keep code strongly typed.

Never:

- Introduce unnecessary dependencies.
- Duplicate logic.
- Ignore lint errors.
- Disable TypeScript.
- Mix business logic with UI.

---

# Architecture

Always follow this flow:

```
UI

↓

Actions

↓

Services

↓

Repositories

↓

Prisma

↓

Database
```

Business logic belongs only inside Services.

Repositories handle data access only.

---

# Component Rules

Components should:

- Be small
- Be reusable
- Receive data through props
- Avoid side effects

---

# Server Components

Prefer Server Components by default.

Use Client Components only when required.

Examples:

- State
- Browser APIs
- Event handlers

---

# Styling

Use:

- Tailwind CSS v4
- shadcn/ui
- CSS Variables
- Design tokens from globals.css

Avoid custom CSS unless necessary.

Never use inline styles.

Never use default Tailwind colors without customization.

---

# Design Quality

Read `docs/Design Rules.md` before generating any UI.

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

Anti-patterns to flag:

- Inter used for everything without justification.
- Purple-to-blue gradient backgrounds.
- Uniform equal spacing everywhere.
- Default Tailwind colors used without customization.
- Generic "Welcome to Next.js" boilerplate left in production.

---

# Database

Use Prisma only through repositories.

Never query the database directly from components.

---

# Performance

Prefer:

- Server rendering
- Lazy loading
- Streaming
- Partial rendering

Avoid unnecessary client-side JavaScript.

---

# Error Handling

Always:

- Validate inputs
- Return meaningful errors
- Handle edge cases
- Fail gracefully

---

# Documentation

When introducing:

- New architecture
- New conventions
- New folders
- New workflows

Update the corresponding documentation.

---

# Code Review Checklist

Before considering a task complete, verify:

- Project builds successfully.
- ESLint passes.
- TypeScript passes.
- No duplicated logic.
- Documentation is updated.
- Existing architecture is respected.
- No anti-slop design patterns (see `docs/Design Rules.md`).
- UI follows the three dials and design quality rules.
- Interactive elements have proper press states and hit areas.

---

# Philosophy

Readable code is preferred over clever code.

Consistency is preferred over personal style.

Every change should make the project easier to maintain.
