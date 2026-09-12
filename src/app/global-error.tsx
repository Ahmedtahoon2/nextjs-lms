"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen items-center justify-center antialiased">
        <main className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-12 text-center">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </h1>
            <p className="text-muted-foreground text-sm">
              An unexpected error occurred. Our team has been notified.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="bg-primary text-primary-foreground focus-visible:outline-ring inline-flex min-h-10 min-w-25 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.96]"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
