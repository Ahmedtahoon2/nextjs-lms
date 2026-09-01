# Architecture and Stack

## Layers

```
UI (Server Components) → Actions/Routes → Services → Repositories → Database (Prisma + Neon)
```

## Responsibilities

| Layer              | Does                                                         | Must NOT                           |
| ------------------ | ------------------------------------------------------------ | ---------------------------------- |
| **UI**             | Render, user interaction, state display                      | Business logic, direct DB access   |
| **Actions/Routes** | Request handling, auth, Zod validation, call services        | Business logic, direct repo access |
| **Services**       | Business rules, workflows, multi-repo coordination           | UI dependency, HTTP details        |
| **Repositories**   | DB queries, CRUD, persistence. Only layer that calls Prisma. | Business logic                     |
| **Database**       | Prisma models, migrations, PostgreSQL on Neon                | App logic                          |

## Stack Integration

- **Next.js 16:** Server Components by default. Client only for state/browser APIs/events. Server Actions for mutations, Route Handlers for APIs, Metadata API for SEO.
- **Prisma + Neon:** serverless PG via `@prisma/adapter-neon`, WebSocket via `ws`, singleton client in `lib/db.ts`. Never instantiate Prisma in components.
- **Zod:** validate all external input. Type inference from schemas. Env validation via `@t3-oss/env-nextjs`.
- **Tailwind v4:** design tokens as CSS custom properties in `globals.css`, oklch color space, dark mode via `.dark` class, `cn()` via `clsx` + `tailwind-merge`.

## Rules

- Business logic never in UI. DB access never in UI.
- Validate every external input with Zod.
- No `any`. Prefer inferred types.
- Server Components by default. Thin routes; delegate to services.
- Never modify production DBs manually. Use Prisma migrations.
- Never expose secrets, password hashes, or internal identifiers.

## Data Flow

Request → Zod validation → Action/Route → Service → Repository → Prisma → PostgreSQL → back up the stack to Response.
