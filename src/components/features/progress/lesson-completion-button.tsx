"use client";

import { useState } from "react";
import { toggleLessonCompletionAction } from "@/actions/progress";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { gooeyToast } from "@/components/ui/goey-toaster";

export interface LessonCompletionButtonProps {
  lessonId: string;
  initialIsCompleted?: boolean;
  onToggleSuccess?: (completed: boolean) => void;
  className?: string;
}

export function LessonCompletionButton({
  lessonId,
  initialIsCompleted = false,
  onToggleSuccess,
  className,
}: LessonCompletionButtonProps) {
  const [prevInitial, setPrevInitial] = useState(initialIsCompleted);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (prevInitial !== initialIsCompleted) {
    setPrevInitial(initialIsCompleted);
    setIsCompleted(initialIsCompleted);
  }

  const handleToggle = async () => {
    if (isLoading) return;

    const nextState = !isCompleted;
    setIsLoading(true);
    setError(null);

    try {
      const result = await toggleLessonCompletionAction({
        lessonId,
        completed: nextState,
      });

      if (!result.success) {
        setError(result.error);
        gooeyToast.error(result.error);
        return;
      }

      setIsCompleted(result.data.progress.isCompleted);
      if (result.data.progress.isCompleted) {
        if (result.data.percentage === 100) {
          gooeyToast.success("Course 100% Completed! Congratulations! 🎉");
        } else {
          gooeyToast.success("Lesson marked as complete!");
        }
      } else {
        gooeyToast.info("Lesson marked as incomplete");
      }
      onToggleSuccess?.(result.data.progress.isCompleted);
    } catch {
      const message = "Failed to update lesson completion. Please try again.";
      setError(message);
      gooeyToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        onClick={handleToggle}
        disabled={isLoading}
        variant={isCompleted ? "outline" : "default"}
        className={`min-h-10 min-w-10 gap-2 transition-transform active:scale-[0.96] motion-reduce:transform-none ${
          isCompleted
            ? "border-emerald-600/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 hover:text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
            : ""
        } ${className ?? ""}`}
        aria-pressed={isCompleted}
        aria-label={
          isCompleted ? "Mark lesson incomplete" : "Mark lesson complete"
        }
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : isCompleted ? (
          <Check
            className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
        ) : null}
        <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
      </Button>
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
