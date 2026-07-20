# Vercel Interface Rule Categories

Performance and accessibility rules adapted from Vercel's web design guidelines.

---

# Accessibility

- Icon-only buttons need `aria-label`.
- Never use `outline-none` without a focus replacement.
- Never block paste on password or input fields.
- Honor `prefers-reduced-motion`.
- Use semantic HTML elements.
- Ensure color contrast meets WCAG AA.

---

# Focus Management

- Visible focus rings on all interactive elements.
- Focus should follow logical tab order.
- Skip links for keyboard navigation.
- Focus trapping in modals and dialogs.

---

# Forms

- Labels associated with inputs.
- Error messages linked to inputs via `aria-describedby`.
- Required fields indicated visually and programmatically.
- Inline validation on blur, not on every keystroke.
- Never clear form state on accidental navigation.

---

# Animation

- Always honor `prefers-reduced-motion`.
- Keep animations under 300ms for micro-interactions.
- Use `ease-out` for enter, `ease-in` for exit.
- Virtualize lists over 50 items.
- Avoid layout-triggering animations (use `transform` and `opacity`).

---

# Typography

- Use `text-wrap: balance` on headlines.
- Use `text-wrap: pretty` on body text.
- Line length: 45-90 characters.
- Consistent type scale across the application.

---

# Content

- Use `Intl.DateTimeFormat` for dates.
- Destructive actions need confirmation or undo.
- URL should reflect application state.
- Loading states for all async operations.

---

# Images

- Explicit `width` and `height` on all images.
- Use `next/image` for optimized delivery.
- Alt text on all meaningful images.
- Decorative images: `alt=""` and `role="presentation"`.

---

# Performance

- Server Components by default.
- Lazy load below-the-fold content.
- Minimize client-side JavaScript.
- Use streaming and Suspense boundaries.
- Prefetch critical navigation links.

---

# Touch

- Minimum 40x40px touch targets.
- Avoid hover-only interactions on touch devices.
- Use `@media (hover: hover)` for hover styles.
- Safe areas for mobile notches.

---

# Dark Mode

- Use CSS custom properties for theme switching.
- Test both light and dark modes.
- Avoid pure black (#000) for backgrounds. Use dark grays.
- Ensure sufficient contrast in both modes.

---

# Sources

- Vercel web-interface-guidelines (MIT).
- Vercel web-design-guidelines agent skill.
- vercel.com/design/guidelines.
