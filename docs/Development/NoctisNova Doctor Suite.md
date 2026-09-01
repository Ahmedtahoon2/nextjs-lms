# NoctisNova Doctor Suite

Open-source static analysis CLIs for TypeScript and Next.js. Zero-install, zero-config, zero-telemetry.

## Tools

| Tool                            | Focus                      | Report                     |
| ------------------------------- | -------------------------- | -------------------------- |
| [ORM Doctor](ORM%20Doctor.md)   | DB / ORM bottlenecks       | `.orm-doctor-report.json`  |
| [Auth Doctor](Auth%20Doctor.md) | Auth & security vulns      | `.auth-doctor-report.json` |
| [Dead Doctor](Dead%20Doctor.md) | Dead code & unused exports | `.dead-doctor-report.json` |
| [Neat Doctor](Neat%20Doctor.md) | Code structure & dep graph | `.neat-doctor-report.json` |

All: Node 18+, MIT, no telemetry, scored health report (0-100), JSON output, `--no-ai` to skip hand-off menu.

## Quick Start

```bash
npx orm-doctor
npx auth-doctor
npx dead-doctor
npx neat-doctor

# target dir / CI / no AI menu
npx orm-doctor ./src
npx orm-doctor --json
npx orm-doctor --no-ai
```

## Capability Matrix

|                                               | ORM | Auth | Dead | Neat |
| --------------------------------------------- | --- | ---- | ---- | ---- |
| N+1 / indexes / raw SQL                       | ✓   |      |      |      |
| Unprotected routes / hardcoded secrets / CSRF |     | ✓    |      |      |
| Dead files / unused exports / zombie deps     |     |      | ✓    |      |
| Circular deps / structure / god files         |     |      |      | ✓    |
| JSON output                                   | ✓   | ✓    | ✓    | ✓    |
| AI menu                                       | ✓   | ✓    | ✓    | ✓    |

## When to Use

| Scenario                                      | Tool        |
| --------------------------------------------- | ----------- |
| New DB feature                                | ORM Doctor  |
| After auth changes / before deploy (security) | Auth Doctor |
| Before deploy / monthly cleanup               | Dead Doctor |
| After major refactor                          | Neat Doctor |
| Full health check                             | All four    |

## Recommended Order

1. `npx dead-doctor` — remove dead code first.
2. `npx neat-doctor` — fix structure & circular deps.
3. `npx orm-doctor` — audit DB layer.
4. `npx auth-doctor` — verify security.

## Requirements

Node 18+, run from project root.

## References

[noctisnova.com/tools](https://noctisnova.com/tools)
