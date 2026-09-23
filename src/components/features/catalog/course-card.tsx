import Link from "next/link";
import Image from "next/image";
import { BookOpen, Layers, User as UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseProgressBar } from "@/components/features/progress/course-progress-bar";
import type { CatalogCourseItem } from "@/services/course";

export interface CourseCardProps {
  course: CatalogCourseItem;
}

const levelLabels: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL_LEVELS: "All Levels",
};

export function CourseCard({ course }: CourseCardProps) {
  const levelText = levelLabels[course.level] ?? course.level;

  return (
    <Card className="dark:hover:border-border/80 flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Course Thumbnail */}
      <div className="bg-muted/40 relative aspect-video w-full overflow-hidden">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="from-primary/10 via-muted to-muted/80 text-muted-foreground flex h-full w-full items-center justify-center bg-linear-to-br">
            <BookOpen
              className="h-10 w-10 stroke-1 opacity-70"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/10" />

        {/* Level badge overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <Badge
            variant="secondary"
            className="bg-background/90 text-xs font-semibold backdrop-blur-xs"
          >
            {levelText}
          </Badge>
          {course.isEnrolled && (
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-xs">
              Enrolled
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="flex-1 gap-2 pb-2">
        {course.category && (
          <p className="text-primary text-xs font-semibold tracking-wider uppercase">
            {course.category}
          </p>
        )}
        <Link
          href={`/courses/${course.slug}`}
          className="focus-visible:ring-ring group rounded-md outline-none focus-visible:ring-2"
        >
          <h3 className="group-hover:text-primary font-heading line-clamp-2 text-base leading-snug font-semibold text-balance transition-colors">
            {course.title}
          </h3>
        </Link>
        {course.description && (
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed text-pretty">
            {course.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        {/* Curriculum statistics */}
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">
              {course.modulesCount}{" "}
              {course.modulesCount === 1 ? "module" : "modules"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">
              {course.totalLessons}{" "}
              {course.totalLessons === 1 ? "lesson" : "lessons"}
            </span>
          </div>
        </div>

        {/* Progress bar if enrolled */}
        {course.isEnrolled && course.progressPercentage !== null && (
          <div className="mt-3">
            <CourseProgressBar
              progressPercentage={course.progressPercentage}
              showCelebration={false}
              className="gap-1 text-xs"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="border-border/40 flex items-center justify-between border-t pt-3 pb-3">
        {/* Instructor */}
        <div className="flex items-center gap-2">
          {course.instructor.avatarUrl || course.instructor.image ? (
            <Image
              src={course.instructor.avatarUrl || course.instructor.image || ""}
              alt={course.instructor.name ?? "Instructor"}
              width={24}
              height={24}
              className="ring-border h-6 w-6 rounded-full object-cover ring-1"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full">
              <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          )}
          <span className="text-muted-foreground max-w-[120px] truncate text-xs font-medium">
            {course.instructor.name ?? "Instructor"}
          </span>
        </div>

        {/* Action Link */}
        <Link
          href={
            course.isEnrolled
              ? `/courses/${course.slug}/learn`
              : `/courses/${course.slug}`
          }
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-8 min-w-8 items-center justify-center rounded-md px-3 text-xs font-medium transition-transform active:scale-[0.96] motion-reduce:transform-none"
        >
          {course.isEnrolled ? "Continue" : "View Course"}
        </Link>
      </CardFooter>
    </Card>
  );
}
