# Redesign First-Audit (Prompt 2)

Workflow for redesigning existing interfaces after auditing them.

---

# Steps

## 1. Audit the Existing Interface

Before changing anything, evaluate:

- Run Section 14 pre-flight on the existing page.
- Identify all failed checks.
- Document what works and what does not.
- Check against `docs/rules/AI Tells (Forbidden Patterns).md`.

## 2. Classify the Redesign

Choose one mode:

### Preserve Mode

- Keep the existing structure.
- Fix specific violations.
- Improve micro-interactions.
- Update typography and spacing.

### Overhaul Mode

- Redesign from scratch.
- Keep brand identity and URLs.
- Set new three dials.
- Apply new design direction.

## 3. Never Change Silently

- Document every change.
- Explain why each change was made.
- Preserve existing URLs and routes.
- Preserve brand identity unless explicitly told to change.

## 4. Set the Three Dials

For the new direction:

- Design Variance.
- Motion Intensity.
- Visual Density.

## 5. Build the Redesign

- Follow the Greenfield workflow for new elements.
- Respect preserved elements.
- Apply all design rules.

## 6. Run Pre-Flight

- Complete Section 14 checklist.
- Verify all checks pass.
- If any check fails, revise and re-check.

## 7. Document Changes

- Update all affected documentation.
- Record the redesign decision.
- Update the component inventory.

---

# Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
