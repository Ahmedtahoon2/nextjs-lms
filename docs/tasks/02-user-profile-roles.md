# Task 02: User Profile & Role Management

## Objective

Extend user identity with LMS profile fields (bio, headline, avatar, website) and establish foundational LMS personas (Student, Instructor, Admin) using the existing RBAC infrastructure, with strict self-ownership enforcement preventing unauthorized profile modifications or privilege escalation.

---

## Scope

### In Scope
- Extending the `User` model with profile fields (`headline`, `bio`, `avatarUrl`, `website`).
- Seeding default LMS roles (`student`, `instructor`, `admin`) and baseline role assignment permission (`roles:assign`, granted to `admin`). Speculative future permissions (`course:*`, `lesson:*`) pruned to avoid premature domain leakage ahead of Tasks 03–06.
- Concrete `UserRepository` method for profile updates (`updateUserProfile`). Speculative `findInstructors` query removed.
- `ProfileService` enforcing strict self-ownership on profile modifications.
- `AuthorizationService` managing role assignments with admin-only authorization.
- Server Actions for profile retrieval and updating (`getProfileAction`, `updateProfileAction`).
- User profile settings form built with React Hook Form, official `@hookform/resolvers/zod`, and shadcn/ui.

### Out of Scope
- Social features (follow/unfollow, friend connections, activity feeds).
- Public profile vanity URLs or custom domain mapping.
- Complex instructor verification / KYC processes.
- Multi-tenancy or organization memberships (pure individual user ownership).
- Speculative course or lesson queries prior to Tasks 03–06.

---

## Dependencies

- **Preceding Tasks**:
  - `Task 01`: `ActionResult<T>`, `requireAuth()`, and error-handling utilities.
- **Packages**:
  - `better-auth`, `@prisma/client`, `react-hook-form`, `@hookform/resolvers`, `zod`, `lucide-react`.

---

## Architecture Impact

Follows strict layering:
```
Profile Settings Form (Client Component)
  ↓ calls
updateProfileAction (src/actions/profile.ts: requireAuth(), Zod parse)
  ↓ calls
ProfileService (src/services/profile.ts: asserts session.userId === targetUserId)
  ↓ calls
UserRepository (src/repositories/user.ts: concrete Prisma queries)
  ↓ updates
PostgreSQL Database
```

---

## Data Model Impact

```prisma
model User {
  // Existing Better Auth fields
  id            String     @id @default(cuid())
  email         String     @unique
  name          String?
  emailVerified Boolean    @default(false)
  image         String?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  // LMS Profile Fields
  headline      String?
  bio           String?
  avatarUrl     String?
  website       String?

  // Relations
  sessions        Session[]
  accounts        Account[]
  userRoles       UserRole[]
  authoredCourses Course[]           @relation("AuthoredCourses")
  enrollments     CourseEnrollment[]
  lessonProgress  LessonProgress[]

  @@map("user")
}
```

### Model Specifications
- **Why it exists**: Instructors need credentials, bios, and avatars displayed on course pages; students need profile settings.
- **Requirement**: Course author attribution and user self-management.
- **Ownership**: Owned exclusively by the individual user.
- **Read Permissions**: Public for instructor profiles (`name`, `headline`, `bio`, `avatarUrl`); private for student account settings.
- **Mutation Permissions**: Self-only (`session.userId === user.id`).
- **Constraints**: Server-side `cuid()`. Text fields constrained by character limits.
- **Status**: Core MVP.

---

## Authorization Rules

```
┌────────────────────────────────────────────────────────┐
│ 1. Authentication                                      │
│    requireAuth() verifies active session.              │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Role Verification                                   │
│    Any authenticated user holds 'student' permissions. │
│    'instructor' role required for teaching management. │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Resource Self-Ownership                             │
│    User A CANNOT modify User B's profile.              │
│    session.userId MUST strictly match profile userId.  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. Privilege Escalation Prevention                     │
│    Users CANNOT grant themselves 'instructor' or       │
│    'admin' roles via profile updates. Role assignment  │
│    requires admin permission via RoleService.          │
└────────────────────────────────────────────────────────┘
```

---

## Validation

- **Profile Update Schema** (`src/lib/validations/profile.ts`):
  ```typescript
  export const updateProfileSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
    headline: z.string().trim().max(100, "Headline cannot exceed 100 characters").optional().or(z.literal("")),
    bio: z.string().trim().max(1000, "Bio cannot exceed 1000 characters").optional().or(z.literal("")),
    website: z.string().trim().url("Invalid website URL").max(200).optional().or(z.literal("")),
    avatarUrl: z.string().trim().url("Invalid avatar URL").optional().or(z.literal("")),
  });
  export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
  ```

---

## Error Handling

- **Self-Ownership Violation**: Throws `ForbiddenError("You cannot modify another user's profile")`.
- **Validation Failure**: Returns `actionFailure` with field-level validation messages.
- **Missing User**: Throws `NotFoundError("User does not exist")`.

---

## UI / UX Requirements

- Settings page located at `/settings/profile`.
- Adheres to Design Rules:
  - Touch targets minimum 40x40px on all inputs and buttons.
  - Active press feedback (`active:scale-[0.98]`).
  - No em-dashes or en-dashes in visible copy.
  - Loading spinner during submission, toast notification on success/failure.
  - Full keyboard accessibility and proper label associations.

---

## Testing Strategy

- **Service Unit Tests** (`src/services/__tests__/profile.test.ts`):
  - Test profile update succeeds for the owner.
  - Test profile update throws `ForbiddenError` when `session.userId !== targetUserId`.
  - Test role assignment blocks non-admin callers.
- **Validation Tests** (`src/lib/validations/__tests__/profile.test.ts`):
  - Test valid inputs pass.
  - Test overly long bio or invalid URLs fail validation.
- **Component Tests** (`src/components/profile/__tests__/profile-form.test.ts`):
  - Test form renders current profile data.
  - Test validation errors display inline on invalid input.

---

## Documentation Updates

- Update `docs/reference/Entities.md` with new `User` profile fields.
- Document role management in `docs/Authentication.md`.

---

## Acceptance Criteria

- [x] Database migration successfully adds profile columns to `user` table.
- [x] Database seed script initializes default roles (`student`, `instructor`, `admin`).
- [x] Users can edit their own profile through `/settings/profile`.
- [x] Any attempt to edit another user's profile fails with 403 Forbidden.
- [x] No client can elevate their own role through profile updates.
- [x] Unit and component tests pass with 100% success rate.
- [x] `pnpm typecheck` and `pnpm lint` pass with zero errors.

---

## Definition of Done

- [x] Layered architecture adhered to: `UI → Actions → Services → Concrete Repositories → DB`.
- [x] Type-safe: Strict TypeScript, zero `any`.
- [x] Validated: Zod schema parses all profile inputs.
- [x] Authorized: Self-ownership strictly enforced; privilege escalation blocked.
- [x] Tested: Unit tests verify ownership checks and role isolation.
- [x] Documented: Entity reference updated in docs.
- [x] Clean quality gate: Passes lint, typecheck, and test checks.
