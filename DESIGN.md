---
name: Next.js LMS Platform
description: A quiet, precise learning surface where the lesson carries the weight and the chrome recedes.
colors:
  ink: "oklch(0.205 0 0)"
  ink-foreground: "oklch(0.985 0 0)"
  text-primary: "oklch(0.145 0 0)"
  text-secondary: "oklch(0.556 0 0)"
  canvas: "oklch(1 0 0)"
  surface-raised: "oklch(0.985 0 0)"
  surface-sunken: "oklch(0.97 0 0)"
  hairline: "oklch(0.922 0 0)"
  focus-ring: "oklch(0.708 0 0)"
  danger: "oklch(0.577 0.245 27.325)"
  completion-signal: "oklch(0.696 0.17 162.48)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.05em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "18px"
  full: "9999px"
spacing:
  tight: "4px"
  base: "8px"
  card: "16px"
  block: "24px"
  section: "32px"
  page: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-foreground}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-foreground}"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-outline-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-primary}"
  button-ghost:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-primary}"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  card-nested-surface:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "36px"
  badge:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
  nav-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.xs}"
    padding: "6px 12px"
  nav-link-hover:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
---

# Design System: Next.js LMS Platform

## 1. Overview

**Creative North Star: "The Quiet Workshop"**

A learning tool is a workbench, not a stage. Someone sits down for twenty minutes with a video and a body of material they came to understand. Everything the interface does is either _get out of the way of the lesson_ or _tell them, without ambiguity, where they are_. The workshop is warm because someone maintains it carefully, not because it is painted a friendly color.

The palette is committed neutral: chroma zero across every surface, ink as the only voice. Warmth in this system is carried by copy, spacing, and the generosity of the reading measure, never by a hue. There is exactly one chromatic signal in the entire product — the emerald reserved for genuine completion — and its scarcity is the point. It is the only color that means _you finished something_.

This system explicitly rejects three things. Not the generic SaaS template: no six identical feature cards, no gradient buttons, no 24px radius on everything, no blurred blob hero. Not the gamified consumer app: no purple-to-blue gradients, no confetti on completion, no streak counters, no trophy emoji. Not the dark-mode hacker aesthetic: no dark-by-default tooling, no neon accents, no glassmorphic floating panels. Where a surface needs separation, it gets a hairline or a tonal step. Where something needs emphasis, it gets ink.

**Key Characteristics:**

- **Achromatic by commitment.** Zero chroma on every neutral. Emerald is the only chromatic token.
- **Hairlines at rest, shadow on response.** Surfaces separate with a 1px ring; shadow arrives only on hover or when an element is genuinely lifted (drawer, toast, dropdown).
- **Compact geometry.** Radii top out at 14px on cards. Buttons are 8px. Density is a feature in a screen people use for an hour.
- **Motion means state changed.** Transitions run on feedback and reveal only. No entrance choreography, no looping ambient animation.
- **Nothing says its status in color alone.** Every state carries an icon or text.

## 2. Colors

The palette is achromatic by design: every neutral sits at chroma 0, and a single emerald carries completion.

### Primary

- **Ink** (`oklch(0.205 0 0)`): the primary action and the system's only "loud" voice. Primary buttons, the active lesson in the curriculum, `primary` text on hover. Its restraint is what makes it read as confident rather than as a black box.
- **Ink Foreground** (`oklch(0.985 0 0)`): text on Ink. Near-white, never pure white — pure white on near-black vibrates.

### Secondary

There is no secondary accent. This is a one-ink system. `secondary` and `muted` are tonal steps of the same neutral, not hues.

### Tertiary

- **Completion Emerald** (`oklch(0.696 0.17 162.48)`): the single chromatic signal. A completed lesson's check, the 100% progress fill, the course-finished notice. Never used for a button, a link, or decoration. Currently hardcoded as raw `emerald-*` in `course-progress-bar.tsx` and `player-sidebar.tsx` — tokenize it before reuse spreads.

### Neutral

- **Canvas** (`oklch(1 0 0)`): page background, input fields, outline buttons.
- **Surface Raised** (`oklch(0.985 0 0)`): the sticky header, sidebar rail. One step off canvas so a fixed element reads as fixed.
- **Surface Sunken** (`oklch(0.97 0 0)`): `muted`, `secondary`, `accent` all resolve here. Card footers, ghost hover, badge fills, the empty-thumbnail gradient base. Differentiating a nested surface with a tonal step instead of a card-in-a-card is mandatory.
- **Text Primary** (`oklch(0.145 0 0)`): body and heading ink. 18.6:1 on canvas — far past AA.
- **Text Secondary** (`oklch(0.556 0 0)`): muted labels, metadata, nav links. 5.3:1 on canvas. It is the floor: if a secondary label is dropping under 4.5:1 on a sunken surface, move it toward ink. Never lighten it.
- **Hairline** (`oklch(0.922 0 0)`): borders, dividers, card rings.
- **Focus Ring** (`oklch(0.708 0 0)`): the focus-visible ring. Every interactive element gets one at 2px with a 50% alpha wash.

### Named Rules

**The Zero Chroma Rule.** Every neutral is `C 0`. If you are about to write `oklch(0.97 0.01 60)` because a surface "feels warmer," you are tinting by default. The product's only hue is completion. Adding a second one is a product decision, not a design one.

**The One Signal Rule.** Completion Emerald appears on at most 10% of any screen, and never on an interactive control. If a screen shows emerald in three places, two of them are wrong.

## 3. Typography

**Display Font:** Geist (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Body Font:** Geist (same family, same stack)
**Label/Mono Font:** Geist, with `tabular-nums` for all numeric data

**Character:** One family across the entire system, differentiated by weight, size, and tracking rather than by pairing. There is no serif, no mono block, no display face. This is a working typeface and it stays one. Geist's closed apertures and tall x-height keep dense instructional text legible at small sizes.

### Hierarchy

- **Display** (600, `clamp(2.25rem, 6vw, 4.5rem)`, line-height 1.05, tracking -0.025em): marketing hero only. Never inside the app. `-0.025em` is the tracking floor for this system — the clamp max of 4.5rem is the ceiling. Do not push display type to 6rem; a learning platform that shouts does not read as serious.
- **Headline** (600, 3rem, 1.1, -0.025em): page titles — course detail, profile, a section opener in the marketing surface.
- **Title** (500, 1rem, 1.375): card titles, lesson titles in the curriculum, panel headings. 16px is the floor for anything a user reads to _act on_.
- **Body** (400, 0.875rem, 1.625): descriptions and longform. Reading measure caps at 65ch — `max-w-[65ch]` is mandatory on the markdown lesson reader, not optional.
- **Label** (500, 0.75rem, 0.05em tracking, sentence case): metadata, module counters, filter chips, durations. Sentence case except for genuine micro-labels (a category above a card title), where uppercase at `text-[10px]` to `text-xs` is permitted — and appears on at most one level per screen, never stacked on a second eyebrow above it.

### Named Rules

**The 16px Floor Rule.** Anything a user must read to decide something is at least 16px. 12px is for metadata only — counts, durations, timestamps. Never put a course description at 12px to fit a grid. If it does not fit, the card is wrong, not the type size.

**The Single Eyebrow Rule.** One uppercase micro-label per card at most, and never one above a heading that is already an eyebrow's job. PRODUCT.md's anti-references forbid the 2023 kicker-on-every-section scaffold; that rule extends down into cards.

**Numbers Tabulate.** Every count, percentage, and duration uses `tabular-nums`. Progress bars that animate must not reflow.

## 4. Elevation

This system is a hybrid: hairline rings separate surfaces at rest, and shadow is a state response — it appears on hover, and on the small set of genuinely floating layers (drawer sheet, dropdown, toast, sticky header once scrolled). This is deliberately a change from the three-layer ambient-plus-key-plus-rim shadow stack the repo's `lms-ui-ux` skill once prescribed: that stack, applied to every card, is the ghost-card look. Shadow earns its place by being rare.

### Shadow Vocabulary

- **Rest** (no shadow, `ring-foreground/10` at 1px): cards, list rows, panels at rest. This is the default state of every container.
- **Hover Lift** (`box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.08)`, blur 12px): a card or row responding to pointer. Blur stays at or below 12px. If the blur reaches 16px, the element is a ghost card — cut the ring and keep the shadow, or keep the ring and drop the shadow.
- **Floating** (`box-shadow: 0 10px 24px -6px rgb(0 0 0 / 0.12)`): mobile drawer, dropdown menu, toast. Reserved for layers that genuinely float over content.
- **Inset Track** (`box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.05)`): the recessed progress-bar track. The one legitimate inset.

### Named Rules

**The No Ghost Card Rule.** Never `1px border` plus a shadow with blur ≥ 16px on the same element. Pick one. At rest, a hairline; on hover, a shadow at ≤ 12px blur.

**The Flat-At-Rest Rule.** If a container is not hovered, not focused, and not floating, it has no drop shadow. Elevation is a response, not a decoration.

## 5. Components

### Buttons

Precise and quiet. Small hit areas with real tactility on press.

- **Shape:** 8px radius (`rounded-lg`), 36px tall at default size. Icon buttons are square at the same 36px, min 40×40 when they sit alone in a toolbar.
- **Primary:** Ink background, Ink Foreground text, `text-sm font-medium`, 10px/20px padding. Hover darkens to `primary/80`.
- **Hover / Focus:** focus-visible gets a 2px `focus-ring` border plus a 3px ring at 50% alpha. Press is `translate-y-px` on the primitive — never a scale-down, which reads as toy-like at this size.
- **Outline / Ghost / Secondary:** Outline is a hairline on canvas, fills `muted` on hover. Ghost is chrome-level — nav, dismissals — and carries no border. Secondary is a tonal fill for in-page grouping, never a second CTA on the same screen.

### Chips

- **Style:** Fully rounded (`rounded-4xl`, 26px radius), 20px tall, `text-xs font-medium`, Sunken fill with no border.
- **State:** Selected chips invert to Ink. Filter chips keep a hairline so they read as controls rather than as content.

### Cards / Containers

- **Corner Style:** 14px (12–16px band). A card at 24px or above is over-rounded and reads as a marketing block.
- **Background:** Canvas at rest; Sunken at 50% for footers and for a nested surface inside the card.
- **Shadow Strategy:** none at rest; Hover Lift on pointer. See Elevation.
- **Border:** Hairline via a 1px ring at `foreground/10`, which is one step softer than a full `--border` and keeps a grid of cards from reading as a table.
- **Internal Padding:** 16px (12px at `size="sm"`). The footer is separated by a hairline top border, not by more padding.

### Inputs / Fields

- **Style:** 1px Hairline stroke, canvas fill, 8px radius, 36px tall, `text-sm`.
- **Focus:** 2px ring in `focus-ring` plus a hairline shift. The ring is the state; the border color alone is not enough.
- **Error / Disabled:** Error swaps stroke and ring to `danger` (never color alone — the message text carries the meaning). Disabled drops to 50% opacity and disables pointer events.
- **Label:** Every field has a persistent visible label above it. Placeholder text is never the only label; it sits at `text-secondary` and clears 4.5:1.

### Navigation

- **Style:** Sticky 56px header, `backdrop-blur-md` over an 80% canvas fill, hairline bottom border. Nav links are `text-sm text-secondary`, transitioning to ink on hover with no underline and no background until active.
- **Mobile:** The menu collapses to an icon button that opens a bordered sheet below the header. Navigation targets are 40px minimum in the sheet even though the desktop links are 26px.
- **Player:** The curriculum sidebar is a 320px rail at `card/40` with a hairline right border, collapsing to a slide-over drawer below `lg`. It carries no shadow until it becomes a drawer.

### Curriculum Module Row (signature)

The system's signature pattern: an expandable module block used in both the player sidebar and the instructor curriculum builder. Hairline border, 14px radius, a Sunken/10 header row with the module title at 12px semibold and a `n/N` count in tabular numerals, and a chevron that rotates 180° over 200ms when expanded. Lessons inside are separated by 1px dividers over a `muted/10` bed. The active lesson is a `primary/10` tint with ink-semibold text and `aria-current="page"` — state carried by weight and background, never by color alone.

### Progress

- **Shape:** 10px tall, fully rounded track with an inset shadow; fill in Ink while in progress.
- **Completion:** The fill switches to Completion Emerald and a `role="status"` notice appears with an icon and text — "Course Completed!" plus a plain-language sentence. The notice is a status region, not a toast: it does not auto-dismiss.

## 6. Do's and Don'ts

### Do:

- **Do** separate a nested surface with a tonal step (`bg-muted/40` against `bg-card`) or a hairline. PRODUCT.md forbids nested cards; so does this system.
- **Do** cap reading measure at `max-w-[65ch]` and set `text-wrap: balance` on every h1–h3 and `text-wrap: pretty` on longform prose.
- **Do** use `active:scale-[0.96]` with `motion-reduce:transform-none` on cards, list rows, and large tap targets — and never below 0.95.
- **Do** give every interactive element a 40×40 minimum hit area, expanding with `after:-inset-2` when the icon is smaller.
- **Do** pair every state with an icon or text. Published, enrolled, complete, and error all have a shape, not just a hue.
- **Do** give every animation a `prefers-reduced-motion` path — `motion-reduce:transition-none` or a crossfade. Nothing carries meaning through movement.
- **Do** keep transitions between 150ms and 250ms on `ease-out` (or `ease-out-quart`), and reserve 500ms for a progress fill that has to be watched.
- **Do** vary spacing by rhythm — `gap-6` inside a group, `gap-16` between sections. Uniform spacing everywhere is the templated look.
- **Do** use at least three distinct layout families across a multi-section page: asymmetric hero, a data-dense grid, a sticky split-pane player.

### Don't:

- **Don't** use raw Tailwind palette colors. PRODUCT.md and the repo's own UI/UX skill both forbid it, and `emerald-500` in the progress bar is the standing violation to fix first — tokenize it as Completion Emerald.
- **Don't** ship a gamified consumer app: no purple-to-blue gradients, no confetti on completion, no streak counters, no trophy badges, no emoji as iconography. Progress is communicated with state and language, not rewards.
- **Don't** ship the generic SaaS template: no six identical feature cards in a 3×2 grid, no gradient-filled buttons, no 24px+ radius on every surface, no blurred-blob hero.
- **Don't** ship the dark-mode hacker aesthetic: dark is a user choice via the mode toggle, never the default. No neon accents, no glassmorphic floating panels, no `backdrop-blur` used as decoration (the sticky header and drawer backdrop are the only permitted uses).
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent on a card, callout, or alert.
- **Don't** put a gradient in `background-clip: text`. Emphasis comes from weight and size.
- **Don't** pair a 1px border with a wide soft shadow on the same element. That is the ghost card, and it is the single most common tell in generated UI.
- **Don't** set body or description text below 12px, and never below 16px when the user must read it to decide something.
- **Don't** set a muted label below 4.5:1 contrast on its actual background. Bump it toward ink; lightening it is the reason generated interfaces feel hard to read.
- **Don't** add an uppercase tracked eyebrow above every section or above every card. One micro-label per card, one level deep, never nested inside another eyebrow.
- **Don't** let dropdowns, dialogs, or drawers render inside an `overflow: hidden` container. Use the native `popover`/`dialog` API, `position: fixed`, or a portal.
- **Don't** animate layout properties. Transform and opacity only.
- **Don't** reveal content through a class-triggered transition. The default state must already be visible, so the section never ships blank when a transition never fires.
- **Don't** use raw arbitrary values (`z-[999]`, `shadow-[0_0_12px_...]` inline in a component) for anything in this document's vocabulary. Semantic tokens and the shadow scale are the vocabulary.
- **Don't** place a progress percentage, lesson count, or duration without `tabular-nums`.
