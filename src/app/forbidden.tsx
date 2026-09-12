import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 text-destructive mb-6 flex size-16 items-center justify-center rounded-2xl ring-8 ring-destructive/5">
        <ShieldAlert className="size-8" aria-hidden="true" />
      </div>

      <h1 className="text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        403 Forbidden
      </h1>

      <p className="text-muted-foreground mt-3 max-w-[65ch] text-base text-pretty">
        You do not have permission to access this area. The instructor workspace
        is reserved for instructors and administrators.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          size="default"
          className="min-h-10 min-w-10 active:scale-[0.98] transition-transform"
          nativeButton={false}
          render={
            <Link href="/courses">
              <ArrowLeft className="mr-2 size-4" />
              Explore Catalog
            </Link>
          }
        />

        <Button
          size="default"
          className="min-h-10 min-w-10 active:scale-[0.98] transition-transform"
          nativeButton={false}
          render={
            <Link href="/">
              <Home className="mr-2 size-4" />
              Return Home
            </Link>
          }
        />
      </div>
    </div>
  );
}
