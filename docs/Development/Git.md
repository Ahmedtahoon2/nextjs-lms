# Git Workflow Guide

Trunk-based development workflow for the Next.js LMS platform. `master` is the production branch and `dev` is the integration branch.

---

## 1. Branch Strategy

```text
master (production / releases)
  ↑
  │ merge via PR after full verification
  │
 dev (integration / protected)
  ↑
  │ merge via PR
  │
dev/<feature-name> (working branch)
```

- **`master`**: Production-ready code. Protected. Direct commits forbidden.
- **`dev`**: Active integration branch. Protected. Direct commits forbidden.
- **`dev/<feature>`**: Feature and bug fix branches created off `dev` (e.g. `dev/course-player`, `dev/auth-guards`).

---

## 2. Feature Development Lifecycle

1. **Create branch:**

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b dev/<feature-name>
   ```

2. **Commit conventions:**
   Use Conventional Commits: `type(scope): description`
   - `feat`: New user-facing feature
   - `fix`: Bug fix
   - `docs`: Documentation updates
   - `refactor`: Architectural or code restructuring without behavior change
   - `test`: Adding or updating test suites
   - `chore`: Dependency updates, tooling configuration

3. **Pre-PR verification (All checks must pass):**

   ```bash
   pnpm check       # ESLint + TypeScript + Knip + Prettier
   pnpm test        # Jest test suite
   pnpm build       # Next.js production build verification
   ```

4. **Create PR to `dev`:**
   - Summarize changes, testing performed, and security implications.
   - Clean up branch after merge: `git branch -d dev/<feature-name>`.

---

## 3. Release Process

1. Verify `dev` passes all automated tests and quality checks.
2. Bump version in `package.json` following Semantic Versioning (SemVer).
3. Create PR from `dev` into `master`.
4. Tag release on `master`:
   ```bash
   git checkout master
   git pull origin master
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```

---

## 4. Safety Invariants

- **Never** commit secrets, private keys, or `.env` files.
- **Never** use `git push --force` on shared branches (`dev`, `master`). Use `--force-with-lease` on local feature branches only.
- **Database Migrations:** Schema changes must include verified Prisma migrations (`pnpm db:migrate:dev`).
