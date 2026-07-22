# NoctisNova Doctor Suite

Open-source CLI tools for static analysis of TypeScript and Next.js codebases. Zero-install, zero-config, zero-telemetry.

---

# Overview

The NoctisNova Doctor Suite is a collection of four specialized static analysis CLIs built by [NoctisNova](https://noctisnova.com). Each tool targets a different category of code quality issues. All tools run via `npx` with no configuration required.

| Tool                            | Focus                                       | Report File                |
| ------------------------------- | ------------------------------------------- | -------------------------- |
| [ORM Doctor](ORM%20Doctor.md)   | Database and ORM bottlenecks                | `.orm-doctor-report.json`  |
| [Auth Doctor](Auth%20Doctor.md) | Authentication and security vulnerabilities | `.auth-doctor-report.json` |
| [Dead Doctor](Dead%20Doctor.md) | Dead code and unused exports                | `.dead-doctor-report.json` |
| [Neat Doctor](Neat%20Doctor.md) | Code structure and dependency graph         | `.neat-doctor-report.json` |

All tools share common traits:

- Node.js 18+ required.
- MIT licensed.
- No telemetry. Nothing leaves your machine.
- Produces a scored health report (0-100).
- Saves a JSON report file for AI-assisted fixes.

---

# Quick Start

Run any tool directly from the project root:

```bash
npx orm-doctor
npx auth-doctor
npx dead-doctor
npx neat-doctor
```

Target a specific directory:

```bash
npx orm-doctor ./my-app
npx auth-doctor ./my-app
npx dead-doctor ./my-app
npx neat-doctor ./my-app
```

Output JSON for CI pipelines:

```bash
npx orm-doctor --json
npx auth-doctor --json
npx dead-doctor --json
npx neat-doctor --json
```

Skip the AI agent hand-off menu:

```bash
npx orm-doctor --no-ai
npx auth-doctor --no-ai
npx dead-doctor --no-ai
```

---

# Tool Comparison

| Feature               | ORM Doctor | Auth Doctor | Dead Doctor   | Neat Doctor  |
| --------------------- | ---------- | ----------- | ------------- | ------------ |
| Version               | 1.0.2      | 1.0.3       | 1.0.5         | 1.0.3        |
| N+1 Queries           | Yes        | -           | -             | -            |
| Missing Indexes       | Yes        | -           | -             | -            |
| Raw SQL Detection     | Yes        | -           | -             | -            |
| Unprotected Routes    | -          | Yes         | -             | -            |
| Hardcoded Secrets     | -          | Yes         | -             | -            |
| CSRF Detection        | -          | Yes         | -             | -            |
| Dead Files            | -          | -           | Yes           | -            |
| Unused Exports        | -          | -           | Yes           | -            |
| Zombie Dependencies   | -          | -           | Yes           | -            |
| Circular Dependencies | -          | -           | -             | Yes          |
| Structure Analysis    | -          | -           | -             | Yes          |
| Migration Scripts     | -          | -           | Yes (cleanup) | Yes (git mv) |
| ASCII Tree View       | -          | -           | -             | Yes          |
| JSON Output           | Yes        | Yes         | Yes           | Yes          |
| AI Agent Menu         | Yes        | Yes         | Yes           | Yes          |

---

# When to Use Each Tool

| Scenario                             | Recommended Tool                |
| ------------------------------------ | ------------------------------- |
| Before adding a new database feature | [ORM Doctor](ORM%20Doctor.md)   |
| After implementing authentication    | [Auth Doctor](Auth%20Doctor.md) |
| Before a production deploy           | [Dead Doctor](Dead%20Doctor.md) |
| After a major refactor               | [Neat Doctor](Neat%20Doctor.md) |
| Full codebase health check           | All four tools                  |

---

# Recommended Workflow

1. Run `npx dead-doctor` to find and remove dead code first.
2. Run `npx neat-doctor` to fix structural issues and circular dependencies.
3. Run `npx orm-doctor` to audit database layer health.
4. Run `npx auth-doctor` to verify security posture.

---

# Requirements

- Node.js 18 or later.
- Run from the project root directory.
- No additional dependencies or configuration needed.

---

# Related Documentation

- [Impeccable Toolchain](../skills/Impeccable%20Toolchain.md) - Visual and engineering defect detection.
- [Tech Stack](../Tech%20Stack.md) - Project technology stack.
- [Architecture and Stack](../rules/Architecture%20and%20Stack.md) - Layered architecture rules.

---

# References

- **Homepage:** [https://noctisnova.com/tools](https://noctisnova.com/tools)
- **ORM Doctor NPM:** [https://www.npmjs.com/package/orm-doctor](https://www.npmjs.com/package/orm-doctor)
- **ORM Doctor GitHub:** [https://github.com/noctisnovastudio/orm-doctor](https://github.com/noctisnovastudio/orm-doctor)
- **Auth Doctor NPM:** [https://www.npmjs.com/package/auth-doctor](https://www.npmjs.com/package/auth-doctor)
- **Auth Doctor GitHub:** [https://github.com/noctisnovastudio/auth-doctor](https://github.com/noctisnovastudio/auth-doctor)
- **Dead Doctor NPM:** [https://www.npmjs.com/package/dead-doctor](https://www.npmjs.com/package/dead-doctor)
- **Dead Doctor GitHub:** [https://github.com/noctisnovastudio/dead-doctor](https://github.com/noctisnovastudio/dead-doctor)
- **Neat Doctor NPM:** [https://www.npmjs.com/package/neat-doctor](https://www.npmjs.com/package/neat-doctor)
- **Neat Doctor GitHub:** [https://github.com/noctisnovastudio/neat-doctor](https://github.com/noctisnovastudio/neat-doctor)
