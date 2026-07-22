# Dead Doctor

Static analysis CLI that finds dead code, unused exports, ghost pages, zombie dependencies, and leftover commented blocks in TypeScript and Next.js codebases.

---

# Overview

Dead Doctor uses import-graph BFS to identify unreachable modules, unused exports, duplicate files, and zombie dependencies. It produces a scored health report (0-100) and can generate cleanup scripts for safe removal.

Built by [NoctisNova](https://noctisnova.com).

---

# Installation

No install required. Run directly via `npx`:

```bash
npx dead-doctor
```

Global install (optional):

```bash
npm install -g dead-doctor
dead-doctor
```

---

# Usage

```bash
npx dead-doctor
```

Scan a specific directory:

```bash
npx dead-doctor ./my-app
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

- **Dead files** - Whole modules unreachable from any entry point (import-graph BFS).
- **Unused exports** - Exported symbols proven unused by resolving every import edge.
- **Duplicate files** - Byte-identical modules (after stripping comments/whitespace).
- **Dead pages** - Next.js App Router pages with no inbound links.
- **Unused imports** - Imports brought in but never used in the file.
- **Empty files** - Source files with no meaningful content.
- **Zombie deps** - Packages in `package.json` never imported in code.
- **Commented blocks** - Large commented-out code blocks (8 or more lines).
- **Unreachable code** - Code after unconditional `return` / `throw`.

---

# Cleanup Scripts

The agent menu can generate cleanup scripts in multiple formats:

- `dead-doctor-cleanup.sh` - Bash script with reviewable `git rm` and `npm uninstall` commands.
- `dead-doctor-cleanup.ps1` - PowerShell script.
- `dead-doctor-cleanup.md` - Markdown summary.

Nothing is deleted automatically. All cleanup commands must be reviewed and executed manually.

---

# Examples

Basic scan:

```bash
npx dead-doctor
```

Scan a specific app directory:

```bash
npx dead-doctor ./src
```

JSON output for CI:

```bash
npx dead-doctor --json
```

Skip AI agent menu:

```bash
npx dead-doctor --no-ai
```

---

# Output

Dead Doctor produces:

1. A scored health report (0-100) displayed in the terminal.
2. A `.dead-doctor-report.json` file saved in the project root for AI-assisted fixes.
3. Optional cleanup scripts (via the AI agent menu) for safe removal of dead code.

The report categorizes findings by type, listing each issue with file location and suggested action.

---

# Common Workflows

**Before a production deploy:**

```bash
npx dead-doctor
```

Remove dead code and unused dependencies to reduce bundle size and improve maintainability.

**After a major refactor:**

```bash
npx dead-doctor
```

Identify files and exports that are no longer referenced after restructuring.

**CI pipeline integration:**

```bash
npx dead-doctor --json --no-ai
```

Track dead code trends over time and gate deployments on health scores.

**Periodic cleanup:**

```bash
npx dead-doctor
```

Run monthly or quarterly to keep the codebase lean.

---

# Best Practices

- Run Dead Doctor before production deploys to minimize bundle size.
- Review cleanup scripts before executing. Never run them blindly.
- Address zombie dependencies first as they have the highest impact on bundle size.
- Remove dead pages to avoid confusion and broken navigation.
- Run with `--json` in CI to track dead code trends over time.
- Combine with `npx knip` (already configured in this project) for additional coverage.

---

# Troubleshooting

**False positives on dead files:**

- Dead Doctor uses import-graph BFS. Dynamic imports and `require()` calls may not be fully traced. Review findings manually for dynamically loaded modules.

**Tool does not detect any issues:**

- Ensure you are running from the project root.
- Verify that Node.js version is 18 or later.

**Cleanup script does not cover all findings:**

- The cleanup script is generated from the AI agent menu. Run the full scan first, then use the menu to generate the script.

**Report file not generated:**

- Confirm write permissions in the project root directory.
- Check available disk space.

---

# Requirements

- Node.js 18+

---

# References

- **NPM:** [https://www.npmjs.com/package/dead-doctor](https://www.npmjs.com/package/dead-doctor)
- **GitHub:** [https://github.com/noctisnovastudio/dead-doctor](https://github.com/noctisnovastudio/dead-doctor)
- **Issues:** [https://github.com/noctisnovastudio/dead-doctor/issues](https://github.com/noctisnovastudio/dead-doctor/issues)
- **Homepage:** [https://noctisnova.com](https://noctisnova.com)
