# Design Rules

This document defines frontend design quality rules adapted from the Gogh anti-slop frontend framework.

These rules prevent generic AI-generated output and ensure intentional, brand-aligned UI.

---

# Anti-Slop Rules

LLMs reach for the median of their training corpus. The result is predictable: Inter for everything, purple-to-blue gradients, cards nested in cards, and minimal animations.

These rules break that pattern.

---

# The Three Dials

Every page or component should feel like it has been tuned across three axes:

| Dial             | Default | Description                                           |
| ---------------- | ------- | ----------------------------------------------------- |
| Design Variance  | 8       | How much the layout breaks from generic grid patterns |
| Motion Intensity | 6       | How much animation and transition is present          |
| Visual Density   | 4       | How much information is packed into a given viewport  |

These are not hardcoded values. They are conversation anchors. The default 8/6/4 works for most landing pages. Dashboards and data-heavy UIs shift visual density higher.

Set these dials before touching layout. Commit to a direction.

---

# Color Rules

- One accent color per page.
- One radius scale per page.
- One theme (light or dark) per page.
- Never use purple-to-blue gradients as a default.
- Never use warm cream (#F4F1EA) with serif display and terracotta accent.
- Never use near-black with acid-green or vermilion accents.
- Use the existing design tokens in globals.css. Do not invent new color variables without updating the token system.

---

# Typography Rules

- Body line length: 45-90 characters (use `max-w-[65ch]` for prose).
- Use `text-wrap: balance` on headlines.
- Use `text-wrap: pretty` on body text.
- Enable font smoothing: `-webkit-font-smoothing: antialiased`.
- Use `font-variant-numeric: tabular-nums` for numeric data.
- Never use em-dash (U+2014) or en-dash (U+2013) in visible text. Use hyphens.
- Default to more whitespace than feels necessary. Add density deliberately.
- Use fewer borders. Prefer shadows, color contrast, and spacing to separate elements.

---

# Hero Rules

- Headline: max 2 lines.
- Subtext: max 20 words.
- CTA visible without scrolling.
- Top padding: max `pt-24`.
- Max 4 text elements in the hero.

---

# Navigation Rules

- Render on a single line at desktop.
- Height cap: 80px (default 64-72px).
- No hamburger menu on desktop.

---

# Layout Rules

- An 8-section page must use at least 4 different layout families.
- Bento grids use exactly N cells for N items.
- Never use cards nested inside cards.
- Prefer asymmetric layouts over perfectly centered grids.
- Break the grid intentionally. Uniform spacing everywhere looks generated.

---

# Micro-Interaction Rules

These come from Jakub Krehel's make-interfaces-feel-better skill.

## Border Radius

- Concentric radius formula: outer radius = inner radius + padding.
- A card with 16px padding and 8px inner radius gets 24px outer radius.

## Press States

- Button press feedback: `transform: scale(0.96)`.
- Never go below `scale(0.95)`.

## Shadows

- Compose shadows from three layers (ambient, key, rim).
- Prefer shadows over borders for depth.

## Hit Areas

- Interactive elements: minimum 40x40px hit area.
- Extend with pseudo-element when the visible element is smaller.

## Animations

- Icon animation: `scale 0.25 → 1`, `opacity 0 → 1`, `blur 4px → 0`.
- Stagger delay: ~100ms between items.
- Enter duration: ~800ms. Exit: subtler than enter.
- Spring settings: `duration 0.3`, `bounce 0`.
- Always honor `prefers-reduced-motion`.

## Image Treatment

- Image outlines: `1px` at `10%` opacity (black in light mode, white in dark mode).

---

# Component Design Checklist

Before shipping any component, verify:

- [ ] No generic AI layout (cards-in-cards, uniform grids, centered everything).
- [ ] One accent color. No random gradients.
- [ ] Typography uses balance/pretty wrapping.
- [ ] Interactive elements have visible press states.
- [ ] Shadows composed from multiple layers, not single `box-shadow`.
- [ ] Hit areas meet 40x40px minimum.
- [ ] Animations respect reduced-motion.
- [ ] Spacing feels deliberate, not default.
- [ ] Layout breaks the grid at least once.
- [ ] No em-dashes or en-dashes in visible text.

---

# Anti-Pattern Detection

Flag these immediately:

- Inter used for every project without justification.
- Purple-to-blue gradient backgrounds.
- Cards nested inside cards.
- Uniform equal spacing everywhere.
- Perfectly centered hero with no asymmetric element.
- No animation or transition on any interactive element.
- Borders used instead of shadows for separation.
- Default Tailwind color palette used without customization.
- Generic "Welcome to Next.js" boilerplate left in production.

---

# Sources

These rules are adapted from:

- Taste Skill v2 (Leon Lin) - Taste prompting, three dials, anti-slop rules.
- make-interfaces-feel-better (Jakub Krehel) - Micro-interaction execution.
- Impeccable (Paul Bakaus) - Toolchain enforcement, anti-pattern detection.
- Anthropic frontend-design - Taste prompting baseline.
- ui-ux-pro-max (nextlevelbuilder) - Style and palette retrieval.
- Vercel web-design-guidelines - Audit layer, accessibility rules.
- Refactoring UI (Wathan & Schoger) - Visual hierarchy principles.
- Butterick's Practical Typography - Line length and measure rules.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
