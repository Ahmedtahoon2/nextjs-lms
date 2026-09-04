import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function CTA() {
  return (
    <section id="cta" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2
            className="text-foreground max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ textWrap: "balance" }}
          >
            Start your learning journey today
          </h2>
          <p
            className="text-muted-foreground mt-3 max-w-[60ch] text-base leading-relaxed sm:text-lg"
            style={{ textWrap: "pretty" }}
          >
            Create a free account and explore hundreds of courses. No credit
            card required.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="gap-2"
              nativeButton={false}
              render={<a href="#" />}
            >
              Create Free Account
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CTA };
