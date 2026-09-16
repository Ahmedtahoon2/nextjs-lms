---
name: lms-ui-ux
description: Visual hierarchy, preferred design tokens, typography, concentric radius formulas, 3-layer shadows, interactive hit areas, press feedback, and layout variety. Load when styling UI components, creating pages, designing cards or forms, or refining layout aesthetics.
---

# LMS UI/UX Design System & Aesthetic Principles

This skill defines the visual hierarchy, token usage, micro-interactions, and layout principles inspired by intentional design doctrine.

---

## 1. The Three Dials (Preferred Defaults)

Set the dial balance before writing layout or styling:

| Dial | Default | Purpose & Flexibility |
|---|---|---|
| **Design Variance** | `8` | How much the layout breaks from generic grids. (8 for marketing/landing, 5 for data tables). |
| **Motion Intensity** | `6` | Transition and animation presence. (6 for interactions, 0 if user prefers reduced motion). |
| **Visual Density** | `4` | Information per viewport. (4 for student player, 7 for instructor management grids). |

*Rule:* Consistency + intentional design > mechanical uniformity. These are preferred defaults, not rigid prisons.

---

## 2. Color System & Design Tokens (`globals.css`)

Always use the semantic tokens defined in `src/app/globals.css` (OKLCH color space):
- **Core Surfaces:** `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `bg-popover`.
- **Primary & Accent:** `bg-primary`, `text-primary-foreground`, `bg-accent`, `text-accent-foreground`.
- **Secondary & Muted:** `bg-secondary`, `text-secondary-foreground`, `bg-muted`, `text-muted-foreground`.
- **Feedback & Borders:** `bg-destructive`, `text-destructive`, `border-border`, `border-input`, `ring-ring`.
- **Sidebar Tokens:** `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`.

**Forbidden Color Habits:**
- Never use raw default Tailwind colors (`bg-blue-600`, `text-gray-900`) without mapping to theme tokens.
- Never use generic purple-to-blue AI gradients.
- Restrict pages to **one primary accent color** and one consistent theme tone.

---

## 3. Typography Rules

- **Headlines (`h1`, `h2`, `h3`):** Always apply `text-wrap: balance` to prevent awkward single-word wraps.
- **Body & Longform:**
  - Reading width limit: `max-w-[65ch]`.
  - Apply `text-wrap: pretty` to avoid orphan words.
- **Numeric Data:** Use `tabular-nums` for timers, lesson durations, progress percentages, and stats.
- **Punctuation Cleanliness:** Do not use em-dashes (`—`) or en-dashes (`–`) in visible text; use hyphens or clear punctuation.

---

## 4. Micro-Interactions & Geometry

1. **Concentric Radii Formula:**
   - When nesting elements with borders/radii, outer radius must equal inner radius plus padding:
     $$R_{\text{outer}} = R_{\text{inner}} + \text{padding}$$
   - Utilize predefined tokens: `--radius-sm` (0.6x), `--radius-md` (0.8x), `--radius-lg` (1x), `--radius-xl` (1.4x).
2. **Press Feedback:**
   - Interactive controls (buttons, clickable cards, icon tabs) must provide visible tactile press response:
     `active:scale-[0.96] transition-transform duration-100 ease-out`
   - Never scale below `0.95`.
3. **Interactive Hit Areas:**
   - Minimum physical or clickable target: **$40\times 40\text{px}$**.
   - For small icons (e.g. 16px or 20px), expand the hit area using a transparent pseudo-element (`after:absolute after:-inset-2`).
4. **Three-Layer Shadows:**
   - Prefer subtle shadows over harsh 1px solid borders for visual elevation:
     - Layer 1 (Ambient): Wide, diffuse, low opacity (`0 4px 20px -2px rgba(0,0,0,0.05)`).
     - Layer 2 (Key): Direct light direction (`0 2px 6px -1px rgba(0,0,0,0.08)`).
     - Layer 3 (Rim): Subtle top highlight or dark-mode rim (`inset 0 1px 0 rgba(255,255,255,0.1)`).

---

## 5. Layout Diversity & Anti-Template Rules

- **Break the Grid:** A multi-section page must utilize at least 3 distinct layout families (e.g. asymmetric hero, staggered cards, bento grid, sticky split-pane player).
- **Never cards-inside-cards:** Avoid wrapping card components inside outer card containers. Differentiate surfaces with contrasting background tones (`bg-muted/40` vs `bg-card`) or subtle separators.
- **Intentional Whitespace:** Space elements with deliberate rhythm (`space-y-6`, `gap-8`). Perfectly uniform spacing between all elements looks robotic and templated.

---

## 6. Complete Component State Coverage

Every interactive UI feature must explicitly handle:
1. **Default State:** Clean, balanced contrast.
2. **Hover State:** Subtle surface lightening or border shift.
3. **Active/Pressed State:** Tactile `scale(0.96)`.
4. **Focus-Visible State:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
5. **Loading State:** Skeletons or disabled button states with loading spinners.
6. **Empty State:** Helpful icon, concise message, and clear call-to-action button.
7. **Error State:** Descriptive message in `text-destructive` with retry action.
