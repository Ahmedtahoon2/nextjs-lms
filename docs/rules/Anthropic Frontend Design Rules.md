# Anthropic Frontend Design Rules

Standards from Anthropic's frontend-design skill for building distinctive, high-quality web interfaces.

---

# Core Principle

The more aesthetic improvements map to implementable frontend code, the better the output.

Design taste is articulable logic, not vibes.

---

# Aesthetic Direction

Before building, commit to a direction:

- Pick a 4-6 value named hex palette.
- Choose one justified aesthetic risk.
- Define a hero thesis (one sentence that captures the page intent).
- Avoid default palettes: warm cream + serif + terracotta, near-black + acid-green, broadsheet hairline-rule layouts.

---

# Process

Two-pass build-critique:

1. Build the interface with committed direction.
2. Critique against the design rules. Revise.

Never ship on the first pass.

---

# Typography

- Use `text-wrap: balance` on headlines.
- Use `text-wrap: pretty` on body text.
- Line length: 45-90 characters (max-w-[65ch]).
- Enable font smoothing: `-webkit-font-smoothing: antialiased`.
- Use `font-variant-numeric: tabular-nums` for numeric data.

---

# Restraint and Self-Critique

- Every element must earn its place.
- If an element does not serve the hero thesis, remove it.
- Default to more whitespace than feels necessary.
- Add density deliberately, not by default.
- Use fewer borders. Prefer shadows, color contrast, and spacing.

---

# Writing in Design

- Headlines: max 2 lines.
- Subtext: max 20 words.
- CTA visible without scrolling.
- No em-dashes or en-dashes in visible text.
- Body text should feel conversational, not corporate.

---

# Anti-Patterns

- Inter for everything without justification.
- Purple-to-blue gradients as default.
- Cards nested in cards.
- Uniform equal spacing everywhere.
- Generic AI-generated layouts.

---

# Sources

- Anthropic frontend-design skill (Apache-2.0).
- Anthropic blog: "Improving frontend design through Skills" (2025-11-12).
- anthropics/skills repository.
