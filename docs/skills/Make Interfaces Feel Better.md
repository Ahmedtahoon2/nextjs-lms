# Make Interfaces Feel Better

Micro-interaction and visual polish skill by Jakub Krehel.

---

# Overview

16 rule categories for improving interface feel through precise micro-interactions, shadows, typography, and animation values.

---

# Key Rules

## Concentric Border Radius

Outer radius = inner radius + padding.

Example: card with 16px padding and 8px inner radius gets 24px outer radius.

## Optical Alignment

Elements should appear visually centered, not mathematically centered.

Adjust for optical weight (heavier elements shift slightly toward center).

## Shadows Over Borders

Compose shadows from three layers:

1. Ambient (diffuse, large spread).
2. Key (directional, medium spread).
3. Rim (tight, small spread).

Prefer shadows over borders for depth and separation.

## Press States

Button press feedback: `transform: scale(0.96)`.

Never go below `scale(0.95)`.

## Hit Areas

Interactive elements: minimum 40x40px hit area.

Extend with pseudo-element when the visible element is smaller.

## Font Smoothing

Enable: `-webkit-font-smoothing: antialiased`.

Use `font-variant-numeric: tabular-nums` for numeric data.

## Animation Values

- Icon: `scale 0.25 -> 1`, `opacity 0 -> 1`, `blur 4px -> 0`.
- Stagger delay: ~100ms between items.
- Enter duration: ~800ms.
- Exit: subtler than enter.
- Spring settings: `duration 0.3`, `bounce 0`.

## Image Outlines

- 1px at 10% opacity.
- Black in light mode, white in dark mode.

---

# Supporting Files

- `typography.md` - Typography rules.
- `surfaces.md` - Surface and shadow rules.
- `animations.md` - Animation value reference.
- `performance.md` - Performance constraints.

---

# Sources

- jakubkrehel/make-interfaces-feel-better (no license, all rights reserved).
- jakub.kr/writing/details-that-make-interfaces-feel-better.
