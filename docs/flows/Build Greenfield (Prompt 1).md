# Build Greenfield (Prompt 1)

Workflow for building new components and features from scratch.

---

# Steps

## 1. Set the Three Dials

Before writing any code, commit to:

- Design Variance (1-10, default 8).
- Motion Intensity (1-10, default 6).
- Visual Density (1-10, default 4).

## 2. Define the Direction

- Pick a 4-6 value named hex palette.
- Define the hero thesis (one sentence).
- Identify the primary CTA.
- Choose one justified aesthetic risk.

## 3. Read Existing Patterns

- Check `components/ui/` for existing primitives.
- Check `docs/rules/` for applicable rules.
- Check `docs/skills/` for design skill references.

## 4. Build the Component

- Start with Server Components.
- Use shadcn/ui primitives where possible.
- Apply Tailwind utilities consistently.
- Use `cn()` for conditional classes.
- Follow the layered architecture.

## 5. Apply Design Rules

- Check against `docs/rules/AI Tells (Forbidden Patterns).md`.
- Apply micro-interaction rules from `docs/skills/Make Interfaces Feel Better.md`.
- Ensure typography follows `docs/rules/Anthropic Frontend Design Rules.md`.

## 6. Run Pre-Flight

- Complete the Section 14 checklist.
- Verify all checks pass.
- If any check fails, revise and re-check.

## 7. Document

- Update relevant documentation.
- Add to component inventory if new.
- Document any design decisions.

---

# Architecture Flow

```
Page (Server Component)
↓
Layout Component
↓
Feature Component
↓
Shared Component
↓
UI Primitive (shadcn/ui)
```

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
