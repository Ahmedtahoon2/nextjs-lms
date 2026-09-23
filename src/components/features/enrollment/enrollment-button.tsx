"use client";

import { useState } from "react";
import { enrollInCourseAction } from "@/actions/enrollment";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { gooeyToast } from "@/components/ui/goey-toaster";

export interface EnrollmentButtonProps {
  courseId: string;
  initialIsEnrolled?: boolean;
  onEnrollSuccess?: () => void;
  className?: string;
}

export function EnrollmentButton({
  courseId,
  initialIsEnrolled = false,
  onEnrollSuccess,
  className,
}: EnrollmentButtonProps) {
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    if (isEnrolled || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await enrollInCourseAction({ courseId });

      if (!result.success) {
        setError(result.error);
        gooeyToast.error(result.error);
        return;
      }

      setIsEnrolled(true);
      gooeyToast.success("Successfully enrolled in course!");
      onEnrollSuccess?.();
    } catch {
      const message = "An unexpected error occurred. Please try again.";
      setError(message);
      gooeyToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className={`border-primary/20 bg-primary/5 text-primary min-h-10 min-w-10 cursor-default gap-2 opacity-100 ${
          className ?? ""
        }`}
        aria-label="Already enrolled in this course"
      >
        <Check className="h-4 w-4" aria-hidden="true" />
        <span>Enrolled</span>
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        onClick={handleEnroll}
        disabled={isLoading}
        className={`min-h-10 min-w-10 gap-2 transition-transform active:scale-[0.96] motion-reduce:transform-none ${
          className ?? ""
        }`}
        aria-label="Enroll in course"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Enrolling...</span>
          </>
        ) : (
          <span>Enroll Now</span>
        )}
      </Button>
      {error && (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
