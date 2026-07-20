# ADR-003: Use shadcn/ui for Component Library

## Status

Accepted

## Date

2026-07-20

## Context

The project needs a reusable component library that is accessible, customizable, and works with Tailwind CSS.

## Decision

We will use shadcn/ui with the base-nova style and lucide-react icons.

## Consequences

### Positive

- Components are accessible by default.
- Full control over component code.
- No vendor lock-in.
- Works with Tailwind CSS v4.

### Negative

- Components must be manually updated.
- No automatic updates from upstream.
- Requires understanding of component internals.

## Alternatives Considered

- **Radix UI**: Rejected. shadcn/ui wraps Radix with better defaults.
- **Headless UI**: Rejected. Less opinionated, more work.
- **Mantine**: Rejected. Too heavy, less customizable.
