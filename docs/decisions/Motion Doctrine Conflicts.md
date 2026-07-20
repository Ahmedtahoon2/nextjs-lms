# Motion Doctrine Conflicts

Resolving conflicts between animation and motion rules.

---

# The Conflict

Different skills have different motion philosophies:

- Taste Skill: Motion Intensity dial (1-10).
- MIFB: Specific animation values (duration, stagger, spring).
- Impeccable: Minimal motion rules.
- Vercel: Comprehensive animation rules (reduced motion, duration limits).

---

# Resolution

- The Motion Intensity dial sets the overall animation level.
- MIFB provides the specific values when animations are used.
- Vercel rules for accessibility (reduced motion) are non-negotiable.
- Impeccable flags excessive or broken animations.

---

# Application

1. Set the Motion Intensity dial before building.
2. Apply MIFB animation values for micro-interactions.
3. Always honor `prefers-reduced-motion`.
4. Keep animations under 300ms for micro-interactions.
5. Use `transform` and `opacity` for GPU-accelerated animations.

---

# Sources

- Taste Skill v2 - Motion Intensity dial.
- MIFB - Animation values.
- Vercel web-design-guidelines - Animation rules.
