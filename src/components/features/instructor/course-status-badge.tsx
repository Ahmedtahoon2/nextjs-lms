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
            "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-medium",
            className,
          )}
        >
          <span className="size-1.5 rounded-full bg-emerald-500 mr-1 inline-block" />
          Published
        </Badge>
      );
    case CourseStatus.DRAFT:
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-medium",
            className,
          )}
        >
          <span className="size-1.5 rounded-full bg-amber-500 mr-1 inline-block" />
          Draft
        </Badge>
      );
    case CourseStatus.ARCHIVED:
      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30 font-medium",
            className,
          )}
        >
          <span className="size-1.5 rounded-full bg-slate-500 mr-1 inline-block" />
          Archived
        </Badge>
      );
    default:
      return null;
  }
}
