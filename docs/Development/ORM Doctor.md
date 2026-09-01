# ORM Doctor

Static analysis CLI for ORM and database bottlenecks in TypeScript / Prisma / Drizzle codebases.

## Install / Run

```bash
npx orm-doctor           # or: npx orm-doctor ./src
npm i -g orm-doctor      # optional
```

## CLI

| Flag      | Purpose               |
| --------- | --------------------- |
| `[path]`  | Target dir            |
| `--json`  | CI mode               |
| `--no-ai` | Skip AI hand-off menu |

## Detects

N+1 queries, missing indexes, unsafe raw SQL, unbounded queries (`findMany()` without `take`/cursor), transaction misuse, large query results.

## Output

- Scored health report (0-100) in terminal.
- `.orm-doctor-report.json` in project root.

## Workflows

```bash
npx orm-doctor              # before new DB feature / after schema change
npx orm-doctor --json --no-ai   # CI gate
```

## Best Practices

Use `take` or cursor pagination on `findMany()`. Add indexes for filtered/joined columns. Prefer `select` over returning full rows. Wrap multi-write workflows in `prisma.$transaction`. Enable Prisma query logging during dev.

## Requirements

Node 18+.

## References

[npm](https://www.npmjs.com/package/orm-doctor) · [GitHub](https://github.com/noctisnovastudio/orm-doctor)
