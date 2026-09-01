# Design Rules

Frontend quality rules that prevent generic AI-generated output. Read before building any UI.

## The Three Dials (set before layout)

| Dial             | Default | Purpose                                             |
| ---------------- | ------- | --------------------------------------------------- |
| Design Variance  | 8       | How much layout breaks from generic grids           |
| Motion Intensity | 6       | Animation/transition presence                       |
| Visual Density   | 4       | Information per viewport (raise for data-heavy UIs) |

Defaults 8/6/4 work for most landing pages. Commit to a direction before touching layout.

## Color

- One accent color, one radius scale, one theme per page.
- Never purple-to-blue gradients by default.
- Use design tokens from `globals.css`. No inventing new color variables.

## Typography

- Body: `max-w-[65ch]`, `text-wrap: pretty`.
- Headlines: `text-wrap: balance`.
- Antialiasing on. Tabular nums for numeric data.
- No em-dash (U+2014) or en-dash (U+2013) in visible text. Use hyphens.
- More whitespace than feels necessary; add density deliberately.
- Prefer shadows/contrast over borders for separation.

## Hero

- Headline ≤ 2 lines, subtext ≤ 20 words, CTA above the fold, top padding ≤ `pt-24`, max 4 text elements.

## Navigation

- Single line at desktop. Height cap 80px (default 64-72). No hamburger on desktop.

## Layout

- 8-section page → use ≥ 4 different layout families.
- Bento grids: exactly N cells for N items.
- Never cards-inside-cards.
- Break the grid at least once. Uniform spacing everywhere looks generated.

## Micro-Interactions

- **Radius:** outer = inner + padding (concentric).
- **Press:** `scale(0.96)`. Never below 0.95.
- **Shadows:** compose from 3 layers (ambient, key, rim). Prefer over borders.
- **Hit areas:** minimum 40×40px (extend with pseudo-element if needed).
- **Animation:** icon `scale 0.25→1, opacity 0→1, blur 4px→0`; stagger ~100ms; enter ~800ms, exit subtler; spring `duration 0.3, bounce 0`.
- Always honor `prefers-reduced-motion`.
- **Image outlines:** `1px` at `10%` opacity (black light / white dark).

## Component Checklist

- [ ] No generic AI layout (cards-in-cards, uniform grids, centered everything)
- [ ] One accent color, no random gradients
- [ ] Typography uses `balance`/`pretty`
- [ ] Press states visible on interactive elements
- [ ] Shadows are multi-layered
- [ ] Hit areas ≥ 40×40px
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Spacing deliberate, not default
- [ ] Grid broken at least once
- [ ] No em-dashes or en-dashes in visible text

## Anti-Patterns to Flag

Inter for everything without justification · purple-to-blue gradient backgrounds · cards-in-cards · uniform spacing · perfectly centered hero with no asymmetric element · no animation on any interactive element · borders instead of shadows · default Tailwind palette used raw · leftover "Welcome to Next.js" boilerplate.

## Sources

Taste Skill · make-interfaces-feel-better · Impeccable · Anthropic frontend-design · ui-ux-pro-max · Vercel web-design-guidelines · Refactoring UI · Butterick's Practical Typography.
