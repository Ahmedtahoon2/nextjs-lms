# Preservation Audit

Ensure existing functionality is not broken during redesigns.

---

# Rules

- Never destroy existing functionality without explicit decision.
- Never break existing tests without explicit decision.
- Never remove existing features without explicit decision.
- Document every removal or change.

---

# What to Check

## Functionality

- [ ] All existing features still work.
- [ ] No regression in existing behavior.
- [ ] All existing tests still pass.

## Data

- [ ] No data loss.
- [ ] No schema changes without migration.
- [ ] No breaking changes to API contracts.

## Performance

- [ ] No performance regression.
- [ ] Bundle size does not increase significantly.
- [ ] No new client-side JavaScript without justification.

## Accessibility

- [ ] No accessibility regression.
- [ ] All existing ARIA attributes preserved.
- [ ] Focus management unchanged or improved.

---

# Documentation

Record all changes:

- What was preserved.
- What was changed.
- Why the change was necessary.
- Impact assessment.

---

# Sources

- Gogh maturity gates - Preservation rules.
- Taste Skill v2 - Section 11 redesign protocol.
