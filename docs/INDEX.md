# LMS Knowledge Vault — Master Index

Canonical navigation hub for developers and AI coding agents. This vault is the Single Source of Truth for architecture, domain models, design system contracts, and decision records.

---

## 1. Core Architecture
- [Architecture & Layers](Architecture.md) — 5-layer hierarchy, downward dependency flow, and concurrency locks.
- [Coding Standards](Coding%20Standards.md) — TypeScript conventions, error handling, and file naming.
- [Authentication Architecture](Authentication.md) — Better Auth, session lifecycle, and RBAC models.
- [Tech Stack Overview](Tech%20Stack.md) — Next.js 16, React 19, Tailwind v4, Prisma, Neon, Biome, Jest.

---

## 2. LMS Domain Knowledge
- [LMS Domain Model & Invariants](domain/lms-domain.md) — Comprehensive specification of courses, modules, lessons, course lifecycle state machine (`DRAFT` $\to$ `PUBLISHED` $\to$ `ARCHIVED`), slug immutability, 404 security policy, and curriculum concurrency.
- [Domain Entity Reference](reference/Entities.md) — Relational entity attributes, fields, and schema notes.

---

## 3. Design System Contract
- [Design Tokens](design/tokens.md) — Semantic OKLCH colors, typography scale, concentric radii formulas, and 3-layer shadows.
- [Component Contracts](design/components.md) — Button, Card, Input, Textarea, Badge, and Toast specifications.
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

## 6. Implementation Roadmap & Tasks
- [Tasks Overview (Tasks 00–08)](tasks/00-overview.md)
- [Task 01: Architecture Foundation](tasks/01-architecture-foundation.md)
- [Task 02: User Profile & Roles](tasks/02-user-profile-roles.md)
- [Task 03: Course & Curriculum Domain](tasks/03-course-curriculum-domain.md)
- [Task 04: Lesson Content Authoring](tasks/04-lesson-content-authoring.md)
- [Task 05: Enrollment & Progress Tracking](tasks/05-enrollment-progress-tracking.md)
- [Task 06: Course Catalog & Player](tasks/06-course-catalog-player.md)
- [Task 07: Instructor Dashboard](tasks/07-instructor-dashboard.md)
- [Task 08: QA, Security & Documentation](tasks/08-qa-security-documentation.md)

---

## 7. AI Agent Operating System
- [AGENTS.md](../AGENTS.md) — Canonical agent entry point and source of truth hierarchy.
- [Operating System Contract](../.agents/rules/operating-system.md) — 11-step cognitive cycle, change-aware verification, definition of done, and escalation triggers.
- [Skill Router](../.agents/rules/skill-router.md) — Context-efficient skill orchestration matrix.
