import { PlayerContent } from "@/components/features/player/player-content";
import { PlayerProvider } from "@/components/features/player/player-context";
import { PlayerFooter } from "@/components/features/player/player-footer";
import { PlayerHeader } from "@/components/features/player/player-header";
import { PlayerResources } from "@/components/features/player/player-resources";
import { PlayerSidebar } from "@/components/features/player/player-sidebar";
import { PlayerVideo } from "@/components/features/player/player-video";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth-helpers";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";
import { hasRole } from "@/services/authorization";
import { getCourseOverview } from "@/services/course";
import { getCourseLessonForPlayer } from "@/services/lesson-content";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

interface PlayerPageProps {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;
  try {
    const user = await getCurrentUser();
    const { course, lesson } = await getCourseLessonForPlayer({
      courseSlug: slug,
      lessonId,
      userId: user?.id,
    });

    return {
      title: `${lesson.lessonTitle} | ${course.title} - EduPlatform`,
      description: `Watch and learn ${lesson.lessonTitle} in ${course.title}.`,
    };
  } catch {
    return {
      title: "Lesson Player - EduPlatform",
    };
  }
}

export default async function LessonPlayerPage({ params }: PlayerPageProps) {
  const { slug, lessonId } = await params;
  const user = await getCurrentUser();

  let playerData: Awaited<ReturnType<typeof getCourseLessonForPlayer>>;
  try {
    playerData = await getCourseLessonForPlayer({
      courseSlug: slug,
      lessonId,
      userId: user?.id,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    if (
      error instanceof AuthorizationError ||
      error instanceof AuthenticationError
    ) {
      // Unenrolled or unauthenticated student attempting to view non-preview lesson
      redirect(`/courses/${slug}?enrolled=false`);
    }
    throw error;
  }

  const { course, lesson, navigation } = playerData;

  // Retrieve course curriculum tree and progress state
  const overviewData = await getCourseOverview(slug, user?.id);

  const isOwner = user ? course.instructorId === user.id : false;
  const isAdmin = user ? await hasRole(user.id, "admin") : false;
  const canAccessCourse = isOwner || isAdmin;
  const canTrackProgress = Boolean(
    user && (overviewData.isEnrolled || canAccessCourse),
  );
  const isLessonCompleted = overviewData.completedLessonIds.includes(lessonId);

  // Calculate user progress percentage
  const completedCount = overviewData.completedLessonIds.length;
  const totalLessons = overviewData.totalLessons;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <PlayerProvider>
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        {/* Top Header with Breadcrumbs & Mobile Trigger */}
        <PlayerHeader
          courseTitle={course.title}
          courseSlug={slug}
          lessonTitle={lesson.lessonTitle}
        />

        {/* Main Body: Desktop Sidebar + Central Learning Canvas */}
        <div className="flex flex-1 overflow-hidden">
          <PlayerSidebar
            courseSlug={slug}
            courseTitle={course.title}
            modules={overviewData.modules}
            currentLessonId={lessonId}
            progressPercentage={progressPercentage}
            completedLessons={completedCount}
            totalLessons={totalLessons}
            isEnrolled={overviewData.isEnrolled}
            canAccessCourse={canAccessCourse}
          />

          <main
            className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12"
            style={{ height: "calc(100vh - 7rem)" }}
          >
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
              {/* Video Player (if lesson contains video) */}
              {lesson.videoUrl && (
                <PlayerVideo
                  videoUrl={lesson.videoUrl}
                  lessonTitle={lesson.lessonTitle}
                />
              )}

              {/* Lesson Header Information */}
              <div className="border-border/50 flex flex-col gap-2 border-b pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-primary text-xs font-semibold">
                    Lesson {navigation.currentIndex} of{" "}
                    {navigation.totalLessons}
                  </span>
                  {lesson.isFreePreview && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary px-2 py-0 text-[10px] font-medium"
                    >
                      Free Preview
                    </Badge>
                  )}
                  {overviewData.course.level && (
                    <Badge variant="outline" className="text-[10px]">
                      {overviewData.course.level}
                    </Badge>
                  )}
                </div>

                <h1 className="font-heading text-foreground text-xl font-bold tracking-tight text-balance sm:text-2xl">
                  {lesson.lessonTitle}
                </h1>
              </div>

              {/* Lesson Body Content (Markdown Notes) */}
              <div className="py-2">
                <PlayerContent bodyHtml={lesson.bodyHtml} />
              </div>

              {/* Attached Downloadable Resources */}
              {lesson.resources.length > 0 && (
                <div className="pt-4">
                  <PlayerResources resources={lesson.resources} />
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Bottom Persistent Navigation Bar */}
        <PlayerFooter
          courseSlug={slug}
          lessonId={lessonId}
          previousLesson={navigation.previousLesson}
          nextLesson={navigation.nextLesson}
          isCompleted={isLessonCompleted}
          canTrackProgress={canTrackProgress}
          currentIndex={navigation.currentIndex}
          totalLessons={navigation.totalLessons}
        />
      </div>
    </PlayerProvider>
  );
}
