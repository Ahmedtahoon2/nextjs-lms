# Impeccable Toolchain

Automated visual and engineering defect detection for AI-generated frontend code.

---

# Overview

- 23 commands organized by discipline.
- 45 deterministic anti-pattern rules.
- Runs without an LLM for detection.
- Live iteration mode for HMR-based design.

---

# Installation

```bash
npx impeccable install
```

Then inside your AI coding tool:

```
/impeccable init
```

This creates `PRODUCT.md` and optionally `DESIGN.md`.

---

# Key Commands

| Command                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `/impeccable init`     | Initialize project with PRODUCT.md and DESIGN.md |
| `/impeccable detect`   | Run 45-rule detector                             |
| `/impeccable bolder`   | Respect existing design systems                  |
| `/impeccable critique` | Independent critique mode                        |

---

# PRODUCT.md

Defines:

- Audience and user persona.
- Brand/product lane.
- Voice and tone.
- Anti-references (what NOT to build).

---

# DESIGN.md

Defines:

- Color palette (named hex values).
- Typography scale.
- Component inventory.
- Aesthetic direction.

---

# Named Anti-Slop Tells

Impeccable flags these patterns:

- Inter for everything without justification.
- Purple-to-blue gradients.
- Cards nested in cards.
- Decorative grid backgrounds.
- Two-axis gradient overlay patterns.

---

# Detector Rules (45)

The detector runs deterministically without an LLM:

- Typography violations.
- Color violations.
- Layout violations.
- Interaction violations.
- Performance violations.
- Accessibility violations.

---

# Sources

- pbakaus/impeccable (Apache-2.0).
- impeccable.style.
- Latest: skill-v3.9.1, cli-v3.2.0 (2026-07-01).
