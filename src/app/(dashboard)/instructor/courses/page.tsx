import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  BookOpen,
  Users,
  Layers,
  ExternalLink,
  Settings,
  ListTree,
} from "lucide-react";
import { requireAuth } from "@/lib/auth-helpers";
import { getInstructorCourses } from "@/services/course";
import { CourseStatusBadge } from "@/components/features/instructor/course-status-badge";
import { Button } from "@/components/ui/button";
import { CourseStatus } from "@prisma/client";

export const metadata: Metadata = {
  title: "My Courses | Instructor Workspace",
  description:
    "Manage your authored courses, curriculum structure, and student enrollments.",
};

export default async function InstructorCoursesPage() {
  const session = await requireAuth();
  const courses = await getInstructorCourses(session.user.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            My Courses
          </h1>
          <p className="text-muted-foreground mt-1 max-w-[65ch] text-sm text-pretty">
            Create, manage curriculum, and track student progress across your
            authored courses.
          </p>
        </div>

        <div>
          <Button
            size="default"
            className="min-h-10 min-w-10 shadow-xs active:scale-[0.98]"
            nativeButton={false}
            render={
              <Link href="/instructor/courses/new">
                <PlusCircle className="mr-2 size-4" />
                New Course
              </Link>
            }
          />
        </div>
      </div>

      {/* Courses List / Empty State */}
      {courses.length === 0 ? (
        <div className="border-border bg-card/40 mt-12 flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center shadow-xs">
          <div className="bg-primary/10 text-primary ring-primary/5 mb-4 flex size-14 items-center justify-center rounded-2xl ring-8">
            <BookOpen className="size-7" aria-hidden="true" />
          </div>
          <h2 className="text-foreground text-xl font-semibold tracking-tight text-balance">
            No courses authored yet
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[55ch] text-sm text-pretty">
            You have not created any courses yet. Start drafting your first
            course, organize your modules and lessons, and share your knowledge
            with students worldwide.
          </p>
          <div className="mt-6">
            <Button
              className="min-h-10 min-w-10 active:scale-[0.98]"
              nativeButton={false}
              render={
                <Link href="/instructor/courses/new">
                  <PlusCircle className="mr-2 size-4" />
                  Create Your First Course
                </Link>
              }
            />
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const isPublished = course.status === CourseStatus.PUBLISHED;

            return (
              <div
                key={course.id}
                className="group border-border bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* Course Thumbnail */}
                <div className="bg-muted relative aspect-video w-full overflow-hidden">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="from-primary/15 via-primary/5 to-background text-primary/40 flex size-full items-center justify-center bg-linear-to-br">
                      <BookOpen className="size-12" aria-hidden="true" />
                    </div>
                  )}

                  {/* Status Badge overlay */}
                  <div className="absolute top-3 right-3">
                    <CourseStatusBadge status={course.status} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-medium">
                    {course.category && (
                      <span className="bg-muted rounded-sm px-2 py-0.5">
                        {course.category}
                      </span>
                    )}
                    <span>•</span>
                    <span>{course.level.replace("_", " ")}</span>
                  </div>

                  <h2 className="text-foreground group-hover:text-primary line-clamp-2 text-lg font-semibold tracking-tight text-balance transition-colors">
                    {course.title}
                  </h2>

                  {course.description && (
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm text-pretty">
                      {course.description}
                    </p>
                  )}

                  {/* Course Metrics */}
                  <div className="border-border/60 mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-center text-xs">
                    <div>
                      <div className="text-muted-foreground flex items-center justify-center gap-1">
                        <Layers className="size-3.5" />
                        <span>Modules</span>
                      </div>
                      <p className="text-foreground mt-0.5 text-sm font-semibold">
                        {course._count.modules}
                      </p>
                    </div>

                    <div>
                      <div className="text-muted-foreground flex items-center justify-center gap-1">
                        <BookOpen className="size-3.5" />
                        <span>Lessons</span>
                      </div>
                      <p className="text-foreground mt-0.5 text-sm font-semibold">
                        {course.totalLessons}
                      </p>
                    </div>

                    <div>
                      <div className="text-muted-foreground flex items-center justify-center gap-1">
                        <Users className="size-3.5" />
                        <span>Students</span>
                      </div>
                      <p className="text-foreground mt-0.5 text-sm font-semibold">
                        {course._count.enrollments}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="border-border mt-5 flex items-center justify-between gap-2 border-t pt-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-xs active:scale-[0.98]"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/instructor/courses/${course.id}/curriculum`}
                          >
                            <ListTree className="mr-1.5 size-3.5" />
                            Curriculum
                          </Link>
                        }
                      />

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground h-8 px-2.5 text-xs active:scale-[0.98]"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/instructor/courses/${course.id}/students`}
                          >
                            <Users className="mr-1.5 size-3.5" />
                            Students
                          </Link>
                        }
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Course Settings"
                        className="size-8 active:scale-[0.98]"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/instructor/courses/${course.id}/settings`}
                          >
                            <Settings className="size-3.5" />
                          </Link>
                        }
                      />

                      {isPublished && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="View Public Course Page"
                          className="size-8 active:scale-[0.98]"
                          nativeButton={false}
                          render={
                            <Link
                              href={`/courses/${course.slug}`}
                              target="_blank"
                            >
                              <ExternalLink className="size-3.5" />
                            </Link>
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
