# Enforcement Layer Overlap

Comparing enforcement approaches across Impeccable, Vercel, and Taste Skill.

---

# Overlap Map

| Category        | Taste Skill             | Impeccable        | Vercel            |
| --------------- | ----------------------- | ----------------- | ----------------- |
| Anti-slop tells | Section 14              | 45-rule detector  | Audit findings    |
| Typography      | Balance/pretty wrapping | Type scale rules  | Line length rules |
| Color           | One accent, one palette | Color violations  | Contrast rules    |
| Layout          | 4+ layout families      | Layout violations | Responsive rules  |
| Interactions    | Hit areas, press states | Interaction rules | Touch targets     |
| Accessibility   | Minimal                 | Minimal           | Comprehensive     |
| Performance     | Minimal                 | Minimal           | Comprehensive     |

---

# Resolution

When rules overlap:

1. Project rules in `docs/rules/` take precedence.
2. Accessibility: Vercel guidelines are most comprehensive.
3. Aesthetic direction: Taste Skill is most comprehensive.
4. Anti-pattern detection: Impeccable is most comprehensive.
5. Micro-interactions: MIFB is most comprehensive.

---

# Conflict Resolution

When skills conflict:

1. Document the conflict.
2. Choose the rule that best fits the project.
3. Record the decision in `docs/decisions/`.
4. Apply consistently.

---

# Sources

- Gogh - Enforcement layer overlap analysis.
- Taste Skill v2, Impeccable, Vercel web-design-guidelines.
