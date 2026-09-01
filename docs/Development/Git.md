# Git Workflow

This project uses a **trunk-based development workflow** with `master` as the stable production branch and `dev` as the integration branch.

## Branching Strategy

### Core Branches

- **`master`** - Production/stable branch. Protected. Only receives merges from `dev` after full verification.
- **`dev`** - Development/integration branch. Protected. All feature branches merge here first.

### Feature Branches

All feature work happens in `dev/<feature>` branches created from the latest `dev`:

```text
dev/navbar              # UI feature
dev/auth                # Authentication feature
dev/dashboard           # Dashboard feature
dev/fix/navbar-mobile   # Bug fix
dev/docs/architecture   # Documentation update
```

**Naming convention:** `dev/<description>` where description is lowercase with hyphens.

## Workflow

```text
master (production)
  ↑
  │ merge after verification
  │
 dev (integration)
  ↑
  │ merge via PR
  │
dev/<feature> (your work)
```

### Development Process

1. **Start a new feature:**

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b dev/your-feature-name
   ```

2. **Work on your feature:**
   - Keep the branch focused on one feature/fix
   - Make small, logical commits
   - Follow commit conventions (see below)

3. **Before merging to dev:**

   ```bash
   # Ensure all checks pass
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

4. **Create Pull Request:**
   - Target: `dev` branch
   - Ensure CI passes (lint, typecheck, tests, build)
   - Get code review if possible
   - Merge when approved and green

5. **Keep dev stable:**
   - `dev` should always build successfully
   - Never merge broken code to `dev`
   - Delete feature branches after merging

## Release Workflow

When `dev` is ready for release:

```text
dev
 ↓
1. Run full test suite and verification
 ↓
2. Update version in package.json
 ↓
3. Create PR: dev → master
 ↓
4. Merge to master after approval
 ↓
5. Tag release with vX.Y.Z
 ↓
6. Deploy to production
```

### Versioning

Use **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **PATCH** (0.1.0 → 0.1.1) - Bug fixes, no breaking changes
- **MINOR** (0.1.0 → 0.2.0) - New features, backward-compatible
- **MAJOR** (0.1.0 → 1.0.0) - Breaking changes

### Release Steps

```bash
# 1. Ensure dev is stable and tested
git checkout dev
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# 2. Update version (manually edit package.json or use npm version)
# For a minor release:
npm version minor -m "chore: release v%s"

# 3. Push version commit to dev
git push origin dev

# 4. Create PR from dev to master
# (Use GitHub/GitLab UI or CLI tool)

# 5. After merge, tag the release on master
git checkout master
git pull origin master
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0

# 6. Deploy to production
```

## Commit Conventions

Use **Conventional Commits**: `type(scope): description`

### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `refactor` - Code refactoring (no behavior change)
- `style` - Formatting, whitespace (no code change)
- `test` - Add or update tests
- `chore` - Maintenance, dependencies
- `ci` - CI configuration changes
- `build` - Build system changes
- `perf` - Performance improvements

### Examples

```bash
feat(auth): add email verification flow
fix(navbar): resolve mobile menu z-index issue
docs(readme): update installation instructions
refactor(user-service): extract validation logic
test(auth): add session expiry tests
chore(deps): upgrade Next.js to 16.2.10
```

## Pull Requests

Every PR must:

- ✅ Pass ESLint without errors
- ✅ Pass TypeScript type checking
- ✅ Pass all tests
- ✅ Build successfully
- ✅ Include relevant documentation updates
- ✅ Have a clear description of changes

## Git Hooks (Husky + lint-staged)

Pre-commit hook runs automatically on `git commit`:

- ESLint fix on staged `.js`, `.jsx`, `.ts`, `.tsx` files
- Prettier format on staged files
- TypeScript check (full project)

**To skip hooks** (only when absolutely necessary):

```bash
git commit --no-verify -m "your message"
```

## Protected Branch Rules

### `master` branch

- ❌ No direct commits
- ✅ Only accepts merges from `dev`
- ✅ Requires PR approval
- ✅ Requires CI to pass

### `dev` branch

- ❌ No direct commits
- ✅ Only accepts merges from `dev/<feature>` branches
- ✅ Requires CI to pass
- ✅ Must stay buildable at all times

## Best Practices

### Do

- ✅ Create feature branches from the latest `dev`
- ✅ Keep feature branches focused on one task
- ✅ Write clear, descriptive commit messages
- ✅ Run verification checks before creating PRs
- ✅ Delete feature branches after merging
- ✅ Keep commits small and logical
- ✅ Rebase feature branches on `dev` to stay current
- ✅ Use `git pull --rebase` to avoid merge commits

### Don't

- ❌ Never commit directly to `master` or `dev`
- ❌ Never commit secrets or `.env` files
- ❌ Never use `git push --force` on shared branches
- ❌ Never rewrite history on public branches
- ❌ Never merge broken code to `dev`
- ❌ Don't use `git reset --hard` without understanding consequences
- ❌ Don't use `git clean -fd` without caution

### Database Changes

- Schema changes must include Prisma migrations
- Test migrations locally before committing
- Include migration verification in PR description
- Never modify production database manually

### Force Push Safety

If you must force push (rare cases on your own feature branch only):

```bash
# Safer alternative to --force
git push --force-with-lease origin dev/your-feature
```

This ensures you don't overwrite others' work.

## CI/CD

GitHub Actions runs on:

- Push to `master` or `dev` (currently `main`, `develop` - will be updated)
- Pull requests to `master` or `dev`

CI checks:

1. **Quality** - TypeScript, ESLint, Knip (dead code)
2. **Tests** - Jest test suite
3. **Build** - Production build verification

All checks must pass before merge.

## Quick Reference

```bash
# Start new feature
git checkout dev && git pull && git checkout -b dev/my-feature

# Regular development
git add .
git commit -m "feat(scope): description"
git push origin dev/my-feature

# Before creating PR
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# Update your branch with latest dev
git checkout dev && git pull
git checkout dev/my-feature
git rebase dev

# After PR is merged
git checkout dev && git pull
git branch -d dev/my-feature
```
