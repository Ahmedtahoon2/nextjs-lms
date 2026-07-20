# Impeccable Audit and Detect

Automated visual and engineering defect detection using Impeccable.

---

# Installation

```bash
npx impeccable install
```

---

# Running Detection

```bash
npx impeccable detect
```

This runs 45 deterministic rules without an LLM.

---

# What It Detects

- Typography violations.
- Color violations.
- Layout violations.
- Interaction violations.
- Performance violations.
- Accessibility violations.

---

# Named Anti-Slop Tells

- Inter for everything without justification.
- Purple-to-blue gradients.
- Cards nested in cards.
- Decorative grid backgrounds.
- Two-axis gradient overlay patterns.

---

# CI/CD Integration

Add to your CI pipeline:

```bash
npx impeccable detect --ci
```

Fails the build if any critical violations are found.

---

# Manual Review

After automated detection:

1. Review findings.
2. Fix critical violations first.
3. Address warnings based on priority.
4. Document any intentional deviations.

---

# Sources

- pbakaus/impeccable (Apache-2.0).
- impeccable.style.
