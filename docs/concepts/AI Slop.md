# AI Slop

Understanding and preventing generic AI-generated UI output.

---

# What Is AI Slop

AI slop is the distributional convergence of LLM-generated frontends. Because LLMs are statistical pattern matchers, they reach for the median of their training corpus.

The result: Inter for everything, purple-to-blue gradients, cards nested in cards, and minimal animations.

---

# Why It Happens

- LLMs default to safe, common patterns.
- Training data is dominated by tutorial and template outputs.
- The median of training data is generic, not distinctive.
- Without constraints, agents produce the same layouts.

---

# The Fix

Constraint, not prompting.

- Forbidden patterns (anti-slop tells).
- Committed aesthetic direction (three dials).
- Pre-flight checks (Section 14).
- Evidence-gated claims (source-ledger).

---

# Named Tells

From Impeccable's 45-rule detector:

- Inter for everything.
- Purple-to-blue gradients.
- Cards nested in cards.
- Decorative grid backgrounds.
- Two-axis gradient overlays.
- Uniform spacing everywhere.
- No micro-interactions.
- Generic hero sections.

---

# Prevention Strategy

1. Set the three dials before building.
2. Commit to a palette and direction.
3. Check against anti-slop tells.
4. Run pre-flight before shipping.
5. Document design decisions.

---

# Sources

- Taste Skill v2 (Leon Lin) - Anti-slop framework.
- Anthropic frontend-design - Distributional convergence research.
- prg.sh - "Why Your AI Keeps Building the Same Purple Gradient Website."
