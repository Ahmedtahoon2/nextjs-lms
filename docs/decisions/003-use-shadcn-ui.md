# ADR-003: Use shadcn/ui for Component Library

## Status
Accepted

## Date
2026-07-20

## Context
The project needs a reusable component library that is accessible, customizable, and works with Tailwind CSS.

## Decision
We will use shadcn/ui with the `base-nova` style, Lucide React icons, and semantic CSS variables in `app/globals.css`.

## Consequences
### Positive
- Components are accessible by default.
- Full control over component code in `src/components/ui`.
- No vendor lock-in.
- Works with Tailwind CSS v4.

### Negative
- Components must be manually maintained/updated.
- Requires understanding of component internals.

## Alternatives Considered
- **Radix UI raw**: Rejected. shadcn/ui wraps Radix/Base UI with better design defaults.
- **Headless UI**: Rejected. Less opinionated, more work.
- **Mantine**: Rejected. Too heavy, less customizable.
