---
trigger: always_on
---

# GitHub Workflow Rules

## General

Use `git` for local repository operations.

Use `gh` for GitHub operations.

Always inspect before modifying.

Never destroy or overwrite user work.

## Before Git Operations

Check:

```bash
git status --short --branch
git branch --show-current
git remote -v
````

Never use destructive commands such as:

```bash
git reset --hard
git clean -fd
git push --force
```

unless the user explicitly asks for them.

## Before Commit

Inspect:

```bash
git status
git diff
```

Only commit changes related to the current task.

Never commit secrets, `.env` files, credentials, tokens, or private keys.

## Before Push

Run the appropriate project checks.

For Node/Next.js projects, check whether these scripts exist:

```bash
pnpm lint
pnpm test
```

Only run commands that actually exist in the project.

Never force-push without explicit permission.

## Pull Requests

Use GitHub CLI:

```bash
gh pr create
gh pr view
gh pr diff
gh pr checks
gh pr review
gh pr merge
```

Before creating a PR:

* inspect the final diff
* run relevant tests
* make sure there are no secrets
* explain what changed
* explain what was tested

## Safety

The agent may inspect, analyze, test, commit, and prepare GitHub operations.

The agent must ask for confirmation before:

* pushing a new branch
* force pushing
* merging a PR
* deleting a branch
* deleting a tag
* bypassing branch protection
* using `gh pr merge --admin`

Never use `--admin` unless explicitly requested by the user.