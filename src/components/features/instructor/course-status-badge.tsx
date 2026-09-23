import { CourseStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CourseStatusBadgeProps {
  status: CourseStatus;
  className?: string;
}

export function CourseStatusBadge({
  status,
  className,
}: CourseStatusBadgeProps) {
  switch (status) {
    case CourseStatus.PUBLISHED:
      return (
        <Badge
          variant="outline"
          className={cn(
            "border-emerald-500/30 bg-emerald-500/10 font-medium text-emerald-700 dark:text-emerald-400",
            className,
          )}
        >
          <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
          Published
        </Badge>
      );
    case CourseStatus.DRAFT:
      return (
        <Badge
          variant="outline"
          className={cn(
            "border-amber-500/30 bg-amber-500/10 font-medium text-amber-700 dark:text-amber-400",
            className,
          )}
        >
          <span className="mr-1 inline-block size-1.5 rounded-full bg-amber-500" />
          Draft
        </Badge>
      );
    case CourseStatus.ARCHIVED:
      return (
        <Badge
          variant="outline"
          className={cn(
            "border-slate-500/30 bg-slate-500/10 font-medium text-slate-700 dark:text-slate-400",
            className,
          )}
        >
          <span className="mr-1 inline-block size-1.5 rounded-full bg-slate-500" />
          Archived
        </Badge>
      );
    default:
      return null;
  }
}
