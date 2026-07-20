# Vercel Audit Guidelines

Performance and accessibility audit based on Vercel's web design guidelines.

---

# Audit Process

1. Read the target files.
2. Check all rules from `docs/rules/Vercel Interface Rule Categories.md`.
3. Output findings grouped by file in `file:line` format.
4. Mark each finding as pass/fail.

---

# Accessibility Rules

- Icon-only buttons: `aria-label` present.
- No `outline-none` without focus replacement.
- No paste blocking on inputs.
- `prefers-reduced-motion` honored.
- Semantic HTML used.
- Color contrast meets WCAG AA.

---

# Performance Rules

- Server Components used by default.
- Below-the-fold content lazy loaded.
- Client JS minimized.
- Streaming and Suspense used.
- Critical navigation links prefetched.

---

# Form Rules

- Labels associated with inputs.
- Error messages linked via `aria-describedby`.
- Required fields indicated.
- Inline validation on blur.
- No accidental state clearing.

---

# Image Rules

- `width` and `height` on all images.
- `next/image` used for optimization.
- Alt text on meaningful images.
- Decorative images: `alt=""`.

---

# Output Format

```
file:line - PASS/FAIL - Description
```

Example:

```
app/page.tsx:42 - FAIL - Icon button missing aria-label
components/ui/button.tsx:15 - PASS - Focus ring present
```

---

# Sources

- vercel-labs/web-interface-guidelines (MIT).
- vercel.com/design/guidelines.
