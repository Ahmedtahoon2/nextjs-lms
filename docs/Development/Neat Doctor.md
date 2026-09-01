# Neat Doctor

Code structure analyser. Detects circular deps, orphan files, naming drift, god files, deep imports. Generates `git mv` migration scripts.

## Install / Run

```bash
npx neat-doctor           # or: npx neat-doctor ./src
npm i -g neat-doctor      # optional
```

## CLI

| Flag          | Purpose                     |
| ------------- | --------------------------- |
| `[path]`      | Target dir (default: cwd)   |
| `--tree`      | Annotated ASCII tree        |
| `--recommend` | Recommended clean structure |
| `--depth <n>` | Tree depth (default 4)      |
| `--json`      | CI mode                     |
| `--no-ai`     | Skip AI hand-off menu       |

## Detects

**Structure:** root chaos, duplicate concept folders, deep nesting (>5), fat folders (18+), misplaced files, naming mix, missing barrels, scattered config, empty dirs.

**Dependency graph:** circular deps (Tarjan SCC), orphan files, god files (400+ lines / 30+ imports), deep `../../../` imports.

## Output

- Scored health report (0-100) in terminal.
- `.neat-doctor-report.json` in project root.
- Reviewable `git mv` migration scripts (via AI menu).

## Workflows

```bash
npx neat-doctor                  # after major refactor
npx neat-doctor --tree           # share with new devs
npx neat-doctor --recommend      # plan restructuring
npx neat-doctor --json --no-ai   # CI gate
```

## Best Practices

Run after refactors; use `--tree` to share structure; address circular deps first (breaks tree-shaking); prefer path aliases; gate CI on score.

## Requirements

Node 18+.

## References

[npm](https://www.npmjs.com/package/neat-doctor) · [GitHub](https://github.com/noctisnovastudio/neat-doctor)
