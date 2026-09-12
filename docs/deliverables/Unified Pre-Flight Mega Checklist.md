# Unified Pre-Flight Mega Checklist

Combined checklist from all design skills. Run before every deliverable.

---

# Architecture

- [ ] Follows layered architecture (UI -> Actions -> Services -> Repositories -> DB).
- [ ] Business logic not in UI components.
- [ ] Database access not in UI components.
- [ ] Zod validation on all external input.
- [ ] No `any` types.
- [ ] Server Components by default.

---

# TypeScript

- [ ] `pnpm run typecheck` passes.
- [ ] No `any` types.
- [ ] Inferred types preferred.
- [ ] Reusable types exported.
- [ ] Types close to the feature.

---

# Biome

- [ ] `pnpm run lint` passes.
- [ ] `pnpm run format:check` passes.
- [ ] No disabled rules without justification.
- [ ] No warnings.

---

# Build

- [ ] `pnpm run build` succeeds.
- [ ] No build errors.
- [ ] No build warnings.

---

# Tests

- [ ] `pnpm run test` passes.
- [ ] Critical business logic tested.
- [ ] Component tests for interactive UI.

---

# Dead Code

- [ ] `pnpm run knip` passes.
- [ ] No unused files.
- [ ] No unused exports.
- [ ] No unused dependencies.

---

# Design: Color

- [ ] One accent color per page.
- [ ] No purple-to-blue gradients.
- [ ] No banned palettes.
- [ ] Design tokens from globals.css.
- [ ] No hardcoded colors.

---

# Design: Typography

- [ ] `text-wrap: balance` on headlines.
- [ ] `text-wrap: pretty` on body text.
- [ ] Body: `max-w-[65ch]`.
- [ ] Font smoothing enabled.
- [ ] Tabular nums for numbers.
- [ ] No em-dashes or en-dashes.

---

# Design: Hero

- [ ] Headline: max 2 lines.
- [ ] Subtext: max 20 words.
- [ ] CTA above fold.
- [ ] Top padding: max `pt-24`.
- [ ] Max 4 text elements.

---

# Design: Layout

- [ ] 4+ layout families in 8-section pages.
- [ ] No cards in cards.
- [ ] Grid broken intentionally.
- [ ] Spacing deliberate.

---

# Design: Interactions

- [ ] 40x40px hit areas.
- [ ] `scale(0.96)` press feedback.
- [ ] Three-layer shadows.
- [ ] Shadows over borders.
- [ ] `prefers-reduced-motion` honored.
- [ ] Icon animations with stagger.

---

# Accessibility

- [ ] Focus rings visible.
- [ ] ARIA labels on icon buttons.
- [ ] Semantic HTML.
- [ ] WCAG AA contrast.
- [ ] Keyboard navigation works.

---

# Performance

- [ ] Server Components used.
- [ ] Lazy loading for below-fold.
- [ ] Minimal client JS.
- [ ] Images optimized with next/image.
- [ ] Bundle size acceptable.

---

# Documentation

- [ ] Relevant docs updated.
- [ ] Architecture decisions documented.
- [ ] Component inventory updated.

---

# Anti-Slop

- [ ] No Inter for everything.
- [ ] No purple gradients.
- [ ] No cards in cards.
- [ ] No uniform spacing.
- [ ] No generic AI layouts.
- [ ] No boilerplate left in production.
