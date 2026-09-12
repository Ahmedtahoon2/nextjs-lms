---
name: github-pr
description: Safely prepare and create a GitHub pull request.
---

# GitHub Pull Request

Follow these steps in order.

## 1. Inspect

Run:

```bash
git status --short --branch
git branch --show-current
git remote -v
````

Understand the current repository and branch.

Do not modify anything yet.

## 2. Review Changes

Run:

```bash
git status
git diff
git log --oneline -10
```

Determine exactly what changed.

Do not include unrelated changes.

## 3. Validate

Inspect `package.json` and determine the project's available validation commands.

Run appropriate checks such as:

```bash
pnpm lint
pnpm test
```

Only run commands that exist.

Fix problems caused by the current task.

## 4. Final Review

Review the complete branch diff against the base branch.

Check for:

* bugs
* regressions
* security problems
* type errors
* missing tests
* accidental files
* secrets
* documentation problems

## 5. Commit

If the intended changes are not committed:

* inspect the final diff
* create a focused commit
* follow the project's existing commit convention

## 6. Push

Before pushing, show:

* current branch
* commits to be pushed
* validation results

Ask for confirmation before pushing unless the user explicitly requested the push.

Then use:

```bash
git push -u origin <branch>
```

Never force-push without explicit permission.

## 7. Create PR

After the branch is pushed, create the PR using:

```bash
gh pr create
```

The PR should contain:

### Summary

What changed.

### Why

Why the change was needed.

### Testing

What commands were actually executed.

### Notes

Important risks or reviewer notes.

Never claim a test passed unless it was actually executed.

## 8. Final Response

Report:

* branch
* commit
* tests
* PR number
* PR URL
* remaining concerns
