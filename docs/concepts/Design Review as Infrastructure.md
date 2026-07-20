# Design Review as Infrastructure

Making design review a systematic, repeatable process rather than a one-time check.

---

# The Problem

Design review is typically ad-hoc: someone looks at the UI and gives subjective feedback. This does not scale and is not repeatable.

---

# The Solution

Treat design review as infrastructure:

- Automated checks (Impeccable detector, ESLint, TypeScript).
- Manual checklists (Section 14 pre-flight).
- Source-gated claims (every rule cites a source).
- Repeatable pipelines (audit pipeline flow).

---

# Layers of Review

## Automated

- TypeScript type checking.
- ESLint linting.
- Impeccable 45-rule detector.
- Knip dead code detection.

## Semi-Automated

- Section 14 pre-flight checklist.
- Vercel audit guidelines.
- MIFB review checklist.

## Manual

- Brand fidelity audit.
- Preservation audit.
- Accessibility testing.
- Performance profiling.

---

# Integration

Design review should be part of:

- Pre-commit hooks (Husky).
- CI/CD pipeline (automated checks).
- Pull request review (manual checks).
- Release process (full audit).

---

# Documentation

Every review finding should be:

- Documented in the relevant docs folder.
- Tracked to resolution.
- Linked to the source rule.

---

# Sources

- Developers Digest - "Taste Skills Are Turning Agent Review Into Infrastructure."
- Impeccable - Deterministic detector as infrastructure.
