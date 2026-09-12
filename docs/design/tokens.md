# Design System Contract — Tokens

Canonical reference for design tokens in this LMS application. All tokens are declared in `src/app/globals.css` using Tailwind CSS v4 and the OKLCH color space.

---

## 1. Color Palette (OKLCH)

### Surfaces & Backgrounds
- `bg-background` / `text-foreground`: Root app canvas.
- `bg-card` / `text-card-foreground`: Card and panel surfaces.
- `bg-popover` / `text-popover-foreground`: Menus, dropdowns, and tooltip containers.
- `bg-sidebar` / `text-sidebar-foreground`: Application sidebars and drawers.

### Action & Accents
- `bg-primary` / `text-primary-foreground`: Primary call-to-action buttons, key badges, active tabs.
- `bg-secondary` / `text-secondary-foreground`: Secondary buttons and pill filters.
- `bg-accent` / `text-accent-foreground`: Interactive item hover states and subtle highlights.
- `bg-muted` / `text-muted-foreground`: Secondary text, metadata captions, subdued card backgrounds.
- `bg-destructive` / `text-destructive`: Error alerts, delete buttons, critical validation states.

### Borders & Rings
- `border-border`: Surface dividing borders.
- `border-input`: Form input boundaries.
- `ring-ring`: Keyboard focus indicator.

---

## 2. Radii & Concentric Geometry

The base radius is `--radius: 0.625rem` (10px). Derived geometric tokens:
- `--radius-sm`: `calc(var(--radius) * 0.6)` (6px) — Badges, small tags.
- `--radius-md`: `calc(var(--radius) * 0.8)` (8px) — Buttons, form inputs.
- `--radius-lg`: `var(--radius)` (10px) — Cards, dropdown menus.
- `--radius-xl`: `calc(var(--radius) * 1.4)` (14px) — Modal dialogs.
- `--radius-2xl`: `calc(var(--radius) * 1.8)` (18px) — Large preview panels.
- `--radius-3xl`: `calc(var(--radius) * 2.2)` (22px) — Floating bottom sheets.

### Concentric Radius Formula:
When nesting elements with visual boundaries, the outer radius must match the inner element radius plus padding:
$$R_{\text{outer}} = R_{\text{inner}} + \text{padding}$$

---

## 3. Elevation & 3-Layer Shadow Composition

Prefer multi-layered shadows over harsh 1px solid borders for visual hierarchy:
- **Ambient Layer:** Wide, low opacity for subtle floor separation.
- **Key Layer:** Directional light giving crisp depth.
- **Rim Layer:** Subtle 1px inset highlight (`inset 0 1px 0 rgba(255,255,255,0.08)` in dark mode).

---

## 4. Typography Scale & Wrapping Rules

- **Headlines (`h1`..`h3`):** Always apply `text-wrap: balance` to distribute line breaks symmetrically.
- **Body Text:** Limit reading measure to `max-w-[65ch]` with `text-wrap: pretty` to prevent orphan words.
- **Data & Numbers:** Always apply `tabular-nums` for timers, completion percentages, prices, and stats.
- **Punctuation:** Em-dashes (`—`) and en-dashes (`–`) are banned from visible UI text; use standard hyphens or clean sentence structure.

---

## 5. Interaction & Hit Area Defaults

- **Minimum Hit Target:** Physical clickable area must be at least **$40\times 40\text{px}$** (expand small icons with transparent pseudo-elements).
- **Tactile Press Feedback:** Interactive controls provide `active:scale-[0.96] transition-transform duration-100 ease-out`.
- **Keyboard Focus:** Every interactive control must display `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
