# Dead Doctor

Static analysis CLI. Finds dead code, unused exports, ghost pages, zombie dependencies, leftover commented blocks.

## Install / Run

```bash
npx dead-doctor          # or: npx dead-doctor ./src
npm i -g dead-doctor     # optional
```

## CLI

| Flag      | Purpose               |
| --------- | --------------------- |
| `[path]`  | Target dir            |
| `--json`  | CI mode               |
| `--no-ai` | Skip AI hand-off menu |

## Detects

Dead files (import-graph BFS), unused exports, duplicate files, dead Next.js pages, unused imports, empty files, zombie deps in `package.json`, large commented blocks (8+ lines), unreachable code after `return`/`throw`.

## Cleanup Scripts

AI menu can generate reviewable cleanup scripts: `dead-doctor-cleanup.sh`, `.ps1`, `.md`. Nothing is auto-deleted.

## Output

- Scored health report (0-100) in terminal.
- `.dead-doctor-report.json` in project root.
- Optional cleanup scripts (via AI menu).

## Workflows

```bash
npx dead-doctor              # before deploy / after refactor / monthly
npx dead-doctor --json --no-ai   # CI gate
```

## Best Practices

Run before deploys to shrink bundles; address zombie deps first; pair with `npx knip` (already configured) for broader coverage. Never run cleanup scripts blindly.

## Requirements

Node 18+.

## References

[npm](https://www.npmjs.com/package/dead-doctor) · [GitHub](https://github.com/noctisnovastudio/dead-doctor)
