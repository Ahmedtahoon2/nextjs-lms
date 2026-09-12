"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CourseStatus } from "@prisma/client";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { publishCourseAction, unpublishCourseAction } from "@/actions/course";
import { Button } from "@/components/ui/button";
import { Globe, Lock, Loader2 } from "lucide-react";

interface PublishButtonProps {
  courseId: string;
  status: CourseStatus;
  moduleCount: number;
  lessonCount: number;
}

export function PublishButton({
  courseId,
  status,
  moduleCount,
  lessonCount,
}: PublishButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const isPublished = status === CourseStatus.PUBLISHED;
  const isArchived = status === CourseStatus.ARCHIVED;

  const handleTogglePublish = async () => {
    if (isArchived) return;

    if (!isPublished) {
      if (moduleCount < 1 || lessonCount < 1) {
        gooeyToast.error(
          "A course must have at least one module and at least one lesson before publishing.",
        );
        return;
      }

      setIsLoading(true);
      try {
        const result = await publishCourseAction(courseId);
        if (result.success) {
          gooeyToast.success(
            "Course published! It is now publicly visible in the catalog.",
          );
          router.refresh();
        } else {
          gooeyToast.error(result.error || "Failed to publish course.");
        }
      } catch {
        gooeyToast.error("Failed to publish course. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      const confirmed = window.confirm(
        "Unpublishing this course will return it to DRAFT. New students will not be able to find or enroll in it. Do you want to continue?",
      );
      if (!confirmed) return;

      setIsLoading(true);
      try {
        const result = await unpublishCourseAction(courseId);
        if (result.success) {
          gooeyToast.success("Course unpublished and returned to Draft.");
          router.refresh();
        } else {
          gooeyToast.error(result.error || "Failed to unpublish course.");
        }
      } catch {
        gooeyToast.error("Failed to unpublish course. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isArchived) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="min-h-10 min-w-10 opacity-60 text-xs"
      >
        Archived Course
      </Button>
    );
  }

  return (
    <Button
      variant={isPublished ? "outline" : "default"}
      size="sm"
      disabled={isLoading}
      onClick={handleTogglePublish}
      className={`min-h-10 min-w-10 active:scale-[0.98] font-medium transition-all ${
        isPublished
          ? "border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10"
          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
      }`}
    >
      {isLoading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : isPublished ? (
        <Lock className="mr-2 size-4" />
      ) : (
        <Globe className="mr-2 size-4" />
      )}
      {isPublished ? "Unpublish Course" : "Publish Course"}
    </Button>
  );
}
