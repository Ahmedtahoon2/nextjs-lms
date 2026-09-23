"use client";

import { LessonCompletionButton } from "@/components/features/progress/lesson-completion-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface PlayerFooterProps {
  courseSlug: string;
  lessonId: string;
  previousLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
  isCompleted?: boolean;
  canTrackProgress?: boolean;
  currentIndex?: number;
  totalLessons?: number;
}

export function PlayerFooter({
  courseSlug,
  lessonId,
  previousLesson,
  nextLesson,
  isCompleted = false,
  canTrackProgress = false,
  currentIndex,
  totalLessons,
}: PlayerFooterProps) {
  return (
    <footer className="border-border/60 bg-background/95 sticky bottom-0 z-20 flex min-h-16 w-full items-center justify-between gap-3 border-t px-4 py-3 shadow-md backdrop-blur-md sm:px-6">
      {/* Previous Lesson */}
      <div className="flex items-center">
        {previousLesson ? (
          <Link
            href={`/courses/${courseSlug}/lessons/${previousLesson.id}`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className:
                "min-h-10 gap-1.5 px-3 transition-transform active:scale-[0.96] motion-reduce:transform-none",
            })}
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="min-h-10 gap-1.5 px-3 opacity-40"
            aria-disabled="true"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        )}
      </div>

      {/* Center: Completion / Position Indicator */}
      <div className="flex items-center gap-4">
        {currentIndex !== undefined && totalLessons !== undefined && (
          <span className="text-muted-foreground hidden text-xs tabular-nums md:inline">
            Lesson {currentIndex} of {totalLessons}
          </span>
        )}

        {canTrackProgress && (
          <LessonCompletionButton
            lessonId={lessonId}
            initialIsCompleted={isCompleted}
          />
        )}
      </div>

      {/* Next Lesson */}
      <div className="flex items-center">
        {nextLesson ? (
          <Link
            href={`/courses/${courseSlug}/lessons/${nextLesson.id}`}
            className={buttonVariants({
              size: "sm",
              className:
                "min-h-10 gap-1.5 px-3 transition-transform active:scale-[0.96] motion-reduce:transform-none",
            })}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="min-h-10 gap-1.5 px-3 opacity-40"
            aria-disabled="true"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        )}
      </div>
    </footer>
  );
}
