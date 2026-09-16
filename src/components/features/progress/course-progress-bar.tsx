"use client";

import { CheckCircle2, Trophy } from "lucide-react";

export interface CourseProgressBarProps {
  progressPercentage: number;
  totalLessons?: number;
  completedLessons?: number;
  showCelebration?: boolean;
  className?: string;
}

export function CourseProgressBar({
  progressPercentage,
  totalLessons,
  completedLessons,
  showCelebration = true,
  className,
}: CourseProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, progressPercentage));
  const isComplete = clampedPercentage === 100;

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Course Progress</span>
        <div className="flex items-center gap-2">
          {completedLessons !== undefined && totalLessons !== undefined && (
            <span className="text-muted-foreground tabular-nums">
              {completedLessons}/{totalLessons} lessons
            </span>
          )}
          <span className="font-semibold text-foreground tabular-nums">
            {clampedPercentage}% Complete
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course completion progress"
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted shadow-inner"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out motion-reduce:transition-none ${
            isComplete
              ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              : "bg-primary"
          }`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      {/* 100% Celebration Visual */}
      {isComplete && showCelebration && (
        <div
          role="status"
          className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Trophy className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold leading-none">
              Course Completed!
            </span>
            <span className="text-xs opacity-90">
              You have completed all lessons in this course.
            </span>
          </div>
          <CheckCircle2
            className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
