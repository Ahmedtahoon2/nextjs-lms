"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CourseStatus } from "@prisma/client";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { archiveCourseAction, deleteCourseAction } from "@/actions/course";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Archive, Trash2, Loader2 } from "lucide-react";

interface CourseDangerZoneProps {
  courseId: string;
  courseTitle: string;
  status: CourseStatus;
}

export function CourseDangerZone({
  courseId,
  courseTitle,
  status,
}: CourseDangerZoneProps) {
  const router = useRouter();
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleArchive = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to archive "${courseTitle}"? Students will no longer be able to enroll, and current students will lose access to new updates.`,
    );
    if (!confirmed) return;

    setIsArchiving(true);
    try {
      const result = await archiveCourseAction(courseId);
      if (result.success) {
        gooeyToast.success("Course archived successfully.");
        router.refresh();
      } else {
        gooeyToast.error(result.error || "Failed to archive course.");
      }
    } catch {
      gooeyToast.error("Failed to archive course. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${courseTitle}"? This will delete all modules, lessons, and student progress records. This action CANNOT be undone.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const result = await deleteCourseAction(courseId);
      if (result.success) {
        gooeyToast.success("Course deleted successfully.");
        router.push("/instructor/courses");
      } else {
        gooeyToast.error(result.error || "Failed to delete course.");
      }
    } catch {
      gooeyToast.error("Failed to delete course. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isArchived = status === CourseStatus.ARCHIVED;

  return (
    <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-6 shadow-xs">
      <div className="text-destructive flex items-center gap-2.5">
        <AlertTriangle className="size-5" />
        <h3 className="text-base font-semibold">Danger Zone</h3>
      </div>
      <p className="text-muted-foreground mt-1 max-w-[65ch] text-xs">
        These actions are destructive. Please proceed with caution.
      </p>

      <div className="divide-destructive/10 mt-6 flex flex-col gap-4 divide-y">
        {/* Archive Action */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-foreground text-sm font-medium">
              Archive this course
            </h4>
            <p className="text-muted-foreground text-xs">
              {isArchived
                ? "This course is currently archived."
                : "Remove course from public view while preserving student records."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={isArchiving || isArchived}
            onClick={handleArchive}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 min-h-10 min-w-10 active:scale-[0.98]"
          >
            {isArchiving ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Archive className="mr-2 size-4" />
            )}
            {isArchived ? "Archived" : "Archive Course"}
          </Button>
        </div>

        {/* Delete Action */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-foreground text-sm font-medium">
              Delete this course
            </h4>
            <p className="text-muted-foreground text-xs">
              Permanently remove this course and all its modules and lessons.
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={handleDelete}
            className="min-h-10 min-w-10 active:scale-[0.98]"
          >
            {isDeleting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 size-4" />
            )}
            Delete Course
          </Button>
        </div>
      </div>
    </div>
  );
}
