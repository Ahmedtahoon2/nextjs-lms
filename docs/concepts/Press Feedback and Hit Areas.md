# Press Feedback and Hit Areas

Rules for making interactive elements feel responsive and accessible.

---

# Press Feedback

Every interactive element should provide visual feedback when pressed.

## Rules

- Button press: `transform: scale(0.96)`.
- Never go below `scale(0.95)`.
- Apply via CSS transition for smoothness.
- Duration: ~100ms.

## Implementation

```tsx
<Button className="transition-transform duration-100 active:scale-[0.96]">
  Click me
</Button>
```

---

# Hit Areas

Interactive elements must have sufficient touch/click targets.

## Rules

- Minimum 40x40px hit area.
- Extend with pseudo-element when visible element is smaller.
- Apply `min-h-[40px] min-w-[40px]` for minimum sizing.

## Implementation

```tsx
<Button className="min-h-[40px] min-w-[40px]">
  <span className="sr-only">Label</span>
  <Icon className="h-4 w-4" />
</Button>
```

---

# Hover States

- Use `@media (hover: hover)` for hover styles.
- Hover should enhance, not replace, the base state.
- Transition between states smoothly.

---

# Focus States

- Visible focus ring on all interactive elements.
- Never use `outline-none` without a replacement.
- Focus ring should be consistent across the application.

---

# Sources

- Make Interfaces Feel Better (Jakub Krehel) - Press states and hit areas.
- Vercel web-design-guidelines - Focus management.
