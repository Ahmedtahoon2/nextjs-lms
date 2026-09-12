import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  ListTree,
  Users,
  ExternalLink,
} from "lucide-react";
import { CourseStatus } from "@prisma/client";
import { CourseStatusBadge } from "@/components/features/instructor/course-status-badge";
import { Button } from "@/components/ui/button";

interface CourseWorkspaceHeaderProps {
  course: {
    id: string;
    title: string;
    slug: string;
    status: CourseStatus;
  };
  currentTab: "settings" | "curriculum" | "students";
  actionSlot?: React.ReactNode;
}

export function CourseWorkspaceHeader({
  course,
  currentTab,
  actionSlot,
}: CourseWorkspaceHeaderProps) {
  const tabs = [
    {
      id: "curriculum",
      label: "Curriculum Builder",
      icon: ListTree,
      href: `/instructor/courses/${course.id}/curriculum`,
    },
    {
      id: "settings",
      label: "Settings & Details",
      icon: Settings,
      href: `/instructor/courses/${course.id}/settings`,
    },
    {
      id: "students",
      label: "Student Roster",
      icon: Users,
      href: `/instructor/courses/${course.id}/students`,
    },
  ] as const;

  const isPublished = course.status === CourseStatus.PUBLISHED;

  return (
    <div className="border-b border-border bg-card/50 pb-0 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top breadcrumb & back */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground active:scale-[0.98] -ml-2.5"
            nativeButton={false}
            render={
              <Link href="/instructor/courses">
                <ArrowLeft className="mr-1.5 size-4" />
                Back to My Courses
              </Link>
            }
          />

          {isPublished && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs min-h-9 active:scale-[0.98]"
              nativeButton={false}
              render={
                <Link href={`/courses/${course.slug}`} target="_blank">
                  <ExternalLink className="mr-1.5 size-3.5" />
                  View Live Course
                </Link>
              }
            />
          )}
        </div>

        {/* Title, Status badge & action buttons */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
              {course.title}
            </h1>
            <CourseStatusBadge status={course.status} />
          </div>

          {actionSlot && <div>{actionSlot}</div>}
        </div>

        {/* Navigation Tabs */}
        <nav
          className="mt-8 flex gap-1 overflow-x-auto"
          aria-label="Course management tabs"
        >
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap min-h-10 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
