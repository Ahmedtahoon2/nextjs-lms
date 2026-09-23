"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useState, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface CourseFilterBarProps {
  categories: string[];
  currentSearch?: string;
  currentCategory?: string;
  currentLevel?: string;
  currentSort?: string;
}

export function CourseFilterBar({
  categories,
  currentSearch = "",
  currentCategory = "",
  currentLevel = "",
  currentSort = "newest",
}: CourseFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Reset page when filter changes (unless changing page itself)
      if (!("page" in updates)) {
        params.delete("page");
      }

      for (const [key, value] of Object.entries(updates)) {
        if (
          !value ||
          value === "ALL" ||
          (value === "newest" && key === "sort")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm.trim() || null });
  };

  const handleClearAll = () => {
    setSearchTerm("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters = Boolean(
    currentSearch ||
    currentCategory ||
    currentLevel ||
    (currentSort && currentSort !== "newest"),
  );

  return (
    <div className="border-border/50 bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-xs">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search
            className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search courses by title or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-h-10 pr-8 pl-9 text-sm"
            aria-label="Search courses"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                updateFilters({ search: null });
              }}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 p-1"
              aria-label="Clear search text"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </form>

        {/* Filters and Sorting controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <select
            value={currentCategory}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="border-input bg-background text-foreground focus-visible:ring-ring min-h-10 rounded-md border px-3 text-xs font-medium focus-visible:ring-2 focus-visible:outline-hidden"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Level Dropdown */}
          <select
            value={currentLevel}
            onChange={(e) => updateFilters({ level: e.target.value })}
            className="border-input bg-background text-foreground focus-visible:ring-ring min-h-10 rounded-md border px-3 text-xs font-medium focus-visible:ring-2 focus-visible:outline-hidden"
            aria-label="Filter by difficulty level"
          >
            <option value="">All Levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="ALL_LEVELS">All Levels Welcome</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={currentSort}
            onChange={(e) => updateFilters({ sort: e.target.value })}
            className="border-input bg-background text-foreground focus-visible:ring-ring min-h-10 rounded-md border px-3 text-xs font-medium focus-visible:ring-2 focus-visible:outline-hidden"
            aria-label="Sort courses by"
          >
            <option value="newest">Newest First</option>
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground min-h-10 gap-1.5 px-2.5 text-xs active:scale-[0.96]"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear</span>
            </Button>
          )}

          {isPending && (
            <div
              className="text-muted-foreground flex items-center px-1"
              role="status"
              aria-label="Loading results"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
