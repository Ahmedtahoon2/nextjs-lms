# Questions

Frequently asked questions about the design skill system.

---

# General

## What is the design skill system?

A collection of rules, workflows, and tools for building high-quality, intentional UI with AI coding agents.

## Why not just use one skill?

Each skill covers different aspects:

- Taste Skill: Aesthetic direction.
- Impeccable: Anti-pattern detection.
- MIFB: Micro-interactions.
- Vercel: Accessibility and performance.
- Anthropic: Taste prompting baseline.

Using all six provides comprehensive coverage.

## How do I get started?

Read `docs/meta/Start Here.md` and `docs/deliverables/Quickstart.md`.

---

# Technical

## What are the three dials?

Design Variance, Motion Intensity, and Visual Density. They set the aesthetic direction before building.

## What is Section 14?

The mandatory pre-flight checklist from Taste Skill. Every box must pass before shipping.

## What is the em-dash ban?

A rule from Taste Skill that bans em-dashes and en-dashes in visible text. Use hyphens instead.

---

# Process

## When do I run the pre-flight?

Before every deliverable. It is mandatory.

## What if skills conflict?

Follow the resolution order in `docs/decisions/Enforcement Layer Overlap.md`.

## How do I document decisions?

Create a new file in `docs/decisions/` following the existing format.
