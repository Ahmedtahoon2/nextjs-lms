# Git Workflow

This document defines the Git workflow used throughout the project.

---

# Branch Strategy

Main branches

- main
- develop

Feature branches

```
feature/authentication

feature/dashboard

feature/profile
```

Bug fixes

```
fix/login-error
```

Hotfixes

```
hotfix/security-patch
```

Documentation

```
docs/readme-update
```

---

# Commit Convention

Format

```
type(scope): description
```

Examples

```
feat(auth): add login page

fix(api): handle invalid token

docs(readme): improve setup guide

refactor(user): simplify service

test(auth): add login tests

chore(deps): update dependencies
```

---

# Commit Types

- feat
- fix
- docs
- refactor
- style
- test
- chore
- ci
- build
- perf

---

# Pull Requests

Every Pull Request should:

- Pass lint
- Pass tests
- Build successfully
- Include documentation updates if needed

---

# Git Hooks

The project uses:

- Husky
- lint-staged

Checks include:

- ESLint
- TypeScript
- Formatting
- Tests (future)

---

# Protected Branches

The `main` branch should never receive direct commits.

Changes should be merged through Pull Requests.

---

# Best Practices

- Keep commits focused.
- Avoid large commits.
- Write meaningful commit messages.
- Rebase when appropriate.
- Delete merged branches.

---
