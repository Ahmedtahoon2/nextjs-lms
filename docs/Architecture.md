# Architecture Guide

## Overview

This project follows a **layered architecture** designed for scalability, maintainability, and testability. The primary goal is to isolate business logic from the presentation layer while keeping every layer focused on a single responsibility.

## Architecture Layers

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

## Layer Responsibilities

### UI Layer

**Responsible for:**

- Rendering the interface
- User interactions
- Displaying application state

**Must never:**

- Contain business logic
- Access the database directly
- Make direct API calls (use Server Actions instead)

**Example:**

```tsx
// src/app/users/page.tsx
import { getUsers } from "@/actions/users";
import { UserList } from "@/components/users/UserList";

export default async function UsersPage() {
  const users = await getUsers();

  return <UserList users={users} />;
}
```

### Actions / Routes Layer

**Responsible for:**

- Receiving requests
- Authentication
- Authorization
- Input validation (with Zod)
- Calling services
- Returning responses

**Must never:**

- Contain business logic
- Access repositories directly

**Example:**

```ts
// src/actions/users.ts
"use server";

import { createUserSchema } from "@/lib/validations/user";
import { userService } from "@/services/user-service";

export async function createUser(formData: FormData) {
  const validated = createUserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  return await userService.createUser(validated);
}
```

### Service Layer

**Responsible for:**

- Business rules
- Workflows
- Coordination between repositories
- Complex validation beyond schema validation
- Transaction management

**Must never:**

- Know about HTTP/request details
- Depend on UI frameworks

**Example:**

```ts
// src/services/user-service.ts
import { userRepository } from "@/repositories/user-repository";
import { emailService } from "@/services/email-service";

export const userService = {
  async createUser(data: { name: string; email: string }) {
    // Business logic
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await userRepository.create(data);

    // Coordinate with other services
    await emailService.sendWelcomeEmail(user.email);

    return user;
  },
};
```

### Repository Layer

**Responsible for:**

- Database queries
- CRUD operations
- Data mapping
- Query optimization

**Must never:**

- Contain business logic
- Be aware of business rules

**Example:**

```ts
// src/repositories/user-repository.ts
import { prisma } from "@/lib/prisma";

export const userRepository = {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async create(data: { name: string; email: string }) {
    return await prisma.user.create({
      data,
    });
  },
};
```

## Design Principles

### 1. Separation of Concerns

Each layer has a single, well-defined responsibility. Business logic never leaks into UI components or repositories.

### 2. Dependency Direction

Dependencies flow downward:

- UI depends on Actions
- Actions depend on Services
- Services depend on Repositories
- Repositories depend on Database

### 3. Server Components First

Prefer Server Components by default. Use Client Components only when you need:

- State (`useState`, `useReducer`)
- Effects (`useEffect`)
- Event handlers
- Browser APIs
- Third-party libraries that require client-side code

### 4. Type Safety

- Use TypeScript strict mode
- Define types at each layer
- Use Zod for runtime validation
- Never use `any`

### 5. Testability

Each layer can be tested independently:

- **Services**: Unit tests with mocked repositories
- **Repositories**: Integration tests with test database
- **Actions**: Integration tests
- **Components**: React Testing Library

## Common Patterns

### Data Flow Pattern

```
User Action → Server Action → Service → Repository → Database
Database → Repository → Service → Server Action → UI
```

### Error Handling Pattern

```ts
// Services throw descriptive errors
throw new Error('User with this email already exists');

// Actions catch and transform for UI
try {
  await userService.createUser(data);
} catch (error) {
  return { error: error.message };
}

// UI displays errors to users
{error && <p className="text-destructive">{error}</p>}
```

### Transaction Pattern

```ts
// Services coordinate transactions
export const orderService = {
  async createOrder(userId: string, items: OrderItem[]) {
    return await prisma.$transaction(async (tx) => {
      const order = await orderRepository.create({ userId, items }, tx);

      await inventoryRepository.decrementStock(items, tx);

      return order;
    });
  },
};
```

## File Organization

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Route groups
│   ├── api/                 # API routes (when needed)
│   └── layout.tsx
│
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Header, Footer, etc.
│   └── shared/              # Reusable components
│
├── actions/                 # Server Actions
│   ├── users.ts
│   └── posts.ts
│
├── services/                # Business logic
│   ├── user-service.ts
│   └── email-service.ts
│
├── repositories/            # Data access
│   ├── user-repository.ts
│   └── post-repository.ts
│
└── lib/                     # Utilities
    ├── prisma.ts
    ├── utils.ts
    └── validations/
```

## Decision Records

For major architectural decisions, see [ADRs](./ADR/):

- [ADR-001: Layered Architecture](./ADR/001-use-layered-architecture.md)
- [ADR-002: Neon with Prisma](./ADR/002-use-neon-with-prisma.md)
- [ADR-003: shadcn/ui](./ADR/003-use-shadcn-ui.md)

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Server Actions Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
