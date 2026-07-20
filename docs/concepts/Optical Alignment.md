# Optical Alignment

Making interfaces feel visually correct, not just mathematically correct.

---

# The Problem

Mathematical centering does not always look centered. Elements with different visual weights appear off-center when mathematically centered.

---

# The Solution

Optical alignment adjusts elements based on their visual weight, not their mathematical position.

---

# Rules

- Heavier elements shift slightly toward center.
- Lighter elements shift slightly away from center.
- Icons align with text baselines, not bounding boxes.
- Circular elements align by visual center, not bounding box.

---

# Examples

- A circle next to text: shift the circle down 1-2px to align optical center with text baseline.
- An icon next to text: shift the icon down to align with the text's x-height.
- A heavy headline above light body text: shift headline slightly down.

---

# Application

- Check every composition for optical alignment.
- Adjust padding and margin for visual balance.
- Do not rely solely on Tailwind's default spacing.
- Use arbitrary values when optical correction is needed.

---

# Sources

- Make Interfaces Feel Better (Jakub Krehel) - Optical alignment rules.
- Refactoring UI (Wathan & Schoger) - Visual hierarchy principles.
