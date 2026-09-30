# LMS Knowledge Vault — Master Index

Canonical navigation hub for developers and AI coding agents. This vault is the Single Source of Truth for architecture, domain models, development workflows, design system contracts, and decision records.

---

## 1. Core Architecture & Engineering

- [Architecture & Layers](Architecture.md) — 5-layer hierarchy, downward dependency flow, and parent row concurrency locks.
- [Authentication Architecture](Authentication.md) — Better Auth, session lifecycle, and RBAC models.
- [Coding Standards](Coding%20Standards.md) — Strict TypeScript conventions, error handling, and `ActionResult<T>`.
- [Tech Stack Overview](Tech%20Stack.md) — Next.js 16, React 19, Tailwind v4, Prisma, Neon, ESLint, Prettier, Jest.
- [Development Guide](DEVELOPMENT.md) — Setup, quality commands, Sentry telemetry, and toolchain roadmap.
- [Git Workflow](Development/Git.md) — Trunk-based strategy (`master` / `dev` / `dev/<feature>`), commit standards, and release tagging.
- [Database & Storage API](API/Database.md) — Neon PostgreSQL connection pooling, Prisma schema models, and access patterns.
- [Runtime Architecture Diagram](architecture-runtime.html) — Interactive visual diagram of runtime components.

---

## 2. LMS Domain Knowledge & Features

- [LMS Domain Model & Invariants](domain/lms-domain.md) — Specification of courses, modules, lessons, course lifecycle state machine (`DRAFT` $\to$ `PUBLISHED` $\to$ `ARCHIVED`), slug immutability, and 404 security policy.
- [Domain Entity Reference](reference/Entities.md) — Relational entity attributes, fields, constraints, and invariants.
- [Instructor Workspace Feature](Features/Instructor-Workspace.md) — Instructor dashboard, course authoring, curriculum builder, and student rosters.

---

## 3. Design System Contract

- [Design Tokens](design/tokens.md) — Semantic OKLCH colors, typography scale, concentric radii formulas, and 3-layer shadows.
- [Component Contracts](design/components.md) — Component architecture, Button, Card, Form Controls, Badge, and Toast specifications.
- [Anti-Slop Doctrine](design/anti-slop.md) — The 10 forbidden AI tells, aesthetic remedies, and preferred defaults.

---

## 4. Architectural Decision Records (ADRs)

- [Decisions Index](decisions/README.md) — Catalog of all formal architectural decisions.
- [ADR-001: 5-Layer Downward Architecture](decisions/001-use-layered-architecture.md)
- [ADR-002: Neon PostgreSQL with Prisma](decisions/002-use-neon-with-prisma.md)
- [ADR-003: shadcn/ui Component Library](decisions/003-use-shadcn-ui.md)
- [ADR-004: LMS Domain Model](decisions/004-lms-domain-model.md)
- [ADR Template](decisions/TEMPLATE.md) — Standard structure for recording new architectural decisions.

---

## 5. Quality & Auditing

- [Pre-Flight Quality Audit Checklist](audits/quality-audit.md) — Step-by-step audit covering architecture, types, Next.js 16, UI anti-slop, security, and tests.

---

## 6. AI Agent Operating System

- [AGENTS.md](../AGENTS.md) — Canonical agent entry point and source of truth hierarchy.
- **Operating System Contract** — 11-step cognitive cycle, change-aware verification, and definition of done.
- **Task Protocol & Governance** — Risk-based task tiers, scope lock, approval gates, proportional verification, 4-Layer Security Doctrine, and escalation triggers.
