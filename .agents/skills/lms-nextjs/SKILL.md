---
name: lms-nextjs
description: Next.js 16 App Router conventions, async params and searchParams, Server Components first, Server Actions with ActionResult<T>, loading and error boundaries, metadata generation, and streaming. Load when creating or editing pages, layouts, route handlers, Server Actions, or client components.
---

# Next.js 16 App Router Patterns & Conventions

This skill defines the App Router patterns, component boundaries, dynamic segment handling, and Server Action conventions for this Next.js 16 LMS codebase.

---

## 1. Next.js 16 Async Segment Props Invariant

In Next.js 16, page segment props (`params` and `searchParams`) are asynchronous Promises and must be awaited:

```typescript
interface PageProps {
  params: Promise<{ slug: string; lessonId?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} | EduPlatform` };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  // ...
}
```

---

## 2. Server Components (RSC) by Default

1. **Default Pattern:** All pages (`page.tsx`) and layouts (`layout.tsx`) must remain Server Components.
2. **Data Fetching:**
   - Call Domain Services directly inside Server Components (e.g. `const course = await getCourseBySlug(user?.id, slug)`).
   - Never use `fetch()` or client hooks (`useEffect`, `useQuery`) to fetch internal database data.
   - Run parallel fetches with `Promise.all([serviceA(), serviceB()])` to eliminate waterfalls.
3. **Passing Data:** Pass serializable domain objects directly as props to child Client Components.

---

## 3. Client Component (`"use client"`) Boundaries

- Add `"use client"` **only** when a component requires:
  - Interactivity and event listeners (`onClick`, `onChange`, `onSubmit`).
  - React hooks (`useState`, `useEffect`, `useActionState`, `useOptimistic`).
  - Browser APIs (window, localStorage, media queries).
  - Context providers (`ThemeProvider`, `PlayerProvider`).
- **Leaf Rule:** Keep Client Components at the leaves of the component tree. Wrap them in Server Component parents that feed them data.

---

## 4. Server Actions Pattern (`ActionResult<T>`)

Server Actions live in `src/actions/*.ts` and must strictly follow this pattern:

```typescript
"use server";

import { actionSuccess, actionFailure, type ActionResult } from "@/lib/action-result";
import { requireAuth, requireRole } from "@/lib/auth-helpers";
import { courseSchema, type CourseInput } from "@/lib/validations/course";
import * as courseService from "@/services/course";
import { AppError } from "@/lib/errors";
import { revalidatePath } from "next/cache";

export async function createCourseAction(
  rawInput: unknown
): Promise<ActionResult<{ courseId: string }>> {
  try {
    const session = await requireRole("instructor");
    const parsed = courseSchema.parse(rawInput);
    const course = await courseService.createCourse(session.user.id, parsed);

    revalidatePath("/courses");
    return actionSuccess({ courseId: course.id });
  } catch (error) {
    if (error instanceof AppError) {
      return actionFailure(error.message, error.code);
    }
    return actionFailure("An unexpected error occurred", "INTERNAL_ERROR");
  }
}
```

---

## 5. Route Segment & Error Boundary Files

Every major feature route should implement standardized boundary files:

| File | Type | Purpose |
|---|---|---|
| `page.tsx` | Server Component | The route entry point. Handles async params and renders layout. |
| `layout.tsx` | Server Component | Persistent UI shell. Preserves state across child navigations. |
| `loading.tsx` | Server Component | Instant UI streaming fallback (renders skeleton while page loads). |
| `error.tsx` | Client Component | Catches uncaught runtime errors in route children. Provides `reset()` button. |
| `forbidden.tsx`| Server Component | Next.js 16 boundary for `403 Forbidden` / role violations. |
| `global-error.tsx`| Client Component | Root error boundary handling failures in root `layout.tsx`. |

---

## 6. Route Revalidation & Cache Invalidation

- Call `revalidatePath(path)` inside Server Actions immediately following state-altering mutations.
- Example:
  ```typescript
  revalidatePath(`/courses/${slug}`);
  revalidatePath("/courses");
  ```
