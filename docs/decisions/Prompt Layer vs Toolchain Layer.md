# Prompt Layer vs Toolchain Layer

When to use prompt-based guidance vs persistent toolchain enforcement.

---

# Prompt Layer

Prompt-based guidance is conversational:

- Three dials (set in conversation).
- Aesthetic direction (committed verbally).
- Hero thesis (defined in conversation).
- Design rules (read from documentation).

## When to Use

- Setting aesthetic direction.
- Defining project-specific rules.
- Creative decisions.
- One-time setup.

---

# Toolchain Layer

Toolchain enforcement is persistent:

- Impeccable detector (45 rules).
- ESLint rules (automated).
- TypeScript checks (automated).
- Pre-commit hooks (automated).

## When to Use

- Code quality enforcement.
- Anti-pattern detection.
- CI/CD checks.
- Ongoing validation.

---

# The Balance

- Use prompts for direction and creativity.
- Use toolchain for enforcement and consistency.
- Prompts set the rules; toolchain enforces them.
- Neither is sufficient alone.

---

# Application

1. Use prompts to set the three dials and aesthetic direction.
2. Use toolchain to enforce anti-slop rules and code quality.
3. Document decisions in `docs/decisions/`.
4. Update toolchain rules when project rules change.

---

# Sources

- Gogh - Prompt layer vs toolchain layer analysis.
- Taste Skill v2, Impeccable, Vercel web-design-guidelines.
