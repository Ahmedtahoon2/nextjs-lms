import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Layers, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative flex flex-1 flex-col items-start justify-center px-6 pt-24 pb-16 md:px-12 lg:px-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.95 0.02 250),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.2 0.02 250),transparent)]" />

        <Badge variant="secondary" className="mb-6">
          Foundation Phase
        </Badge>

        <h1
          className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          style={{ textWrap: "balance" }}
        >
          Build maintainable software with intentional design
        </h1>

        <p
          className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground"
          style={{ textWrap: "pretty" }}
        >
          A Next.js 16 project with clean architecture, strict TypeScript, and
          design rules that prevent generic AI output. Every component earns its
          place.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="active:scale-[0.96] transition-transform"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="active:scale-[0.96] transition-transform"
          >
            Documentation
          </Button>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Layers className="size-5 text-primary" />
            </div>
            <h2
              className="text-lg font-medium text-foreground"
              style={{ textWrap: "balance" }}
            >
              Layered Architecture
            </h2>
            <p
              className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
              style={{ textWrap: "pretty" }}
            >
              UI, Actions, Services, Repositories, Database. Business logic
              never touches the presentation layer.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="size-5 text-primary" />
            </div>
            <h2
              className="text-lg font-medium text-foreground"
              style={{ textWrap: "balance" }}
            >
              Strict TypeScript
            </h2>
            <p
              className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
              style={{ textWrap: "pretty" }}
            >
              No any types. Zod for runtime validation. Inferred types
              preferred. Types stay close to the feature.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="size-5 text-primary" />
            </div>
            <h2
              className="text-lg font-medium text-foreground"
              style={{ textWrap: "balance" }}
            >
              Design Quality
            </h2>
            <p
              className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground"
              style={{ textWrap: "pretty" }}
            >
              Anti-slop rules, three dials for aesthetic direction, and
              pre-flight checks before every ship.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[65ch]">
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              style={{ textWrap: "balance" }}
            >
              Ready to build?
            </h2>
            <p
              className="mt-2 text-muted-foreground"
              style={{ textWrap: "pretty" }}
            >
              The foundation is set. Architecture, design rules, and tooling are
              in place. Start building features.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="active:scale-[0.96] transition-transform shrink-0"
          >
            View Documentation
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
