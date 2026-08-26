# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm 8+
- PostgreSQL database (or Neon account)

### Initial Setup

1. **Clone and install:**

```bash
git clone <repository-url>
cd nextjs
pnpm install
```

2. **Configure environment:**

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

3. **Set up database:**

```bash
pnpm prisma:generate
pnpm prisma db push
```

4. **Start development server:**

```bash
pnpm dev
```

## Coding Standards

### TypeScript

- **Always use TypeScript strict mode** (already configured)
- **Never use `any`** - use `unknown` if type is truly unknown
- **Prefer type inference** over explicit types when obvious
- **Use Zod for runtime validation**

**Good:**

```ts
const user = await prisma.user.findUnique({ where: { id } });
// Type is inferred as User | null
```

**Bad:**

```ts
const user: any = await prisma.user.findUnique({ where: { id } });
```

### File Naming

| Type             | Convention               | Example            |
| ---------------- | ------------------------ | ------------------ |
| React Components | PascalCase.tsx           | `UserProfile.tsx`  |
| React Hooks      | useCamelCase.ts          | `useAuth.ts`       |
| Utilities        | camelCase.ts             | `formatDate.ts`    |
| Constants        | UPPER_SNAKE_CASE.ts      | `API_ENDPOINTS.ts` |
| Types            | types.ts or camelCase.ts | `user.types.ts`    |

### Import Conventions

Use path aliases (configured in `tsconfig.json`):

```ts
// ✅ Good
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user-service";

// ❌ Bad
import { Button } from "../../../components/ui/button";
```

### Component Guidelines

**Prefer Server Components:**

```tsx
// This is a Server Component by default
export default async function UserProfile({ userId }: Props) {
  const user = await getUser(userId);
  return <div>{user.name}</div>;
}
```

**Use Client Components only when needed:**

```tsx
"use client";

// Only mark as client when you need:
// - useState, useEffect, or other hooks
// - Event handlers
// - Browser APIs
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Keep components small and focused:**

```tsx
// ✅ Good - single responsibility
function UserAvatar({ name, image }: Props) {
  return (
    <div className="flex items-center gap-2">
      <img src={image} alt={name} />
      <span>{name}</span>
    </div>
  );
}

// ❌ Bad - too many responsibilities
function UserProfilePageWithEverything() {
  // 500 lines of mixed concerns
}
```

### State Management Priority

1. **Server State** (preferred) - fetch on server, pass to client
2. **URL State** - search params, route params
3. **Local State** - `useState` when needed
4. **Context** - avoid unless truly global (theme, auth)

### Styling

**Use Tailwind CSS utilities:**

```tsx
<div className="flex items-center gap-4 rounded-lg bg-card p-4">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

**Use design tokens from `globals.css`:**

```tsx
// ✅ Uses CSS variables
<div className="bg-background text-foreground">

// ❌ Hardcoded colors
<div className="bg-white text-black">
```

**Component variants with CVA:**

```ts
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-sm",
      },
    },
  },
);
```

## Architecture Guidelines

### When to Create Each Layer

**Server Action:**

- User-initiated mutations (form submissions, button clicks)
- Data fetching for client components
- Authentication-required operations

**Service:**

- Business logic
- Multi-step workflows
- Operations involving multiple repositories
- Complex validation

**Repository:**

- Every database table should have a repository
- Complex queries
- Data transformations

### Example: Adding a New Feature

Let's add a "create post" feature:

**1. Define types:**

```ts
// src/lib/validations/post.ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  authorId: z.string(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
```

**2. Create repository:**

```ts
// src/repositories/post-repository.ts
import { prisma } from "@/lib/prisma";
import type { CreatePostInput } from "@/lib/validations/post";

export const postRepository = {
  async create(data: CreatePostInput) {
    return await prisma.post.create({ data });
  },

  async findByAuthor(authorId: string) {
    return await prisma.post.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
    });
  },
};
```

**3. Create service:**

```ts
// src/services/post-service.ts
import { postRepository } from "@/repositories/post-repository";
import type { CreatePostInput } from "@/lib/validations/post";

export const postService = {
  async createPost(data: CreatePostInput) {
    // Business logic: validate, check permissions, etc.
    const post = await postRepository.create(data);

    // Could notify followers, update analytics, etc.

    return post;
  },
};
```

**4. Create Server Action:**

```ts
// src/actions/posts.ts
"use server";

import { revalidatePath } from "next/cache";
import { createPostSchema } from "@/lib/validations/post";
import { postService } from "@/services/post-service";
import { auth } from "@/lib/auth"; // hypothetical

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const validated = createPostSchema.parse({
    title: formData.get("title"),
    content: formData.get("content"),
    authorId: session.user.id,
  });

  const post = await postService.createPost(validated);

  revalidatePath("/posts");

  return { success: true, post };
}
```

**5. Create UI:**

```tsx
// src/components/posts/CreatePostForm.tsx
"use client";

import { useFormState } from "react-dom";
import { createPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreatePostForm() {
  const [state, formAction] = useFormState(createPost, null);

  return (
    <form action={formAction} className="space-y-4">
      <Input name="title" placeholder="Title" required />
      <Textarea name="content" placeholder="Content" required />
      {state?.error && <p className="text-destructive">{state.error}</p>}
      <Button type="submit">Create Post</Button>
    </form>
  );
}
```

## Testing

### Unit Tests (Services)

```ts
// src/services/__tests__/user-service.test.ts
import { userService } from "../user-service";
import { userRepository } from "@/repositories/user-repository";

jest.mock("@/repositories/user-repository");

describe("userService", () => {
  it("should create user", async () => {
    const mockUser = { id: "1", name: "Test", email: "test@example.com" };
    (userRepository.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await userService.createUser({
      name: "Test",
      email: "test@example.com",
    });

    expect(result).toEqual(mockUser);
  });
});
```

### Component Tests

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "../ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Git Workflow

### Commit Messages

Follow conventional commits:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update architecture guide
refactor: extract validation logic
test: add user service tests
```

### Pre-commit Checks

Husky runs automatically:

- ESLint fix
- Prettier format
- Type check
- Tests

To skip (only if necessary):

```bash
git commit --no-verify
```

## Common Tasks

### Adding a shadcn/ui Component

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add dialog
```

### Database Changes

```bash
# 1. Update prisma/schema.prisma
# 2. Push changes
pnpm prisma db push

# Or create a migration
pnpm prisma migrate dev --name add_posts_table
```

### Environment Variables

Add new variables to:

1. `.env.example` (without values)
2. `.env` (with your values)
3. `src/lib/env.ts` (validation with Zod)

## Debugging

### Server Component Errors

Check the terminal, not browser console - Server Components log to server.

### Database Queries

Enable Prisma query logging:

```ts
// src/lib/prisma.ts
const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});
```

### Type Errors

```bash
pnpm typecheck
```

## Performance

### Optimization Checklist

- [ ] Use Server Components by default
- [ ] Implement proper loading states
- [ ] Add Suspense boundaries
- [ ] Optimize images with `next/image`
- [ ] Use dynamic imports for heavy components
- [ ] Index database queries properly
- [ ] Implement pagination for large datasets

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Guides](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
