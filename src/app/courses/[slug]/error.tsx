"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseOverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Course Overview Error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="font-heading text-xl font-bold">
        Failed to load course details
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md text-xs leading-relaxed text-pretty">
        We encountered an error loading this course. It may have been
        unpublished or removed.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button
          type="button"
          onClick={() => reset()}
          className="min-h-10 gap-2 active:scale-[0.96]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/courses" />}
          className="min-h-10 active:scale-[0.96]"
        >
          Back to Courses
        </Button>
      </div>
    </div>
  );
}
