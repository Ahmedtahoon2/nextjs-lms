# Interruptible Animation

Making animations that can be interrupted without breaking the interface.

---

# The Problem

Non-interruptible animations frustrate users. When a user clicks a new target while an animation is running, the animation should stop cleanly and start the new one.

---

# Rules

- All animations must be interruptible.
- Use `transition` instead of `animation` when possible.
- Prefer `transform` and `opacity` (GPU-accelerated).
- Never animate layout properties (width, height, padding).

---

# Implementation

```tsx
<div className="transition-all duration-300 ease-out">Content</div>
```

---

# Animation Values

| Property        | Value              |
| --------------- | ------------------ |
| Enter duration  | ~800ms             |
| Exit duration   | Subtler than enter |
| Stagger delay   | ~100ms             |
| Icon scale      | 0.25 -> 1          |
| Icon opacity    | 0 -> 1             |
| Icon blur       | 4px -> 0           |
| Spring duration | 0.3                |
| Spring bounce   | 0                  |

---

# Reduced Motion

Always honor `prefers-reduced-motion`:

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# Sources

- Make Interfaces Feel Better (Jakub Krehel) - Interruptible animations.
- Vercel web-design-guidelines - Animation rules.
