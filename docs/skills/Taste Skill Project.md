# Taste Skill Project

Three-dial aesthetic framework for calibrating AI-generated frontend output.

---

# Overview

The Taste Skill provides a conversation-driven framework for setting aesthetic direction before building. It prevents generic AI output by committing to a direction early.

---

# The Three Dials

| Dial             | Default | Scale | Description                                      |
| ---------------- | ------- | ----- | ------------------------------------------------ |
| Design Variance  | 8       | 1-10  | How much the layout breaks from generic patterns |
| Motion Intensity | 6       | 1-10  | How much animation and transition is present     |
| Visual Density   | 4       | 1-10  | How much information per viewport                |

Set these dials conversationally before touching layout.

---

# Section 14 Pre-Flight Check

Mandatory before completing any page:

- [ ] Three dials set and committed.
- [ ] Hero follows constraints (2-line headline, 20-word subtext, CTA above fold).
- [ ] Navigation on single line at desktop (80px height cap).
- [ ] One accent color per page.
- [ ] One radius scale per page.
- [ ] One theme per page.
- [ ] At least 4 layout families in 8-section pages.
- [ ] No em-dashes or en-dashes in visible text.
- [ ] No cards nested inside cards.
- [ ] No purple-to-blue gradients.
- [ ] No Inter for everything without justification.
- [ ] Typography uses balance/pretty wrapping.

Any failed box blocks completion.

---

# Greenfield Workflow

1. Set the three dials.
2. Pick a 4-6 value named hex palette.
3. Define the hero thesis.
4. Build with committed direction.
5. Run Section 14 pre-flight.
6. Revise if any check fails.

---

# Redesign Workflow

1. Audit existing interface against Section 14.
2. Identify what to preserve, what to overhaul.
3. Set the three dials for the new direction.
4. Build respecting preserved elements.
5. Run Section 14 pre-flight.

---

# Anti-Laziness Rules

- Never output a generic layout as a starting point.
- Always commit to a direction before building.
- Always run the pre-flight check.
- Never skip the critique pass.

---

# Sources

- Leonxlnx/taste-skill (MIT).
- tasteskill.dev.
- v2 is experimental, iterating toward v2.0.0 stable.
