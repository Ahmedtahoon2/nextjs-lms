# ORM Doctor

Static analysis CLI for ORM and database bottlenecks in TypeScript and Prisma/Drizzle codebases.

---

# Overview

ORM Doctor scans your codebase for common database performance issues including N+1 queries, missing indexes, unsafe raw SQL, and unbounded queries. It produces a scored health report (0-100) and saves a JSON file for AI-assisted fixes.

Built by [NoctisNova](https://noctisnova.com).

---

# Installation

No install required. Run directly via `npx`:

```bash
npx orm-doctor
```

Global install (optional):

```bash
npm install -g orm-doctor
orm-doctor
```

---

# Usage

```bash
npx orm-doctor
```

Scan a specific directory:

```bash
npx orm-doctor ./my-app
```

---

# CLI Options

| Option          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `[path]`        | Target directory to scan (default: current directory) |
| `--json`        | Output raw JSON to stdout (CI mode)                   |
| `--no-ai`       | Skip the AI agent hand-off menu                       |
| `--version, -v` | Print version and exit                                |
| `--help, -h`    | Show help message                                     |

---

# What It Detects

- **N+1 queries** - Database calls inside loops.
- **Missing indexes** - Foreign keys without `@@index` in Prisma schema.
- **Unsafe raw SQL** - `$queryRawUnsafe` / dynamic raw queries.
- **Mass mutations** - `updateMany` / `deleteMany` without `where`.
- **Unbounded queries** - `findMany()` without `take` or cursor.
- **Prisma singleton** - Multiple `new PrismaClient()` instances.
- **Missing transactions** - Multiple writes without `$transaction`.
- **Risky relations** - Missing `onDelete` referential actions.
- **Seed issues** - Slow seeds, hardcoded IDs, missing truncate.

---

# Examples

Basic scan:

```bash
npx orm-doctor
```

Scan a specific app directory:

```bash
npx orm-doctor ./src
```

JSON output for CI:

```bash
npx orm-doctor --json
```

Skip AI agent menu:

```bash
npx orm-doctor --no-ai
```

---

# Output

ORM Doctor produces:

1. A scored health report (0-100) displayed in the terminal.
2. A `.orm-doctor-report.json` file saved in the project root for AI-assisted fixes.

The report categorizes findings by severity and type, listing each issue with file location and suggested fix.

---

# Common Workflows

**Before adding a new database feature:**

```bash
npx orm-doctor
```

Review findings, address critical issues, then proceed with new feature development.

**CI pipeline integration:**

```bash
npx orm-doctor --json --no-ai
```

Parse the JSON output in your CI pipeline to gate deployments on ORM health scores.

**After Prisma schema changes:**

```bash
npx orm-doctor
```

Verify that new relations have proper indexes and referential actions defined.

---

# Best Practices

- Run ORM Doctor before adding new database features.
- Address N+1 query issues immediately as they cause the most performance degradation.
- Always define `@@index` on foreign key fields in your Prisma schema.
- Use `$transaction` for multiple related writes.
- Use `take` or cursor-based pagination on `findMany()` calls.
- Run with `--json` in CI to track health score trends over time.

---

# Troubleshooting

**Tool does not detect any issues:**

- Ensure you are running from the project root.
- Verify that your Prisma schema is in the default `prisma/` directory.
- Check that Node.js version is 18 or later.

**Report file not generated:**

- Confirm write permissions in the project root directory.
- Check available disk space.

**False positives on Prisma singleton:**

- ORM Doctor flags multiple `new PrismaClient()` instances. Ensure your `lib/db.ts` exports a single singleton instance.

---

# Requirements

- Node.js 18+

---

# References

- **NPM:** [https://www.npmjs.com/package/orm-doctor](https://www.npmjs.com/package/orm-doctor)
- **GitHub:** [https://github.com/noctisnovastudio/orm-doctor](https://github.com/noctisnovastudio/orm-doctor)
- **Issues:** [https://github.com/noctisnovastudio/orm-doctor/issues](https://github.com/noctisnovastudio/orm-doctor/issues)
- **Homepage:** [https://noctisnova.com](https://noctisnova.com)
