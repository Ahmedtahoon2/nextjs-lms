This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed, line numbers have been added.

# File Summary

## Purpose

This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format

The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
   a. A header with the file path (## File: path/to/file)
   b. The full contents of the file in a code block

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/node_modules/**, **/.git/**, **/dist/**, **/build/**, **/.next/**, **/.cache/**, **/venv/**, **/.venv/**, **/**pycache**/**, **/*.pyc, repomix-output.md, *.log
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure

```
.github/
  workflows/
    ci.yml
.husky/
  pre-commit
app/
  favicon.ico
  globals.css
  layout.tsx
  page.tsx
components/
  ui/
    __tests__/
      card.test.tsx
    badge.tsx
    button.tsx
    card.tsx
    input.tsx
    label.tsx
    separator.tsx
docs/
  ADR/
    001-use-layered-architecture.md
    002-use-neon-with-prisma.md
    003-use-shadcn-ui.md
  API/
    Database.md
  audits/
    Brand Fidelity Audit.md
    Impeccable Audit and Detect.md
    MIFB Review Checklist.md
    Pre-Flight Check (Section 14).md
    Preservation Audit.md
    Vercel Audit Guidelines.md
  concepts/
    AI Slop.md
    Coaxing Beats Constraint.md
    Design Review as Infrastructure.md
    Interruptible Animation.md
    Optical Alignment.md
    Press Feedback and Hit Areas.md
  decisions/
    Enforcement Layer Overlap.md
    Font Ban Conflicts.md
    Motion Doctrine Conflicts.md
    Prompt Layer vs Toolchain Layer.md
  deliverables/
    Design Skills Cheat Sheet.md
    Quickstart.md
    Unified Pre-Flight Mega Checklist.md
  Development/
    Git.md
  flows/
    Audit Pipeline Flow.md
    Build Greenfield (Prompt 1).md
    Full Stack Build Flow.md
    Install and Load.md
    Redesign First-Audit (Prompt 2).md
  meta/
    CONVENTIONS.md
    Dashboard.md
    Start Here.md
    Tag Taxonomy.md
  reference/
    Entities.md
    Gaps.md
    Questions.md
    Source Ledger.md
  rules/
    AI Tells (Forbidden Patterns).md
    Anthropic Frontend Design Rules.md
    Architecture and Stack.md
    Dark Mode Protocol.md
    Em-Dash Ban.md
    Hero Discipline.md
    Taste Skill Color Rules.md
    Vercel Interface Rule Categories.md
  skills/
    Impeccable Toolchain.md
    Make Interfaces Feel Better.md
    Taste Skill Project.md
    Vercel Web Design Guidelines.md
  AI Instructions.md
  Architecture.md
  Coding Standards.md
  Components.md
  Design Rules.md
  Home.md
  Project Context.md
  Tech Stack.md
lib/
  __tests__/
    utils.test.ts
  db.ts
  utils.ts
prisma/
  migrations/
    20260719134020_test1/
      migration.sql
    migration_lock.toml
  schema.prisma
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
repositories/
  user.ts
services/
  user.ts
.env.example
.gitignore
AGENTS.md
components.json
env.ts
eslint.config.mjs
jest.config.ts
jest.setup.ts
knip.json
next.config.ts
package.json
pnpm-workspace.yaml
postcss.config.mjs
prisma.config.ts
README.md
tsconfig.json
```

# Files

## File: .husky/pre-commit

```
1: #!/bin/dash
2: pnpm exec lint-staged
```

## File: app/globals.css

```css
  1: @import "tailwindcss";
  2: @import "tw-animate-css";
  3: @import "shadcn/tailwind.css";
  4: @custom-variant dark (&:is(.dark *));
  5: @theme inline {
  6:   --color-background: var(--background);
  7:   --color-foreground: var(--foreground);
  8:   --font-sans: var(--font-sans);
  9:   --font-mono: var(--font-geist-mono);
 10:   --font-heading: var(--font-sans);
 11:   --color-sidebar-ring: var(--sidebar-ring);
 12:   --color-sidebar-border: var(--sidebar-border);
 13:   --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
 14:   --color-sidebar-accent: var(--sidebar-accent);
 15:   --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
 16:   --color-sidebar-primary: var(--sidebar-primary);
 17:   --color-sidebar-foreground: var(--sidebar-foreground);
 18:   --color-sidebar: var(--sidebar);
 19:   --color-chart-5: var(--chart-5);
 20:   --color-chart-4: var(--chart-4);
 21:   --color-chart-3: var(--chart-3);
 22:   --color-chart-2: var(--chart-2);
 23:   --color-chart-1: var(--chart-1);
 24:   --color-ring: var(--ring);
 25:   --color-input: var(--input);
 26:   --color-border: var(--border);
 27:   --color-destructive: var(--destructive);
 28:   --color-accent-foreground: var(--accent-foreground);
 29:   --color-accent: var(--accent);
 30:   --color-muted-foreground: var(--muted-foreground);
 31:   --color-muted: var(--muted);
 32:   --color-secondary-foreground: var(--secondary-foreground);
 33:   --color-secondary: var(--secondary);
 34:   --color-primary-foreground: var(--primary-foreground);
 35:   --color-primary: var(--primary);
 36:   --color-popover-foreground: var(--popover-foreground);
 37:   --color-popover: var(--popover);
 38:   --color-card-foreground: var(--card-foreground);
 39:   --color-card: var(--card);
 40:   --radius-sm: calc(var(--radius) * 0.6);
 41:   --radius-md: calc(var(--radius) * 0.8);
 42:   --radius-lg: var(--radius);
 43:   --radius-xl: calc(var(--radius) * 1.4);
 44:   --radius-2xl: calc(var(--radius) * 1.8);
 45:   --radius-3xl: calc(var(--radius) * 2.2);
 46:   --radius-4xl: calc(var(--radius) * 2.6);
 47: }
 48: :root {
 49:   --background: oklch(1 0 0);
 50:   --foreground: oklch(0.145 0 0);
 51:   --card: oklch(1 0 0);
 52:   --card-foreground: oklch(0.145 0 0);
 53:   --popover: oklch(1 0 0);
 54:   --popover-foreground: oklch(0.145 0 0);
 55:   --primary: oklch(0.205 0 0);
 56:   --primary-foreground: oklch(0.985 0 0);
 57:   --secondary: oklch(0.97 0 0);
 58:   --secondary-foreground: oklch(0.205 0 0);
 59:   --muted: oklch(0.97 0 0);
 60:   --muted-foreground: oklch(0.556 0 0);
 61:   --accent: oklch(0.97 0 0);
 62:   --accent-foreground: oklch(0.205 0 0);
 63:   --destructive: oklch(0.577 0.245 27.325);
 64:   --border: oklch(0.922 0 0);
 65:   --input: oklch(0.922 0 0);
 66:   --ring: oklch(0.708 0 0);
 67:   --chart-1: oklch(0.87 0 0);
 68:   --chart-2: oklch(0.556 0 0);
 69:   --chart-3: oklch(0.439 0 0);
 70:   --chart-4: oklch(0.371 0 0);
 71:   --chart-5: oklch(0.269 0 0);
 72:   --radius: 0.625rem;
 73:   --sidebar: oklch(0.985 0 0);
 74:   --sidebar-foreground: oklch(0.145 0 0);
 75:   --sidebar-primary: oklch(0.205 0 0);
 76:   --sidebar-primary-foreground: oklch(0.985 0 0);
 77:   --sidebar-accent: oklch(0.97 0 0);
 78:   --sidebar-accent-foreground: oklch(0.205 0 0);
 79:   --sidebar-border: oklch(0.922 0 0);
 80:   --sidebar-ring: oklch(0.708 0 0);
 81: }
 82: .dark {
 83:   --background: oklch(0.145 0 0);
 84:   --foreground: oklch(0.985 0 0);
 85:   --card: oklch(0.205 0 0);
 86:   --card-foreground: oklch(0.985 0 0);
 87:   --popover: oklch(0.205 0 0);
 88:   --popover-foreground: oklch(0.985 0 0);
 89:   --primary: oklch(0.922 0 0);
 90:   --primary-foreground: oklch(0.205 0 0);
 91:   --secondary: oklch(0.269 0 0);
 92:   --secondary-foreground: oklch(0.985 0 0);
 93:   --muted: oklch(0.269 0 0);
 94:   --muted-foreground: oklch(0.708 0 0);
 95:   --accent: oklch(0.269 0 0);
 96:   --accent-foreground: oklch(0.985 0 0);
 97:   --destructive: oklch(0.704 0.191 22.216);
 98:   --border: oklch(1 0 0 / 10%);
 99:   --input: oklch(1 0 0 / 15%);
100:   --ring: oklch(0.556 0 0);
101:   --chart-1: oklch(0.87 0 0);
102:   --chart-2: oklch(0.556 0 0);
103:   --chart-3: oklch(0.439 0 0);
104:   --chart-4: oklch(0.371 0 0);
105:   --chart-5: oklch(0.269 0 0);
106:   --sidebar: oklch(0.205 0 0);
107:   --sidebar-foreground: oklch(0.985 0 0);
108:   --sidebar-primary: oklch(0.488 0.243 264.376);
109:   --sidebar-primary-foreground: oklch(0.985 0 0);
110:   --sidebar-accent: oklch(0.269 0 0);
111:   --sidebar-accent-foreground: oklch(0.985 0 0);
112:   --sidebar-border: oklch(1 0 0 / 10%);
113:   --sidebar-ring: oklch(0.556 0 0);
114: }
115: @layer base {
116:   * {
117:     @apply border-border outline-ring/50;
118:   }
119:   body {
120:     @apply bg-background text-foreground;
121:   }
122:   html {
123:     @apply font-sans;
124:   }
125: }
```

## File: app/layout.tsx

```typescript
 1: import type { Metadata } from "next";
 2: import { Geist, Geist_Mono } from "next/font/google";
 3: import "./globals.css";
 4: const geistSans = Geist({
 5:   variable: "--font-geist-sans",
 6:   subsets: ["latin"],
 7: });
 8: const geistMono = Geist_Mono({
 9:   variable: "--font-geist-mono",
10:   subsets: ["latin"],
11: });
12: export const metadata: Metadata = {
13:   title: "Next.js Project",
14:   description: "Maintainable, production-grade software with clean architecture",
15: };
16: export default function RootLayout({
17:   children,
18: }: Readonly<{
19:   children: React.ReactNode;
20: }>) {
21:   return (
22:     <html
23:       lang="en"
24:       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
25:     >
26:       <body className="min-h-full flex flex-col">{children}</body>
27:     </html>
28:   );
29: }
```

## File: app/page.tsx

```typescript
  1: import { Badge } from "@/components/ui/badge";
  2: import { Button } from "@/components/ui/button";
  3: import { ArrowRight, Code2, Layers, Zap } from "lucide-react";
  4: export default function Home() {
  5:   return (
  6:     <div className="flex flex-1 flex-col">
  7:       <section className="relative flex flex-1 flex-col items-start justify-center px-6 pt-24 pb-16 md:px-12 lg:px-24">
  8:         <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.95 0.02 250),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.2 0.02 250),transparent)]" />
  9:         <Badge variant="secondary" className="mb-6">
 10:           Foundation Phase
 11:         </Badge>
 12:         <h1
 13:           className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
 14:           style={{ textWrap: "balance" }}
 15:         >
 16:           Build maintainable software with intentional design
 17:         </h1>
 18:         <p
 19:           className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground"
 20:           style={{ textWrap: "pretty" }}
 21:         >
 22:           A Next.js 16 project with clean architecture, strict TypeScript, and
 23:           design rules that prevent generic AI output. Every component earns its
 24:           place.
 25:         </p>
 26:         <div className="mt-10 flex flex-col gap-3 sm:flex-row">
 27:           <Button size="lg" className="active:scale-[0.96] transition-transform">
 28:             Get Started
 29:             <ArrowRight className="size-4" />
 30:           </Button>
 31:           <Button variant="outline" size="lg" className="active:scale-[0.96] transition-transform">
 32:             Documentation
 33:           </Button>
 34:         </div>
 35:       </section>
 36:       <section className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
 37:         <div className="grid gap-8 md:grid-cols-3">
 38:           <div className="flex flex-col gap-3">
 39:             <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
 40:               <Layers className="size-5 text-primary" />
 41:             </div>
 42:             <h2
 43:               className="text-lg font-medium text-foreground"
 44:               style={{ textWrap: "balance" }}
 45:             >
 46:               Layered Architecture
 47:             </h2>
 48:             <p
 49:               className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
 50:               style={{ textWrap: "pretty" }}
 51:             >
 52:               UI, Actions, Services, Repositories, Database. Business logic
 53:               never touches the presentation layer.
 54:             </p>
 55:           </div>
 56:           <div className="flex flex-col gap-3">
 57:             <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
 58:               <Code2 className="size-5 text-primary" />
 59:             </div>
 60:             <h2
 61:               className="text-lg font-medium text-foreground"
 62:               style={{ textWrap: "balance" }}
 63:             >
 64:               Strict TypeScript
 65:             </h2>
 66:             <p
 67:               className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
 68:               style={{ textWrap: "pretty" }}
 69:             >
 70:               No any types. Zod for runtime validation. Inferred types
 71:               preferred. Types stay close to the feature.
 72:             </p>
 73:           </div>
 74:           <div className="flex flex-col gap-3">
 75:             <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
 76:               <Zap className="size-5 text-primary" />
 77:             </div>
 78:             <h2
 79:               className="text-lg font-medium text-foreground"
 80:               style={{ textWrap: "balance" }}
 81:             >
 82:               Design Quality
 83:             </h2>
 84:             <p
 85:               className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
 86:               style={{ textWrap: "pretty" }}
 87:             >
 88:               Anti-slop rules, three dials for aesthetic direction, and
 89:               pre-flight checks before every ship.
 90:             </p>
 91:           </div>
 92:         </div>
 93:       </section>
 94:       <section className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
 95:         <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
 96:           <div className="max-w-[65ch]">
 97:             <h2
 98:               className="text-2xl font-semibold tracking-tight text-foreground"
 99:               style={{ textWrap: "balance" }}
100:             >
101:               Ready to build?
102:             </h2>
103:             <p
104:               className="mt-2 text-muted-foreground"
105:               style={{ textWrap: "pretty" }}
106:             >
107:               The foundation is set. Architecture, design rules, and tooling are
108:               in place. Start building features.
109:             </p>
110:           </div>
111:           <Button variant="outline" size="lg" className="active:scale-[0.96] transition-transform shrink-0">
112:             View Documentation
113:             <ArrowRight className="size-4" />
114:           </Button>
115:         </div>
116:       </section>
117:     </div>
118:   );
119: }
```

## File: components/ui/**tests**/card.test.tsx

```typescript
 1: import { render, screen } from "@testing-library/react";
 2: import {
 3:   Card,
 4:   CardHeader,
 5:   CardTitle,
 6:   CardDescription,
 7:   CardContent,
 8:   CardFooter,
 9: } from "../card";
10: describe("Card", () => {
11:   it("renders children", () => {
12:     render(
13:       <Card>
14:         <CardContent>Test content</CardContent>
15:       </Card>
16:     );
17:     expect(screen.getByText("Test content")).toBeInTheDocument();
18:   });
19:   it("renders with title", () => {
20:     render(
21:       <Card>
22:         <CardHeader>
23:           <CardTitle>Card Title</CardTitle>
24:         </CardHeader>
25:       </Card>
26:     );
27:     expect(screen.getByText("Card Title")).toBeInTheDocument();
28:   });
29:   it("renders with description", () => {
30:     render(
31:       <Card>
32:         <CardHeader>
33:           <CardTitle>Title</CardTitle>
34:           <CardDescription>Description text</CardDescription>
35:         </CardHeader>
36:       </Card>
37:     );
38:     expect(screen.getByText("Description text")).toBeInTheDocument();
39:   });
40:   it("renders with footer", () => {
41:     render(
42:       <Card>
43:         <CardContent>Content</CardContent>
44:         <CardFooter>Footer content</CardFooter>
45:       </Card>
46:     );
47:     expect(screen.getByText("Footer content")).toBeInTheDocument();
48:   });
49:   it("applies custom className", () => {
50:     const { container } = render(
51:       <Card className="custom-class">
52:         <CardContent>Content</CardContent>
53:       </Card>
54:     );
55:     expect(container.firstChild).toHaveClass("custom-class");
56:   });
57: });
```

## File: components/ui/badge.tsx

```typescript
 1: import { mergeProps } from "@base-ui/react/merge-props"
 2: import { useRender } from "@base-ui/react/use-render"
 3: import { cva, type VariantProps } from "class-variance-authority"
 4: import { cn } from "@/lib/utils"
 5: const badgeVariants = cva(
 6:   "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
 7:   {
 8:     variants: {
 9:       variant: {
10:         default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
11:         secondary:
12:           "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
13:         destructive:
14:           "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
15:         outline:
16:           "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
17:         ghost:
18:           "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
19:         link: "text-primary underline-offset-4 hover:underline",
20:       },
21:     },
22:     defaultVariants: {
23:       variant: "default",
24:     },
25:   }
26: )
27: function Badge({
28:   className,
29:   variant = "default",
30:   render,
31:   ...props
32: }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
33:   return useRender({
34:     defaultTagName: "span",
35:     props: mergeProps<"span">(
36:       {
37:         className: cn(badgeVariants({ variant }), className),
38:       },
39:       props
40:     ),
41:     render,
42:     state: {
43:       slot: "badge",
44:       variant,
45:     },
46:   })
47: }
48: export { Badge, badgeVariants }
```

## File: components/ui/button.tsx

```typescript
 1: import { Button as ButtonPrimitive } from "@base-ui/react/button"
 2: import { cva, type VariantProps } from "class-variance-authority"
 3: import { cn } from "@/lib/utils"
 4: const buttonVariants = cva(
 5:   "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
 6:   {
 7:     variants: {
 8:       variant: {
 9:         default: "bg-primary text-primary-foreground hover:bg-primary/80",
10:         outline:
11:           "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
12:         secondary:
13:           "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
14:         ghost:
15:           "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
16:         destructive:
17:           "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
18:         link: "text-primary underline-offset-4 hover:underline",
19:       },
20:       size: {
21:         default:
22:           "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
23:         xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
24:         sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
25:         lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
26:         icon: "size-8",
27:         "icon-xs":
28:           "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
29:         "icon-sm":
30:           "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
31:         "icon-lg": "size-9",
32:       },
33:     },
34:     defaultVariants: {
35:       variant: "default",
36:       size: "default",
37:     },
38:   }
39: )
40: function Button({
41:   className,
42:   variant = "default",
43:   size = "default",
44:   ...props
45: }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
46:   return (
47:     <ButtonPrimitive
48:       data-slot="button"
49:       className={cn(buttonVariants({ variant, size, className }))}
50:       {...props}
51:     />
52:   )
53: }
54: export { Button, buttonVariants }
```

## File: components/ui/card.tsx

```typescript
 1: import * as React from "react"
 2: import { cn } from "@/lib/utils"
 3: function Card({
 4:   className,
 5:   size = "default",
 6:   ...props
 7: }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
 8:   return (
 9:     <div
10:       data-slot="card"
11:       data-size={size}
12:       className={cn(
13:         "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
14:         className
15:       )}
16:       {...props}
17:     />
18:   )
19: }
20: function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
21:   return (
22:     <div
23:       data-slot="card-header"
24:       className={cn(
25:         "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
26:         className
27:       )}
28:       {...props}
29:     />
30:   )
31: }
32: function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
33:   return (
34:     <div
35:       data-slot="card-title"
36:       className={cn(
37:         "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
38:         className
39:       )}
40:       {...props}
41:     />
42:   )
43: }
44: function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
45:   return (
46:     <div
47:       data-slot="card-description"
48:       className={cn("text-sm text-muted-foreground", className)}
49:       {...props}
50:     />
51:   )
52: }
53: function CardAction({ className, ...props }: React.ComponentProps<"div">) {
54:   return (
55:     <div
56:       data-slot="card-action"
57:       className={cn(
58:         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
59:         className
60:       )}
61:       {...props}
62:     />
63:   )
64: }
65: function CardContent({ className, ...props }: React.ComponentProps<"div">) {
66:   return (
67:     <div
68:       data-slot="card-content"
69:       className={cn("px-(--card-spacing)", className)}
70:       {...props}
71:     />
72:   )
73: }
74: function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
75:   return (
76:     <div
77:       data-slot="card-footer"
78:       className={cn(
79:         "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
80:         className
81:       )}
82:       {...props}
83:     />
84:   )
85: }
86: export {
87:   Card,
88:   CardHeader,
89:   CardFooter,
90:   CardTitle,
91:   CardAction,
92:   CardDescription,
93:   CardContent,
94: }
```

## File: components/ui/input.tsx

```typescript
 1: import * as React from "react"
 2: import { Input as InputPrimitive } from "@base-ui/react/input"
 3: import { cn } from "@/lib/utils"
 4: function Input({ className, type, ...props }: React.ComponentProps<"input">) {
 5:   return (
 6:     <InputPrimitive
 7:       type={type}
 8:       data-slot="input"
 9:       className={cn(
10:         "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
11:         className
12:       )}
13:       {...props}
14:     />
15:   )
16: }
17: export { Input }
```

## File: components/ui/label.tsx

```typescript
 1: "use client"
 2: import * as React from "react"
 3: import { cn } from "@/lib/utils"
 4: function Label({ className, ...props }: React.ComponentProps<"label">) {
 5:   return (
 6:     <label
 7:       data-slot="label"
 8:       className={cn(
 9:         "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
10:         className
11:       )}
12:       {...props}
13:     />
14:   )
15: }
16: export { Label }
```

## File: components/ui/separator.tsx

```typescript
 1: "use client"
 2: import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
 3: import { cn } from "@/lib/utils"
 4: function Separator({
 5:   className,
 6:   orientation = "horizontal",
 7:   ...props
 8: }: SeparatorPrimitive.Props) {
 9:   return (
10:     <SeparatorPrimitive
11:       data-slot="separator"
12:       orientation={orientation}
13:       className={cn(
14:         "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
15:         className
16:       )}
17:       {...props}
18:     />
19:   )
20: }
21: export { Separator }
```

## File: docs/ADR/001-use-layered-architecture.md

````markdown
1: # ADR-001: Use Layered Architecture
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a clear separation of concerns to maintain code quality as it grows. Business logic must be isolated from the presentation layer.
14:
15: ## Decision
16:
17: We will follow a layered architecture:
18:
19: `20: UI (Server Components)
21: ↓
22: Actions / Routes
23: ↓
24: Services
25: ↓
26: Repositories
27: ↓
28: Database (Prisma + Neon PostgreSQL)
29:`
30:
31: ## Consequences
32:
33: ### Positive
34:
35: - Clear separation of concerns.
36: - Business logic is testable in isolation.
37: - Database access is centralized in repositories.
38: - UI remains a thin presentation layer.
39:
40: ### Negative
41:
42: - More files and folders for simple features.
43: - Requires discipline to maintain the layers.
44: - Adds indirection for simple data fetching.
45:
46: ## Alternatives Considered
47:
48: - **Direct Prisma in components**: Rejected. Violates separation of concerns.
49: - **Service-only architecture**: Rejected. Mixes data access with business logic.
50: - **Feature-based architecture**: Future consideration. Can coexist with layers.
````

## File: docs/ADR/002-use-neon-with-prisma.md

```markdown
1: # ADR-002: Use Neon PostgreSQL with Prisma
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a reliable, scalable database that works well with TypeScript and serverless deployment.
14:
15: ## Decision
16:
17: We will use Neon PostgreSQL as the database provider with Prisma as the ORM.
18:
19: ## Consequences
20:
21: ### Positive
22:
23: - Serverless PostgreSQL scales automatically.
24: - Prisma provides type-safe database access.
25: - Neon adapter works with connection pooling.
26: - WebSocket support for serverless environments.
27:
28: ### Negative
29:
30: - Neon-specific configuration required.
31: - Connection pooling adds complexity.
32: - WebSocket setup in `lib/db.ts` adds boilerplate.
33:
34: ## Alternatives Considered
35:
36: - **Supabase**: Rejected. Prisma integration is less mature.
37: - **PlanetScale**: Rejected. MySQL, not PostgreSQL.
38: - **Railway**: Rejected. Not serverless-native.
```

## File: docs/ADR/003-use-shadcn-ui.md

```markdown
1: # ADR-003: Use shadcn/ui for Component Library
2:
3: ## Status
4:
5: Accepted
6:
7: ## Date
8:
9: 2026-07-20
10:
11: ## Context
12:
13: The project needs a reusable component library that is accessible, customizable, and works with Tailwind CSS.
14:
15: ## Decision
16:
17: We will use shadcn/ui with the base-nova style and lucide-react icons.
18:
19: ## Consequences
20:
21: ### Positive
22:
23: - Components are accessible by default.
24: - Full control over component code.
25: - No vendor lock-in.
26: - Works with Tailwind CSS v4.
27:
28: ### Negative
29:
30: - Components must be manually updated.
31: - No automatic updates from upstream.
32: - Requires understanding of component internals.
33:
34: ## Alternatives Considered
35:
36: - **Radix UI**: Rejected. shadcn/ui wraps Radix with better defaults.
37: - **Headless UI**: Rejected. Less opinionated, more work.
38: - **Mantine**: Rejected. Too heavy, less customizable.
```

## File: docs/API/Database.md

````markdown
1: # Database
2:
3: This document describes the database architecture used by the project.
4:
5: ---
6:
7: # Database Engine
8:
9: PostgreSQL
10:
11: Hosted on:
12:
13: - Neon
14:
15: ---
16:
17: # ORM
18:
19: Prisma ORM
20:
21: Responsibilities:
22:
23: - Type-safe database access
24: - Schema management
25: - Migrations
26: - Query generation
27:
28: ---
29:
30: # Design Principles
31:
32: The database should remain:
33:
34: - Simple
35: - Normalized
36: - Scalable
37: - Easy to maintain
38:
39: Business logic must never exist inside the database.
40:
41: ---
42:
43: # Current Schema
44:
45: ## User
46:
47: | Field | Type | Description |
48: |--------|------|-------------|
49: | id | String | Primary Key (CUID) |
50: | email | String | Unique email address |
51: | name | String? | Optional display name |
52: | image | String? | Optional profile image |
53: | createdAt | DateTime | Record creation timestamp |
54: | updatedAt | DateTime | Last update timestamp |
55:
56: ---
57:
58: # Data Access Flow
59:
60: ` 61: UI
 62: 
 63: ↓
 64: 
 65: Actions
 66: 
 67: ↓
 68: 
 69: Services
 70: 
 71: ↓
 72: 
 73: Repositories
 74: 
 75: ↓
 76: 
 77: Prisma
 78: 
 79: ↓
 80: 
 81: PostgreSQL
 82:`
83:
84: Repositories are the only layer allowed to communicate directly with Prisma.
85:
86: ---
87:
88: # Migration Strategy
89:
90: Always create migrations using Prisma.
91:
92: Never modify production databases manually.
93:
94: Commands:
95:
96: `bash
 97: pnpm prisma migrate dev
 98: `
99:
100: Generate Prisma Client
101:
102: `bash
103: pnpm prisma generate
104: `
105:
106: Open Prisma Studio
107:
108: `bash
109: pnpm prisma studio
110: `
111:
112: ---
113:
114: # Naming Conventions
115:
116: Tables
117:
118: - Singular PascalCase models
119:
120: Fields
121:
122: - camelCase
123:
124: Relations
125:
126: - Explicit relation names where necessary
127:
128: ---
129:
130: # Future Tables
131:
132: Expected future models include:
133:
134: - Session
135: - Account
136: - VerificationToken
137: - Role
138: - Permission
139: - Notification
140: - AuditLog
141:
142: These models will be introduced only when required.
143:
144: ---
145:
146: # Performance
147:
148: Guidelines:
149:
150: - Add indexes only when justified.
151: - Avoid unnecessary joins.
152: - Use pagination for large datasets.
153: - Select only required fields.
154:
155: ---
156:
157: # Security
158:
159: Never expose:
160:
161: - Password hashes
162: - Secrets
163: - Internal identifiers without reason
164:
165: Always validate user input before database operations.
166:
167: ---
168:
169: # Backup Strategy
170:
171: Production backups are managed by the hosting provider.
172:
173: Database migrations must always be version-controlled.
174:
175: ---
176:
177: # Documentation Rules
178:
179: Every significant change should update the relevant documentation.
````

## File: docs/audits/Brand Fidelity Audit.md

```markdown
1: # Brand Fidelity Audit
2:
3: Verify that redesigns preserve brand identity and URLs.
4:
5: ---
6:
7: # Rules
8:
9: - Never change existing URLs without explicit decision.
10: - Never change brand identity without explicit decision.
11: - Document every change that affects brand or routing.
12: - Record the before and after state.
13:
14: ---
15:
16: # What to Check
17:
18: ## URLs
19:
20: - [ ] All existing URLs preserved.
21: - [ ] New URLs follow existing patterns.
22: - [ ] Redirects in place for any changed URLs.
23:
24: ## Brand Identity
25:
26: - [ ] Logo and wordmark unchanged.
27: - [ ] Brand colors preserved (unless explicitly updated).
28: - [ ] Brand typography preserved (unless explicitly updated).
29: - [ ] Brand voice and tone consistent.
30:
31: ## Visual Identity
32:
33: - [ ] Consistent visual language across pages.
34: - [ ] No jarring style changes between sections.
35: - [ ] Transition between old and new design is smooth.
36:
37: ---
38:
39: # Documentation
40:
41: Record all changes:
42:
43: - What changed.
44: - Why it changed.
45: - Who approved the change.
46: - Impact on existing users.
47:
48: ---
49:
50: # Sources
51:
52: - Gogh maturity gates - Brand preservation rules.
53: - Taste Skill v2 - Redesign protocol.
```

## File: docs/audits/Impeccable Audit and Detect.md

````markdown
1: # Impeccable Audit and Detect
2:
3: Automated visual and engineering defect detection using Impeccable.
4:
5: ---
6:
7: # Installation
8:
9: `bash
10: npx impeccable install
11: `
12:
13: ---
14:
15: # Running Detection
16:
17: `bash
18: npx impeccable detect
19: `
20:
21: This runs 45 deterministic rules without an LLM.
22:
23: ---
24:
25: # What It Detects
26:
27: - Typography violations.
28: - Color violations.
29: - Layout violations.
30: - Interaction violations.
31: - Performance violations.
32: - Accessibility violations.
33:
34: ---
35:
36: # Named Anti-Slop Tells
37:
38: - Inter for everything without justification.
39: - Purple-to-blue gradients.
40: - Cards nested in cards.
41: - Decorative grid backgrounds.
42: - Two-axis gradient overlay patterns.
43:
44: ---
45:
46: # CI/CD Integration
47:
48: Add to your CI pipeline:
49:
50: `bash
51: npx impeccable detect --ci
52: `
53:
54: Fails the build if any critical violations are found.
55:
56: ---
57:
58: # Manual Review
59:
60: After automated detection:
61:
62: 1. Review findings.
63: 2. Fix critical violations first.
64: 3. Address warnings based on priority.
65: 4. Document any intentional deviations.
66:
67: ---
68:
69: # Sources
70:
71: - pbakaus/impeccable (Apache-2.0).
72: - impeccable.style.
````

## File: docs/audits/MIFB Review Checklist.md

```markdown
1: # MIFB Review Checklist
2:
3: Micro-interaction and visual polish review based on Make Interfaces Feel Better.
4:
5: ---
6:
7: # Shadow Review
8:
9: - [ ] Shadows composed from three layers (ambient, key, rim).
10: - [ ] Shadows used instead of borders for depth.
11: - [ ] Shadow color adjusted for dark mode.
12: - [ ] No single-layer box-shadow.
13:
14: ---
15:
16: # Border Radius Review
17:
18: - [ ] Concentric radius formula applied: outer = inner + padding.
19: - [ ] Consistent radius scale across the page.
20: - [ ] No mixed radius scales.
21:
22: ---
23:
24: # Press State Review
25:
26: - [ ] All buttons have press feedback.
27: - [ ] Press feedback: `scale(0.96)`.
28: - [ ] Never below `scale(0.95)`.
29: - [ ] Hover states present on all interactive elements.
30:
31: ---
32:
33: # Hit Area Review
34:
35: - [ ] All interactive elements: 40x40px minimum.
36: - [ ] Smaller elements extended with pseudo-elements.
37: - [ ] Touch targets meet mobile requirements.
38:
39: ---
40:
41: # Animation Review
42:
43: - [ ] Icon animations: scale 0.25->1, opacity 0->1, blur 4px->0.
44: - [ ] Stagger delay: ~100ms between items.
45: - [ ] Enter duration: ~800ms.
46: - [ ] Exit subtler than enter.
47: - [ ] `prefers-reduced-motion` honored.
48: - [ ] Spring settings: duration 0.3, bounce 0.
49:
50: ---
51:
52: # Typography Review
53:
54: - [ ] Font smoothing: `-webkit-font-smoothing: antialiased`.
55: - [ ] Tabular nums for numeric data.
56: - [ ] Optical alignment applied.
57: - [ ] Line length: 45-90 characters.
58:
59: ---
60:
61: # Image Review
62:
63: - [ ] Image outlines: 1px at 10% opacity.
64: - [ ] Black outline in light mode, white in dark mode.
65:
66: ---
67:
68: # Sources
69:
70: - jakubkrehel/make-interfaces-feel-better.
71: - jakub.kr/writing/details-that-make-interfaces-feel-better.
```

## File: docs/audits/Pre-Flight Check (Section 14).md

```markdown
1: # Pre-Flight Check (Section 14)
2:
3: Mandatory checklist before completing any page or component.
4:
5: Every box must pass. Any failure blocks completion.
6:
7: ---
8:
9: # Design Dials
10:
11: - [ ] Three dials set (Design Variance, Motion Intensity, Visual Density).
12: - [ ] Dials committed before touching layout.
13:
14: ---
15:
16: # Color
17:
18: - [ ] One accent color per page.
19: - [ ] No purple-to-blue gradients.
20: - [ ] No banned palettes (cream+terracotta, black+acid-green).
21: - [ ] Design tokens from globals.css used consistently.
22: - [ ] No hardcoded color values in Tailwind classes.
23:
24: ---
25:
26: # Typography
27:
28: - [ ] Headlines use `text-wrap: balance`.
29: - [ ] Body text uses `text-wrap: pretty`.
30: - [ ] Body text: `max-w-[65ch]`.
31: - [ ] Font smoothing enabled.
32: - [ ] Tabular nums for numeric data.
33: - [ ] No em-dashes or en-dashes in visible text.
34: - [ ] Inter not used for everything without justification.
35:
36: ---
37:
38: # Hero
39:
40: - [ ] Headline: max 2 lines.
41: - [ ] Subtext: max 20 words.
42: - [ ] CTA visible without scrolling.
43: - [ ] Top padding: max `pt-24`.
44: - [ ] Max 4 text elements.
45:
46: ---
47:
48: # Navigation
49:
50: - [ ] Single line at desktop.
51: - [ ] Height cap: 80px.
52: - [ ] No hamburger on desktop.
53:
54: ---
55:
56: # Layout
57:
58: - [ ] At least 4 layout families in 8-section pages.
59: - [ ] Bento grids: exactly N cells for N items.
60: - [ ] No cards nested inside cards.
61: - [ ] Grid broken intentionally at least once.
62: - [ ] Spacing feels deliberate, not uniform.
63:
64: ---
65:
66: # Interactions
67:
68: - [ ] Interactive elements: 40x40px minimum hit area.
69: - [ ] Press states: `scale(0.96)`.
70: - [ ] Shadows: three-layer composition.
71: - [ ] Borders avoided in favor of shadows.
72: - [ ] Animations honor `prefers-reduced-motion`.
73: - [ ] Icon animations: scale, opacity, blur with stagger.
74:
75: ---
76:
77: # Accessibility
78:
79: - [ ] Focus rings visible on all interactive elements.
80: - [ ] ARIA labels on icon-only buttons.
81: - [ ] Semantic HTML elements.
82: - [ ] Color contrast meets WCAG AA.
83: - [ ] Keyboard navigation works.
84:
85: ---
86:
87: # Documentation Rules
88:
89: Every significant change should update the relevant documentation.
90:
91: Architecture decisions should be documented before implementation whenever possible.
92:
93: Documentation should always reflect the current state of the project.
```

## File: docs/audits/Preservation Audit.md

```markdown
1: # Preservation Audit
2:
3: Ensure existing functionality is not broken during redesigns.
4:
5: ---
6:
7: # Rules
8:
9: - Never destroy existing functionality without explicit decision.
10: - Never break existing tests without explicit decision.
11: - Never remove existing features without explicit decision.
12: - Document every removal or change.
13:
14: ---
15:
16: # What to Check
17:
18: ## Functionality
19:
20: - [ ] All existing features still work.
21: - [ ] No regression in existing behavior.
22: - [ ] All existing tests still pass.
23:
24: ## Data
25:
26: - [ ] No data loss.
27: - [ ] No schema changes without migration.
28: - [ ] No breaking changes to API contracts.
29:
30: ## Performance
31:
32: - [ ] No performance regression.
33: - [ ] Bundle size does not increase significantly.
34: - [ ] No new client-side JavaScript without justification.
35:
36: ## Accessibility
37:
38: - [ ] No accessibility regression.
39: - [ ] All existing ARIA attributes preserved.
40: - [ ] Focus management unchanged or improved.
41:
42: ---
43:
44: # Documentation
45:
46: Record all changes:
47:
48: - What was preserved.
49: - What was changed.
50: - Why the change was necessary.
51: - Impact assessment.
52:
53: ---
54:
55: # Sources
56:
57: - Gogh maturity gates - Preservation rules.
58: - Taste Skill v2 - Section 11 redesign protocol.
```

## File: docs/audits/Vercel Audit Guidelines.md

````markdown
1: # Vercel Audit Guidelines
2:
3: Performance and accessibility audit based on Vercel's web design guidelines.
4:
5: ---
6:
7: # Audit Process
8:
9: 1. Read the target files.
10: 2. Check all rules from `docs/rules/Vercel Interface Rule Categories.md`.
11: 3. Output findings grouped by file in `file:line` format.
12: 4. Mark each finding as pass/fail.
13:
14: ---
15:
16: # Accessibility Rules
17:
18: - Icon-only buttons: `aria-label` present.
19: - No `outline-none` without focus replacement.
20: - No paste blocking on inputs.
21: - `prefers-reduced-motion` honored.
22: - Semantic HTML used.
23: - Color contrast meets WCAG AA.
24:
25: ---
26:
27: # Performance Rules
28:
29: - Server Components used by default.
30: - Below-the-fold content lazy loaded.
31: - Client JS minimized.
32: - Streaming and Suspense used.
33: - Critical navigation links prefetched.
34:
35: ---
36:
37: # Form Rules
38:
39: - Labels associated with inputs.
40: - Error messages linked via `aria-describedby`.
41: - Required fields indicated.
42: - Inline validation on blur.
43: - No accidental state clearing.
44:
45: ---
46:
47: # Image Rules
48:
49: - `width` and `height` on all images.
50: - `next/image` used for optimization.
51: - Alt text on meaningful images.
52: - Decorative images: `alt=""`.
53:
54: ---
55:
56: # Output Format
57:
58: `59: file:line - PASS/FAIL - Description
60:`
61:
62: Example:
63:
64: `65: app/page.tsx:42 - FAIL - Icon button missing aria-label
66: components/ui/button.tsx:15 - PASS - Focus ring present
67:`
68:
69: ---
70:
71: # Sources
72:
73: - vercel-labs/web-interface-guidelines (MIT).
74: - vercel.com/design/guidelines.
````

## File: docs/concepts/AI Slop.md

```markdown
1: # AI Slop
2:
3: Understanding and preventing generic AI-generated UI output.
4:
5: ---
6:
7: # What Is AI Slop
8:
9: AI slop is the distributional convergence of LLM-generated frontends. Because LLMs are statistical pattern matchers, they reach for the median of their training corpus.
10:
11: The result: Inter for everything, purple-to-blue gradients, cards nested in cards, and minimal animations.
12:
13: ---
14:
15: # Why It Happens
16:
17: - LLMs default to safe, common patterns.
18: - Training data is dominated by tutorial and template outputs.
19: - The median of training data is generic, not distinctive.
20: - Without constraints, agents produce the same layouts.
21:
22: ---
23:
24: # The Fix
25:
26: Constraint, not prompting.
27:
28: - Forbidden patterns (anti-slop tells).
29: - Committed aesthetic direction (three dials).
30: - Pre-flight checks (Section 14).
31: - Evidence-gated claims (source-ledger).
32:
33: ---
34:
35: # Named Tells
36:
37: From Impeccable's 45-rule detector:
38:
39: - Inter for everything.
40: - Purple-to-blue gradients.
41: - Cards nested in cards.
42: - Decorative grid backgrounds.
43: - Two-axis gradient overlays.
44: - Uniform spacing everywhere.
45: - No micro-interactions.
46: - Generic hero sections.
47:
48: ---
49:
50: # Prevention Strategy
51:
52: 1. Set the three dials before building.
53: 2. Commit to a palette and direction.
54: 3. Check against anti-slop tells.
55: 4. Run pre-flight before shipping.
56: 5. Document design decisions.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Anti-slop framework.
63: - Anthropic frontend-design - Distributional convergence research.
64: - prg.sh - "Why Your AI Keeps Building the Same Purple Gradient Website."
```

## File: docs/concepts/Coaxing Beats Constraint.md

```markdown
1: # Coaxing Beats Constraint
2:
3: Why gentle guidance produces better design output than rigid rules.
4:
5: ---
6:
7: # The Problem
8:
9: Rigid rules produce rigid output. When you tell an agent "use exactly 16px padding everywhere," you get uniform, lifeless layouts.
10:
11: ---
12:
13: # The Solution
14:
15: Coaxing: setting direction and letting the agent fill in the details.
16:
17: - Set the three dials (direction).
18: - Define the palette (constraints).
19: - Let the agent compose within those constraints.
20: - Review and refine, not dictate.
21:
22: ---
23:
24: # How It Works
25:
26: 1. Commit to a direction (three dials).
27: 2. Define boundaries (palette, typography, radius).
28: 3. Let the agent build within boundaries.
29: 4. Critique and revise.
30: 5. Never dictate every pixel.
31:
32: ---
33:
34: # When to Use Coaxing
35:
36: - New features and components.
37: - Landing pages and marketing sites.
38: - Creative layouts and editorial designs.
39:
40: ---
41:
42: # When to Use Constraint
43:
44: - Accessibility rules (non-negotiable).
45: - Security rules (non-negotiable).
46: - Architecture rules (non-negotiable).
47: - Anti-slop tells (non-negotiable).
48:
49: ---
50:
51: # The Balance
52:
53: - Coax for aesthetics.
54: - Constrain for quality.
55: - The three dials are coaxing tools.
56: - The anti-slop tells are constraint tools.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Coaxing vs constraint philosophy.
```

## File: docs/concepts/Design Review as Infrastructure.md

```markdown
1: # Design Review as Infrastructure
2:
3: Making design review a systematic, repeatable process rather than a one-time check.
4:
5: ---
6:
7: # The Problem
8:
9: Design review is typically ad-hoc: someone looks at the UI and gives subjective feedback. This does not scale and is not repeatable.
10:
11: ---
12:
13: # The Solution
14:
15: Treat design review as infrastructure:
16:
17: - Automated checks (Impeccable detector, ESLint, TypeScript).
18: - Manual checklists (Section 14 pre-flight).
19: - Source-gated claims (every rule cites a source).
20: - Repeatable pipelines (audit pipeline flow).
21:
22: ---
23:
24: # Layers of Review
25:
26: ## Automated
27:
28: - TypeScript type checking.
29: - ESLint linting.
30: - Impeccable 45-rule detector.
31: - Knip dead code detection.
32:
33: ## Semi-Automated
34:
35: - Section 14 pre-flight checklist.
36: - Vercel audit guidelines.
37: - MIFB review checklist.
38:
39: ## Manual
40:
41: - Brand fidelity audit.
42: - Preservation audit.
43: - Accessibility testing.
44: - Performance profiling.
45:
46: ---
47:
48: # Integration
49:
50: Design review should be part of:
51:
52: - Pre-commit hooks (Husky).
53: - CI/CD pipeline (automated checks).
54: - Pull request review (manual checks).
55: - Release process (full audit).
56:
57: ---
58:
59: # Documentation
60:
61: Every review finding should be:
62:
63: - Documented in the relevant docs folder.
64: - Tracked to resolution.
65: - Linked to the source rule.
66:
67: ---
68:
69: # Sources
70:
71: - Developers Digest - "Taste Skills Are Turning Agent Review Into Infrastructure."
72: - Impeccable - Deterministic detector as infrastructure.
```

## File: docs/concepts/Interruptible Animation.md

````markdown
1: # Interruptible Animation
2:
3: Making animations that can be interrupted without breaking the interface.
4:
5: ---
6:
7: # The Problem
8:
9: Non-interruptible animations frustrate users. When a user clicks a new target while an animation is running, the animation should stop cleanly and start the new one.
10:
11: ---
12:
13: # Rules
14:
15: - All animations must be interruptible.
16: - Use `transition` instead of `animation` when possible.
17: - Prefer `transform` and `opacity` (GPU-accelerated).
18: - Never animate layout properties (width, height, padding).
19:
20: ---
21:
22: # Implementation
23:
24: `tsx
25: <div className="transition-all duration-300 ease-out">
26:   Content
27: </div>
28: `
29:
30: ---
31:
32: # Animation Values
33:
34: | Property | Value |
35: |---|---|
36: | Enter duration | ~800ms |
37: | Exit duration | Subtler than enter |
38: | Stagger delay | ~100ms |
39: | Icon scale | 0.25 -> 1 |
40: | Icon opacity | 0 -> 1 |
41: | Icon blur | 4px -> 0 |
42: | Spring duration | 0.3 |
43: | Spring bounce | 0 |
44:
45: ---
46:
47: # Reduced Motion
48:
49: Always honor `prefers-reduced-motion`:
50:
51: `tsx
52: @media (prefers-reduced-motion: reduce) {
53:   * {
54:     animation-duration: 0.01ms !important;
55:     transition-duration: 0.01ms !important;
56:   }
57: }
58: `
59:
60: ---
61:
62: # Sources
63:
64: - Make Interfaces Feel Better (Jakub Krehel) - Interruptible animations.
65: - Vercel web-design-guidelines - Animation rules.
````

## File: docs/concepts/Optical Alignment.md

```markdown
1: # Optical Alignment
2:
3: Making interfaces feel visually correct, not just mathematically correct.
4:
5: ---
6:
7: # The Problem
8:
9: Mathematical centering does not always look centered. Elements with different visual weights appear off-center when mathematically centered.
10:
11: ---
12:
13: # The Solution
14:
15: Optical alignment adjusts elements based on their visual weight, not their mathematical position.
16:
17: ---
18:
19: # Rules
20:
21: - Heavier elements shift slightly toward center.
22: - Lighter elements shift slightly away from center.
23: - Icons align with text baselines, not bounding boxes.
24: - Circular elements align by visual center, not bounding box.
25:
26: ---
27:
28: # Examples
29:
30: - A circle next to text: shift the circle down 1-2px to align optical center with text baseline.
31: - An icon next to text: shift the icon down to align with the text's x-height.
32: - A heavy headline above light body text: shift headline slightly down.
33:
34: ---
35:
36: # Application
37:
38: - Check every composition for optical alignment.
39: - Adjust padding and margin for visual balance.
40: - Do not rely solely on Tailwind's default spacing.
41: - Use arbitrary values when optical correction is needed.
42:
43: ---
44:
45: # Sources
46:
47: - Make Interfaces Feel Better (Jakub Krehel) - Optical alignment rules.
48: - Refactoring UI (Wathan & Schoger) - Visual hierarchy principles.
```

## File: docs/concepts/Press Feedback and Hit Areas.md

````markdown
1: # Press Feedback and Hit Areas
2:
3: Rules for making interactive elements feel responsive and accessible.
4:
5: ---
6:
7: # Press Feedback
8:
9: Every interactive element should provide visual feedback when pressed.
10:
11: ## Rules
12:
13: - Button press: `transform: scale(0.96)`.
14: - Never go below `scale(0.95)`.
15: - Apply via CSS transition for smoothness.
16: - Duration: ~100ms.
17:
18: ## Implementation
19:
20: `tsx
21: <Button className="active:scale-[0.96] transition-transform duration-100">
22:   Click me
23: </Button>
24: `
25:
26: ---
27:
28: # Hit Areas
29:
30: Interactive elements must have sufficient touch/click targets.
31:
32: ## Rules
33:
34: - Minimum 40x40px hit area.
35: - Extend with pseudo-element when visible element is smaller.
36: - Apply `min-h-[40px] min-w-[40px]` for minimum sizing.
37:
38: ## Implementation
39:
40: `tsx
41: <Button className="min-h-[40px] min-w-[40px]">
42:   <span className="sr-only">Label</span>
43:   <Icon className="h-4 w-4" />
44: </Button>
45: `
46:
47: ---
48:
49: # Hover States
50:
51: - Use `@media (hover: hover)` for hover styles.
52: - Hover should enhance, not replace, the base state.
53: - Transition between states smoothly.
54:
55: ---
56:
57: # Focus States
58:
59: - Visible focus ring on all interactive elements.
60: - Never use `outline-none` without a replacement.
61: - Focus ring should be consistent across the application.
62:
63: ---
64:
65: # Sources
66:
67: - Make Interfaces Feel Better (Jakub Krehel) - Press states and hit areas.
68: - Vercel web-design-guidelines - Focus management.
````

## File: docs/decisions/Enforcement Layer Overlap.md

```markdown
1: # Enforcement Layer Overlap
2:
3: Comparing enforcement approaches across Impeccable, Vercel, and Taste Skill.
4:
5: ---
6:
7: # Overlap Map
8:
9: | Category | Taste Skill | Impeccable | Vercel |
10: |---|---|---|---|
11: | Anti-slop tells | Section 14 | 45-rule detector | Audit findings |
12: | Typography | Balance/pretty wrapping | Type scale rules | Line length rules |
13: | Color | One accent, one palette | Color violations | Contrast rules |
14: | Layout | 4+ layout families | Layout violations | Responsive rules |
15: | Interactions | Hit areas, press states | Interaction rules | Touch targets |
16: | Accessibility | Minimal | Minimal | Comprehensive |
17: | Performance | Minimal | Minimal | Comprehensive |
18:
19: ---
20:
21: # Resolution
22:
23: When rules overlap:
24:
25: 1. Project rules in `docs/rules/` take precedence.
26: 2. Accessibility: Vercel guidelines are most comprehensive.
27: 3. Aesthetic direction: Taste Skill is most comprehensive.
28: 4. Anti-pattern detection: Impeccable is most comprehensive.
29: 5. Micro-interactions: MIFB is most comprehensive.
30:
31: ---
32:
33: # Conflict Resolution
34:
35: When skills conflict:
36:
37: 1. Document the conflict.
38: 2. Choose the rule that best fits the project.
39: 3. Record the decision in `docs/decisions/`.
40: 4. Apply consistently.
41:
42: ---
43:
44: # Sources
45:
46: - Gogh - Enforcement layer overlap analysis.
47: - Taste Skill v2, Impeccable, Vercel web-design-guidelines.
```

## File: docs/decisions/Font Ban Conflicts.md

```markdown
1: # Font Ban Conflicts
2:
3: Resolving conflicts between font-related rules across design skills.
4:
5: ---
6:
7: # The Conflict
8:
9: Different skills have different opinions about font usage:
10:
11: - Taste Skill: Bans Inter for everything without justification.
12: - Impeccable: Flags Inter as an anti-slop tell.
13: - Anthropic: Recommends committing to a type direction.
14: - Vercel: Focuses on typography rules (balance, pretty, line length).
15:
16: ---
17:
18: # Resolution
19:
20: - Inter is not banned outright, but using it for everything without justification is flagged.
21: - Every project should commit to a type direction before building.
22: - Use the project's chosen font consistently.
23: - Apply typography rules (balance, pretty, line length) regardless of font choice.
24:
25: ---
26:
27: # Application
28:
29: - Choose a font that fits the project's brand and audience.
30: - Document the choice in `DESIGN.md` or equivalent.
31: - Apply typography rules from all skills.
32: - Do not switch fonts mid-project without explicit decision.
33:
34: ---
35:
36: # Sources
37:
38: - Taste Skill v2 - Inter ban rule.
39: - Impeccable - Named anti-slop tells.
40: - Anthropic frontend-design - Typography direction.
```

## File: docs/decisions/Motion Doctrine Conflicts.md

```markdown
1: # Motion Doctrine Conflicts
2:
3: Resolving conflicts between animation and motion rules.
4:
5: ---
6:
7: # The Conflict
8:
9: Different skills have different motion philosophies:
10:
11: - Taste Skill: Motion Intensity dial (1-10).
12: - MIFB: Specific animation values (duration, stagger, spring).
13: - Impeccable: Minimal motion rules.
14: - Vercel: Comprehensive animation rules (reduced motion, duration limits).
15:
16: ---
17:
18: # Resolution
19:
20: - The Motion Intensity dial sets the overall animation level.
21: - MIFB provides the specific values when animations are used.
22: - Vercel rules for accessibility (reduced motion) are non-negotiable.
23: - Impeccable flags excessive or broken animations.
24:
25: ---
26:
27: # Application
28:
29: 1. Set the Motion Intensity dial before building.
30: 2. Apply MIFB animation values for micro-interactions.
31: 3. Always honor `prefers-reduced-motion`.
32: 4. Keep animations under 300ms for micro-interactions.
33: 5. Use `transform` and `opacity` for GPU-accelerated animations.
34:
35: ---
36:
37: # Sources
38:
39: - Taste Skill v2 - Motion Intensity dial.
40: - MIFB - Animation values.
41: - Vercel web-design-guidelines - Animation rules.
```

## File: docs/decisions/Prompt Layer vs Toolchain Layer.md

```markdown
1: # Prompt Layer vs Toolchain Layer
2:
3: When to use prompt-based guidance vs persistent toolchain enforcement.
4:
5: ---
6:
7: # Prompt Layer
8:
9: Prompt-based guidance is conversational:
10:
11: - Three dials (set in conversation).
12: - Aesthetic direction (committed verbally).
13: - Hero thesis (defined in conversation).
14: - Design rules (read from documentation).
15:
16: ## When to Use
17:
18: - Setting aesthetic direction.
19: - Defining project-specific rules.
20: - Creative decisions.
21: - One-time setup.
22:
23: ---
24:
25: # Toolchain Layer
26:
27: Toolchain enforcement is persistent:
28:
29: - Impeccable detector (45 rules).
30: - ESLint rules (automated).
31: - TypeScript checks (automated).
32: - Pre-commit hooks (automated).
33:
34: ## When to Use
35:
36: - Code quality enforcement.
37: - Anti-pattern detection.
38: - CI/CD checks.
39: - Ongoing validation.
40:
41: ---
42:
43: # The Balance
44:
45: - Use prompts for direction and creativity.
46: - Use toolchain for enforcement and consistency.
47: - Prompts set the rules; toolchain enforces them.
48: - Neither is sufficient alone.
49:
50: ---
51:
52: # Application
53:
54: 1. Use prompts to set the three dials and aesthetic direction.
55: 2. Use toolchain to enforce anti-slop rules and code quality.
56: 3. Document decisions in `docs/decisions/`.
57: 4. Update toolchain rules when project rules change.
58:
59: ---
60:
61: # Sources
62:
63: - Gogh - Prompt layer vs toolchain layer analysis.
64: - Taste Skill v2, Impeccable, Vercel web-design-guidelines.
```

## File: docs/deliverables/Design Skills Cheat Sheet.md

````markdown
1: # Design Skills Cheat Sheet
2:
3: Quick reference for daily work with design skills.
4:
5: ---
6:
7: # Three Dials
8:
9: | Dial | Default | Scale |
10: |---|---|---|
11: | Design Variance | 8 | 1-10 |
12: | Motion Intensity | 6 | 1-10 |
13: | Visual Density | 4 | 1-10 |
14:
15: ---
16:
17: # Anti-Slop Quick Check
18:
19: - No Inter for everything.
20: - No purple-to-blue gradients.
21: - No cards in cards.
22: - No uniform spacing.
23: - No em-dashes in text.
24: - No boilerplate in production.
25:
26: ---
27:
28: # Typography Quick Rules
29:
30: - Headlines: `text-wrap: balance`.
31: - Body: `text-wrap: pretty`, `max-w-[65ch]`.
32: - Numbers: `font-variant-numeric: tabular-nums`.
33: - Smoothing: `-webkit-font-smoothing: antialiased`.
34:
35: ---
36:
37: # Interaction Quick Rules
38:
39: - Hit areas: 40x40px minimum.
40: - Press: `scale(0.96)`.
41: - Shadows: three layers.
42: - Animation: ~100ms stagger, ~800ms enter.
43:
44: ---
45:
46: # Color Quick Rules
47:
48: - One accent per page.
49: - One radius scale per page.
50: - One theme per page.
51: - Tokens from globals.css.
52:
53: ---
54:
55: # Hero Quick Rules
56:
57: - Headline: 2 lines max.
58: - Subtext: 20 words max.
59: - CTA: above fold.
60: - Padding: `pt-24` max.
61: - Elements: 4 max.
62:
63: ---
64:
65: # Build Quick Flow
66:
67: 1. Set three dials.
68: 2. Pick palette.
69: 3. Define hero thesis.
70: 4. Build with direction.
71: 5. Run pre-flight.
72: 6. Revise if needed.
73:
74: ---
75:
76: # Audit Quick Commands
77:
78: `bash
79: pnpm run typecheck    # TypeScript
80: pnpm run lint         # ESLint
81: pnpm run build        # Build
82: pnpm run test         # Tests
83: pnpm run knip         # Dead code
84: `
85:
86: ---
87:
88: # Sources
89:
90: - Taste Skill v2 (Leon Lin).
91: - Impeccable (Paul Bakaus).
92: - Make Interfaces Feel Better (Jakub Krehel).
93: - Vercel web-design-guidelines.
94: - Anthropic frontend-design.
````

## File: docs/deliverables/Quickstart.md

```markdown
1: # Quickstart
2:
3: Get up and running with the design skill system.
4:
5: ---
6:
7: # For Developers
8:
9: 1. Read `docs/meta/Start Here.md`.
10: 2. Read `docs/rules/Architecture and Stack.md`.
11: 3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
12: 4. Bookmark `docs/deliverables/Design Skills Cheat Sheet.md`.
13:
14: ---
15:
16: # For AI Agents
17:
18: 1. Read `AGENTS.md`.
19: 2. Read `docs/rules/Architecture and Stack.md`.
20: 3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
21: 4. Read `docs/skills/Taste Skill Project.md`.
22: 5. Read `docs/meta/CONVENTIONS.md`.
23:
24: ---
25:
26: # Quick Reference
27:
28: ## Before Building
29:
30: - Set three dials.
31: - Pick palette.
32: - Define hero thesis.
33: - Read existing patterns.
34:
35: ## While Building
36:
37: - Check anti-slop patterns.
38: - Apply micro-interaction rules.
39: - Follow typography rules.
40: - Use design tokens.
41:
42: ## Before Shipping
43:
44: - Run pre-flight checklist.
45: - Run audit pipeline.
46: - Update documentation.
47: - Verify accessibility.
```

## File: docs/deliverables/Unified Pre-Flight Mega Checklist.md

```markdown
1: # Unified Pre-Flight Mega Checklist
2:
3: Combined checklist from all design skills. Run before every deliverable.
4:
5: ---
6:
7: # Architecture
8:
9: - [ ] Follows layered architecture (UI -> Actions -> Services -> Repositories -> DB).
10: - [ ] Business logic not in UI components.
11: - [ ] Database access not in UI components.
12: - [ ] Zod validation on all external input.
13: - [ ] No `any` types.
14: - [ ] Server Components by default.
15:
16: ---
17:
18: # TypeScript
19:
20: - [ ] `pnpm run typecheck` passes.
21: - [ ] No `any` types.
22: - [ ] Inferred types preferred.
23: - [ ] Reusable types exported.
24: - [ ] Types close to the feature.
25:
26: ---
27:
28: # ESLint
29:
30: - [ ] `pnpm run lint` passes.
31: - [ ] No disabled rules without justification.
32: - [ ] No warnings.
33:
34: ---
35:
36: # Build
37:
38: - [ ] `pnpm run build` succeeds.
39: - [ ] No build errors.
40: - [ ] No build warnings.
41:
42: ---
43:
44: # Tests
45:
46: - [ ] `pnpm run test` passes.
47: - [ ] Critical business logic tested.
48: - [ ] Component tests for interactive UI.
49:
50: ---
51:
52: # Dead Code
53:
54: - [ ] `pnpm run knip` passes.
55: - [ ] No unused files.
56: - [ ] No unused exports.
57: - [ ] No unused dependencies.
58:
59: ---
60:
61: # Design: Color
62:
63: - [ ] One accent color per page.
64: - [ ] No purple-to-blue gradients.
65: - [ ] No banned palettes.
66: - [ ] Design tokens from globals.css.
67: - [ ] No hardcoded colors.
68:
69: ---
70:
71: # Design: Typography
72:
73: - [ ] `text-wrap: balance` on headlines.
74: - [ ] `text-wrap: pretty` on body text.
75: - [ ] Body: `max-w-[65ch]`.
76: - [ ] Font smoothing enabled.
77: - [ ] Tabular nums for numbers.
78: - [ ] No em-dashes or en-dashes.
79:
80: ---
81:
82: # Design: Hero
83:
84: - [ ] Headline: max 2 lines.
85: - [ ] Subtext: max 20 words.
86: - [ ] CTA above fold.
87: - [ ] Top padding: max `pt-24`.
88: - [ ] Max 4 text elements.
89:
90: ---
91:
92: # Design: Layout
93:
94: - [ ] 4+ layout families in 8-section pages.
95: - [ ] No cards in cards.
96: - [ ] Grid broken intentionally.
97: - [ ] Spacing deliberate.
98:
99: ---
100:
101: # Design: Interactions
102:
103: - [ ] 40x40px hit areas.
104: - [ ] `scale(0.96)` press feedback.
105: - [ ] Three-layer shadows.
106: - [ ] Shadows over borders.
107: - [ ] `prefers-reduced-motion` honored.
108: - [ ] Icon animations with stagger.
109:
110: ---
111:
112: # Accessibility
113:
114: - [ ] Focus rings visible.
115: - [ ] ARIA labels on icon buttons.
116: - [ ] Semantic HTML.
117: - [ ] WCAG AA contrast.
118: - [ ] Keyboard navigation works.
119:
120: ---
121:
122: # Performance
123:
124: - [ ] Server Components used.
125: - [ ] Lazy loading for below-fold.
126: - [ ] Minimal client JS.
127: - [ ] Images optimized with next/image.
128: - [ ] Bundle size acceptable.
129:
130: ---
131:
132: # Documentation
133:
134: - [ ] Relevant docs updated.
135: - [ ] Architecture decisions documented.
136: - [ ] Component inventory updated.
137:
138: ---
139:
140: # Anti-Slop
141:
142: - [ ] No Inter for everything.
143: - [ ] No purple gradients.
144: - [ ] No cards in cards.
145: - [ ] No uniform spacing.
146: - [ ] No generic AI layouts.
147: - [ ] No boilerplate left in production.
```

## File: docs/Development/Git.md

````markdown
1: # Git Workflow
2:
3: This document defines the Git workflow used throughout the project.
4:
5: ---
6:
7: # Branch Strategy
8:
9: Main branches
10:
11: - main
12: - develop
13:
14: Feature branches
15:
16: ` 17: feature/authentication
 18: 
 19: feature/dashboard
 20: 
 21: feature/profile
 22:`
23:
24: Bug fixes
25:
26: ` 27: fix/login-error
 28:`
29:
30: Hotfixes
31:
32: ` 33: hotfix/security-patch
 34:`
35:
36: Documentation
37:
38: ` 39: docs/readme-update
 40:`
41:
42: ---
43:
44: # Commit Convention
45:
46: Format
47:
48: ` 49: type(scope): description
 50:`
51:
52: Examples
53:
54: ` 55: feat(auth): add login page
 56: 
 57: fix(api): handle invalid token
 58: 
 59: docs(readme): improve setup guide
 60: 
 61: refactor(user): simplify service
 62: 
 63: test(auth): add login tests
 64: 
 65: chore(deps): update dependencies
 66:`
67:
68: ---
69:
70: # Commit Types
71:
72: - feat
73: - fix
74: - docs
75: - refactor
76: - style
77: - test
78: - chore
79: - ci
80: - build
81: - perf
82:
83: ---
84:
85: # Pull Requests
86:
87: Every Pull Request should:
88:
89: - Pass lint
90: - Pass tests
91: - Build successfully
92: - Include documentation updates if needed
93:
94: ---
95:
96: # Git Hooks
97:
98: The project uses:
99:
100: - Husky
101: - lint-staged
102:
103: Checks include:
104:
105: - ESLint
106: - TypeScript
107: - Formatting
108: - Tests (future)
109:
110: ---
111:
112: # Protected Branches
113:
114: The `main` branch should never receive direct commits.
115:
116: Changes should be merged through Pull Requests.
117:
118: ---
119:
120: # Best Practices
121:
122: - Keep commits focused.
123: - Avoid large commits.
124: - Write meaningful commit messages.
125: - Rebase when appropriate.
126: - Delete merged branches.
127:
128: ---
````

## File: docs/flows/Audit Pipeline Flow.md

````markdown
1: # Audit Pipeline Flow
2:
3: Workflow for running quality audits on the project.
4:
5: ---
6:
7: # Pipeline Steps
8:
9: ## 1. TypeScript Check
10:
11: `bash
12: pnpm run typecheck
13: `
14:
15: Verify: no errors, no warnings.
16:
17: ## 2. ESLint Check
18:
19: `bash
20: pnpm run lint
21: `
22:
23: Verify: no errors, no warnings.
24:
25: ## 3. Build Check
26:
27: `bash
28: pnpm run build
29: `
30:
31: Verify: successful production build.
32:
33: ## 4. Test Check
34:
35: `bash
36: pnpm run test
37: `
38:
39: Verify: all tests pass.
40:
41: ## 5. Dead Code Check
42:
43: `bash
44: pnpm run knip
45: `
46:
47: Verify: no unused files, exports, or dependencies.
48:
49: ## 6. Design Audit
50:
51: - Run Section 14 pre-flight.
52: - Check against anti-slop patterns.
53: - Verify typography rules.
54: - Verify color rules.
55:
56: ## 7. Accessibility Audit
57:
58: - Check focus management.
59: - Check ARIA attributes.
60: - Check color contrast.
61: - Check keyboard navigation.
62:
63: ## 8. Performance Audit
64:
65: - Check bundle size.
66: - Check Server Component usage.
67: - Check lazy loading.
68: - Check image optimization.
69:
70: ---
71:
72: # Audit Results
73:
74: Document findings in the relevant documentation:
75:
76: - Architecture issues: `docs/rules/Architecture and Stack.md`.
77: - Design issues: `docs/rules/AI Tells (Forbidden Patterns).md`.
78: - Accessibility issues: `docs/rules/Vercel Interface Rule Categories.md`.
79:
80: ---
81:
82: # Documentation Rules
83:
84: Every significant change should update the relevant documentation.
85:
86: Architecture decisions should be documented before implementation whenever possible.
87:
88: Documentation should always reflect the current state of the project.
````

## File: docs/flows/Build Greenfield (Prompt 1).md

````markdown
1: # Build Greenfield (Prompt 1)
2:
3: Workflow for building new components and features from scratch.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Set the Three Dials
10:
11: Before writing any code, commit to:
12:
13: - Design Variance (1-10, default 8).
14: - Motion Intensity (1-10, default 6).
15: - Visual Density (1-10, default 4).
16:
17: ## 2. Define the Direction
18:
19: - Pick a 4-6 value named hex palette.
20: - Define the hero thesis (one sentence).
21: - Identify the primary CTA.
22: - Choose one justified aesthetic risk.
23:
24: ## 3. Read Existing Patterns
25:
26: - Check `components/ui/` for existing primitives.
27: - Check `docs/rules/` for applicable rules.
28: - Check `docs/skills/` for design skill references.
29:
30: ## 4. Build the Component
31:
32: - Start with Server Components.
33: - Use shadcn/ui primitives where possible.
34: - Apply Tailwind utilities consistently.
35: - Use `cn()` for conditional classes.
36: - Follow the layered architecture.
37:
38: ## 5. Apply Design Rules
39:
40: - Check against `docs/rules/AI Tells (Forbidden Patterns).md`.
41: - Apply micro-interaction rules from `docs/skills/Make Interfaces Feel Better.md`.
42: - Ensure typography follows `docs/rules/Anthropic Frontend Design Rules.md`.
43:
44: ## 6. Run Pre-Flight
45:
46: - Complete the Section 14 checklist.
47: - Verify all checks pass.
48: - If any check fails, revise and re-check.
49:
50: ## 7. Document
51:
52: - Update relevant documentation.
53: - Add to component inventory if new.
54: - Document any design decisions.
55:
56: ---
57:
58: # Architecture Flow
59:
60: `61: Page (Server Component)
62: ↓
63: Layout Component
64: ↓
65: Feature Component
66: ↓
67: Shared Component
68: ↓
69: UI Primitive (shadcn/ui)
70:`
71:
72: ---
73:
74: # Documentation Rules
75:
76: Every significant change should update the relevant documentation.
77:
78: Architecture decisions should be documented before implementation whenever possible.
79:
80: Documentation should always reflect the current state of the project.
````

## File: docs/flows/Full Stack Build Flow.md

````markdown
1: # Full Stack Build Flow
2:
3: Workflow for building full-stack features with React 19, Server Actions, and Prisma.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Define the Feature
10:
11: - What does the user need?
12: - What data is required?
13: - What interactions are needed?
14:
15: ## 2. Design the Data Model
16:
17: - Add Prisma schema changes.
18: - Run `pnpm prisma migrate dev`.
19: - Update `lib/db.ts` if needed.
20:
21: ## 3. Create the Repository
22:
23: - File: `lib/repositories/[feature].ts`.
24: - CRUD operations only.
25: - No business logic.
26: - Use Prisma Client.
27:
28: ## 4. Create the Service
29:
30: - File: `lib/services/[feature].ts`.
31: - Business rules and workflows.
32: - Coordinate between repositories.
33: - Validate with Zod.
34:
35: ## 5. Create the Server Action
36:
37: - File: `app/[route]/actions.ts`.
38: - Input validation with Zod.
39: - Authentication check.
40: - Call service layer.
41: - Return typed response.
42:
43: ## 6. Create the UI
44:
45: - Server Component by default.
46: - Client Component only when required.
47: - Use shadcn/ui primitives.
48: - Apply design rules.
49:
50: ## 7. Wire It Together
51:
52: `53: UI Component
54: ↓
55: Server Action
56: ↓
57: Service
58: ↓
59: Repository
60: ↓
61: Prisma
62: ↓
63: PostgreSQL (Neon)
64:`
65:
66: ## 8. Test
67:
68: - Unit tests for service logic.
69: - Integration tests for actions.
70: - Component tests for UI.
71:
72: ## 9. Document
73:
74: - Update API documentation.
75: - Update component inventory.
76: - Document design decisions.
77:
78: ---
79:
80: # Documentation Rules
81:
82: Every significant change should update the relevant documentation.
83:
84: Architecture decisions should be documented before implementation whenever possible.
85:
86: Documentation should always reflect the current state of the project.
````

## File: docs/flows/Install and Load.md

````markdown
1: # Install and Load
2:
3: How to install and load design skills in the project.
4:
5: ---
6:
7: # Skill Installation
8:
9: ## Taste Skill
10:
11: `bash
12: npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
13: `
14:
15: ## Impeccable
16:
17: `bash
18: npx impeccable install
19: `
20:
21: Then in your AI coding tool:
22:
23: `24: /impeccable init
25:`
26:
27: ## Vercel Web Design Guidelines
28:
29: `bash
30: npx skills add vercel-labs/agent-skills --skill web-design-guidelines
31: `
32:
33: ## UI/UX Pro Max
34:
35: `bash
36: npm install -g ui-ux-pro-max-cli
37: uipro init --ai cursor
38: `
39:
40: ---
41:
42: # Loading Skills
43:
44: Skills are loaded in this order:
45:
46: 1. `AGENTS.md` (project-level instructions).
47: 2. `docs/rules/` (architecture and design rules).
48: 3. `docs/skills/` (design skill references).
49: 4. `docs/flows/` (workflows).
50: 5. `docs/audits/` (quality checks).
51:
52: ---
53:
54: # Skill Conflict Resolution
55:
56: When skills conflict:
57:
58: 1. Project rules in `docs/rules/` take precedence.
59: 2. Vercel guidelines for accessibility and performance.
60: 3. Taste Skill for aesthetic direction.
61: 4. Impeccable for anti-pattern detection.
62: 5. MIFB for micro-interactions.
63:
64: ---
65:
66: # Verification
67:
68: After installing skills:
69:
70: 1. Run the audit pipeline.
71: 2. Verify no new conflicts.
72: 3. Update documentation if rules change.
````

## File: docs/flows/Redesign First-Audit (Prompt 2).md

```markdown
1: # Redesign First-Audit (Prompt 2)
2:
3: Workflow for redesigning existing interfaces after auditing them.
4:
5: ---
6:
7: # Steps
8:
9: ## 1. Audit the Existing Interface
10:
11: Before changing anything, evaluate:
12:
13: - Run Section 14 pre-flight on the existing page.
14: - Identify all failed checks.
15: - Document what works and what does not.
16: - Check against `docs/rules/AI Tells (Forbidden Patterns).md`.
17:
18: ## 2. Classify the Redesign
19:
20: Choose one mode:
21:
22: ### Preserve Mode
23:
24: - Keep the existing structure.
25: - Fix specific violations.
26: - Improve micro-interactions.
27: - Update typography and spacing.
28:
29: ### Overhaul Mode
30:
31: - Redesign from scratch.
32: - Keep brand identity and URLs.
33: - Set new three dials.
34: - Apply new design direction.
35:
36: ## 3. Never Change Silently
37:
38: - Document every change.
39: - Explain why each change was made.
40: - Preserve existing URLs and routes.
41: - Preserve brand identity unless explicitly told to change.
42:
43: ## 4. Set the Three Dials
44:
45: For the new direction:
46:
47: - Design Variance.
48: - Motion Intensity.
49: - Visual Density.
50:
51: ## 5. Build the Redesign
52:
53: - Follow the Greenfield workflow for new elements.
54: - Respect preserved elements.
55: - Apply all design rules.
56:
57: ## 6. Run Pre-Flight
58:
59: - Complete Section 14 checklist.
60: - Verify all checks pass.
61: - If any check fails, revise and re-check.
62:
63: ## 7. Document Changes
64:
65: - Update all affected documentation.
66: - Record the redesign decision.
67: - Update the component inventory.
68:
69: ---
70:
71: # Documentation Rules
72:
73: Every significant change should update the relevant documentation.
74:
75: Architecture decisions should be documented before implementation whenever possible.
76:
77: Documentation should always reflect the current state of the project.
```

## File: docs/meta/CONVENTIONS.md

````markdown
1: # Conventions
2:
3: Coding and naming conventions followed throughout the project.
4:
5: ---
6:
7: # File Naming
8:
9: Components: `PascalCase.tsx`
10:
11: Hooks: `useSomething.ts`
12:
13: Utilities: `camelCase.ts`
14:
15: Constants: `UPPER_SNAKE_CASE.ts`
16:
17: Types: `types.ts`
18:
19: Actions: `action.ts` or `actions.ts`
20:
21: Services: `service.ts` or `services.ts`
22:
23: Repositories: `repository.ts` or `repositories.ts`
24:
25: ---
26:
27: # Component Naming
28:
29: - PascalCase for component files and exports.
30: - One component per file.
31: - Named exports preferred over default exports.
32: - Co-locate related types in the same file or `types.ts`.
33:
34: ---
35:
36: # Import Conventions
37:
38: Always use path aliases:
39:
40: `ts
 41: import { Button } from "@/components/ui/button";
 42: import { cn } from "@/lib/utils";
 43: import { prisma } from "@/lib/db";
 44: `
45:
46: Never use relative paths that traverse multiple directories:
47:
48: `ts
 49: // Avoid
 50: import Button from "../../../../components/ui/button";
 51: `
52:
53: ---
54:
55: # Tailwind Conventions
56:
57: - Use the `cn()` utility for conditional classes.
58: - Never hardcode color values. Use design tokens.
59: - Avoid arbitrary values unless justified.
60: - Prefer Tailwind utilities over custom CSS.
61: - Use `@apply` sparingly and only for repeated patterns.
62:
63: ---
64:
65: # TypeScript Conventions
66:
67: - Never use `any`.
68: - Prefer inferred types.
69: - Export reusable types.
70: - Keep types close to the feature.
71: - Use Zod for runtime validation.
72:
73: ---
74:
75: # Server vs Client Components
76:
77: Server Components (default):
78:
79: - Data fetching.
80: - Database access.
81: - Static content.
82: - SEO-critical pages.
83:
84: Client Components (when required):
85:
86: - State management.
87: - Browser APIs.
88: - Event handlers.
89: - Interactive UI.
90:
91: ---
92:
93: # Documentation Tags
94:
95: Use these tags when updating documentation:
96:
97: - `feat` - New feature documentation.
98: - `fix` - Bug fix documentation.
99: - `docs` - Documentation-only changes.
100: - `refactor` - Architecture or convention changes.
101: - `perf` - Performance-related documentation.
102: - `test` - Testing documentation.
````

## File: docs/meta/Dashboard.md

```markdown
1: # Dashboard
2:
3: Project documentation status and overview.
4:
5: ---
6:
7: # Project Status
8:
9: - Stage: Foundation
10: - Framework: Next.js 16
11: - UI: shadcn/ui + Tailwind CSS v4
12: - Database: PostgreSQL (Neon) via Prisma
13: - Status: Pre-production
14:
15: ---
16:
17: # Documentation Completeness
18:
19: | Folder | Files | Status |
20: |---|---|---|
21: | rules/ | 8 files | Complete |
22: | meta/ | 3 files | Complete |
23: | skills/ | 4 files | Complete |
24: | flows/ | 5 files | Complete |
25: | audits/ | 6 files | Complete |
26: | deliverables/ | 3 files | Complete |
27: | concepts/ | 6 files | Complete |
28: | decisions/ | 4 files | Complete |
29: | reference/ | Placeholder | Pending population |
30: | ADR/ | Empty | Pending first decision |
31: | API/ | 1 file | Database documented |
32: | Development/ | 1 file | Git workflow documented |
33:
34: ---
35:
36: # Tech Stack Health
37:
38: | Technology | Version | Status |
39: |---|---|---|
40: | Next.js | 16.2.10 | Active |
41: | React | 19.2.4 | Active |
42: | TypeScript | 5.9.3 | Active |
43: | Tailwind CSS | v4 | Active |
44: | Prisma | 7.8.0 | Active |
45: | shadcn/ui | base-nova | Active |
46: | Jest | 30.4.2 | Configured |
47: | ESLint | 9.x | Active |
48: | Prettier | 3.9.x | Active |
49: | Husky | Active | Pre-commit hooks |
50:
51: ---
52:
53: # Recent Documentation Changes
54:
55: - Created docs/rules/ - Architecture, design rules, anti-slop patterns.
56: - Created docs/meta/ - Start here, conventions, taxonomy.
57: - Created docs/skills/ - Vercel, Impeccable, MIFB, Taste Skill.
58: - Created docs/flows/ - Build and redesign workflows.
59: - Created docs/audits/ - Pre-flight checks and quality audits.
60: - Created docs/deliverables/ - Checklists and cheat sheets.
61: - Created docs/concepts/ - Design theory and micro-details.
62: - Created docs/decisions/ - Architecture decision records.
```

## File: docs/meta/Start Here.md

````markdown
1: # Start Here
2:
3: Quick start guide for developers and AI agents working on this project.
4:
5: ---
6:
7: # Environment Setup
8:
9: 1. Clone the repository.
10: 2. Install dependencies: `pnpm install`.
11: 3. Copy `.env.example` to `.env` and fill in environment variables.
12: 4. Run `pnpm run dev` to start the development server.
13: 5. Run `pnpm run prepare` to set up Husky git hooks.
14:
15: ---
16:
17: # Development Commands
18:
19: `bash
 20: pnpm run dev          # Start development server
 21: pnpm run build        # Production build
 22: pnpm run start        # Start production server
 23: pnpm run lint         # Run ESLint
 24: pnpm run test         # Run Jest tests
 25: pnpm run format       # Run Prettier
 26: `
27:
28: ---
29:
30: # Prisma Commands
31:
32: `bash
 33: pnpm prisma migrate dev     # Create and apply migration
 34: pnpm prisma generate        # Generate Prisma Client
 35: pnpm prisma studio          # Open Prisma Studio
 36: pnpm prisma db push         # Push schema changes (dev only)
 37: `
38:
39: ---
40:
41: # Husky Git Hooks
42:
43: Pre-commit hooks run automatically:
44:
45: - ESLint on staged files.
46: - TypeScript type checking.
47: - Prettier formatting.
48: - lint-staged for targeted checks.
49:
50: ---
51:
52: # Project Structure
53:
54: ` 55: nextjs/
 56: ├── app/                  # Next.js App Router pages
 57: ├── components/           # React components
 58: │   └── ui/               # shadcn/ui components
 59: ├── docs/                 # Documentation hub
 60: ├── lib/                  # Utilities and shared code
 61: │   ├── db.ts             # Prisma client singleton
 62: │   └── utils.ts          # cn() and other utilities
 63: ├── prisma/               # Database schema and migrations
 64: ├── public/               # Static assets
 65: ├── env.ts                # Environment variable validation
 66: └── package.json          # Dependencies and scripts
 67:`
68:
69: ---
70:
71: # Documentation Structure
72:
73: ` 74: docs/
 75: ├── rules/          # Architecture and design rules (Priority 1)
 76: ├── meta/           # Project metadata and conventions (Priority 1)
 77: ├── skills/         # Design skill references (Priority 1)
 78: ├── flows/          # Build and audit workflows (Priority 2)
 79: ├── audits/         # Quality checks and pre-flight (Priority 2)
 80: ├── deliverables/   # Checklists and cheat sheets (Priority 2)
 81: ├── concepts/       # Design theory and micro-details (Priority 3)
 82: ├── decisions/      # Architecture decisions (Priority 3)
 83: └── reference/      # Research and source tracking (Priority 4)
 84:`
85:
86: ---
87:
88: # First Steps for AI Agents
89:
90: 1. Read this file.
91: 2. Read `docs/rules/Architecture and Stack.md`.
92: 3. Read `docs/rules/AI Tells (Forbidden Patterns).md`.
93: 4. Read `docs/skills/Taste Skill Project.md`.
94: 5. Read `docs/meta/CONVENTIONS.md`.
95:
96: ---
97:
98: # Documentation Rules
99:
100: Every significant change should update the relevant documentation.
101:
102: Architecture decisions should be documented before implementation whenever possible.
103:
104: Documentation should always reflect the current state of the project.
````

## File: docs/meta/Tag Taxonomy.md

```markdown
1: # Tag Taxonomy
2:
3: Documentation tag system for categorizing and finding documentation.
4:
5: ---
6:
7: # Priority Tags
8:
9: - `P1` - Priority 1: Rules and Architecture (highest importance).
10: - `P2` - Priority 2: Workflows and Quality Audits (very high importance).
11: - `P3` - Priority 3: Concepts and Micro-details (medium importance).
12: - `P4` - Priority 4: References and Research (low/reference importance).
13:
14: ---
15:
16: # Category Tags
17:
18: - `architecture` - Architecture decisions and patterns.
19: - `design` - UI/UX design rules and guidelines.
20: - `quality` - Code quality and testing standards.
21: - `workflow` - Development workflows and processes.
22: - `security` - Security rules and practices.
23: - `performance` - Performance optimization rules.
24: - `accessibility` - Accessibility standards and guidelines.
25:
26: ---
27:
28: # Technology Tags
29:
30: - `nextjs` - Next.js specific rules.
31: - `react` - React specific rules.
32: - `typescript` - TypeScript specific rules.
33: - `tailwind` - Tailwind CSS specific rules.
34: - `prisma` - Prisma ORM specific rules.
35: - `shadcn` - shadcn/ui specific rules.
36: - `zod` - Zod validation specific rules.
37:
38: ---
39:
40: # Skill Tags
41:
42: - `taste-skill` - Taste Skill framework rules.
43: - `impeccable` - Impeccable toolchain rules.
44: - `mifb` - Make Interfaces Feel Better rules.
45: - `vercel-guidelines` - Vercel web design guidelines.
46: - `anthropic` - Anthropic frontend design rules.
47:
48: ---
49:
50: # Status Tags
51:
52: - `active` - Currently in use and enforced.
53: - `draft` - Under development, not yet enforced.
54: - `deprecated` - No longer recommended.
55: - `reference` - For reference only, not enforced.
```

## File: docs/reference/Entities.md

```markdown
1: # Entities
2:
3: Documentation of foundational tools and frameworks used in this project.
4:
5: ---
6:
7: # Next.js
8:
9: - Version: 16.2.10
10: - Role: React framework for server rendering, routing, and API.
11: - Repository: vercel/next.js.
12: - License: MIT.
13:
14: ---
15:
16: # React
17:
18: - Version: 19.2.4
19: - Role: UI library.
20: - Repository: facebook/react.
21: - License: MIT.
22:
23: ---
24:
25: # Tailwind CSS
26:
27: - Version: v4
28: - Role: Utility-first CSS framework.
29: - Repository: tailwindlabs/tailwindcss.
30: - License: MIT.
31:
32: ---
33:
34: # shadcn/ui
35:
36: - Style: base-nova
37: - Role: Reusable UI components.
38: - Repository: shadcn-ui/ui.
39: - License: MIT.
40:
41: ---
42:
43: # Prisma
44:
45: - Version: 7.8.0
46: - Role: TypeScript ORM for PostgreSQL.
47: - Repository: prisma/prisma.
48: - License: Apache-2.0.
49:
50: ---
51:
52: # Zod
53:
54: - Version: 4.4.3
55: - Role: Runtime validation.
56: - Repository: colinhacks/zod.
57: - License: MIT.
58:
59: ---
60:
61: # React Hook Form
62:
63: - Version: 7.81.0
64: - Role: Form management.
65: - Repository: react-hook-form/react-hook-form.
66: - License: MIT.
67:
68: ---
69:
70: # Jest
71:
72: - Version: 30.4.2
73: - Role: Unit testing.
74: - Repository: jestjs/jest.
75: - License: MIT.
76:
77: ---
78:
79: # ESLint
80:
81: - Version: 9.x
82: - Role: Static analysis.
83: - Repository: eslint/eslint.
84: - License: MIT.
85:
86: ---
87:
88: # Prettier
89:
90: - Version: 3.9.x
91: - Role: Code formatting.
92: - Repository: prettier/prettier.
93: - License: MIT.
```

## File: docs/reference/Gaps.md

```markdown
1: # Gaps
2:
3: Identified gaps and areas for future improvement.
4:
5: ---
6:
7: # Documentation Gaps
8:
9: - ADR/ folder is empty. First architecture decision record needed.
10: - Features/ folder is empty. Feature documentation needed as features are built.
11: - No testing documentation beyond basic setup.
12:
13: ---
14:
15: # Toolchain Gaps
16:
17: - Impeccable not installed yet.
18: - Taste Skill not installed yet.
19: - No automated design audit in CI/CD.
20: - No visual regression testing.
21:
22: ---
23:
24: # Knowledge Gaps
25:
26: - Token cost measurement not implemented.
27: - Performance baseline not established.
28: - Accessibility audit not run.
29:
30: ---
31:
32: # Process Gaps
33:
34: - No formal release process documented.
35: - No deployment pipeline documented.
36: - No monitoring setup documented.
37:
38: ---
39:
40: # Future Work
41:
42: - Install and configure Impeccable.
43: - Install and configure Taste Skill.
44: - Set up visual regression testing.
45: - Establish performance baseline.
46: - Run full accessibility audit.
47: - Document deployment pipeline.
```

## File: docs/reference/Questions.md

```markdown
1: # Questions
2:
3: Frequently asked questions about the design skill system.
4:
5: ---
6:
7: # General
8:
9: ## What is the design skill system?
10:
11: A collection of rules, workflows, and tools for building high-quality, intentional UI with AI coding agents.
12:
13: ## Why not just use one skill?
14:
15: Each skill covers different aspects:
16:
17: - Taste Skill: Aesthetic direction.
18: - Impeccable: Anti-pattern detection.
19: - MIFB: Micro-interactions.
20: - Vercel: Accessibility and performance.
21: - Anthropic: Taste prompting baseline.
22:
23: Using all six provides comprehensive coverage.
24:
25: ## How do I get started?
26:
27: Read `docs/meta/Start Here.md` and `docs/deliverables/Quickstart.md`.
28:
29: ---
30:
31: # Technical
32:
33: ## What are the three dials?
34:
35: Design Variance, Motion Intensity, and Visual Density. They set the aesthetic direction before building.
36:
37: ## What is Section 14?
38:
39: The mandatory pre-flight checklist from Taste Skill. Every box must pass before shipping.
40:
41: ## What is the em-dash ban?
42:
43: A rule from Taste Skill that bans em-dashes and en-dashes in visible text. Use hyphens instead.
44:
45: ---
46:
47: # Process
48:
49: ## When do I run the pre-flight?
50:
51: Before every deliverable. It is mandatory.
52:
53: ## What if skills conflict?
54:
55: Follow the resolution order in `docs/decisions/Enforcement Layer Overlap.md`.
56:
57: ## How do I document decisions?
58:
59: Create a new file in `docs/decisions/` following the existing format.
```

## File: docs/reference/Source Ledger.md

```markdown
1: # Source Ledger
2:
3: Evidence-gated source tracking for design rules and claims.
4:
5: ---
6:
7: # Schema
8:
9: Every source entry includes:
10:
11: - `id`: Unique identifier.
12: - `title`: Source title.
13: - `url`: Source URL.
14: - `source_type`: primary, official, supporting, market, practitioner.
15: - `retrieved`: Date retrieved.
16: - `refresh_due`: Date for refresh check.
17: - `confidence`: high, medium, low.
18: - `claims`: Array of verified claims.
19:
20: ---
21:
22: # Source Types
23:
24: - `official` - Vendor documentation, official sites.
25: - `primary` - Repository source, canonical skill files.
26: - `supporting` - Articles, reviews, blog posts.
27: - `market` - Market snapshots, comparison articles.
28: - `practitioner` - Independent practitioner work.
29:
30: ---
31:
32: # Current Sources
33:
34: ## Taste Skill v2
35:
36: - Source: Leonxlnx/taste-skill (MIT).
37: - URL: https://github.com/Leonxlnx/taste-skill.
38: - Claims: Three dials, Section 14, anti-slop rules, em-dash ban.
39: - Confidence: high.
40:
41: ## Impeccable
42:
43: - Source: pbakaus/impeccable (Apache-2.0).
44: - URL: https://github.com/pbakaus/impeccable.
45: - Claims: 45-rule detector, 23 commands, named anti-slop tells.
46: - Confidence: high.
47:
48: ## Make Interfaces Feel Better
49:
50: - Source: jakubkrehel/make-interfaces-feel-better.
51: - URL: https://github.com/jakubkrehel/make-interfaces-feel-better.
52: - Claims: 16 rule categories, concentric radius, press states, shadow layers.
53: - Confidence: high.
54:
55: ## Vercel Web Design Guidelines
56:
57: - Source: vercel-labs/web-interface-guidelines (MIT).
58: - URL: https://github.com/vercel-labs/web-interface-guidelines.
59: - Claims: 90-110 rules across 16+ categories.
60: - Confidence: high.
61:
62: ## Anthropic Frontend Design
63:
64: - Source: anthropics/skills (Apache-2.0).
65: - URL: https://github.com/anthropics/skills.
66: - Claims: Taste prompting, aesthetic direction, two-pass build-critique.
67: - Confidence: high.
68:
69: ## UI/UX Pro Max
70:
71: - Source: nextlevelbuilder/ui-ux-pro-max-skill (MIT).
72: - URL: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.
73: - Claims: 67 styles, 161 palettes, 57 font pairs, 99 UX guidelines.
74: - Confidence: high.
75:
76: ---
77:
78: # Refresh Cadence
79:
80: - On-changelog for skill repos.
81: - Monthly for rule captures.
82: - Quarterly for ecosystem coverage.
83:
84: ---
85:
86: # Sources
87:
88: - Gogh source-ledger.json (brainstein/source-ledger@2).
```

## File: docs/rules/AI Tells (Forbidden Patterns).md

```markdown
1: # AI Tells (Forbidden Patterns)
2:
3: This document lists UI patterns that signal generic AI-generated output.
4:
5: These patterns are banned. If you see them, flag and remove immediately.
6:
7: ---
8:
9: # Color Tells
10:
11: - Purple-to-blue gradient backgrounds as a default.
12: - Near-black with acid-green or vermilion accents.
13: - Warm cream (#F4F1EA) with serif display and terracotta accent.
14: - Default Tailwind color palette used without customization.
15: - Multiple accent colors on a single page.
16: - Random gradient overlays without design justification.
17:
18: ---
19:
20: # Layout Tells
21:
22: - Cards nested inside cards.
23: - Uniform equal spacing everywhere.
24: - Perfectly centered hero with no asymmetric element.
25: - Every section using the same layout family.
26: - Bento grids with mismatched cell counts.
27: - Generic "Welcome to Next.js" boilerplate left in production.
28: - Sections that all look like stacked cards.
29:
30: ---
31:
32: # Typography Tells
33:
34: - Inter used for every project without justification.
35: - Em-dash (U+2014) or en-dash (U+2013) in visible text.
36: - No `text-wrap: balance` on headlines.
37: - No `text-wrap: pretty` on body text.
38: - Body text exceeding 65ch line length.
39: - Inconsistent type scale across sections.
40:
41: ---
42:
43: # Interaction Tells
44:
45: - No animation or transition on any interactive element.
46: - No visible press states on buttons.
47: - Hit areas smaller than 40x40px.
48: - Borders used instead of shadows for visual separation.
49: - Single-layer box-shadow instead of three-layer composition.
50: - No `prefers-reduced-motion` support.
51:
52: ---
53:
54: # Component Tells
55:
56: - Huge monolithic components.
57: - Business logic mixed into UI components.
58: - Database queries inside components.
59: - Inline styles instead of Tailwind.
60: - Disabled ESLint or TypeScript rules.
61: - Unused imports or dead code.
62:
63: ---
64:
65: # Content Tells
66:
67: - Generic placeholder text left in production.
68: - "Lorem ipsum" or "Your content here."
69: - Overly verbose hero sections.
70: - CTAs hidden below the fold.
71: - Navigation with more than 7 items.
72:
73: ---
74:
75: # How to Use
76:
77: Before shipping any UI, scan against this list.
78:
79: If any tell is found:
80:
81: 1. Identify the root cause.
82: 2. Apply the fix from `docs/Design Rules.md`.
83: 3. Document the decision if it conflicts with an existing pattern.
84:
85: ---
86:
87: # Sources
88:
89: Adapted from:
90:
91: - Taste Skill v2 (Leon Lin) - Anti-slop ruleset.
92: - Impeccable (Paul Bakaus) - 45-rule detector, named anti-slop tells.
93: - Anthropic frontend-design - Distributional convergence research.
94: - Vercel web-design-guidelines - Audit layer findings.
```

## File: docs/rules/Anthropic Frontend Design Rules.md

```markdown
1: # Anthropic Frontend Design Rules
2:
3: Standards from Anthropic's frontend-design skill for building distinctive, high-quality web interfaces.
4:
5: ---
6:
7: # Core Principle
8:
9: The more aesthetic improvements map to implementable frontend code, the better the output.
10:
11: Design taste is articulable logic, not vibes.
12:
13: ---
14:
15: # Aesthetic Direction
16:
17: Before building, commit to a direction:
18:
19: - Pick a 4-6 value named hex palette.
20: - Choose one justified aesthetic risk.
21: - Define a hero thesis (one sentence that captures the page intent).
22: - Avoid default palettes: warm cream + serif + terracotta, near-black + acid-green, broadsheet hairline-rule layouts.
23:
24: ---
25:
26: # Process
27:
28: Two-pass build-critique:
29:
30: 1. Build the interface with committed direction.
31: 2. Critique against the design rules. Revise.
32:
33: Never ship on the first pass.
34:
35: ---
36:
37: # Typography
38:
39: - Use `text-wrap: balance` on headlines.
40: - Use `text-wrap: pretty` on body text.
41: - Line length: 45-90 characters (max-w-[65ch]).
42: - Enable font smoothing: `-webkit-font-smoothing: antialiased`.
43: - Use `font-variant-numeric: tabular-nums` for numeric data.
44:
45: ---
46:
47: # Restraint and Self-Critique
48:
49: - Every element must earn its place.
50: - If an element does not serve the hero thesis, remove it.
51: - Default to more whitespace than feels necessary.
52: - Add density deliberately, not by default.
53: - Use fewer borders. Prefer shadows, color contrast, and spacing.
54:
55: ---
56:
57: # Writing in Design
58:
59: - Headlines: max 2 lines.
60: - Subtext: max 20 words.
61: - CTA visible without scrolling.
62: - No em-dashes or en-dashes in visible text.
63: - Body text should feel conversational, not corporate.
64:
65: ---
66:
67: # Anti-Patterns
68:
69: - Inter for everything without justification.
70: - Purple-to-blue gradients as default.
71: - Cards nested in cards.
72: - Uniform equal spacing everywhere.
73: - Generic AI-generated layouts.
74:
75: ---
76:
77: # Sources
78:
79: - Anthropic frontend-design skill (Apache-2.0).
80: - Anthropic blog: "Improving frontend design through Skills" (2025-11-12).
81: - anthropics/skills repository.
```

## File: docs/rules/Architecture and Stack.md

````markdown
1: # Architecture and Stack
2:
3: This document defines the structural architectural rules for the Next.js App Router project.
4:
5: ---
6:
7: # Architecture Layers
8:
9: ` 10: UI (Server Components)
 11: ↓
 12: 
 13: Actions / Routes
 14: ↓
 15: 
 16: Services
 17: 
 18: ↓
 19: 
 20: Repositories
 21: 
 22: ↓
 23: 
 24: Database (Prisma + Neon PostgreSQL)
 25:`
26:
27: ---
28:
29: # Layer Responsibilities
30:
31: ## UI Layer
32:
33: - Renders the interface.
34: - Handles user interactions.
35: - Displays application state.
36: - Must never contain business logic.
37: - Must never access the database directly.
38:
39: ## Actions / Routes
40:
41: - Receives requests.
42: - Handles authentication and authorization.
43: - Validates input with Zod.
44: - Calls services.
45: - Returns responses.
46:
47: ## Service Layer
48:
49: - Contains all business rules.
50: - Orchestrates workflows.
51: - Coordinates between repositories.
52: - Remains independent from UI.
53:
54: ## Repository Layer
55:
56: - Handles database queries.
57: - Performs CRUD operations.
58: - Manages data persistence.
59: - The only layer allowed to call Prisma directly.
60:
61: ## Database Layer
62:
63: - Prisma models and migrations.
64: - PostgreSQL hosted on Neon.
65: - No application logic belongs here.
66:
67: ---
68:
69: # Technology Integration
70:
71: ## Next.js 16 App Router
72:
73: - Server Components by default.
74: - Client Components only when required (state, browser APIs, event handlers).
75: - Server Actions for mutations.
76: - Route Handlers for API endpoints.
77: - Metadata API for SEO.
78:
79: ## Prisma + Neon
80:
81: - Serverless PostgreSQL via Neon.
82: - Connection pooling via `@prisma/adapter-neon`.
83: - WebSocket connections via `ws`.
84: - Singleton Prisma client in `lib/db.ts`.
85: - Never instantiate Prisma directly in components.
86:
87: ## Zod Validation
88:
89: - Runtime validation for all external input.
90: - Type inference from schemas.
91: - Used in Server Actions and Route Handlers.
92: - Environment variable validation via `@t3-oss/env-nextjs`.
93:
94: ## Tailwind CSS v4
95:
96: - Utility-first styling.
97: - Design tokens as CSS custom properties in `globals.css`.
98: - oklch color space for perceptually uniform colors.
99: - Dark mode via `.dark` class.
100: - `cn()` utility via `clsx` + `tailwind-merge`.
101:
102: ---
103:
104: # Rules
105:
106: - Business logic must never exist inside UI components.
107: - Database access must never happen directly inside UI components.
108: - Every external input must be validated with Zod.
109: - Never use `any`. Prefer inferred types.
110: - Prefer Server Components. Use Client Components only when required.
111: - Keep routes thin. Delegate to services.
112: - Never modify production databases manually. Use Prisma migrations.
113: - Never expose secrets, password hashes, or internal identifiers.
114:
115: ---
116:
117: # Data Flow
118:
119: `120: Request
121: ↓
122: Validation (Zod)
123: ↓
124: Action / Route Handler
125: ↓
126: Service
127: ↓
128: Repository
129: ↓
130: Prisma
131: ↓
132: PostgreSQL (Neon)
133: ↓
134: Repository
135: ↓
136: Service
137: ↓
138: Response
139:`
140:
141: ---
142:
143: # Documentation Rules
144:
145: Every significant change should update the relevant documentation.
146:
147: Architecture decisions should be documented before implementation whenever possible.
148:
149: Documentation should always reflect the current state of the project.
````

## File: docs/rules/Dark Mode Protocol.md

```markdown
1: # Dark Mode Protocol
2:
3: Rules for implementing and maintaining dark mode across the project.
4:
5: ---
6:
7: # Implementation
8:
9: - Dark mode uses the `.dark` class on the root element.
10: - Toggle at the layout level, not per component.
11: - Persist user preference in localStorage.
12: - Respect `prefers-color-scheme` as the default.
13:
14: ---
15:
16: # Color Tokens
17:
18: - All colors defined as CSS custom properties in `globals.css`.
19: - Light and dark variants for each token.
20: - Use oklch color space for perceptually uniform colors.
21: - Never hardcode color values in components.
22:
23: ---
24:
25: # Background Rules
26:
27: - Never use pure black (#000) for backgrounds.
28: - Use dark grays (e.g., oklch(0.15 0.01 250)) for surfaces.
29: - Layer surfaces with subtle lightness differences.
30: - Use shadows (white at low opacity) for depth in dark mode.
31:
32: ---
33:
34: # Text Rules
35:
36: - Primary text: near-white, not pure white (#FFF).
37: - Secondary text: medium gray with sufficient contrast.
38: - Ensure WCAG AA contrast ratios in both modes.
39: - Never use color alone to convey meaning.
40:
41: ---
42:
43: # Border and Shadow Rules
44:
45: - Borders: use white at 8-12% opacity in dark mode.
46: - Shadows: compose from three layers (ambient, key, rim).
47: - Prefer shadows over borders for visual separation.
48: - Adjust shadow color for dark mode (use lighter shadows).
49:
50: ---
51:
52: # Component Rules
53:
54: - Every component must work in both themes.
55: - Test all interactive states (hover, focus, active) in both modes.
56: - Use `cn()` utility for conditional theme classes.
57: - Never use `dark:` prefix on every property. Use token-based theming.
58:
59: ---
60:
61: # Image Treatment
62:
63: - Image outlines: 1px at 10% opacity (white in dark mode, black in light mode).
64: - Avoid bright images on dark backgrounds without subtle containment.
65: - Use `next/image` with `dark:` variants when needed.
66:
67: ---
68:
69: # Documentation Rules
70:
71: Every significant change should update the relevant documentation.
72:
73: Architecture decisions should be documented before implementation whenever possible.
74:
75: Documentation should always reflect the current state of the project.
```

## File: docs/rules/Em-Dash Ban.md

````markdown
1: # Em-Dash Ban
2:
3: The em-dash (U+2014) and en-dash (U+2013) are banned anywhere in visible text.
4:
5: ---
6:
7: # Rules
8:
9: - Never use em-dash (U+2014) in visible text.
10: - Never use en-dash (U+2013) in visible text.
11: - Use the hyphen (-) for all dash-like purposes.
12: - Use the math minus sign only in mathematical expressions.
13:
14: ---
15:
16: # Why
17:
18: This rule comes from the Taste Skill framework (Leon Lin).
19:
20: LLMs default to em-dashes and en-dashes because they appear frequently in training data. Banning them forces more deliberate punctuation and breaks the generic AI writing pattern.
21:
22: ---
23:
24: # Examples
25:
26: Incorrect:
27:
28: `29: The feature supports authentication - including OAuth and magic links.
30:`
31:
32: Correct:
33:
34: `35: The feature supports authentication - including OAuth and magic links.
36:`
37:
38: Incorrect:
39:
40: `41: Our platform offers three tiers - Basic, Pro, and Enterprise.
42:`
43:
44: Correct:
45:
46: `47: Our platform offers three tiers - Basic, Pro, and Enterprise.
48:`
49:
50: ---
51:
52: # Enforcement
53:
54: - Check all visible text in components.
55: - Check markdown documentation (internal only).
56: - Do not check code comments or string literals that are not rendered.
57:
58: ---
59:
60: # Sources
61:
62: - Taste Skill v2 (Leon Lin) - Em-dash and en-dash ban.
````

## File: docs/rules/Hero Discipline.md

```markdown
1: # Hero Discipline
2:
3: Rules for building effective hero sections.
4:
5: ---
6:
7: # Constraints
8:
9: - Headline: max 2 lines.
10: - Subtext: max 20 words.
11: - CTA visible without scrolling.
12: - Top padding: max `pt-24`.
13: - Max 4 text elements in the hero.
14:
15: ---
16:
17: # Structure
18:
19: A hero section contains:
20:
21: 1. Headline (thesis of the page).
22: 2. Subtext (supporting the headline).
23: 3. CTA (primary action).
24: 4. Optional: secondary action or supporting visual.
25:
26: ---
27:
28: # Layout
29:
30: - Hero must be visible above the fold.
31: - Never hide the CTA below the fold.
32: - Use `text-wrap: balance` on the headline.
33: - Use `text-wrap: pretty` on subtext.
34: - Body text: `max-w-[65ch]`.
35:
36: ---
37:
38: # Anti-Patterns
39:
40: - Hero with more than 4 text elements.
41: - CTA pushed below the fold by excessive padding.
42: - Headline that spans more than 2 lines.
43: - Subtext that exceeds 20 words.
44: - Hero with no clear visual hierarchy.
45: - Generic "Welcome to [Framework]" boilerplate.
46:
47: ---
48:
49: # Design Variance
50:
51: - Hero should set the tone for the entire page.
52: - At least one asymmetric element in the hero.
53: - Break the grid intentionally.
54: - Use the three dials to calibrate hero intensity.
55:
56: ---
57:
58: # Sources
59:
60: - Taste Skill v2 (Leon Lin) - Hero constraints and Section 14 pre-flight.
```

## File: docs/rules/Taste Skill Color Rules.md

```markdown
1: # Taste Skill Color Rules
2:
3: Color system rules adapted from the Taste Skill framework.
4:
5: ---
6:
7: # One Accent Per Page
8:
9: - Every page has exactly one accent color.
10: - The accent color is used for CTAs, active states, and highlights.
11: - Never use multiple accent colors on a single page.
12:
13: ---
14:
15: # Color Palette
16:
17: - Define a 4-6 value named hex palette per project.
18: - Use oklch color space in `globals.css` for perceptually uniform colors.
19: - Never use default Tailwind colors without customization.
20: - Never use purple-to-blue gradients as a default.
21:
22: ---
23:
24: # Banned Palettes
25:
26: - Warm cream (#F4F1EA) with serif display and terracotta accent.
27: - Near-black with acid-green or vermilion accents.
28: - Purple-to-blue gradient backgrounds.
29: - Broad hairline-rule layouts with serif typography.
30:
31: ---
32:
33: # Radius Scale
34:
35: - One radius scale per page.
36: - Define in `globals.css` via CSS custom properties.
37: - Concentric radius formula: outer radius = inner radius + padding.
38: - Never mix radius scales within a page.
39:
40: ---
41:
42: # Theme Locks
43:
44: - One theme (light or dark) per page.
45: - Switch themes at the layout level, not per component.
46: - Test both themes before shipping.
47:
48: ---
49:
50: # Token Usage
51:
52: - Always use design tokens from `globals.css`.
53: - Never hardcode color values in Tailwind classes.
54: - Update tokens at the source, not in individual components.
55:
56: ---
57:
58: # Sources
59:
60: - Taste Skill v2 (Leon Lin) - Color/Shape/Page-Theme locks.
61: - W3C Design Tokens Community Group - First stable specification.
```

## File: docs/rules/Vercel Interface Rule Categories.md

```markdown
1: # Vercel Interface Rule Categories
2:
3: Performance and accessibility rules adapted from Vercel's web design guidelines.
4:
5: ---
6:
7: # Accessibility
8:
9: - Icon-only buttons need `aria-label`.
10: - Never use `outline-none` without a focus replacement.
11: - Never block paste on password or input fields.
12: - Honor `prefers-reduced-motion`.
13: - Use semantic HTML elements.
14: - Ensure color contrast meets WCAG AA.
15:
16: ---
17:
18: # Focus Management
19:
20: - Visible focus rings on all interactive elements.
21: - Focus should follow logical tab order.
22: - Skip links for keyboard navigation.
23: - Focus trapping in modals and dialogs.
24:
25: ---
26:
27: # Forms
28:
29: - Labels associated with inputs.
30: - Error messages linked to inputs via `aria-describedby`.
31: - Required fields indicated visually and programmatically.
32: - Inline validation on blur, not on every keystroke.
33: - Never clear form state on accidental navigation.
34:
35: ---
36:
37: # Animation
38:
39: - Always honor `prefers-reduced-motion`.
40: - Keep animations under 300ms for micro-interactions.
41: - Use `ease-out` for enter, `ease-in` for exit.
42: - Virtualize lists over 50 items.
43: - Avoid layout-triggering animations (use `transform` and `opacity`).
44:
45: ---
46:
47: # Typography
48:
49: - Use `text-wrap: balance` on headlines.
50: - Use `text-wrap: pretty` on body text.
51: - Line length: 45-90 characters.
52: - Consistent type scale across the application.
53:
54: ---
55:
56: # Content
57:
58: - Use `Intl.DateTimeFormat` for dates.
59: - Destructive actions need confirmation or undo.
60: - URL should reflect application state.
61: - Loading states for all async operations.
62:
63: ---
64:
65: # Images
66:
67: - Explicit `width` and `height` on all images.
68: - Use `next/image` for optimized delivery.
69: - Alt text on all meaningful images.
70: - Decorative images: `alt=""` and `role="presentation"`.
71:
72: ---
73:
74: # Performance
75:
76: - Server Components by default.
77: - Lazy load below-the-fold content.
78: - Minimize client-side JavaScript.
79: - Use streaming and Suspense boundaries.
80: - Prefetch critical navigation links.
81:
82: ---
83:
84: # Touch
85:
86: - Minimum 40x40px touch targets.
87: - Avoid hover-only interactions on touch devices.
88: - Use `@media (hover: hover)` for hover styles.
89: - Safe areas for mobile notches.
90:
91: ---
92:
93: # Dark Mode
94:
95: - Use CSS custom properties for theme switching.
96: - Test both light and dark modes.
97: - Avoid pure black (#000) for backgrounds. Use dark grays.
98: - Ensure sufficient contrast in both modes.
99:
100: ---
101:
102: # Sources
103:
104: - Vercel web-interface-guidelines (MIT).
105: - Vercel web-design-guidelines agent skill.
106: - vercel.com/design/guidelines.
```

## File: docs/skills/Impeccable Toolchain.md

````markdown
1: # Impeccable Toolchain
2:
3: Automated visual and engineering defect detection for AI-generated frontend code.
4:
5: ---
6:
7: # Overview
8:
9: - 23 commands organized by discipline.
10: - 45 deterministic anti-pattern rules.
11: - Runs without an LLM for detection.
12: - Live iteration mode for HMR-based design.
13:
14: ---
15:
16: # Installation
17:
18: `bash
19: npx impeccable install
20: `
21:
22: Then inside your AI coding tool:
23:
24: `25: /impeccable init
26:`
27:
28: This creates `PRODUCT.md` and optionally `DESIGN.md`.
29:
30: ---
31:
32: # Key Commands
33:
34: | Command | Purpose |
35: |---|---|
36: | `/impeccable init` | Initialize project with PRODUCT.md and DESIGN.md |
37: | `/impeccable detect` | Run 45-rule detector |
38: | `/impeccable bolder` | Respect existing design systems |
39: | `/impeccable critique` | Independent critique mode |
40:
41: ---
42:
43: # PRODUCT.md
44:
45: Defines:
46:
47: - Audience and user persona.
48: - Brand/product lane.
49: - Voice and tone.
50: - Anti-references (what NOT to build).
51:
52: ---
53:
54: # DESIGN.md
55:
56: Defines:
57:
58: - Color palette (named hex values).
59: - Typography scale.
60: - Component inventory.
61: - Aesthetic direction.
62:
63: ---
64:
65: # Named Anti-Slop Tells
66:
67: Impeccable flags these patterns:
68:
69: - Inter for everything without justification.
70: - Purple-to-blue gradients.
71: - Cards nested in cards.
72: - Decorative grid backgrounds.
73: - Two-axis gradient overlay patterns.
74:
75: ---
76:
77: # Detector Rules (45)
78:
79: The detector runs deterministically without an LLM:
80:
81: - Typography violations.
82: - Color violations.
83: - Layout violations.
84: - Interaction violations.
85: - Performance violations.
86: - Accessibility violations.
87:
88: ---
89:
90: # Sources
91:
92: - pbakaus/impeccable (Apache-2.0).
93: - impeccable.style.
94: - Latest: skill-v3.9.1, cli-v3.2.0 (2026-07-01).
````

## File: docs/skills/Make Interfaces Feel Better.md

```markdown
1: # Make Interfaces Feel Better
2:
3: Micro-interaction and visual polish skill by Jakub Krehel.
4:
5: ---
6:
7: # Overview
8:
9: 16 rule categories for improving interface feel through precise micro-interactions, shadows, typography, and animation values.
10:
11: ---
12:
13: # Key Rules
14:
15: ## Concentric Border Radius
16:
17: Outer radius = inner radius + padding.
18:
19: Example: card with 16px padding and 8px inner radius gets 24px outer radius.
20:
21: ## Optical Alignment
22:
23: Elements should appear visually centered, not mathematically centered.
24:
25: Adjust for optical weight (heavier elements shift slightly toward center).
26:
27: ## Shadows Over Borders
28:
29: Compose shadows from three layers:
30:
31: 1. Ambient (diffuse, large spread).
32: 2. Key (directional, medium spread).
33: 3. Rim (tight, small spread).
34:
35: Prefer shadows over borders for depth and separation.
36:
37: ## Press States
38:
39: Button press feedback: `transform: scale(0.96)`.
40:
41: Never go below `scale(0.95)`.
42:
43: ## Hit Areas
44:
45: Interactive elements: minimum 40x40px hit area.
46:
47: Extend with pseudo-element when the visible element is smaller.
48:
49: ## Font Smoothing
50:
51: Enable: `-webkit-font-smoothing: antialiased`.
52:
53: Use `font-variant-numeric: tabular-nums` for numeric data.
54:
55: ## Animation Values
56:
57: - Icon: `scale 0.25 -> 1`, `opacity 0 -> 1`, `blur 4px -> 0`.
58: - Stagger delay: ~100ms between items.
59: - Enter duration: ~800ms.
60: - Exit: subtler than enter.
61: - Spring settings: `duration 0.3`, `bounce 0`.
62:
63: ## Image Outlines
64:
65: - 1px at 10% opacity.
66: - Black in light mode, white in dark mode.
67:
68: ---
69:
70: # Supporting Files
71:
72: - `typography.md` - Typography rules.
73: - `surfaces.md` - Surface and shadow rules.
74: - `animations.md` - Animation value reference.
75: - `performance.md` - Performance constraints.
76:
77: ---
78:
79: # Sources
80:
81: - jakubkrehel/make-interfaces-feel-better (no license, all rights reserved).
82: - jakub.kr/writing/details-that-make-interfaces-feel-better.
```

## File: docs/skills/Taste Skill Project.md

```markdown
1: # Taste Skill Project
2:
3: Three-dial aesthetic framework for calibrating AI-generated frontend output.
4:
5: ---
6:
7: # Overview
8:
9: The Taste Skill provides a conversation-driven framework for setting aesthetic direction before building. It prevents generic AI output by committing to a direction early.
10:
11: ---
12:
13: # The Three Dials
14:
15: | Dial | Default | Scale | Description |
16: |---|---|---|---|
17: | Design Variance | 8 | 1-10 | How much the layout breaks from generic patterns |
18: | Motion Intensity | 6 | 1-10 | How much animation and transition is present |
19: | Visual Density | 4 | 1-10 | How much information per viewport |
20:
21: Set these dials conversationally before touching layout.
22:
23: ---
24:
25: # Section 14 Pre-Flight Check
26:
27: Mandatory before completing any page:
28:
29: - [ ] Three dials set and committed.
30: - [ ] Hero follows constraints (2-line headline, 20-word subtext, CTA above fold).
31: - [ ] Navigation on single line at desktop (80px height cap).
32: - [ ] One accent color per page.
33: - [ ] One radius scale per page.
34: - [ ] One theme per page.
35: - [ ] At least 4 layout families in 8-section pages.
36: - [ ] No em-dashes or en-dashes in visible text.
37: - [ ] No cards nested inside cards.
38: - [ ] No purple-to-blue gradients.
39: - [ ] No Inter for everything without justification.
40: - [ ] Typography uses balance/pretty wrapping.
41:
42: Any failed box blocks completion.
43:
44: ---
45:
46: # Greenfield Workflow
47:
48: 1. Set the three dials.
49: 2. Pick a 4-6 value named hex palette.
50: 3. Define the hero thesis.
51: 4. Build with committed direction.
52: 5. Run Section 14 pre-flight.
53: 6. Revise if any check fails.
54:
55: ---
56:
57: # Redesign Workflow
58:
59: 1. Audit existing interface against Section 14.
60: 2. Identify what to preserve, what to overhaul.
61: 3. Set the three dials for the new direction.
62: 4. Build respecting preserved elements.
63: 5. Run Section 14 pre-flight.
64:
65: ---
66:
67: # Anti-Laziness Rules
68:
69: - Never output a generic layout as a starting point.
70: - Always commit to a direction before building.
71: - Always run the pre-flight check.
72: - Never skip the critique pass.
73:
74: ---
75:
76: # Sources
77:
78: - Leonxlnx/taste-skill (MIT).
79: - tasteskill.dev.
80: - v2 is experimental, iterating toward v2.0.0 stable.
```

## File: docs/skills/Vercel Web Design Guidelines.md

````markdown
1: # Vercel Web Design Guidelines
2:
3: High-performance, accessible web interface rules from Vercel Labs.
4:
5: ---
6:
7: # Installation
8:
9: `bash
 10: npx skills add vercel-labs/agent-skills --skill web-design-guidelines
 11: `
12:
13: ---
14:
15: # Workflow
16:
17: 1. Fetch the latest guidelines from the Vercel repository.
18: 2. Read target files in the project.
19: 3. Check all rules against the files.
20: 4. Output terse file:line findings.
21:
22: ---
23:
24: # Key Rule Categories
25:
26: ## Accessibility
27:
28: - Icon-only buttons need `aria-label`.
29: - Never `outline-none` without a focus replacement.
30: - Never block paste.
31: - Honor `prefers-reduced-motion`.
32: - Semantic HTML elements.
33: - Color contrast meets WCAG AA.
34:
35: ## Focus
36:
37: - Visible focus rings on all interactive elements.
38: - Logical tab order.
39: - Skip links for keyboard navigation.
40: - Focus trapping in modals.
41:
42: ## Forms
43:
44: - Labels associated with inputs.
45: - Error messages linked via `aria-describedby`.
46: - Required fields indicated visually and programmatically.
47: - Inline validation on blur.
48:
49: ## Animation
50:
51: - Honor `prefers-reduced-motion`.
52: - Under 300ms for micro-interactions.
53: - `ease-out` for enter, `ease-in` for exit.
54: - Virtualize lists over 50 items.
55: - Use `transform` and `opacity` for animations.
56:
57: ## Typography
58:
59: - `text-wrap: balance` on headlines.
60: - `text-wrap: pretty` on body text.
61: - Line length: 45-90 characters.
62: - Consistent type scale.
63:
64: ## Content
65:
66: - `Intl.DateTimeFormat` for dates.
67: - Destructive actions need confirmation or undo.
68: - URL reflects state.
69: - Loading states for async operations.
70:
71: ## Images
72:
73: - Explicit `width` and `height`.
74: - Use `next/image`.
75: - Alt text on meaningful images.
76: - Decorative: `alt=""` and `role="presentation"`.
77:
78: ## Performance
79:
80: - Server Components by default.
81: - Lazy load below-the-fold.
82: - Minimize client JS.
83: - Streaming and Suspense.
84: - Prefetch critical navigation.
85:
86: ## Touch
87:
88: - 40x40px minimum touch targets.
89: - `@media (hover: hover)` for hover styles.
90: - Safe areas for mobile.
91:
92: ## Dark Mode
93:
94: - CSS custom properties for themes.
95: - Test both modes.
96: - Avoid pure black backgrounds.
97: - Sufficient contrast in both modes.
98:
99: ---
100:
101: # Sources
102:
103: - vercel-labs/web-interface-guidelines (MIT).
104: - vercel.com/design/guidelines.
````

## File: docs/AI Instructions.md

````markdown
1: # AI Instructions
2:
3: This document defines how AI assistants should contribute to the project.
4:
5: Supported tools include:
6:
7: - ChatGPT
8: - Codex
9: - Claude Code
10: - Cursor
11: - OpenCode
12: - GitHub Copilot
13:
14: ---
15:
16: # Primary Objective
17:
18: Generate production-quality code that follows the project's architecture and coding standards.
19:
20: The AI should prioritize maintainability over speed.
21:
22: ---
23:
24: # General Rules
25:
26: Always:
27:
28: - Read existing code before making changes.
29: - Reuse existing utilities.
30: - Respect the current architecture.
31: - Prefer composition.
32: - Keep code strongly typed.
33:
34: Never:
35:
36: - Introduce unnecessary dependencies.
37: - Duplicate logic.
38: - Ignore lint errors.
39: - Disable TypeScript.
40: - Mix business logic with UI.
41:
42: ---
43:
44: # Architecture
45:
46: Always follow this flow:
47:
48: ` 49: UI
 50: 
 51: ↓
 52: 
 53: Actions
 54: 
 55: ↓
 56: 
 57: Services
 58: 
 59: ↓
 60: 
 61: Repositories
 62: 
 63: ↓
 64: 
 65: Prisma
 66: 
 67: ↓
 68: 
 69: Database
 70:`
71:
72: Business logic belongs only inside Services.
73:
74: Repositories handle data access only.
75:
76: ---
77:
78: # Component Rules
79:
80: Components should:
81:
82: - Be small
83: - Be reusable
84: - Receive data through props
85: - Avoid side effects
86:
87: ---
88:
89: # Server Components
90:
91: Prefer Server Components by default.
92:
93: Use Client Components only when required.
94:
95: Examples:
96:
97: - State
98: - Browser APIs
99: - Event handlers
100:
101: ---
102:
103: # Styling
104:
105: Use:
106:
107: - Tailwind CSS v4
108: - shadcn/ui
109: - CSS Variables
110: - Design tokens from globals.css
111:
112: Avoid custom CSS unless necessary.
113:
114: Never use inline styles.
115:
116: Never use default Tailwind colors without customization.
117:
118: ---
119:
120: # Design Quality
121:
122: Read `docs/Design Rules.md` before generating any UI.
123:
124: Key rules:
125:
126: - Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
127: - One accent color per page. No purple-to-blue gradients.
128: - Body text: `max-w-[65ch]`, `text-wrap: pretty`.
129: - Headlines: `text-wrap: balance`.
130: - Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
131: - Shadows over borders. Three-layer shadow composition.
132: - Always honor `prefers-reduced-motion`.
133: - Break the uniform grid intentionally.
134: - No cards nested inside cards.
135: - No em-dashes or en-dashes in visible text.
136:
137: Anti-patterns to flag:
138:
139: - Inter used for everything without justification.
140: - Purple-to-blue gradient backgrounds.
141: - Uniform equal spacing everywhere.
142: - Default Tailwind colors used without customization.
143: - Generic "Welcome to Next.js" boilerplate left in production.
144:
145: ---
146:
147: # Database
148:
149: Use Prisma only through repositories.
150:
151: Never query the database directly from components.
152:
153: ---
154:
155: # Performance
156:
157: Prefer:
158:
159: - Server rendering
160: - Lazy loading
161: - Streaming
162: - Partial rendering
163:
164: Avoid unnecessary client-side JavaScript.
165:
166: ---
167:
168: # Error Handling
169:
170: Always:
171:
172: - Validate inputs
173: - Return meaningful errors
174: - Handle edge cases
175: - Fail gracefully
176:
177: ---
178:
179: # Documentation
180:
181: When introducing:
182:
183: - New architecture
184: - New conventions
185: - New folders
186: - New workflows
187:
188: Update the corresponding documentation.
189:
190: ---
191:
192: # Code Review Checklist
193:
194: Before considering a task complete, verify:
195:
196: - Project builds successfully.
197: - ESLint passes.
198: - TypeScript passes.
199: - No duplicated logic.
200: - Documentation is updated.
201: - Existing architecture is respected.
202: - No anti-slop design patterns (see `docs/Design Rules.md`).
203: - UI follows the three dials and design quality rules.
204: - Interactive elements have proper press states and hit areas.
205:
206: ---
207:
208: # Philosophy
209:
210: Readable code is preferred over clever code.
211:
212: Consistency is preferred over personal style.
213:
214: Every change should make the project easier to maintain.
````

## File: docs/Architecture.md

````markdown
1: # Project Architecture
2:
3: ## Overview
4:
5: This project follows a layered architecture designed for scalability, maintainability, and testability.
6:
7: The primary goal is to isolate business logic from the presentation layer while keeping every layer focused on a single responsibility.
8:
9: ---
10:
11: # Architecture Layers
12:
13: ` 14: ┌────────────────────────────┐
 15: │         UI Layer           │
 16: │   React Components / RSC   │
 17: └──────────────┬─────────────┘
 18:                │
 19: ┌──────────────▼─────────────┐
 20: │     Actions / Routes       │
 21: │ Request & Response Handling│
 22: └──────────────┬─────────────┘
 23:                │
 24: ┌──────────────▼─────────────┐
 25: │       Service Layer        │
 26: │ Business Logic             │
 27: └──────────────┬─────────────┘
 28:                │
 29: ┌──────────────▼─────────────┐
 30: │     Repository Layer       │
 31: │ Data Access                │
 32: └──────────────┬─────────────┘
 33:                │
 34: ┌──────────────▼─────────────┐
 35: │      Database Layer        │
 36: │ Prisma + PostgreSQL        │
 37: └────────────────────────────┘
 38:`
39:
40: ---
41:
42: # Responsibilities
43:
44: ## UI Layer
45:
46: Responsible for:
47:
48: - Rendering the interface
49: - User interactions
50: - Displaying application state
51:
52: Must never contain business logic.
53:
54: ---
55:
56: ## Actions / Routes
57:
58: Responsible for:
59:
60: - Receiving requests
61: - Authentication
62: - Authorization
63: - Input validation
64: - Calling services
65: - Returning responses
66:
67: ---
68:
69: ## Service Layer
70:
71: Responsible for:
72:
73: - Business rules
74: - Workflows
75: - Coordination between repositories
76: - Validation beyond schema validation
77:
78: Services should remain independent from UI.
79:
80: ---
81:
82: ## Repository Layer
83:
84: Responsible for:
85:
86: - Database queries
87: - CRUD operations
88: - Data persistence
89:
90: Repositories should never contain business rules.
91:
92: ---
93:
94: ## Database Layer
95:
96: Responsible for:
97:
98: - Prisma models
99: - Migrations
100: - PostgreSQL
101:
102: No application logic belongs here.
103:
104: ---
105:
106: # Design Principles
107:
108: - Separation of Concerns
109: - Single Responsibility Principle
110: - Composition over Inheritance
111: - Dependency Isolation
112: - Predictable Data Flow
113:
114: ---
115:
116: # Data Flow
117:
118: `119: Request
120: 
121: ↓
122: 
123: Validation
124: 
125: ↓
126: 
127: Service
128: 
129: ↓
130: 
131: Repository
132: 
133: ↓
134: 
135: Database
136: 
137: ↓
138: 
139: Repository
140: 
141: ↓
142: 
143: Service
144: 
145: ↓
146: 
147: Response
148:`
149:
150: ---
151:
152: # Component Organization
153:
154: `155: components/
156:     ui/
157:     layout/
158:     shared/
159: 
160: features/
161:     authentication/
162:     dashboard/
163:     profile/
164:`
165:
166: ---
167:
168: # Future Expansion
169:
170: The architecture is designed to support:
171:
172: - Authentication
173: - Authorization
174: - Background Jobs
175: - Queues
176: - WebSockets
177: - File Storage
178: - Notifications
179: - Multi-tenancy
180: - API Versioning
181:
182: ---
183:
184: ## Documentation Rules
185:
186: Every significant change should update the relevant documentation.
187:
188: Architecture decisions should be documented before implementation whenever possible.
189:
190: Documentation should always reflect the current state of the project.
````

## File: docs/Coding Standards.md

````markdown
1: # Coding Standards
2:
3: This document defines the coding conventions used throughout the project.
4:
5: ---
6:
7: # General Rules
8:
9: - Use TypeScript Strict Mode.
10: - Keep code readable.
11: - Prefer simplicity.
12: - Avoid unnecessary abstractions.
13: - Never duplicate business logic.
14:
15: ---
16:
17: # File Naming
18:
19: Components
20:
21: ` 22: PascalCase.tsx
 23:`
24:
25: Hooks
26:
27: ` 28: useSomething.ts
 29:`
30:
31: Utilities
32:
33: ` 34: camelCase.ts
 35:`
36:
37: Constants
38:
39: ` 40: UPPER_SNAKE_CASE.ts
 41:`
42:
43: Types
44:
45: ` 46: types.ts
 47:`
48:
49: ---
50:
51: # Imports
52:
53: Always use aliases.
54:
55: Correct
56:
57: `ts
 58: import { Button } from "@/components/ui/button";
 59: `
60:
61: Avoid
62:
63: `ts
 64: import Button from "../../../../Button";
 65: `
66:
67: ---
68:
69: # Components
70:
71: Prefer:
72:
73: - Server Components
74: - Small components
75: - Composition
76: - Single responsibility
77:
78: Avoid:
79:
80: - Huge components
81: - Nested conditionals
82: - Business logic inside UI
83:
84: ---
85:
86: # Styling
87:
88: Use only Tailwind CSS.
89:
90: Avoid:
91:
92: - Inline styles
93: - CSS duplication
94:
95: ---
96:
97: # State Management
98:
99: Priority order:
100:
101: 1. Server State
102: 2. URL State
103: 3. Local State
104:
105: Avoid unnecessary global state.
106:
107: ---
108:
109: # Business Logic
110:
111: Business logic belongs only in Services.
112:
113: Never place business rules inside:
114:
115: - Components
116: - Hooks
117: - Repositories
118:
119: ---
120:
121: # Database
122:
123: All database access must go through repositories.
124:
125: Never call Prisma directly from UI.
126:
127: ---
128:
129: # Error Handling
130:
131: Always:
132:
133: - Return meaningful errors
134: - Validate inputs
135: - Handle unexpected failures
136:
137: ---
138:
139: # Performance
140:
141: Prefer:
142:
143: - Server Components
144: - Lazy loading
145: - Memoization only when needed
146:
147: Avoid premature optimization.
148:
149: ---
150:
151: # Security
152:
153: Always:
154:
155: - Validate server input
156: - Sanitize user content
157: - Store secrets in environment variables
158: - Follow least privilege principles
159:
160: ---
161:
162: # Testing
163:
164: Every important business rule should have tests.
165:
166: Critical UI flows should have component or integration tests.
167:
168: ---
169:
170: # Documentation
171:
172: Architecture changes require documentation updates.
173:
174: Documentation should always reflect reality.
175:
176: ---
177:
178: # Documentation Rules
179:
180: - Every significant change should update the relevant documentation.
181:
182: ---
````

## File: docs/Components.md

````markdown
1: # Components
2:
3: This document defines the component architecture used throughout the project.
4:
5: ---
6:
7: # Folder Structure
8:
9: ` 10: components/
 11: 
 12:     ui/
 13:     layout/
 14:     shared/
 15:`
16:
17: Future
18:
19: ` 20: features/
 21: 
 22:     authentication/
 23:     dashboard/
 24:     profile/
 25:`
26:
27: ---
28:
29: # UI Components
30:
31: Reusable design system components.
32:
33: Examples
34:
35: - Button
36: - Input
37: - Card
38: - Dialog
39: - Badge
40: - Avatar
41: - Table
42:
43: Rules
44:
45: - Generic
46: - Reusable
47: - No business logic
48:
49: ---
50:
51: # Layout Components
52:
53: Responsible for page structure.
54:
55: Examples
56:
57: - Header
58: - Sidebar
59: - Footer
60: - Navigation
61: - Shell
62:
63: ---
64:
65: # Shared Components
66:
67: Reusable components that combine UI primitives.
68:
69: Examples
70:
71: - Search Bar
72: - User Menu
73: - Empty State
74: - Loading Screen
75:
76: ---
77:
78: # Feature Components
79:
80: Feature-specific components live close to their feature.
81:
82: Example
83:
84: ` 85: features/
 86: 
 87:     authentication/
 88: 
 89:         LoginForm.tsx
 90:         RegisterForm.tsx
 91:`
92:
93: ---
94:
95: # Component Principles
96:
97: Every component should:
98:
99: - Have one responsibility
100: - Be reusable when appropriate
101: - Receive data via props
102: - Avoid hidden side effects
103:
104: ---
105:
106: # Preferred Composition
107:
108: `109: Page
110: 
111: ↓
112: 
113: Layout
114: 
115: ↓
116: 
117: Feature
118: 
119: ↓
120: 
121: Shared
122: 
123: ↓
124: 
125: UI
126:`
127:
128: ---
129:
130: # Accessibility
131:
132: All interactive components should support:
133:
134: - Keyboard navigation
135: - Focus states
136: - Screen readers
137: - Semantic HTML
138:
139: ---
140:
141: # Styling
142:
143: Use:
144:
145: - Tailwind CSS
146: - CSS Variables
147: - Design Tokens
148:
149: Avoid custom CSS unless necessary.
150:
151: ---
152:
153: # Component Checklist
154:
155: Before creating a component ask:
156:
157: - Can an existing component be reused?
158: - Is this component generic?
159: - Does it belong inside a feature?
160: - Is it accessible?
161: - Is it responsive?
162: - Is it properly typed?
163: - Does it follow the anti-slop design rules?
164: - Does it use design tokens from globals.css?
165: - Does it have intentional spacing (not uniform defaults)?
166: - Does it use shadows over borders for depth?
167: - Do interactive elements have press states and 40x40px hit areas?
168:
169: ---
170:
171: # Design Quality
172:
173: Every component must follow the rules in `docs/Design Rules.md`.
174:
175: Key checks:
176:
177: - No generic AI layout patterns (cards-in-cards, uniform grids).
178: - One accent color. No random gradients.
179: - Typography uses balance/pretty wrapping.
180: - Animations respect `prefers-reduced-motion`.
181: - Shadows composed from multiple layers.
182: - Layout breaks the grid at least once.
````

## File: docs/Design Rules.md

```markdown
1: # Design Rules
2:
3: This document defines frontend design quality rules adapted from the Gogh anti-slop frontend framework.
4:
5: These rules prevent generic AI-generated output and ensure intentional, brand-aligned UI.
6:
7: ---
8:
9: # Anti-Slop Rules
10:
11: LLMs reach for the median of their training corpus. The result is predictable: Inter for everything, purple-to-blue gradients, cards nested in cards, and minimal animations.
12:
13: These rules break that pattern.
14:
15: ---
16:
17: # The Three Dials
18:
19: Every page or component should feel like it has been tuned across three axes:
20:
21: | Dial | Default | Description |
22: |---|---|---|
23: | Design Variance | 8 | How much the layout breaks from generic grid patterns |
24: | Motion Intensity | 6 | How much animation and transition is present |
25: | Visual Density | 4 | How much information is packed into a given viewport |
26:
27: These are not hardcoded values. They are conversation anchors. The default 8/6/4 works for most landing pages. Dashboards and data-heavy UIs shift visual density higher.
28:
29: Set these dials before touching layout. Commit to a direction.
30:
31: ---
32:
33: # Color Rules
34:
35: - One accent color per page.
36: - One radius scale per page.
37: - One theme (light or dark) per page.
38: - Never use purple-to-blue gradients as a default.
39: - Never use warm cream (#F4F1EA) with serif display and terracotta accent.
40: - Never use near-black with acid-green or vermilion accents.
41: - Use the existing design tokens in globals.css. Do not invent new color variables without updating the token system.
42:
43: ---
44:
45: # Typography Rules
46:
47: - Body line length: 45-90 characters (use `max-w-[65ch]` for prose).
48: - Use `text-wrap: balance` on headlines.
49: - Use `text-wrap: pretty` on body text.
50: - Enable font smoothing: `-webkit-font-smoothing: antialiased`.
51: - Use `font-variant-numeric: tabular-nums` for numeric data.
52: - Never use em-dash (U+2014) or en-dash (U+2013) in visible text. Use hyphens.
53: - Default to more whitespace than feels necessary. Add density deliberately.
54: - Use fewer borders. Prefer shadows, color contrast, and spacing to separate elements.
55:
56: ---
57:
58: # Hero Rules
59:
60: - Headline: max 2 lines.
61: - Subtext: max 20 words.
62: - CTA visible without scrolling.
63: - Top padding: max `pt-24`.
64: - Max 4 text elements in the hero.
65:
66: ---
67:
68: # Navigation Rules
69:
70: - Render on a single line at desktop.
71: - Height cap: 80px (default 64-72px).
72: - No hamburger menu on desktop.
73:
74: ---
75:
76: # Layout Rules
77:
78: - An 8-section page must use at least 4 different layout families.
79: - Bento grids use exactly N cells for N items.
80: - Never use cards nested inside cards.
81: - Prefer asymmetric layouts over perfectly centered grids.
82: - Break the grid intentionally. Uniform spacing everywhere looks generated.
83:
84: ---
85:
86: # Micro-Interaction Rules
87:
88: These come from Jakub Krehel's make-interfaces-feel-better skill.
89:
90: ## Border Radius
91:
92: - Concentric radius formula: outer radius = inner radius + padding.
93: - A card with 16px padding and 8px inner radius gets 24px outer radius.
94:
95: ## Press States
96:
97: - Button press feedback: `transform: scale(0.96)`.
98: - Never go below `scale(0.95)`.
99:
100: ## Shadows
101:
102: - Compose shadows from three layers (ambient, key, rim).
103: - Prefer shadows over borders for depth.
104:
105: ## Hit Areas
106:
107: - Interactive elements: minimum 40x40px hit area.
108: - Extend with pseudo-element when the visible element is smaller.
109:
110: ## Animations
111:
112: - Icon animation: `scale 0.25 → 1`, `opacity 0 → 1`, `blur 4px → 0`.
113: - Stagger delay: ~100ms between items.
114: - Enter duration: ~800ms. Exit: subtler than enter.
115: - Spring settings: `duration 0.3`, `bounce 0`.
116: - Always honor `prefers-reduced-motion`.
117:
118: ## Image Treatment
119:
120: - Image outlines: `1px` at `10%` opacity (black in light mode, white in dark mode).
121:
122: ---
123:
124: # Component Design Checklist
125:
126: Before shipping any component, verify:
127:
128: - [ ] No generic AI layout (cards-in-cards, uniform grids, centered everything).
129: - [ ] One accent color. No random gradients.
130: - [ ] Typography uses balance/pretty wrapping.
131: - [ ] Interactive elements have visible press states.
132: - [ ] Shadows composed from multiple layers, not single `box-shadow`.
133: - [ ] Hit areas meet 40x40px minimum.
134: - [ ] Animations respect reduced-motion.
135: - [ ] Spacing feels deliberate, not default.
136: - [ ] Layout breaks the grid at least once.
137: - [ ] No em-dashes or en-dashes in visible text.
138:
139: ---
140:
141: # Anti-Pattern Detection
142:
143: Flag these immediately:
144:
145: - Inter used for every project without justification.
146: - Purple-to-blue gradient backgrounds.
147: - Cards nested inside cards.
148: - Uniform equal spacing everywhere.
149: - Perfectly centered hero with no asymmetric element.
150: - No animation or transition on any interactive element.
151: - Borders used instead of shadows for separation.
152: - Default Tailwind color palette used without customization.
153: - Generic "Welcome to Next.js" boilerplate left in production.
154:
155: ---
156:
157: # Sources
158:
159: These rules are adapted from:
160:
161: - Taste Skill v2 (Leon Lin) - Taste prompting, three dials, anti-slop rules.
162: - make-interfaces-feel-better (Jakub Krehel) - Micro-interaction execution.
163: - Impeccable (Paul Bakaus) - Toolchain enforcement, anti-pattern detection.
164: - Anthropic frontend-design - Taste prompting baseline.
165: - ui-ux-pro-max (nextlevelbuilder) - Style and palette retrieval.
166: - Vercel web-design-guidelines - Audit layer, accessibility rules.
167: - Refactoring UI (Wathan & Schoger) - Visual hierarchy principles.
168: - Butterick's Practical Typography - Line length and measure rules.
169:
170: ---
171:
172: # Documentation Rules
173:
174: Every significant change should update the relevant documentation.
175:
176: Architecture decisions should be documented before implementation whenever possible.
177:
178: Documentation should always reflect the current state of the project.
```

## File: docs/Home.md

```markdown
1: # Documentation Hub
2:
3: This is the central documentation index for the project.
4:
5: ---
6:
7: # Documentation Index
8:
9: ## Priority 1: Rules and Architecture
10:
11: ### rules/
12:
13: - Architecture and Stack - Structural rules for Next.js App Router with Prisma and Neon.
14: - AI Tells (Forbidden Patterns) - Anti-slop patterns to flag and remove.
15: - Anthropic Frontend Design Rules - Standards for distinctive, high-quality interfaces.
16: - Vercel Interface Rule Categories - Performance and accessibility rules.
17: - Taste Skill Color Rules - Color system rules and palette constraints.
18: - Dark Mode Protocol - Dark mode implementation rules.
19: - Em-Dash Ban - Banned punctuation in visible text.
20: - Hero Discipline - Hero section constraints and rules.
21:
22: ### meta/
23:
24: - Start Here - Quick start guide for developers and AI agents.
25: - CONVENTIONS - Coding and naming conventions.
26: - Tag Taxonomy - Documentation tag system.
27: - Dashboard - Project status and documentation completeness.
28:
29: ### skills/
30:
31: - Vercel Web Design Guidelines - High-performance, accessible web rules.
32: - Impeccable Toolchain - Automated visual defect detection.
33: - Make Interfaces Feel Better - Micro-interaction and visual polish.
34: - Taste Skill Project - Three-dial aesthetic framework.
35:
36: ---
37:
38: ## Priority 2: Workflows and Quality
39:
40: ### flows/
41:
42: - Build Greenfield (Prompt 1) - Workflow for building new features from scratch.
43: - Redesign First-Audit (Prompt 2) - Workflow for redesigning existing interfaces.
44: - Full Stack Build Flow - Full-stack feature development workflow.
45: - Audit Pipeline Flow - Quality audit pipeline.
46: - Install and Load - Skill installation and loading guide.
47:
48: ### audits/
49:
50: - Pre-Flight Check (Section 14) - Mandatory checklist before shipping.
51: - Vercel Audit Guidelines - Performance and accessibility audit.
52: - Impeccable Audit and Detect - Automated defect detection.
53: - MIFB Review Checklist - Micro-interaction review.
54: - Brand Fidelity Audit - Brand identity preservation.
55: - Preservation Audit - Functionality preservation.
56:
57: ### deliverables/
58:
59: - Unified Pre-Flight Mega Checklist - Combined checklist from all skills.
60: - Design Skills Cheat Sheet - Quick reference for daily work.
61: - Quickstart - Get up and running with the design skill system.
62:
63: ---
64:
65: ## Priority 3: Concepts and Decisions
66:
67: ### concepts/
68:
69: - AI Slop - Understanding and preventing generic AI output.
70: - Coaxing Beats Constraint - Why gentle guidance produces better output.
71: - Optical Alignment - Making interfaces feel visually correct.
72: - Press Feedback and Hit Areas - Interactive element responsiveness.
73: - Interruptible Animation - Animations that can be interrupted.
74: - Design Review as Infrastructure - Systematic design review process.
75:
76: ### decisions/
77:
78: - Enforcement Layer Overlap - Comparing enforcement approaches.
79: - Font Ban Conflicts - Resolving font-related rule conflicts.
80: - Motion Doctrine Conflicts - Resolving animation rule conflicts.
81: - Prompt Layer vs Toolchain Layer - When to use prompts vs toolchain.
82:
83: ---
84:
85: ## Priority 4: References
86:
87: ### reference/
88:
89: - Source Ledger - Evidence-gated source tracking.
90: - Entities - Foundational tools and frameworks.
91: - Gaps - Identified gaps and future improvements.
92: - Questions - Frequently asked questions.
93:
94: ---
95:
96: ## Legacy Documentation
97:
98: ### Architecture
99:
100: - Architecture - Layered architecture definition.
101: - Project Context - Vision, goals, and priorities.
102: - Tech Stack - Technology justification.
103: - Coding Standards - Code conventions.
104:
105: ### Development
106:
107: - Components - Component architecture and rules.
108: - Database - Database architecture documentation.
109: - Git Workflow - Git workflow and conventions.
110:
111: ### AI
112:
113: - AI Instructions - AI assistant guidelines.
114: - Design Rules - Anti-slop and design taste rules.
115:
116: ---
117:
118: # Current Status
119:
120: - Stage: Foundation
121: - Framework: Next.js 16
122: - UI: shadcn/ui + Tailwind CSS v4
123: - Database: PostgreSQL (Neon) via Prisma
124: - Status: Pre-production
125:
126: ---
127:
128: # Documentation Rules
129:
130: Every significant change should update the relevant documentation.
131:
132: Architecture decisions should be documented before implementation whenever possible.
133:
134: Documentation should always reflect the current state of the project.
```

## File: docs/Project Context.md

```markdown
1: # Project Context
2:
3: ## Vision
4:
5: Build a modern, scalable, production-ready web application with a clean architecture that remains maintainable as the project grows.
6:
7: The project prioritizes long-term quality over rapid feature development.
8:
9: ---
10:
11: ## Goals
12:
13: - Build a solid technical foundation.
14: - Keep business logic independent from the presentation layer.
15: - Maximize code reuse.
16: - Optimize developer experience.
17: - Create an AI-friendly codebase.
18: - Reduce technical debt.
19:
20: ---
21:
22: ## Target Users
23:
24: The exact target audience will be defined as product requirements evolve.
25:
26: The architecture should remain flexible enough to support future expansion.
27:
28: ---
29:
30: ## Priorities
31:
32: 1. Maintainability
33: 2. Performance
34: 3. Scalability
35: 4. Developer Experience
36: 5. Accessibility
37: 6. Security
38:
39: ---
40:
41: ## Constraints
42:
43: - TypeScript Strict Mode
44: - Server Components by default
45: - Minimal client-side JavaScript
46: - SEO friendly
47: - Accessible UI
48: - Reusable components
49: - Clean architecture
50:
51: ---
52:
53: ## Non Goals
54:
55: The project intentionally avoids:
56:
57: - Over-engineering
58: - Premature optimization
59: - Unnecessary dependencies
60: - Large client bundles
61: - Duplicate business logic
62:
63: ---
64:
65: ## Success Criteria
66:
67: The project should remain:
68:
69: - Easy to extend
70: - Easy to test
71: - Easy to document
72: - Easy for AI tools to understand
73: - Easy for new developers to contribute
74:
75: ---
76:
77: ## Documentation Rules
78:
79: Every significant change should update the relevant documentation.
80:
81: Architecture decisions should be documented before implementation whenever possible.
82:
83: Documentation should always reflect the current state of the project.
```

## File: docs/Tech Stack.md

```markdown
1: # Technology Stack
2:
3: This document explains the technologies used in the project and why they were selected.
4:
5: ---
6:
7: # Framework
8:
9: ## Next.js 16
10:
11: Purpose
12:
13: - React Framework
14: - Server Components
15: - App Router
16: - Route Handlers
17: - Metadata API
18:
19: Why
20:
21: - Excellent performance
22: - Modern React features
23: - Built-in optimizations
24: - Strong ecosystem
25:
26: ---
27:
28: # Language
29:
30: ## TypeScript
31:
32: Purpose
33:
34: Type safety.
35:
36: Why
37:
38: - Better maintainability
39: - Better refactoring
40: - Better developer experience
41: - Fewer runtime errors
42:
43: ---
44:
45: # UI
46:
47: ## React 19
48:
49: Purpose
50:
51: Build user interfaces.
52:
53: Why
54:
55: - Server Components
56: - Concurrent rendering
57: - Mature ecosystem
58:
59: ---
60:
61: # Styling
62:
63: ## Tailwind CSS v4
64:
65: Purpose
66:
67: Application styling.
68:
69: Why
70:
71: - Utility-first
72: - Small bundle
73: - Fast development
74: - Excellent maintainability
75:
76: ---
77:
78: # Components
79:
80: ## shadcn/ui
81:
82: Purpose
83:
84: Reusable UI components.
85:
86: Why
87:
88: - Accessible
89: - Fully customizable
90: - No vendor lock-in
91:
92: ---
93:
94: # Database
95:
96: ## PostgreSQL
97:
98: Purpose
99:
100: Primary relational database.
101:
102: Why
103:
104: - Reliability
105: - Scalability
106: - Mature ecosystem
107:
108: ---
109:
110: # ORM
111:
112: ## Prisma
113:
114: Purpose
115:
116: Database access.
117:
118: Why
119:
120: - Excellent TypeScript support
121: - Migrations
122: - Type-safe queries
123:
124: ---
125:
126: # Database Provider
127:
128: ## Neon
129:
130: Purpose
131:
132: Serverless PostgreSQL.
133:
134: Why
135:
136: - Fast provisioning
137: - Scalable
138: - Native Prisma support
139:
140: ---
141:
142: # Validation
143:
144: ## Zod
145:
146: Purpose
147:
148: Runtime validation.
149:
150: Why
151:
152: - Type inference
153: - Reliable validation
154: - Excellent TypeScript integration
155:
156: ---
157:
158: # Forms
159:
160: ## React Hook Form
161:
162: Purpose
163:
164: Form management.
165:
166: Why
167:
168: - Excellent performance
169: - Minimal re-renders
170: - Strong TypeScript support
171:
172: ---
173:
174: # Testing
175:
176: ## Jest
177:
178: Purpose
179:
180: Unit testing.
181:
182: ---
183:
184: # Linting
185:
186: ## ESLint
187:
188: Purpose
189:
190: Static analysis.
191:
192: ---
193:
194: # Formatting
195:
196: ## Prettier
197:
198: Purpose
199:
200: Code formatting.
201:
202: ---
203:
204: # Git Hooks
205:
206: ## Husky
207:
208: Purpose
209:
210: Automated Git hooks.
211:
212: ---
213:
214: # Code Quality
215:
216: ## lint-staged
217:
218: Purpose
219:
220: Run checks only on staged files.
221:
222: ---
223:
224: # Guiding Principles
225:
226: Every dependency must satisfy at least one of the following:
227:
228: - Improves maintainability
229: - Improves developer experience
230: - Improves performance
231: - Solves a real problem
232:
233: No dependency should be added without a clear justification.
234:
235: ---
236:
237: ## Testing Rules
238:
239: - Tests must cover critical business logic and edge cases
240: - Unit tests for pure functions and utilities
241: - Integration tests for API endpoints and database interactions
242: - Test coverage should be monitored but not enforced at the cost of maintainability
243:
244: ---
```

## File: lib/**tests**/utils.test.ts

```typescript
 1: import { cn } from "../utils";
 2: describe("cn", () => {
 3:   it("merges class names", () => {
 4:     const result = cn("text-red-500", "text-blue-500");
 5:     expect(result).toBe("text-blue-500");
 6:   });
 7:   it("handles conditional classes", () => {
 8:     const result = cn("base", false && "hidden", "extra");
 9:     expect(result).toContain("base");
10:     expect(result).toContain("extra");
11:     expect(result).not.toContain("hidden");
12:   });
13:   it("handles undefined and null", () => {
14:     const result = cn("base", undefined, null);
15:     expect(result).toBe("base");
16:   });
17:   it("merges tailwind conflicts", () => {
18:     const result = cn("p-2 p-4");
19:     expect(result).toBe("p-4");
20:   });
21:   it("handles empty input", () => {
22:     const result = cn();
23:     expect(result).toBe("");
24:   });
25: });
```

## File: lib/db.ts

```typescript
 1: import { neonConfig } from "@neondatabase/serverless";
 2: import { PrismaNeon } from "@prisma/adapter-neon";
 3: import { PrismaClient } from "@prisma/client";
 4: import ws from "ws";
 5: neonConfig.webSocketConstructor = ws;
 6: const prismaClientSingleton = () => {
 7:   const adapter = new PrismaNeon({
 8:     connectionString: process.env.DATABASE_URL
 9:   });
10:   return new PrismaClient({ adapter });
11: };
12: declare const globalThis: {
13:   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
14: } & typeof global;
15: export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
16: if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

## File: lib/utils.ts

```typescript
1: import { clsx, type ClassValue } from "clsx"
2: import { twMerge } from "tailwind-merge"
3: export function cn(...inputs: ClassValue[]) {
4:   return twMerge(clsx(inputs))
5: }
```

## File: prisma/migrations/20260719134020_test1/migration.sql

```sql
1: CREATE TABLE "User" (
2:     "id" SERIAL NOT NULL,
3:     "email" TEXT NOT NULL,
4:     "name" TEXT,
5:     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
6:     "updatedAt" TIMESTAMP(3) NOT NULL,
7:     CONSTRAINT "User_pkey" PRIMARY KEY ("id")
8: );
9: CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

## File: prisma/migrations/migration_lock.toml

```toml
1: # Please do not edit this file manually
2: # It should be added in your version-control system (e.g., Git)
3: provider = "postgresql"
```

## File: prisma/schema.prisma

```prisma
 1: // This is your Prisma schema file,
 2: // learn more about it in the docs: https://pris.ly/d/prisma-schema
 3:
 4: // Get a free hosted Postgres database in seconds: `npx create-db`
 5:
 6: generator client {
 7:   provider = "prisma-client-js"
 8: }
 9:
10: datasource db {
11:   provider = "postgresql"
12: }
13:
14: model User {
15:   id        Int      @id @default(autoincrement())
16:   email     String   @unique
17:   name      String?
18:   createdAt DateTime @default(now())
19:   updatedAt DateTime @updatedAt
20: }
```

## File: public/file.svg

```xml
1: <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
```

## File: public/globe.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
```

## File: public/next.svg

```xml
1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
```

## File: public/vercel.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
```

## File: public/window.svg

```xml
1: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
```

## File: repositories/user.ts

```typescript
 1: import { prisma } from "@/lib/db";
 2: import type { User } from "@prisma/client";
 3: export const userRepository = {
 4:   async findById(id: number): Promise<User | null> {
 5:     return prisma.user.findUnique({ where: { id } });
 6:   },
 7:   async findByEmail(email: string): Promise<User | null> {
 8:     return prisma.user.findUnique({ where: { email } });
 9:   },
10:   async create(data: { email: string; name?: string }): Promise<User> {
11:     return prisma.user.create({ data });
12:   },
13:   async update(
14:     id: number,
15:     data: { email?: string; name?: string }
16:   ): Promise<User> {
17:     return prisma.user.update({ where: { id }, data });
18:   },
19:   async delete(id: number): Promise<User> {
20:     return prisma.user.delete({ where: { id } });
21:   },
22:   async list(options?: { skip?: number; take?: number }): Promise<User[]> {
23:     return prisma.user.findMany({
24:       skip: options?.skip,
25:       take: options?.take,
26:     });
27:   },
28: };
```

## File: services/user.ts

```typescript
 1: import { userRepository } from "@/repositories/user";
 2: import { z } from "zod";
 3: const createUserSchema = z.object({
 4:   email: z.email(),
 5:   name: z.string().min(1).optional(),
 6: });
 7: const updateUserSchema = z.object({
 8:   email: z.email().optional(),
 9:   name: z.string().min(1).optional(),
10: });
11: export const userService = {
12:   async getById(id: number) {
13:     const user = await userRepository.findById(id);
14:     if (!user) {
15:       throw new Error("User not found");
16:     }
17:     return user;
18:   },
19:   async getByEmail(email: string) {
20:     return userRepository.findByEmail(email);
21:   },
22:   async create(data: z.infer<typeof createUserSchema>) {
23:     const validated = createUserSchema.parse(data);
24:     const existing = await userRepository.findByEmail(validated.email);
25:     if (existing) {
26:       throw new Error("Email already in use");
27:     }
28:     return userRepository.create(validated);
29:   },
30:   async update(id: number, data: z.infer<typeof updateUserSchema>) {
31:     const validated = updateUserSchema.parse(data);
32:     const existing = await userRepository.findById(id);
33:     if (!existing) {
34:       throw new Error("User not found");
35:     }
36:     return userRepository.update(id, validated);
37:   },
38:   async delete(id: number) {
39:     const existing = await userRepository.findById(id);
40:     if (!existing) {
41:       throw new Error("User not found");
42:     }
43:     return userRepository.delete(id);
44:   },
45:   async list(options?: { skip?: number; take?: number }) {
46:     return userRepository.list(options);
47:   },
48: };
```

## File: .env.example

```
1: # Database (Neon PostgreSQL)
2: DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
3: DIRECT_URL="postgresql://user:password@host/database?sslmode=require"
```

## File: .gitignore

```
 1: # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
 2:
 3: # dependencies
 4: /node_modules
 5: /.pnp
 6: .pnp.*
 7: .yarn/*
 8: !.yarn/patches
 9: !.yarn/plugins
10: !.yarn/releases
11: !.yarn/versions
12:
13: # testing
14: /coverage
15:
16: # next.js
17: /.next/
18: /out/
19:
20: # production
21: /build
22:
23: # misc
24: .DS_Store
25: *.pem
26:
27: # debug
28: npm-debug.log*
29: yarn-debug.log*
30: yarn-error.log*
31: .pnpm-debug.log*
32:
33: # env files
34: .env
35: .env.local
36: .env.*.local
37:
38: # vercel
39: .vercel
40:
41: # typescript
42: *.tsbuildinfo
43: next-env.d.ts
44:
45: # IDE
46: .vscode/
47: *.swp
48: *.swo
49:
50: # repomix
51: repomix.config.json
52: .repomixignore
53:
54: # obsidian
55: .obsidian/
56:
57: # prisma generated
58: /lib/generated/prisma
```

## File: AGENTS.md

````markdown
1: # AI Development Guide
2:
3: This document defines how AI coding assistants should work inside this repository.
4:
5: Supported assistants include:
6:
7: - ChatGPT
8: - Codex
9: - Claude Code
10: - Cursor
11: - OpenCode
12: - GitHub Copilot
13: - Any OpenAI-compatible coding agent
14:
15: ---
16:
17: # Mission
18:
19: Build maintainable, production-grade software.
20:
21: Readable code is preferred over clever code.
22:
23: Correctness is preferred over speed.
24:
25: Consistency is preferred over personal preference.
26:
27: ---
28:
29: # Technology Stack
30:
31: - Next.js 16
32: - React 19
33: - TypeScript
34: - Tailwind CSS v4
35: - shadcn/ui
36: - Prisma ORM
37: - PostgreSQL
38: - Neon Database
39: - Zod
40: - React Hook Form
41:
42: ---
43:
44: ## Architecture Rules
45:
46: Always follow this architecture:
47:
48: ` 49: UI
 50: ↓
 51: 
 52: Actions / Routes
 53: ↓
 54: 
 55: Services
 56: 
 57: ↓
 58: 
 59: Repositories
 60: 
 61: ↓
 62: 
 63: Database
 64:`
65:
66: Business logic must never exist inside UI components.
67:
68: Database access must never happen directly inside UI components.
69:
70: ---
71:
72: # Before Writing Code
73:
74: Always understand:
75:
76: - Existing architecture
77: - Current conventions
78: - File organization
79: - Naming conventions
80: - Existing abstractions
81:
82: Never introduce a second pattern when one already exists.
83:
84: ---
85:
86: # Component Rules
87:
88: Components should:
89:
90: - Have a single responsibility.
91: - Stay small.
92: - Prefer composition over inheritance.
93: - Avoid duplicated logic.
94: - Avoid unnecessary props.
95:
96: ---
97:
98: # TypeScript Rules
99:
100: - Never use `any`.
101: - Prefer inferred types.
102: - Use Zod for runtime validation.
103: - Export reusable types.
104: - Keep types close to the feature.
105:
106: ---
107:
108: # Next.js Rules
109:
110: - Prefer Server Components.
111: - Use Client Components only when required.
112: - Keep business logic outside UI.
113: - Use Server Actions when appropriate.
114: - Keep routes thin.
115:
116: ---
117:
118: # UI Rules
119:
120: Use existing shadcn/ui components whenever appropriate.
121:
122: Prefer:
123:
124: - Accessible components
125: - Consistent spacing
126: - Responsive layouts
127: - Semantic HTML
128:
129: Avoid generic AI-generated layouts.
130:
131: Every UI should feel intentional.
132:
133: ---
134:
135: # Design Quality Rules
136:
137: Every UI must follow the anti-slop rules defined in `docs/Design Rules.md`.
138:
139: Key rules:
140:
141: - Set the three dials (Design Variance, Motion Intensity, Visual Density) before layout.
142: - One accent color per page. No purple-to-blue gradients.
143: - Body text: `max-w-[65ch]`, `text-wrap: pretty`.
144: - Headlines: `text-wrap: balance`.
145: - Interactive elements: 40x40px minimum hit area, `scale(0.96)` press feedback.
146: - Shadows over borders. Three-layer shadow composition.
147: - Always honor `prefers-reduced-motion`.
148: - Break the uniform grid intentionally.
149: - No cards nested inside cards.
150: - No em-dashes or en-dashes in visible text.
151:
152: Flag these anti-patterns immediately:
153:
154: - Inter used for everything without justification.
155: - Purple-to-blue gradient backgrounds.
156: - Uniform equal spacing everywhere.
157: - Default Tailwind colors used without customization.
158:
159: Full rules: `docs/Design Rules.md`
160:
161: ---
162:
163: # Styling Rules
164:
165: - Use Tailwind consistently.
166: - Reuse design tokens from globals.css.
167: - Avoid arbitrary values unless justified.
168: - Maintain consistent spacing.
169: - Prefer shadows over borders for visual separation.
170:
171: ---
172:
173: # Performance
174:
175: Always optimize for:
176:
177: - Small bundles
178: - Lazy loading
179: - Minimal hydration
180: - Server rendering
181: - Efficient data fetching
182:
183: ---
184:
185: # Documentation
186:
187: Whenever architecture changes:
188:
189: - Update documentation.
190: - Keep README accurate.
191: - Document new conventions.
192:
193: ---
194:
195: # Before Finishing
196:
197: Verify:
198:
199: - TypeScript passes
200: - ESLint passes
201: - Build succeeds
202: - No dead code
203: - No duplicated logic
204: - Naming is consistent
205: - Imports are clean
206: - Documentation updated if required
207:
208: If something can be simplified without changing behavior, simplify it.
209:
210: ---
211:
212: # Philosophy
213:
214: Readable code is more valuable than clever code.
215:
216: Consistency is more valuable than personal preference.
217:
218: Long-term maintainability is more important than short-term speed.
````

## File: components.json

```json
 1: {
 2:   "$schema": "https://ui.shadcn.com/schema.json",
 3:   "style": "base-nova",
 4:   "rsc": true,
 5:   "tsx": true,
 6:   "tailwind": {
 7:     "config": "",
 8:     "css": "app/globals.css",
 9:     "baseColor": "neutral",
10:     "cssVariables": true,
11:     "prefix": ""
12:   },
13:   "iconLibrary": "lucide",
14:   "rtl": false,
15:   "aliases": {
16:     "components": "@/components",
17:     "utils": "@/lib/utils",
18:     "ui": "@/components/ui",
19:     "lib": "@/lib",
20:     "hooks": "@/hooks"
21:   },
22:   "menuColor": "default",
23:   "menuAccent": "subtle",
24:   "registries": {}
25: }
```

## File: env.ts

```typescript
 1: import { createEnv } from "@t3-oss/env-nextjs";
 2: import * as z from "zod";
 3: export const env = createEnv({
 4:   server: {
 5:     DATABASE_URL: z.url(),
 6:     DIRECT_URL: z.url().optional()
 7:   },
 8:   client: {},
 9:   runtimeEnv: {
10:     DATABASE_URL: process.env.DATABASE_URL,
11:     DIRECT_URL: process.env.DIRECT_URL
12:   }
13: });
```

## File: eslint.config.mjs

```javascript
 1: import { defineConfig, globalIgnores } from "eslint/config";
 2: import nextVitals from "eslint-config-next/core-web-vitals";
 3: import nextTs from "eslint-config-next/typescript";
 4: const eslintConfig = defineConfig([
 5:   ...nextVitals,
 6:   ...nextTs,
 7:   globalIgnores([
 8:     ".next/**",
 9:     "out/**",
10:     "build/**",
11:     "next-env.d.ts",
12:   ]),
13: ]);
14: export default eslintConfig;
```

## File: jest.config.ts

```typescript
 1: import type { Config } from "jest";
 2: import nextJest from "next/jest.js";
 3: const createJestConfig = nextJest({ dir: "./" });
 4: const config: Config = {
 5:   testEnvironment: "jsdom",
 6:   coverageProvider: "v8",
 7:   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 8:   moduleNameMapper: {
 9:     "^@/(.*)$": "<rootDir>/$1",
10:   },
11: };
12: export default createJestConfig(config);
```

## File: jest.setup.ts

```typescript
1: import "@testing-library/jest-dom";
```

## File: knip.json

```json
 1: {
 2:   "$schema": "https://unpkg.com/knip@6/schema.json",
 3:   "tags": ["-lintignore"],
 4:   "prettier": {
 5:     "config": [".prettierrc"]
 6:   },
 7:   "eslint": {
 8:     "config": ["eslint.config.mjs"]
 9:   },
10:   "typescript": {
11:     "config": ["tsconfig.json"]
12:   },
13:   "postcss": {
14:     "config": ["postcss.config.{mjs,js}"]
15:   },
16:   "ignore": [
17:     "components/ui/*",
18:     "prisma/schema.prisma",
19:     "lib/db.ts",
20:     "repositories/*.ts",
21:     "services/*.ts",
22:     "env.ts"
23:   ],
24:   "ignoreDependencies": [
25:     "@neondatabase/serverless",
26:     "@prisma/adapter-neon",
27:     "@prisma/adapter-pg",
28:     "@prisma/client",
29:     "pg",
30:     "ws",
31:     "react-hook-form",
32:     "@types/pg",
33:     "@types/ws",
34:     "ts-node",
35:     "tsx"
36:   ]
37: }
```

## File: next.config.ts

```typescript
1: import type { NextConfig } from "next";
2: const nextConfig: NextConfig = {
3: };
4: export default nextConfig;
```

## File: package.json

```json
 1: {
 2:   "name": "nextjs",
 3:   "version": "0.1.0",
 4:   "private": true,
 5:   "scripts": {
 6:     "dev": "next dev",
 7:     "build": "next build",
 8:     "start": "next start",
 9:     "lint": "eslint",
10:     "knip": "knip",
11:     "prepare": "husky",
12:     "lint-staged": "lint-staged",
13:     "format": "prettier --write .",
14:     "test": "jest"
15:   },
16:   "lint-staged": {
17:     "*.{js,jsx,ts,tsx}": [
18:       "eslint --fix",
19:       "prettier --write"
20:     ],
21:     "*.{json,md,html,css}": [
22:       "prettier --write"
23:     ]
24:   },
25:   "dependencies": {
26:     "@base-ui/react": "^1.6.0",
27:     "@neondatabase/serverless": "^1.1.0",
28:     "@prisma/adapter-neon": "^7.8.0",
29:     "@prisma/adapter-pg": "^7.8.0",
30:     "@prisma/client": "^7.8.0",
31:     "@t3-oss/env-nextjs": "^0.13.11",
32:     "class-variance-authority": "^0.7.1",
33:     "clsx": "^2.1.1",
34:     "dotenv": "^17.4.2",
35:     "lucide-react": "^1.25.0",
36:     "next": "16.2.10",
37:     "pg": "^8.22.0",
38:     "react": "19.2.4",
39:     "react-dom": "19.2.4",
40:     "react-hook-form": "^7.81.0",
41:     "shadcn": "^4.13.0",
42:     "tailwind-merge": "^3.6.0",
43:     "tw-animate-css": "^1.4.0",
44:     "ws": "^8.21.1",
45:     "zod": "^4.4.3"
46:   },
47:   "devDependencies": {
48:     "@tailwindcss/postcss": "^4",
49:     "@testing-library/dom": "^10.4.1",
50:     "@testing-library/jest-dom": "^6.9.1",
51:     "@testing-library/react": "^16.3.2",
52:     "@types/jest": "^30.0.0",
53:     "@types/node": "^20.19.43",
54:     "@types/pg": "^8.20.0",
55:     "@types/react": "^19",
56:     "@types/react-dom": "^19",
57:     "@types/ws": "^8.18.1",
58:     "eslint": "^9.39.5",
59:     "eslint-config-next": "16.2.10",
60:     "husky": "^9.1.7",
61:     "jest": "^30.4.2",
62:     "jest-environment-jsdom": "^30.4.1",
63:     "knip": "^6.27.0",
64:     "lint-staged": "^17.0.8",
65:     "prettier": "^3.9.5",
66:     "prisma": "^7.8.0",
67:     "tailwindcss": "^4",
68:     "ts-node": "^10.9.2",
69:     "tsx": "^4.23.1",
70:     "typescript": "^5.9.3"
71:   }
72: }
```

## File: pnpm-workspace.yaml

```yaml
1: allowBuilds:
2:   '@prisma/engines': false
3:   esbuild: false
4:   prisma: false
5:   sharp: set this to true or false
6:   unrs-resolver: set this to true or false
7: ignoredBuiltDependencies:
8:   - sharp
9:   - unrs-resolver
```

## File: postcss.config.mjs

```javascript
1: const config = {
2:   plugins: {
3:     "@tailwindcss/postcss": {},
4:   },
5: };
6: export default config;
```

## File: prisma.config.ts

```typescript
1: import "dotenv/config";
2: import { defineConfig, env } from "prisma/config";
3: export default defineConfig({
4:   datasource: {
5:     url: env("DIRECT_URL") || env("DATABASE_URL")
6:   }
7: });
```

## File: README.md

````markdown
1: # Project Name
2: nextjs
3:
4: > A modern, scalable, AI-friendly web application built with Next.js 16, React 19, TypeScript, Prisma, Neon, Tailwind CSS v4, and shadcn/ui.
5:
6: ---
7:
8: ## Overview
9:
10: This project is being built with a strong focus on:
11:
12: - Scalability
13: - Performance
14: - Maintainability
15: - Developer Experience
16: - AI-assisted development
17: - Clean Architecture
18:
19: The goal is to establish a production-ready foundation before implementing application features.
20:
21: ---
22:
23: ## Tech Stack
24:
25: | Category | Technology |
26: |----------|------------|
27: | Framework | Next.js 16 |
28: | Language | TypeScript |
29: | UI | React 19 |
30: | Styling | Tailwind CSS v4 |
31: | Components | shadcn/ui |
32: | Database | PostgreSQL |
33: | ORM | Prisma |
34: | Database Provider | Neon |
35: | Validation | Zod |
36: | Forms | React Hook Form |
37: | Testing | Jest |
38: | Linting | ESLint |
39: | Formatting | Prettier |
40: | Git Hooks | Husky + lint-staged |
41:
42: ---
43:
44: ## Project Goals
45:
46: - Build a clean and maintainable architecture.
47: - Keep business logic independent from UI.
48: - Prefer Server Components whenever possible.
49: - Minimize unnecessary dependencies.
50: - Write self-documenting code.
51: - Produce an AI-friendly codebase.
52:
53: ---
54:
55: ## Project Structure
56:
57: ` 58: app/
 59: components/
 60: docs/
 61: lib/
 62: prisma/
 63: public/
 64:`
65:
66: As the project grows, additional directories will include:
67:
68: ` 69: features/
 70: services/
 71: repositories/
 72: actions/
 73: hooks/
 74: validators/
 75: schemas/
 76: types/
 77: constants/
 78:`
79:
80: ---
81:
82: ## Development
83:
84: Install dependencies
85:
86: `bash
 87: pnpm install
 88: `
89:
90: Run development server
91:
92: `bash
 93: pnpm dev
 94: `
95:
96: Run lint
97:
98: `bash
 99: pnpm lint
100: `
101:
102: Run tests
103:
104: `bash
105: pnpm test
106: `
107:
108: Run formatter
109:
110: `bash
111: pnpm format
112: `
113:
114: ---
115:
116: ## Documentation
117:
118: Project documentation is located in the `docs/` directory.
119:
120: - Architecture
121: - Coding Standards
122: - Components
123: - Tech Stack
124: - API
125: - Project Context
126:
127: ---
128:
129: ## Principles
130:
131: - Performance First
132: - Simplicity over Complexity
133: - Server First
134: - Type Safety
135: - Accessibility
136: - Reusability
137: - Consistency
138:
139: ---
140:
141: ## Status
142:
143: Current phase:
144:
145: - ✅ Project bootstrap
146: - ✅ Architecture setup
147: - ✅ Documentation
148: - ✅ Database configuration
149: - ⏳ Authentication
150: - ⏳ Features
151: - ⏳ Production deployment
152:
153: ---
154:
155: ## License
156:
157: Private project.
````

## File: tsconfig.json

```json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2017",
 4:     "lib": ["dom", "dom.iterable", "esnext"],
 5:     "allowJs": true,
 6:     "skipLibCheck": true,
 7:     "strict": true,
 8:     "noEmit": true,
 9:     "esModuleInterop": true,
10:     "module": "esnext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "react-jsx",
15:     "incremental": true,
16:     "plugins": [
17:       {
18:         "name": "next"
19:       }
20:     ],
21:     "paths": {
22:       "@/*": ["./*"]
23:     }
24:   },
25:   "include": [
26:     "next-env.d.ts",
27:     "**/*.ts",
28:     "**/*.tsx",
29:     ".next/types/**/*.ts",
30:     ".next/dev/types/**/*.ts",
31:     "**/*.mts"
32:   ],
33:   "exclude": ["node_modules"]
34: }
```
