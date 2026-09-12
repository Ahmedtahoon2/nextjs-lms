# Design System Contract — Anti-Slop Doctrine

Core principles to eliminate generic, template-driven AI output and ensure intentional design in every view.

---

## 1. The 10 Forbidden AI Tells & Remedies

1. **Cards-inside-cards:**
   - *Why:* Clutters visual hierarchy and exposes template nesting.
   - *Remedy:* Flatten the layout. Differentiate content with contrasting background tones (`bg-muted/30`) or simple dividers.
2. **Generic purple-to-blue gradients:**
   - *Why:* The default signature of generic AI SaaS templates.
   - *Remedy:* Use solid `bg-background` with a single high-contrast primary accent token.
3. **Perfectly centered hero sections:**
   - *Why:* Lifeless, uniform, and lacking personality.
   - *Remedy:* Introduce asymmetric balance: left-aligned value propositions paired with an offset interactive preview or curriculum teaser.
4. **Arbitrary pixel values (`p-[13px]`, `w-[317px]`):**
   - *Why:* Breaks rhythm and undermines the design token scale.
   - *Remedy:* Use standardized spacing scale classes (`p-3`, `p-4`, `space-y-6`).
5. **Unnecessary `"use client"` directives:**
   - *Why:* Bloats client bundles and breaks React Server Component streaming.
   - *Remedy:* Strip `"use client"` from components that only render markup without client state or event handlers.
6. **Broken dark mode contrast:**
   - *Why:* Hardcoded text colors become unreadable when switching themes.
   - *Remedy:* Always use semantic color tokens (`text-muted-foreground`, `border-border`) instead of hardcoded hex or gray utilities.
7. **Missing focus rings on interactive elements:**
   - *Why:* Violates WCAG accessibility criteria for keyboard navigation.
   - *Remedy:* Enforce `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
8. **Sub-40px touch targets:**
   - *Why:* Frustrating and error-prone on mobile touchscreens.
   - *Remedy:* Ensure interactive targets meet the $40\times 40\text{px}$ minimum (using transparent pseudo-elements if the icon itself is smaller).
9. **Excessive or non-interruptible animations:**
   - *Why:* Makes the application feel sluggish and disorienting.
   - *Remedy:* Use snappy spring transitions and always honor `@media (prefers-reduced-motion: reduce)`.
10. **Missing empty & error states:**
    - *Why:* Renders blank white space or crashes when queries return zero results.
    - *Remedy:* Always provide a dedicated empty state with an illustrative icon, title, description, and primary action.

---

## 2. Preferred Defaults vs. Legitimate Flexibility

The design system is a **contract, not a prison**. We enforce consistency without mechanical uniformity:

| Rule | Preferred Default | Legitimate Flexible Exception |
|---|---|---|
| **Dial Balance** | Variance 8, Motion 6, Density 4 | High-density data grids (Density 7), reduced motion (Motion 0). |
| **Color Accents** | Single primary accent color | Status-driven semantic colors (`destructive`, `warning`, `success`). |
| **Concentric Radii** | $R_{\text{outer}} = R_{\text{inner}} + \text{padding}$ | Embedded icon buttons inside form fields can use fixed standard radius. |
| **Shadows vs Borders** | 3-layer shadows over borders | Dense data tables and subtle dividers use 1px border lines. |
| **Grid Variation** | $\ge 3$ layout families per page | Focused student video player view adheres to a split-pane layout. |
