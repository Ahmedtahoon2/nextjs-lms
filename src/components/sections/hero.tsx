import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-muted/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            Trusted by 50,000+ learners
          </Badge>

          <h1
            className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            style={{ textWrap: "balance" }}
          >
            Master new skills with expert-led courses
          </h1>

          <p
            className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ textWrap: "pretty" }}
          >
            Join thousands of learners advancing their careers through
            high-quality, structured courses taught by industry professionals.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="gap-2"
              nativeButton={false}
              render={<a href="#" />}
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              nativeButton={false}
              render={<a href="#" />}
            >
              <Play className="size-3.5" />
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
