import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  GraduationCap,
  ArrowRight,
  User as UserIcon,
} from "lucide-react";
import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnrollmentButton } from "@/components/features/enrollment/enrollment-button";
import { CourseProgressBar } from "@/components/features/progress/course-progress-bar";
import { CourseSyllabus } from "@/components/features/course/course-syllabus";
import { getCourseOverview } from "@/services/course";
import { getCurrentUser } from "@/lib/auth-helpers";
import { hasRole } from "@/services/authorization";
import { NotFoundError } from "@/lib/errors";

interface CourseOverviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CourseOverviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await getCourseOverview(slug);
    return {
      title: `${data.course.title} | EduPlatform`,
      description: data.course.description ?? "Explore this course curriculum.",
    };
  } catch {
    return {
      title: "Course Details | EduPlatform",
    };
  }
}

const levelLabels: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL_LEVELS: "All Levels",
};

export default async function CourseOverviewPage({
  params,
}: CourseOverviewPageProps) {
  const { slug } = await params;
  const user = await getCurrentUser();

  let overviewData: Awaited<ReturnType<typeof getCourseOverview>>;
  try {
    overviewData = await getCourseOverview(slug, user?.id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }

  const { course, modules, enrollment, isEnrolled, totalLessons } =
    overviewData;

  const isOwner = user ? course.instructorId === user.id : false;
  const isAdmin = user ? await hasRole(user.id, "admin") : false;
  const canAccessCourse = isOwner || isAdmin;

  const completedCount = overviewData.completedLessonIds.length;
  const progressPercentage = enrollment?.progressPercentage ?? 0;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Course Hero Banner */}
        <section className="border-b border-border/40 bg-muted/20 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Details */}
              <div className="flex flex-col gap-4 lg:col-span-7">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <Link
                    href="/courses"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Catalog</span>
                  </Link>
                  {course.category && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground uppercase tracking-wider">
                        {course.category}
                      </span>
                    </>
                  )}
                  <span className="text-muted-foreground">•</span>
                  <Badge variant="secondary" className="text-xs">
                    {levelLabels[course.level] ?? course.level}
                  </Badge>
                  {course.status !== "PUBLISHED" && (
                    <Badge variant="destructive" className="text-xs">
                      {course.status}
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                  {course.title}
                </h1>
                {course.description && (
                  <p className="text-muted-foreground max-w-[65ch] text-sm leading-relaxed text-pretty sm:text-base">
                    {course.description}
                  </p>
                )}

                {/* Quick stats */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Layers
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-foreground tabular-nums">
                      {modules.length}
                    </span>{" "}
                    {modules.length === 1 ? "Module" : "Modules"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-foreground tabular-nums">
                      {totalLessons}
                    </span>{" "}
                    {totalLessons === 1 ? "Lesson" : "Lessons"}
                  </div>
                </div>
              </div>

              {/* Right Enrollment / Action Card */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-md">
                  {/* Thumbnail */}
                  <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-xl bg-muted/40 ring-1 ring-black/10 ring-inset dark:ring-white/10">
                    {course.thumbnailUrl ? (
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 400px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 via-muted to-muted/80 text-muted-foreground">
                        <BookOpen
                          className="h-12 w-12 stroke-1 opacity-60"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  {/* Enrollment Status & CTA */}
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <CourseProgressBar
                        progressPercentage={progressPercentage}
                        totalLessons={totalLessons}
                        completedLessons={completedCount}
                        className="text-xs"
                      />
                      <Button
                        className="w-full min-h-11 gap-2 active:scale-[0.96] motion-reduce:transform-none"
                        render={<Link href={`/courses/${course.slug}/learn`} />}
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold tracking-tight text-foreground">
                          Free Enrollment
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Full Course Access
                        </span>
                      </div>
                      <EnrollmentButton
                        courseId={course.id}
                        initialIsEnrolled={false}
                        className="w-full min-h-11"
                      />
                      <p className="text-center text-[11px] text-muted-foreground">
                        Instant access to all modules, source code, and lesson
                        content.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section: Syllabus & Instructor */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Column: Syllabus */}
              <div className="lg:col-span-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                      Course Curriculum
                    </h2>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {modules.length}{" "}
                      {modules.length === 1 ? "module" : "modules"} •{" "}
                      {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}{" "}
                      total
                    </p>
                  </div>
                </div>

                <CourseSyllabus
                  courseSlug={course.slug}
                  modules={modules}
                  isEnrolled={isEnrolled}
                  canAccessCourse={canAccessCourse}
                />
              </div>

              {/* Right Column: Instructor Credentials */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xs space-y-4">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    Instructor
                  </h3>
                  <div className="flex items-center gap-3">
                    {course.instructor.avatarUrl || course.instructor.image ? (
                      <Image
                        src={
                          course.instructor.avatarUrl ||
                          course.instructor.image ||
                          ""
                        }
                        alt={course.instructor.name ?? "Instructor"}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="bg-muted text-muted-foreground flex h-12 w-12 items-center justify-center rounded-full ring-2 ring-border">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {course.instructor.name ?? "Instructor"}
                      </h4>
                      {course.instructor.headline && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {course.instructor.headline}
                        </p>
                      )}
                    </div>
                  </div>

                  {course.instructor.bio && (
                    <p className="text-xs text-muted-foreground leading-relaxed text-pretty border-t border-border/40 pt-3">
                      {course.instructor.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
