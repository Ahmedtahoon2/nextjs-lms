# Components

## Folder Layout

```
components/
  ui/        # shadcn/ui primitives (Button, Input, Card, Dialog, ...)
  layout/    # Page structure (Header, Sidebar, Footer, Shell)
  shared/    # Composed reusable components (SearchBar, UserMenu, EmptyState)
features/
  <feature>/ # Feature components co-located with feature
```

## Composition

```
Page → Layout → Feature → Shared → UI
```

## Principles

- Single responsibility, reusable, props-driven, no hidden side effects.
- UI primitives: generic, no business logic.
- Feature components live next to their feature.

## Accessibility (required on all interactive components)

Keyboard navigation · visible focus states · screen-reader labels · semantic HTML.

## Styling

Tailwind utilities + design tokens from `globals.css`. No custom CSS unless necessary. No inline styles.

## Creation Checklist

- [ ] Reuses an existing component if possible
- [ ] Generic and reusable
- [ ] Lives in the right folder (ui / shared / layout / feature)
- [ ] Accessible, responsive, properly typed
- [ ] Follows anti-slop design rules (see `docs/Design Rules.md`)
- [ ] Uses design tokens, not raw colors
- [ ] Intentional spacing, not uniform defaults
- [ ] Shadows over borders for depth
- [ ] Press states and ≥ 40×40 hit areas on interactive elements
