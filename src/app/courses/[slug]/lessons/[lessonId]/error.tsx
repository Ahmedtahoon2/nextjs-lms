"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function LessonPlayerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lesson Player Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        Failed to load lesson content
      </h1>
      <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground text-pretty">
        We encountered an error loading this lesson. You might need to refresh
        or verify your enrollment status.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          onClick={() => reset()}
          className="min-h-10 gap-2 transition-transform active:scale-[0.96] motion-reduce:transform-none"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>Try Again</span>
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/courses" />}
          className="min-h-10 transition-transform active:scale-[0.96] motion-reduce:transform-none"
        >
          Back to Courses
        </Button>
      </div>
    </div>
  );
}
