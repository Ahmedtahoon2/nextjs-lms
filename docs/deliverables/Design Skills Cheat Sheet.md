# Design Skills Cheat Sheet

Quick reference for daily work with design skills.

---

# Three Dials

| Dial             | Default | Scale |
| ---------------- | ------- | ----- |
| Design Variance  | 8       | 1-10  |
| Motion Intensity | 6       | 1-10  |
| Visual Density   | 4       | 1-10  |

---

# Anti-Slop Quick Check

- No Inter for everything.
- No purple-to-blue gradients.
- No cards in cards.
- No uniform spacing.
- No em-dashes in text.
- No boilerplate in production.

---

# Typography Quick Rules

- Headlines: `text-wrap: balance`.
- Body: `text-wrap: pretty`, `max-w-[65ch]`.
- Numbers: `font-variant-numeric: tabular-nums`.
- Smoothing: `-webkit-font-smoothing: antialiased`.

---

# Interaction Quick Rules

- Hit areas: 40x40px minimum.
- Press: `scale(0.96)`.
- Shadows: three layers.
- Animation: ~100ms stagger, ~800ms enter.

---

# Color Quick Rules

- One accent per page.
- One radius scale per page.
- One theme per page.
- Tokens from globals.css.

---

# Hero Quick Rules

- Headline: 2 lines max.
- Subtext: 20 words max.
- CTA: above fold.
- Padding: `pt-24` max.
- Elements: 4 max.

---

# Build Quick Flow

1. Set three dials.
2. Pick palette.
3. Define hero thesis.
4. Build with direction.
5. Run pre-flight.
6. Revise if needed.

---

# Audit Quick Commands

```bash
pnpm run typecheck    # TypeScript
pnpm run lint         # ESLint
pnpm run build        # Build
pnpm run test         # Tests
pnpm run knip         # Dead code
```

---

# Sources

- Taste Skill v2 (Leon Lin).
- Impeccable (Paul Bakaus).
- Make Interfaces Feel Better (Jakub Krehel).
- Vercel web-design-guidelines.
- Anthropic frontend-design.
