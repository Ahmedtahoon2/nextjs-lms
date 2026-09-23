# Technology Stack

| Category       | Choice                          | Why                                                       |
| -------------- | ------------------------------- | --------------------------------------------------------- |
| Framework      | Next.js 16                      | Server Components, App Router, performance, ecosystem     |
| Language       | TypeScript 5.9                  | Type safety, refactorability, fewer runtime errors        |
| UI             | React 19                        | Server Components, concurrent rendering, mature ecosystem |
| Styling        | Tailwind v4                     | Utility-first, small bundle, fast iteration               |
| Components     | shadcn/ui (Base Nova)           | Accessible, fully customizable, no vendor lock-in         |
| Notifications  | goey-toast (with framer-motion) | Morphing, accessible notifications for user actions       |
| Authentication | Better Auth 1.7                 | Type-safe session management, RBAC, secure cookies        |
| Database       | PostgreSQL (Neon Serverless)    | Reliable, scalable, serverless-friendly WebSocket driver  |
| ORM            | Prisma 7.10                     | Type-safe queries, migrations, first-class TS support     |
| Validation     | Zod 4                           | Type inference, reliable runtime validation               |
| Forms          | React Hook Form                 | Minimal re-renders, strong TS support                     |
| Testing        | Jest 30 + RTL                   | Standard Next.js testing stack                            |
| Lint / Format  | ESLint 9 + Prettier 3           | Standard Next.js flat linting and Tailwind formatting     |
| Git hooks      | Husky + lint-staged             | Quality gates on commit                                   |
| Monitoring     | Sentry 10                       | Error monitoring, performance tracing, and source maps    |

## Principles

Every dependency must justify its existence: improve maintainability, DX, performance, or solve a real problem.

## Testing Rules

- Unit tests for pure functions/utilities.
- Integration tests for API endpoints and DB interactions.
- Monitor coverage, but don't enforce at the cost of maintainability.

## Dependency Decisions & Version Policy

- **Prisma**: Kept at stable `7.10.0`. Prisma 8 is currently in release candidate (`8.0.0-rc.13`) and is rejected per stability policy.
- **ESLint & Prettier**: Configured with ESLint 9 flat config (`eslint-config-next`) and Prettier with `prettier-plugin-tailwindcss` for class sorting and formatting.
- **Node-Postgres (`pg`, `@prisma/adapter-pg`)**: Removed from project dependencies. Production and development both exclusively use `@neondatabase/serverless` with `@prisma/adapter-neon` over WebSocket.
- **Better Auth**: Upgraded to `1.7.3` (patch update for stability and bug fixes).
- **Goey Toast**: Added `goey-toast` (`0.5.0`) with `framer-motion` (`13.2.0`) to provide interactive, accessible notifications for client actions.
