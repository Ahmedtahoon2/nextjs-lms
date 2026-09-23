"use client";

import { usePlayerContext } from "@/components/features/player/player-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Menu, PanelLeftClose } from "lucide-react";
import Link from "next/link";

export interface PlayerHeaderProps {
  courseTitle: string;
  courseSlug: string;
  lessonTitle: string;
}

export function PlayerHeader({
  courseTitle,
  courseSlug,
  lessonTitle,
}: PlayerHeaderProps) {
  const { isSidebarOpen, toggleSidebar } = usePlayerContext();

  return (
    <header className="border-border/60 bg-background/95 sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b px-4 shadow-xs backdrop-blur-md sm:px-6">
      {/* Left: Back Link & Breadcrumb */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Link
          href={`/courses/${courseSlug}`}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "min-h-10 min-w-10 px-2 transition-transform active:scale-[0.96] motion-reduce:transform-none",
          })}
          aria-label="Back to course overview"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden text-xs font-medium sm:inline">Overview</span>
        </Link>

        <div className="bg-border/60 h-4 w-px" aria-hidden="true" />

        <div className="flex min-w-0 flex-col">
          <span className="text-muted-foreground truncate text-[11px] font-medium">
            {courseTitle}
          </span>
          <h1 className="font-heading text-foreground truncate text-xs font-semibold sm:text-sm">
            {lessonTitle}
          </h1>
        </div>
      </div>

      {/* Right: Mobile Drawer Toggle */}
      <div className="flex items-center gap-2 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSidebar}
          className="min-h-10 min-w-10 gap-1.5 px-3 transition-transform active:scale-[0.96] motion-reduce:transform-none"
          aria-expanded={isSidebarOpen}
          aria-controls="player-curriculum-drawer"
          aria-label={
            isSidebarOpen
              ? "Close course curriculum menu"
              : "Open course curriculum menu"
          }
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <span className="text-xs font-medium">Curriculum</span>
        </Button>
      </div>
    </header>
  );
}
