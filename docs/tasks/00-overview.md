# LMS Implementation Roadmap: Master Overview & Architectural Contract

## 1. Executive Summary

This document serves as the **authoritative architectural contract and execution roadmap** for the LMS (Learning Management System) platform.

The **CURRENT PROJECT is the single source of truth**. All architectural principles, technology choices, domain boundaries, and coding conventions are established by the current codebase:
- **Framework**: Next.js 16 (App Router, Server Components first)
- **UI Library**: React 19 + Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript (strict mode, zero `any`)
- **Database & ORM**: PostgreSQL (Neon Serverless) via Prisma 7
- **Authentication**: Better Auth (session-based, email/password + OAuth foundation)
- **Authorization**: Fine-grained RBAC (`Role`, `Permission`, `UserRole`, `RolePermission`)
- **Validation**: Zod (runtime validation and inferred TypeScript types)
- **Forms**: React Hook Form with `@hookform/resolvers/zod`
- **Observability & Testing**: Sentry + Jest + React Testing Library
- **Architecture**: Strict Layered Architecture (`UI → Actions / Routes → Services → Concrete Repositories → Database`)

The legacy Repomix report was analyzed **exclusively** as a source of domain inspiration, UX patterns, and anti-patterns to avoid. It is **not** a feature specification, backlog, or roadmap.

---

## 2. Scope Boundary

```
┌────────────────────────────────────────────────────────────────────────┐
│                              IN SCOPE (MVP)                            │
│  Users / Existing Auth & RBAC · Instructor-Owned Courses               │
│  Modules · Lessons · Requirement-Driven Lesson Content                 │
│  Course Enrollment · Per-Student Lesson Progress                       │
│  Instructor Course Management · Student Learning Experience            │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        POSTPONED / FUTURE                              │
│  Lesson Q&A Discussions · Course Notifications · Payments & Stripe     │
│  Quizzes & Assessments · Completion Certificates · Study Cohorts       │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                              REJECTED                                  │
│  Social Newsfeed & Wall · Channels & Posts · Likes & Reactions         │
│  Multi-Tenancy / Organizations / Workspaces · Stripe Connect           │
│  Affiliate Referral Engine · Custom White-Label Domains · Direct Chat  │
│  Generic Base Repositories · Premature Multi-Provider Storage Engines  │
│  TanStack Query / Redux · External Search Engines (Algolia/Elastic)    │
└────────────────────────────────────────────────────────────────────────┘
```

### In Scope (Core MVP Learning Workflow)
1. **Curriculum Hierarchy**: Sequential educational content organization (`Course → Module → Lesson`) with explicit integer ordering (`orderIndex`) and draft/published lifecycles.
2. **Lesson Content**: Minimal, requirement-driven lesson content authoring supporting markdown/structured text, formatted code snippets, and video embed URLs (YouTube, Vimeo, Loom, or direct video link).
3. **Course Media**: Simple, practical thumbnail and resource URL references without over-engineered cloud provider abstractions.
4. **Student Enrollment**: Explicit enrollment entity associating students with courses, granting access to restricted lessons.
5. **Per-Student Progress Tracking**: Individualized, user-isolated completion tracking per lesson (`LessonProgress`) and aggregate progress percentages per course (`CourseEnrollment`).
6. **Student Learning Experience**: Public course catalog with basic database filtering (`contains`), syllabus preview, and a distraction-free course player.
7. **Instructor Course Management**: Dedicated instructor management views for drafting courses, organizing modules and lessons with ordering, publishing courses, and inspecting student rosters.
8. **Multi-Tier Authorization & Resource Ownership**: Comprehensive access control enforcing authentication, role validation, resource ownership (`course.instructorId === session.userId`), and resource state checks on every operation.

### Postponed (Future Considerations)
*These features are valuable for future iterations but are intentionally postponed until the core LMS workflow is verified:*
1. **Lesson Q&A Discussions**: Contextual threaded questions attached strictly to individual lessons.
2. **Platform Notifications**: Email and in-app alerts for course enrollment, milestone completions, and instructor announcements.
3. **Monetization & Payments**: Direct checkout for purchasing paid courses or subscriptions.
4. **Assessments & Quizzes**: Multiple-choice quizzes, assignments, and automated grading.
5. **Course Completion Certificates**: Automated PDF certificate generation upon 100% course completion.
6. **Cohorts & Study Groups**: Collaborative student groups if required by future curriculum models.

### Rejected (Out of Scope)
*Strictly excluded from the LMS core:*
1. **Multi-Tenancy, Organizations, & Workspaces**: The current project does not have an organization or tenant model. Resource ownership belongs directly to individual users/instructors.
2. **Social Community & Newsfeed**: Wall posts, social feeds, channel discussions, likes, and reactions.
3. **Multi-Vendor Marketplace (Stripe Connect)**: Split payouts and multi-vendor seller onboarding.
4. **Affiliate Referral Engine**: Tracking affiliate codes and commissions.
5. **Custom Domain Multi-Tenancy**: DNS routing and custom domain mapping.
6. **Real-Time Direct Messaging / Chat**: Peer-to-peer or group instant messaging.
7. **Generic Base Repositories**: `BaseRepository<T>`, `GenericRepository<T>`, or repository factories.
8. **Premature Storage Engines**: Complex multi-cloud storage frameworks before an actual requirement exists.
9. **External Search Engines**: Algolia, Elasticsearch, or Meilisearch.

---

## 3. Feature Decision Matrix

| Legacy Concept | Relevance to Current LMS | Decision | Architectural & Product Rationale |
|---|---|---|---|
| **Courses** | Core LMS Domain | **ADOPT** | Central domain model of the LMS. Owned directly by authoring instructors, enrolled by students. |
| **Modules** | Core LMS Domain | **ADAPT** | Re-modeled as direct children of Course (not Group/Community) with explicit `orderIndex` sorting. |
| **Sections / Lessons** | Core LMS Domain | **ADAPT** | Renamed to Lessons; isolated from community channels. Features structured content and per-student progress. |
| **Enrollment** | Core LMS Domain | **ADOPT** | Fundamental relation linking `User` to `Course`, enabling access control and progress aggregation. |
| **Learning Progress** | Core LMS Domain | **ADAPT** | **Fixed critical legacy defect**: Legacy stored `complete: Boolean` globally on the lesson itself. Redesigned into individual `LessonProgress` records per user. |
| **User Profile & Roles** | Core LMS Domain | **ADAPT** | Enhanced with Student and Instructor personas on top of existing Better Auth and RBAC foundation. |
| **RBAC Authorization** | Core Infrastructure | **ADOPT** | Existing database RBAC (`Role`, `Permission`, `UserRole`, `RolePermission`) is authoritative. |
| **Lesson Content Authoring** | Core LMS Domain | **ADAPT** | Requirement-driven structured content (markdown/text, code, video embed URLs) with server-side sanitization. |
| **Course Media Handling** | Core LMS Domain | **ADAPT** | Simple URL references and direct file handling; no premature multi-provider abstraction layer. |
| **Course Catalog & Filtering** | Discovery | **ADAPT** | Server-rendered catalog with basic database filtering (`contains` on title/category) using Prisma. |
| **Student Learning Player** | Core UX | **ADAPT** | Distraction-free player layout inspired by legacy course viewer, built with Server Components and accessible navigation. |
| **Form Patterns (RHF + Zod)** | Engineering Pattern | **USE AS PATTERN** | Reusable React Hook Form + Zod pattern with unified error mapping. |
| **Loading & Empty States** | UX Pattern | **USE AS PATTERN** | shadcn/ui skeletons and structured empty states for consistent async UX. |
| **Client-Side ID Generation (`uuidv4()`)** | Legacy Flaw | **REJECT** | Severe security flaw in legacy code. All IDs (`cuid()`) and timestamps are generated server-side. |
| **Unauthenticated Actions** | Legacy Flaw | **REJECT** | Legacy actions lacked session and ownership checks. Current project enforces strict multi-level authorization. |
| **Groups (Communities)** | Community Tool | **POSTPONE** | Not required for a focused LMS. Postponed to Future Considerations. |
| **Channels** | Community Tool | **POSTPONE** | Replaced by direct course hierarchy. |
| **Posts & Social Wall** | Social Network | **REJECT** | Scope bloat that distracts from the core learning experience. |
| **Likes & Reactions** | Social Network | **REJECT** | Irrelevant for learning content delivery. |
| **Direct Messaging (Chat)** | Communication | **POSTPONE** | High operational and infrastructure cost; not part of LMS foundation. |
| **Lesson Q&A Discussions** | Educational Feature | **POSTPONE** | Valuable future enhancement once core learning delivery is verified. |
| **Stripe Subscriptions** | Monetization | **POSTPONE** | Deferred until foundational LMS functionality is verified. |
| **Stripe Connect** | Multi-Vendor Marketplace | **REJECT** | Multi-tenant marketplace payouts are outside the current product scope. |
| **Affiliate Tracking** | Growth Marketing | **REJECT** | Not relevant to the core educational product. |
| **Custom Domains** | White-labeling | **REJECT** | Unnecessary infrastructure overhead for the current platform. |
| **TanStack Query Everywhere** | State Architecture | **REJECT** | Next.js 16 Server Components and Server Actions provide clean data fetching without client cache bloat. |
| **Generic Base Repositories** | Over-engineering | **REJECT** | Adds unnecessary indirection without real value. Concrete domain repositories only. |
| **Multi-Tenancy / Organizations** | Invented Concept | **REJECT** | No tenant/org model exists. Resource ownership (`course.instructorId === session.userId`) is used directly. |

---

## 4. Architectural Invariants

All tasks must strictly adhere to the layered architecture:

```
UI (Server Components first, Client Components for interactive leaves only)
 ↓
Actions / Route Handlers (Transport boundary, requireAuth(), Zod input parsing)
 ↓
Services (4-tier authorization, business rules, transactions)
 ↓
Concrete Repositories (Concrete domain Prisma queries, data mapping, persistence)
 ↓
Database (Neon PostgreSQL via Prisma 7)
```

### Invariant Rules:
1. **Layer Integrity**: UI never accesses Repositories or Prisma directly. Actions never execute business logic or query Repositories directly. Services never know about HTTP or Next.js transport objects (`Request`, `Response`, `headers`).
2. **Concrete Repositories Only**: No `BaseRepository<T>`, `GenericRepository<T>`, or abstract repository factories. Each domain entity has a concrete repository (`UserRepository`, `CourseRepository`, `ModuleRepository`, `LessonRepository`, `EnrollmentRepository`, `LessonProgressRepository`).
3. **No Invented Tenancy**: The platform has no tenant or organization entity. Authorization operates on **Resource Ownership**:
   $$\text{Instructor A owns Course X} \iff \text{Course.instructorId} == \text{session.userId}$$
4. **Server Components First**: Server Components perform data fetching by default. Client Components are used only for interactive leaves (forms, collapsible drawers, media players).
5. **Server-Side Identity**: All IDs are generated server-side or database-side (`cuid()`). No client-supplied IDs are ever accepted for creation operations.
6. **Type Safety & Zero `any`**: All inputs, database models, and return payloads must have inferred or explicit TypeScript types validated by Zod schemas.

---

## 5. Authorization & Resource Ownership Doctrine

Authentication and role checks alone are **NOT** sufficient. Every protected mutation and sensitive read must satisfy the 4-tier authorization check:

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication                                      │
│    Is the user session active and verified?            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Role / Permission Authorization                     │
│    Does the user hold the necessary role/permission?   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Resource Ownership Verification                     │
│    Does the user own this specific resource?           │
│    (e.g., course.instructorId === session.userId)     │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Resource State Validation                           │
│    Is the operation permitted for the resource's       │
│    current lifecycle state (DRAFT/PUBLISHED/ARCHIVED)? │
└────────────────────────────────────────────────────────┘
```

### Concrete Ownership Invariants:
- **Instructor Resource Ownership**: Instructor A cannot view, update, delete, or publish Instructor B's course or its modules/lessons. Services must query the course and assert `course.instructorId === session.userId`.
- **Student Progress Isolation**: Student A cannot view or mutate Student B's progress. Progress records are strictly scoped to `session.userId`.
- **Course Publication State**: A course cannot be transitioned to `PUBLISHED` unless it contains at least one module and at least one lesson.
- **Enrolled Student Access**: Restricted lessons can only be read by students with an active `CourseEnrollment` record, or if the lesson has `isFreePreview: true`.
- **Roster Privacy**: Course enrollment rosters can only be viewed by the authoring instructor or a platform administrator.
- **No Self-Privilege Escalation**: Users cannot grant themselves the `instructor` or `admin` role through profile updates.

---

## 6. Library & Version Policy

1. **Current Codebase is Authoritative**: Never copy package versions or choices from the legacy report.
2. **Inspect Existing Dependencies First**: Always prefer installed libraries (`zod`, `react-hook-form`, `lucide-react`, `@prisma/client`, `better-auth`) before considering additions.
3. **Strict Justification Required**: Any new dependency must be justified by an explicit requirement that the current stack cannot solve cleanly.
4. **No Premature Additions**:
   - No TanStack Query: Server Components and Server Actions solve data fetching natively.
   - No S3 / Cloud storage frameworks: Simple URL references and direct file handling only when needed.
   - No heavy TipTap extensions: Minimal content editor tailored to lesson needs.
5. **Compatibility Verification**: Any new package must be verified compatible with Next.js 16, React 19, and TypeScript 5.x.

---

## 7. Definition of Done (DoD) Rules

A task is considered complete **only** when all of the following criteria are met:

1. **Architectural Compliance**: Adheres strictly to `UI → Actions → Services → Concrete Repositories → Database`. No layer boundaries are bypassed.
2. **Multi-Tier Authorization**: Authentication, role verification, resource ownership, and state validation are enforced and covered by tests.
3. **Input Validation**: All user inputs are parsed and validated with Zod schemas at the Action boundary.
4. **Type Safety**: Zero `any` types. All types are either inferred from Prisma/Zod or explicitly defined.
5. **Per-Feature Testing**: Unit tests for Services, integration tests for Actions/Repositories, and component tests for key interactive UI elements.
6. **Error Handling**: Uses the typed `AppError` hierarchy (`NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ValidationError`) and returns structured `ActionResult<T>`.
7. **Design Rules Compliance**: Follows project design rules (anti-slop, no em-dashes, 40x40px touch targets, press feedback, `prefers-reduced-motion`).
8. **Clean Quality Gate**: `pnpm lint`, `pnpm typecheck` (`tsc --noEmit`), and `pnpm test` pass with zero errors.
9. **Documentation**: Task documentation and any relevant architecture docs are updated to reflect the actual implemented state.

---

## 8. Implementation Sequence

The roadmap proceeds in a strict, dependency-ordered sequence of **8 cohesive tasks**:

```
Task 01: Core Architecture & Foundation Hardening
  │  (Error handling, simple ActionResult<T>, session & role helpers, pagination schema)
  ▼
Task 02: User Profile & Role Management
  │  (Student/Instructor profiles, RBAC role assignment, resource self-ownership, settings UI)
  ▼
Task 03: Course & Curriculum Domain
  │  (Course, Module, Lesson models, ordering, instructor ownership enforcement, services)
  ▼
Task 04: Lesson Content Authoring & Media Handling
  │  (LessonContent model, focused editor, HTML sanitization, simple media/video URL handling)
  ▼
Task 05: Enrollment & Learning Progress Tracking
  │  (CourseEnrollment, user-isolated LessonProgress, progress calculation, next lesson)
  ▼
Task 06: Course Catalog & Student Learning Player
  │  (Server-rendered catalog, basic database filtering, syllabus preview, distraction-free player)
  ▼
Task 07: Instructor Course Management Workspace
  │  (Course management, curriculum builder with reordering, student roster insights)
  ▼
Task 08: Final QA, Security Audit & Documentation
     (Holistic test execution, IDOR and XSS penetration audit, performance baselines, ADR 004)
```
