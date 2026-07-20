# AI Tells (Forbidden Patterns)

This document lists UI patterns that signal generic AI-generated output.

These patterns are banned. If you see them, flag and remove immediately.

---

# Color Tells

- Purple-to-blue gradient backgrounds as a default.
- Near-black with acid-green or vermilion accents.
- Warm cream (#F4F1EA) with serif display and terracotta accent.
- Default Tailwind color palette used without customization.
- Multiple accent colors on a single page.
- Random gradient overlays without design justification.

---

# Layout Tells

- Cards nested inside cards.
- Uniform equal spacing everywhere.
- Perfectly centered hero with no asymmetric element.
- Every section using the same layout family.
- Bento grids with mismatched cell counts.
- Generic "Welcome to Next.js" boilerplate left in production.
- Sections that all look like stacked cards.

---

# Typography Tells

- Inter used for every project without justification.
- Em-dash (U+2014) or en-dash (U+2013) in visible text.
- No `text-wrap: balance` on headlines.
- No `text-wrap: pretty` on body text.
- Body text exceeding 65ch line length.
- Inconsistent type scale across sections.

---

# Interaction Tells

- No animation or transition on any interactive element.
- No visible press states on buttons.
- Hit areas smaller than 40x40px.
- Borders used instead of shadows for visual separation.
- Single-layer box-shadow instead of three-layer composition.
- No `prefers-reduced-motion` support.

---

# Component Tells

- Huge monolithic components.
- Business logic mixed into UI components.
- Database queries inside components.
- Inline styles instead of Tailwind.
- Disabled ESLint or TypeScript rules.
- Unused imports or dead code.

---

# Content Tells

- Generic placeholder text left in production.
- "Lorem ipsum" or "Your content here."
- Overly verbose hero sections.
- CTAs hidden below the fold.
- Navigation with more than 7 items.

---

# How to Use

Before shipping any UI, scan against this list.

If any tell is found:

1. Identify the root cause.
2. Apply the fix from `docs/Design Rules.md`.
3. Document the decision if it conflicts with an existing pattern.

---

# Sources

Adapted from:

- Taste Skill v2 (Leon Lin) - Anti-slop ruleset.
- Impeccable (Paul Bakaus) - 45-rule detector, named anti-slop tells.
- Anthropic frontend-design - Distributional convergence research.
- Vercel web-design-guidelines - Audit layer findings.
