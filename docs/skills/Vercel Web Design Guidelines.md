# Vercel Web Design Guidelines

High-performance, accessible web interface rules from Vercel Labs.

---

# Installation

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

---

# Workflow

1. Fetch the latest guidelines from the Vercel repository.
2. Read target files in the project.
3. Check all rules against the files.
4. Output terse file:line findings.

---

# Key Rule Categories

## Accessibility

- Icon-only buttons need `aria-label`.
- Never `outline-none` without a focus replacement.
- Never block paste.
- Honor `prefers-reduced-motion`.
- Semantic HTML elements.
- Color contrast meets WCAG AA.

## Focus

- Visible focus rings on all interactive elements.
- Logical tab order.
- Skip links for keyboard navigation.
- Focus trapping in modals.

## Forms

- Labels associated with inputs.
- Error messages linked via `aria-describedby`.
- Required fields indicated visually and programmatically.
- Inline validation on blur.

## Animation

- Honor `prefers-reduced-motion`.
- Under 300ms for micro-interactions.
- `ease-out` for enter, `ease-in` for exit.
- Virtualize lists over 50 items.
- Use `transform` and `opacity` for animations.

## Typography

- `text-wrap: balance` on headlines.
- `text-wrap: pretty` on body text.
- Line length: 45-90 characters.
- Consistent type scale.

## Content

- `Intl.DateTimeFormat` for dates.
- Destructive actions need confirmation or undo.
- URL reflects state.
- Loading states for async operations.

## Images

- Explicit `width` and `height`.
- Use `next/image`.
- Alt text on meaningful images.
- Decorative: `alt=""` and `role="presentation"`.

## Performance

- Server Components by default.
- Lazy load below-the-fold.
- Minimize client JS.
- Streaming and Suspense.
- Prefetch critical navigation.

## Touch

- 40x40px minimum touch targets.
- `@media (hover: hover)` for hover styles.
- Safe areas for mobile.

## Dark Mode

- CSS custom properties for themes.
- Test both modes.
- Avoid pure black backgrounds.
- Sufficient contrast in both modes.

---

# Sources

- vercel-labs/web-interface-guidelines (MIT).
- vercel.com/design/guidelines.
