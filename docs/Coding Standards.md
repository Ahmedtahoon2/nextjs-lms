# Coding Standards

This document defines the coding conventions used throughout the project.

---

# General Rules

- Use TypeScript Strict Mode.
- Keep code readable.
- Prefer simplicity.
- Avoid unnecessary abstractions.
- Never duplicate business logic.

---

# File Naming

Components

```
PascalCase.tsx
```

Hooks

```
useSomething.ts
```

Utilities

```
camelCase.ts
```

Constants

```
UPPER_SNAKE_CASE.ts
```

Types

```
types.ts
```

---

# Imports

Always use aliases.

Correct

```ts
import { Button } from "@/components/ui/button";
```

Avoid

```ts
import Button from "../../../../Button";
```

---

# Components

Prefer:

- Server Components
- Small components
- Composition
- Single responsibility

Avoid:

- Huge components
- Nested conditionals
- Business logic inside UI

---

# Styling

Use only Tailwind CSS.

Avoid:

- Inline styles
- CSS duplication

---

# State Management

Priority order:

1. Server State
2. URL State
3. Local State

Avoid unnecessary global state.

---

# Business Logic

Business logic belongs only in Services.

Never place business rules inside:

- Components
- Hooks
- Repositories

---

# Database

All database access must go through repositories.

Never call Prisma directly from UI.

---

# Error Handling

Always:

- Return meaningful errors
- Validate inputs
- Handle unexpected failures

---

# Performance

Prefer:

- Server Components
- Lazy loading
- Memoization only when needed

Avoid premature optimization.

---

# Security

Always:

- Validate server input
- Sanitize user content
- Store secrets in environment variables
- Follow least privilege principles

---

# Testing

Every important business rule should have tests.

Critical UI flows should have component or integration tests.

---

# Documentation

Architecture changes require documentation updates.

Documentation should always reflect reality.

---

# Documentation Rules

- Every significant change should update the relevant documentation.

---
