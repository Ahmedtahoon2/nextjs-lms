# Git Workflow

## Branches

- **Main:** `main`, `develop`. Protected — no direct commits, only via PR.
- **Feature:** `feature/<name>` (e.g. `feature/authentication`).
- **Fix:** `fix/<name>` (e.g. `fix/login-error`).
- **Hotfix:** `hotfix/<name>`.
- **Docs:** `docs/<name>`.

## Commits

Conventional Commits: `type(scope): description`.

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `ci`, `build`, `perf`.

## Pull Requests

Every PR must: pass lint, pass tests, build successfully, include doc updates if needed.

## Hooks (Husky + lint-staged)

Pre-commit: ESLint, Prettier, TypeScript on staged files.

## Best Practices

Keep commits focused and small · write meaningful messages · rebase when appropriate · delete merged branches.
