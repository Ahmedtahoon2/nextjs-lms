# Technology Stack

| Category      | Choice              | Why                                                       |
| ------------- | ------------------- | --------------------------------------------------------- |
| Framework     | Next.js 16          | Server Components, App Router, performance, ecosystem     |
| Language      | TypeScript          | Type safety, refactorability, fewer runtime errors        |
| UI            | React 19            | Server Components, concurrent rendering, mature ecosystem |
| Styling       | Tailwind v4         | Utility-first, small bundle, fast iteration               |
| Components    | shadcn/ui           | Accessible, fully customizable, no vendor lock-in         |
| Database      | PostgreSQL (Neon)   | Reliable, scalable, serverless-friendly                   |
| ORM           | Prisma              | Type-safe queries, migrations, first-class TS support     |
| Validation    | Zod                 | Type inference, reliable runtime validation               |
| Forms         | React Hook Form     | Minimal re-renders, strong TS support                     |
| Testing       | Jest + RTL          | Standard Next.js testing stack                            |
| Lint / Format | ESLint + Prettier   | Static analysis + consistent formatting                   |
| Git hooks     | Husky + lint-staged | Quality gates on commit                                   |
| Monitoring    | Sentry              | Error monitoring, performance tracing, and source maps    |

## Principles

Every dependency must justify its existence: improve maintainability, DX, performance, or solve a real problem.

## Testing Rules

- Unit tests for pure functions/utilities.
- Integration tests for API endpoints and DB interactions.
- Monitor coverage, but don't enforce at the cost of maintainability.
