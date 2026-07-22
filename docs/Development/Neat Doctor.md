# Neat Doctor

Code structure analyser for TypeScript and Next.js codebases. Detects circular dependencies, orphan files, naming drift, god files, and deep imports. Generates safe `git mv` migration scripts.

---

# Overview

Neat Doctor combines structure analysis (folder organization, naming conventions, file placement) with import-dependency-graph analysis (circular dependencies, orphan files, god files). It produces a scored health report (0-100) and generates reviewable `git mv` migration scripts to restructure your codebase safely.

Built by [NoctisNova](https://noctisnova.com).

---

# Installation

No install required. Run directly via `npx`:

```bash
npx neat-doctor
```

Global install (optional):

```bash
npm install -g neat-doctor
neat-doctor
```

---

# Usage

```bash
npx neat-doctor
```

Scan a specific directory:

```bash
npx neat-doctor ./my-app
```

---

# CLI Options

| Option          | Description                                           |
| --------------- | ----------------------------------------------------- |
| `[path]`        | Target directory to scan (default: current directory) |
| `--tree`        | Show annotated ASCII tree of current structure        |
| `--recommend`   | Show recommended clean structure                      |
| `--json`        | Output raw JSON to stdout (CI mode)                   |
| `--no-ai`       | Skip the AI agent hand-off menu                       |
| `--depth <n>`   | Tree render depth (default: 4)                        |
| `--version, -v` | Print version and exit                                |
| `--help, -h`    | Show help message                                     |

---

# What It Detects

## Structure Analysis

- **Root chaos** - Source files dumped in the project root.
- **Duplicate concepts** - `utils/` AND `helpers/` AND `lib/` at the same level.
- **Deep nesting** - Folders more than 5 levels deep.
- **Fat folders** - 18+ files with no subdirectory grouping.
- **Misplaced files** - Components in `utils/`, config files in `src/`.
- **Naming mix** - Kebab-case folders next to PascalCase folders.
- **Missing barrels** - Folders with 3+ exports but no `index.ts`.
- **Scattered config** - `*.config.ts` nested inside `src/`.
- **Empty directories** - Folders with nothing in them.

## Import-Dependency-Graph Analysis

- **Circular deps** - True import cycles via Tarjan SCC detection.
- **Orphan files** - Files nothing imports (proven dead via the graph).
- **God files** - 400+ lines or 30+ imports (low cohesion).
- **Deep imports** - `../../../` chains that should be path aliases.

---

# Examples

Basic scan:

```bash
npx neat-doctor
```

Show ASCII tree of current structure:

```bash
npx neat-doctor --tree
```

Show recommended clean structure:

```bash
npx neat-doctor --recommend
```

Show tree with custom depth:

```bash
npx neat-doctor --tree --depth 6
```

JSON output for CI:

```bash
npx neat-doctor --json
```

Scan a specific directory:

```bash
npx neat-doctor ./src
```

Skip AI agent menu:

```bash
npx neat-doctor --no-ai
```

---

# Output

Neat Doctor produces:

1. A scored health report (0-100) displayed in the terminal.
2. A `.neat-doctor-report.json` file saved in the project root for AI-assisted fixes.
3. Reviewable `git mv` migration scripts (via the AI agent menu).

The report categorizes findings by type (structure vs. dependency graph), listing each issue with file location and suggested fix.

---

# Common Workflows

**After a major refactor:**

```bash
npx neat-doctor
```

Verify that the refactoring did not introduce circular dependencies or structural issues.

**Before onboarding a new developer:**

```bash
npx neat-doctor --tree
```

Share the annotated structure tree to help new team members understand the codebase layout.

**CI pipeline integration:**

```bash
npx neat-doctor --json --no-ai
```

Track structural health scores over time.

**Planning a restructuring:**

```bash
npx neat-doctor --recommend
```

View the recommended clean structure before making changes.

---

# Best Practices

- Run Neat Doctor after major refactors to catch circular dependencies early.
- Use `--tree` to visualize and share the current project structure.
- Use `--recommend` to plan restructuring before executing changes.
- Address circular dependencies immediately as they prevent proper tree-shaking and testing.
- Address god files by extracting logic into smaller, focused modules.
- Use path aliases instead of deep relative imports (`../../../`).
- Run with `--json` in CI to track structural health trends.

---

# Troubleshooting

**False positives on circular dependencies:**

- Neat Doctor uses Tarjan SCC detection for true import cycles. Type-only imports may sometimes be flagged. Review findings manually for type-only cycles.

**Tool does not detect any issues:**

- Ensure you are running from the project root.
- Verify that Node.js version is 18 or later.
- Check that your project follows standard TypeScript conventions.

**Migration scripts look incorrect:**

- Always review `git mv` scripts before executing. The scripts are suggestions based on the analysis, not automatic fixes.

**Report file not generated:**

- Confirm write permissions in the project root directory.
- Check available disk space.

---

# Requirements

- Node.js 18+

---

# References

- **NPM:** [https://www.npmjs.com/package/neat-doctor](https://www.npmjs.com/package/neat-doctor)
- **GitHub:** [https://github.com/noctisnovastudio/neat-doctor](https://github.com/noctisnovastudio/neat-doctor)
- **Issues:** [https://github.com/noctisnovastudio/neat-doctor/issues](https://github.com/noctisnovastudio/neat-doctor/issues)
- **Homepage:** [https://noctisnova.com](https://noctisnova.com)
