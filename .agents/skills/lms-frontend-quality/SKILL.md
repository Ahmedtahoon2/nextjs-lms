---
name: lms-frontend-quality
description: Anti-slop auditing, detecting duplicate UI, arbitrary values, missing dark mode variants, nested card containers, accessibility issues, and unnecessary client components. Load during UI code reviews or before completing frontend tasks.
---

# LMS Frontend Quality & Anti-Slop Audit

This skill provides a deterministic audit checklist to eliminate generic AI-generated UI flaws and ensure high-craft frontend execution.

---

## 1. The 10 Forbidden AI Slop Tells (Detect & Remedy)

| AI Slop Tell | Why It Is Bad | The Remedy |
|---|---|---|
| **1. Cards-inside-cards** | Cluttered visual depth; looks like auto-nested templates. | Flatten the hierarchy. Use plain surfaces with `bg-muted/30`, subtle dividers, or simple list items. |
| **2. Purple-to-blue gradients** | The universal signature of generic AI SaaS templates. | Use solid `bg-background` with a single high-contrast accent token, or subtle monochromatic lighting. |
| **3. Perfectly centered hero sections** | Rigid, lifeless, and repetitive across AI sites. | Introduce asymmetric balance: left-aligned text with an offset interactive preview or staggered layout on the right. |
| **4. Arbitrary pixel values (`p-[13px]`)** | Destroys design token consistency and rhythm. | Use theme spacing classes (`p-3`, `p-4`, `space-y-6`). Arbitrary values require documented justification. |
| **5. Unnecessary `"use client"`** | Bloats the client bundle and breaks server streaming. | Audit components: if there is no `useState`, `useEffect`, or DOM event handler (`onClick`), strip `"use client"`. |
| **6. Broken dark mode contrast** | Hardcoded black/white text or unstyled borders in dark mode. | Always test with `.dark` class. Use semantic tokens (`text-muted-foreground`, `border-border`) instead of `text-gray-500`. |
| **7. Missing focus rings on interactive elements** | Fails WCAG accessibility standards for keyboard users. | Ensure every interactive element includes `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`. |
| **8. Micro-buttons with small hit areas (<40px)** | Frustrating to tap on mobile touchscreens. | Expand hit area to $40\times 40\text{px}$ using `h-10 w-10` or transparent pseudo-elements (`after:absolute after:-inset-2`). |
| **9. Non-interruptible or excessive animations** | Makes UI feel sluggish, distracting, or nausea-inducing. | Use snappy springs (`duration: 0.2`, `ease: "easeOut"`). Honor `motion-reduce:transition-none` and `prefers-reduced-motion`. |
| **10. Missing empty & error states** | UI crashes or renders blank screens when data is missing. | Always provide a dedicated empty state with an icon, title, description, and primary action button. |

---

## 2. Frontend Pre-Flight Quality Checklist

Execute this inspection before marking any UI task complete:

- [ ] **Semantic Tokens:** Are all colors, backgrounds, and borders derived from `globals.css` semantic tokens?
- [ ] **Dark Mode Verified:** Does the component render with clear contrast in both light and dark modes?
- [ ] **RSC Boundary Checked:** Is `"use client"` placed strictly at the leaves of the tree?
- [ ] **Concentric Radii:** Does outer container radius equal inner element radius + padding?
- [ ] **Press States:** Do buttons and clickable cards exhibit active press scaling (`active:scale-[0.96]`)?
- [ ] **Hit Targets:** Are touch targets at least $40\times 40\text{px}$?
- [ ] **Typography Wrapping:** Do headings use `text-wrap: balance` and body text use `text-wrap: pretty`?
- [ ] **Tabular Nums:** Are numeric metrics, lesson times, and counters formatted with `tabular-nums`?
- [ ] **Accessibility:** Do inputs have connected `<Label htmlFor="...">` elements and SVGs have appropriate ARIA attributes?
- [ ] **Motion Safeguard:** Are CSS animations wrapped with `@media (prefers-reduced-motion: reduce)` or `motion-reduce:` variants?
