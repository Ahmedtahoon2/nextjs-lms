# Dark Mode Protocol

Rules for implementing and maintaining dark mode across the project.

---

# Implementation

- Dark mode uses the `.dark` class on the root element.
- Toggle at the layout level, not per component.
- Persist user preference in localStorage.
- Respect `prefers-color-scheme` as the default.

---

# Color Tokens

- All colors defined as CSS custom properties in `globals.css`.
- Light and dark variants for each token.
- Use oklch color space for perceptually uniform colors.
- Never hardcode color values in components.

---

# Background Rules

- Never use pure black (#000) for backgrounds.
- Use dark grays (e.g., oklch(0.15 0.01 250)) for surfaces.
- Layer surfaces with subtle lightness differences.
- Use shadows (white at low opacity) for depth in dark mode.

---

# Text Rules

- Primary text: near-white, not pure white (#FFF).
- Secondary text: medium gray with sufficient contrast.
- Ensure WCAG AA contrast ratios in both modes.
- Never use color alone to convey meaning.

---

# Border and Shadow Rules

- Borders: use white at 8-12% opacity in dark mode.
- Shadows: compose from three layers (ambient, key, rim).
- Prefer shadows over borders for visual separation.
- Adjust shadow color for dark mode (use lighter shadows).

---

# Component Rules

- Every component must work in both themes.
- Test all interactive states (hover, focus, active) in both modes.
- Use `cn()` utility for conditional theme classes.
- Never use `dark:` prefix on every property. Use token-based theming.

---

# Image Treatment

- Image outlines: 1px at 10% opacity (white in dark mode, black in light mode).
- Avoid bright images on dark backgrounds without subtle containment.
- Use `next/image` with `dark:` variants when needed.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
