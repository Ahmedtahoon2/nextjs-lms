# MIFB Review Checklist

Micro-interaction and visual polish review based on Make Interfaces Feel Better.

---

# Shadow Review

- [ ] Shadows composed from three layers (ambient, key, rim).
- [ ] Shadows used instead of borders for depth.
- [ ] Shadow color adjusted for dark mode.
- [ ] No single-layer box-shadow.

---

# Border Radius Review

- [ ] Concentric radius formula applied: outer = inner + padding.
- [ ] Consistent radius scale across the page.
- [ ] No mixed radius scales.

---

# Press State Review

- [ ] All buttons have press feedback.
- [ ] Press feedback: `scale(0.96)`.
- [ ] Never below `scale(0.95)`.
- [ ] Hover states present on all interactive elements.

---

# Hit Area Review

- [ ] All interactive elements: 40x40px minimum.
- [ ] Smaller elements extended with pseudo-elements.
- [ ] Touch targets meet mobile requirements.

---

# Animation Review

- [ ] Icon animations: scale 0.25->1, opacity 0->1, blur 4px->0.
- [ ] Stagger delay: ~100ms between items.
- [ ] Enter duration: ~800ms.
- [ ] Exit subtler than enter.
- [ ] `prefers-reduced-motion` honored.
- [ ] Spring settings: duration 0.3, bounce 0.

---

# Typography Review

- [ ] Font smoothing: `-webkit-font-smoothing: antialiased`.
- [ ] Tabular nums for numeric data.
- [ ] Optical alignment applied.
- [ ] Line length: 45-90 characters.

---

# Image Review

- [ ] Image outlines: 1px at 10% opacity.
- [ ] Black outline in light mode, white in dark mode.

---

# Sources

- jakubkrehel/make-interfaces-feel-better.
- jakub.kr/writing/details-that-make-interfaces-feel-better.
