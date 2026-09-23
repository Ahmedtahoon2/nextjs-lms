# Architecture Decision Records (ADRs)

This directory contains the official Architectural Decision Records for this project.

## Index of Decisions

| ADR #                                  | Title                                                              | Status   | Date       |
| -------------------------------------- | ------------------------------------------------------------------ | -------- | ---------- |
| [001](001-use-layered-architecture.md) | Use 5-Layer Downward Architecture                                  | Accepted | 2026-07-20 |
| [002](002-use-neon-with-prisma.md)     | Use Neon PostgreSQL with Prisma ORM                                | Accepted | 2026-07-20 |
| [003](003-use-shadcn-ui.md)            | Use shadcn/ui Component Library                                    | Accepted | 2026-07-20 |
| [004](004-lms-domain-model.md)         | Use Dedicated Curriculum, Enrollment, and Isolated Progress Models | Accepted | 2026-09-12 |

---

## When to Write an ADR

Write an ADR when a decision:

- Introduces or changes an architectural layer or boundary.
- Changes database provider, ORM, or major transaction pattern.
- Changes authentication, authorization, or security model.
- Introduces an impactful third-party infrastructure dependency.
- Alters public contracts or API conventions across multiple features.

_Do NOT write ADRs for local variable renaming, trivial component refactoring, or minor UI tweaks._

To create a new ADR, copy [`TEMPLATE.md`](TEMPLATE.md) and number it sequentially (`004-...`).
