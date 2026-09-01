# Auth Doctor

Static analysis CLI for auth and security vulnerabilities in Next.js apps. Middleware-aware: routes gated by an auth middleware matcher are not false-flagged.

## Install / Run

```bash
npx auth-doctor          # or: npx auth-doctor ./src
npm i -g auth-doctor     # optional
```

## CLI

| Flag      | Purpose               |
| --------- | --------------------- |
| `[path]`  | Target dir            |
| `--json`  | CI mode               |
| `--no-ai` | Skip AI hand-off menu |

## Detects

Unprotected routes / Server Actions, IDOR / missing ownership checks, hardcoded secrets, `NEXT_PUBLIC_` leaks, JWT without signature verification, localStorage sessions, missing rate limiting on auth endpoints, open redirects, sensitive field exposure, missing CSRF protection.

## Output

- Scored health report (0-100) in terminal.
- `.auth-doctor-report.json` in project root.

## Workflows

```bash
npx auth-doctor              # after auth changes / before deploy / after adding routes
npx auth-doctor --json --no-ai   # CI gate
```

## Best Practices

Run after every auth change. Never hardcode secrets — use `@t3-oss/env-nextjs`. Store tokens in httpOnly cookies, not localStorage. Add CSRF to state-mutating endpoints. Rate-limit login, password reset, and OTP endpoints. Ensure `middleware.ts` has a proper `matcher` config to avoid false positives.

## Requirements

Node 18+.

## References

[npm](https://www.npmjs.com/package/auth-doctor) · [GitHub](https://github.com/noctisnovastudio/auth-doctor)
