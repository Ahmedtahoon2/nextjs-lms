# Design System Contract — Components

Canonical contracts and usage guidelines for UI components in `src/components/ui/`. Built on Base UI / Radix and styled with Tailwind CSS v4.

---

## 1. Button (`@/components/ui/button`)

- **Variants:**
  - `default`: Primary actions (`bg-primary text-primary-foreground hover:bg-primary/80`).
  - `secondary`: Secondary supporting actions (`bg-secondary text-secondary-foreground`).
  - `outline`: Neutral bordered button (`border-border hover:bg-muted`).
  - `ghost`: Borderless icon button or toolbar item (`hover:bg-muted`).
  - `destructive`: Irreversible or deleting actions (`bg-destructive/10 text-destructive`).
  - `link`: Inline text link styling (`text-primary hover:underline`).
- **Sizes:** `xs` (h-6), `sm` (h-7), `default` (h-8), `lg` (h-9), `icon` (size-8), `icon-sm` (size-7).
- **Press Feedback:** Integrated `active:not-aria-[haspopup]:translate-y-px` and tactile scale.

---

## 2. Card (`@/components/ui/card`)

- **Structure:**
  - `<Card>`: Outer container with `rounded-xl border bg-card text-card-foreground shadow-sm`.
  - `<CardHeader>`: Contains title, subtitle, and top actions.
  - `<CardTitle>`: Bold heading with `text-wrap: balance`.
  - `<CardDescription>`: Subdued helper text in `text-muted-foreground`.
  - `<CardContent>`: Main card body.
  - `<CardFooter>`: Bottom action row.
- **Rule:** **Never nest cards inside cards.** Use `bg-muted/40` or subtle horizontal dividers (`<Separator />`) to separate internal content.

---

## 3. Form Controls

### Input (`@/components/ui/input`) & Textarea (`@/components/ui/textarea`)

- Fully integrated with `border-input focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`.
- Always paired with a `<Label htmlFor="...">` element for accessibility.

### Badge (`@/components/ui/badge`)

- Status indicators: `default` (primary), `secondary`, `destructive`, `outline`.
- Used for course status (`DRAFT`, `PUBLISHED`, `ARCHIVED`), level tags, and preview badges.

---

## 4. Notifications (Toasts)

- Component: `GooeyToaster` from `goey-toast` (`@/components/ui/goey-toaster`).
- Usage: `import { gooeyToast } from "goey-toast"`.
- Mounted once in the root app shell. Provides fluid morphing toasts for success, error, warning, and promises.
