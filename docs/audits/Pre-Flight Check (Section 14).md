# Pre-Flight Check (Section 14)

Mandatory checklist before completing any page or component.

Every box must pass. Any failure blocks completion.

---

# Design Dials

- [ ] Three dials set (Design Variance, Motion Intensity, Visual Density).
- [ ] Dials committed before touching layout.

---

# Color

- [ ] One accent color per page.
- [ ] No purple-to-blue gradients.
- [ ] No banned palettes (cream+terracotta, black+acid-green).
- [ ] Design tokens from globals.css used consistently.
- [ ] No hardcoded color values in Tailwind classes.

---

# Typography

- [ ] Headlines use `text-wrap: balance`.
- [ ] Body text uses `text-wrap: pretty`.
- [ ] Body text: `max-w-[65ch]`.
- [ ] Font smoothing enabled.
- [ ] Tabular nums for numeric data.
- [ ] No em-dashes or en-dashes in visible text.
- [ ] Inter not used for everything without justification.

---

# Hero

- [ ] Headline: max 2 lines.
- [ ] Subtext: max 20 words.
- [ ] CTA visible without scrolling.
- [ ] Top padding: max `pt-24`.
- [ ] Max 4 text elements.

---

# Navigation

- [ ] Single line at desktop.
- [ ] Height cap: 80px.
- [ ] No hamburger on desktop.

---

# Layout

- [ ] At least 4 layout families in 8-section pages.
- [ ] Bento grids: exactly N cells for N items.
- [ ] No cards nested inside cards.
- [ ] Grid broken intentionally at least once.
- [ ] Spacing feels deliberate, not uniform.

---

# Interactions

- [ ] Interactive elements: 40x40px minimum hit area.
- [ ] Press states: `scale(0.96)`.
- [ ] Shadows: three-layer composition.
- [ ] Borders avoided in favor of shadows.
- [ ] Animations honor `prefers-reduced-motion`.
- [ ] Icon animations: scale, opacity, blur with stagger.

---

# Accessibility

- [ ] Focus rings visible on all interactive elements.
- [ ] ARIA labels on icon-only buttons.
- [ ] Semantic HTML elements.
- [ ] Color contrast meets WCAG AA.
- [ ] Keyboard navigation works.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
