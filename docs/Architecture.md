# Project Architecture

## Overview

This project follows a layered architecture designed for scalability, maintainability, and testability.

The primary goal is to isolate business logic from the presentation layer while keeping every layer focused on a single responsibility.

---

# Architecture Layers

```
┌────────────────────────────┐
│         UI Layer           │
│   React Components / RSC   │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│     Actions / Routes       │
│ Request & Response Handling│
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│       Service Layer        │
│ Business Logic             │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│     Repository Layer       │
│ Data Access                │
└──────────────┬─────────────┘
               │
┌──────────────▼─────────────┐
│      Database Layer        │
│ Prisma + PostgreSQL        │
└────────────────────────────┘
```

---

# Responsibilities

## UI Layer

Responsible for:

- Rendering the interface
- User interactions
- Displaying application state

Must never contain business logic.

---

## Actions / Routes

Responsible for:

- Receiving requests
- Authentication
- Authorization
- Input validation
- Calling services
- Returning responses

---

## Service Layer

Responsible for:

- Business rules
- Workflows
- Coordination between repositories
- Validation beyond schema validation

Services should remain independent from UI.

---

## Repository Layer

Responsible for:

- Database queries
- CRUD operations
- Data persistence

Repositories should never contain business rules.

---

## Database Layer

Responsible for:

- Prisma models
- Migrations
- PostgreSQL

No application logic belongs here.

---

# Design Principles

- Separation of Concerns
- Single Responsibility Principle
- Composition over Inheritance
- Dependency Isolation
- Predictable Data Flow

---

# Data Flow

```
Request

↓

Validation

↓

Service

↓

Repository

↓

Database

↓

Repository

↓

Service

↓

Response
```

---

# Component Organization

```
components/
    ui/
    layout/
    shared/

features/
    authentication/
    dashboard/
    profile/
```

---

# Future Expansion

The architecture is designed to support:

- Authentication
- Authorization
- Background Jobs
- Queues
- WebSockets
- File Storage
- Notifications
- Multi-tenancy
- API Versioning

---

## Documentation Rules

Every significant change should update the relevant documentation.

Architecture decisions should be documented before implementation whenever possible.

Documentation should always reflect the current state of the project.
