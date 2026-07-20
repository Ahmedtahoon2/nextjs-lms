# Taste Skill Color Rules

Color system rules adapted from the Taste Skill framework.

---

# One Accent Per Page

- Every page has exactly one accent color.
- The accent color is used for CTAs, active states, and highlights.
- Never use multiple accent colors on a single page.

---

# Color Palette

- Define a 4-6 value named hex palette per project.
- Use oklch color space in `globals.css` for perceptually uniform colors.
- Never use default Tailwind colors without customization.
- Never use purple-to-blue gradients as a default.

---

# Banned Palettes

- Warm cream (#F4F1EA) with serif display and terracotta accent.
- Near-black with acid-green or vermilion accents.
- Purple-to-blue gradient backgrounds.
- Broad hairline-rule layouts with serif typography.

---

# Radius Scale

- One radius scale per page.
- Define in `globals.css` via CSS custom properties.
- Concentric radius formula: outer radius = inner radius + padding.
- Never mix radius scales within a page.

---

# Theme Locks

- One theme (light or dark) per page.
- Switch themes at the layout level, not per component.
- Test both themes before shipping.

---

# Token Usage

- Always use design tokens from `globals.css`.
- Never hardcode color values in Tailwind classes.
- Update tokens at the source, not in individual components.

---

# Sources

- Taste Skill v2 (Leon Lin) - Color/Shape/Page-Theme locks.
- W3C Design Tokens Community Group - First stable specification.
