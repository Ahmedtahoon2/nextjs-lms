# Components

This document defines the component architecture used throughout the project.

---

# Folder Structure

```
components/

    ui/
    layout/
    shared/
```

Future

```
features/

    authentication/
    dashboard/
    profile/
```

---

# UI Components

Reusable design system components.

Examples

- Button
- Input
- Card
- Dialog
- Badge
- Avatar
- Table

Rules

- Generic
- Reusable
- No business logic

---

# Layout Components

Responsible for page structure.

Examples

- Header
- Sidebar
- Footer
- Navigation
- Shell

---

# Shared Components

Reusable components that combine UI primitives.

Examples

- Search Bar
- User Menu
- Empty State
- Loading Screen

---

# Feature Components

Feature-specific components live close to their feature.

Example

```
features/

    authentication/

        LoginForm.tsx
        RegisterForm.tsx
```

---

# Component Principles

Every component should:

- Have one responsibility
- Be reusable when appropriate
- Receive data via props
- Avoid hidden side effects

---

# Preferred Composition

```
Page

↓

Layout

↓

Feature

↓

Shared

↓

UI
```

---

# Accessibility

All interactive components should support:

- Keyboard navigation
- Focus states
- Screen readers
- Semantic HTML

---

# Styling

Use:

- Tailwind CSS
- CSS Variables
- Design Tokens

Avoid custom CSS unless necessary.

---

# Component Checklist

Before creating a component ask:

- Can an existing component be reused?
- Is this component generic?
- Does it belong inside a feature?
- Is it accessible?
- Is it responsive?
- Is it properly typed?
- Does it follow the anti-slop design rules?
- Does it use design tokens from globals.css?
- Does it have intentional spacing (not uniform defaults)?
- Does it use shadows over borders for depth?
- Do interactive elements have press states and 40x40px hit areas?

---

# Design Quality

Every component must follow the rules in `docs/Design Rules.md`.

Key checks:

- No generic AI layout patterns (cards-in-cards, uniform grids).
- One accent color. No random gradients.
- Typography uses balance/pretty wrapping.
- Animations respect `prefers-reduced-motion`.
- Shadows composed from multiple layers.
- Layout breaks the grid at least once.
