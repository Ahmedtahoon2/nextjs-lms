# Auth Doctor

Static analysis CLI for authentication and security vulnerabilities in Next.js TypeScript codebases.

---

# Overview

Auth Doctor scans your Next.js application for common authentication and security issues including unprotected routes, hardcoded secrets, JWT misuse, and missing CSRF protection. Middleware-aware: routes already gated by an auth middleware matcher are not false-flagged.

Built by [NoctisNova](https://noctisnova.com).

---

# Installation

No install required. Run directly via `npx`:

```bash
npx auth-doctor
```

Global install (optional):

```bash
npm install -g auth-doctor
auth-doctor
```

---

# Usage

```bash
npx auth-doctor
```

Scan a specific directory:

```bash
npx auth-doctor ./my-app
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

- **Unprotected routes and Server Actions** - API routes and Server Actions with no auth check.
- **IDOR / missing ownership** - Data fetched without verifying the caller owns it.
- **Hardcoded secrets** - API keys, JWT secrets, and tokens committed in source code.
- **NEXT_PUBLIC\_ leaks** - Sensitive values accidentally exposed to the browser.
- **JWT without verification** - Tokens decoded but signature never verified.
- **localStorage sessions** - Auth tokens stored in localStorage instead of httpOnly cookies.
- **Missing rate limiting** - Login, reset, and OTP endpoints with no abuse protection.
- **Open redirects** - Redirect destinations controlled by user-supplied input.
- **Sensitive field exposure** - Password / token fields returned in API responses.
- **Missing CSRF protection** - State-mutating endpoints without CSRF tokens.

---

# Examples

Basic scan:

```bash
npx auth-doctor
```

Scan a specific app directory:

```bash
npx auth-doctor ./src
```

JSON output for CI:

```bash
npx auth-doctor --json
```

Skip AI agent menu:

```bash
npx auth-doctor --no-ai
```

---

# Output

Auth Doctor produces:

1. A scored health report (0-100) displayed in the terminal.
2. A `.auth-doctor-report.json` file saved in the project root for AI-assisted fixes.

The report categorizes findings by severity and type, listing each issue with file location and suggested fix.

---

# Common Workflows

**After implementing authentication:**

```bash
npx auth-doctor
```

Verify that all routes and Server Actions have proper auth checks.

**Before production deploy:**

```bash
npx auth-doctor
```

Ensure no secrets are hardcoded and all sensitive endpoints are protected.

**CI pipeline integration:**

```bash
npx auth-doctor --json --no-ai
```

Gate deployments on authentication health scores.

**After adding new API routes:**

```bash
npx auth-doctor
```

Confirm new routes have ownership checks and rate limiting.

---

# Best Practices

- Run Auth Doctor after every authentication-related change.
- Never hardcode secrets. Use environment variables validated by `@t3-oss/env-nextjs`.
- Store auth tokens in httpOnly cookies, not localStorage.
- Implement CSRF protection on all state-mutating endpoints.
- Add rate limiting to login, password reset, and OTP endpoints.
- Run with `--json` in CI to track security health score trends.

---

# Troubleshooting

**False positives on protected routes:**

- Auth Doctor is middleware-aware. Ensure your `middleware.ts` has a proper `matcher` config if routes are protected at the middleware level.

**Tool does not detect any issues:**

- Ensure you are running from the project root.
- Verify that Node.js version is 18 or later.
- Check that your routes follow Next.js App Router conventions.

**Report file not generated:**

- Confirm write permissions in the project root directory.
- Check available disk space.

---

# Requirements

- Node.js 18+

---

# References

- **NPM:** [https://www.npmjs.com/package/auth-doctor](https://www.npmjs.com/package/auth-doctor)
- **GitHub:** [https://github.com/noctisnovastudio/auth-doctor](https://github.com/noctisnovastudio/auth-doctor)
- **Issues:** [https://github.com/noctisnovastudio/auth-doctor/issues](https://github.com/noctisnovastudio/auth-doctor/issues)
- **Homepage:** [https://noctisnova.com](https://noctisnova.com)
