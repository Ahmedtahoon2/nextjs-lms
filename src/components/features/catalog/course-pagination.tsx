import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | string[] | undefined>;
}

export function CoursePagination({
  currentPage,
  totalPages,
  searchParams = {},
}: CoursePaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") {
        if (Array.isArray(value)) {
          for (const v of value) params.append(key, v);
        } else {
          params.set(key, value);
        }
      }
    }
    params.set("page", String(page));
    return `/courses?${params.toString()}`;
  };

  // Generate page numbers window
  const pages: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex items-center justify-center gap-1.5 pt-6 pb-2"
      aria-label="Course catalog pagination"
    >
      {/* Previous Page Link */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="border-input bg-background hover:bg-muted text-foreground inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border text-sm font-medium transition-transform active:scale-[0.96] motion-reduce:transform-none"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          className="border-input/50 text-muted-foreground/40 inline-flex min-h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-md border text-sm"
          aria-disabled="true"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </span>
      )}

      {/* Page Numbers */}
      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return isCurrent ? (
          <span
            key={p}
            className="bg-primary text-primary-foreground inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-sm font-semibold shadow-xs tabular-nums"
            aria-current="page"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={createPageUrl(p)}
            className="border-input bg-background hover:bg-muted text-foreground inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border text-sm font-medium transition-transform tabular-nums active:scale-[0.96] motion-reduce:transform-none"
            aria-label={`Go to page ${p}`}
          >
            {p}
          </Link>
        );
      })}

      {/* Next Page Link */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="border-input bg-background hover:bg-muted text-foreground inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border text-sm font-medium transition-transform active:scale-[0.96] motion-reduce:transform-none"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          className="border-input/50 text-muted-foreground/40 inline-flex min-h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-md border text-sm"
          aria-disabled="true"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
