import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";
import { getCourseOverview } from "@/services/course";
import { getNextLesson } from "@/services/progress";
import { hasRole } from "@/services/authorization";
import { NotFoundError } from "@/lib/errors";

interface LearnRedirectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LearnRedirectPage({
  params,
}: LearnRedirectPageProps) {
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

  const { course, modules, isEnrolled, totalLessons } = overviewData;

  // 1. If course has zero lessons, safely redirect to course overview
  if (totalLessons === 0 || modules.length === 0) {
    redirect(`/courses/${slug}`);
  }

  // Find the first lesson in deterministic order
  const firstLesson = modules[0]?.lessons[0];
  if (!firstLesson) {
    redirect(`/courses/${slug}`);
  }

  // Find first free preview lesson if any
  let firstPreviewLesson: { id: string } | null = null;
  for (const mod of modules) {
    const preview = mod.lessons.find((l) => l.isFreePreview);
    if (preview) {
      firstPreviewLesson = preview;
      break;
    }
  }

  const isOwner = user ? course.instructorId === user.id : false;
  const isAdmin = user ? await hasRole(user.id, "admin") : false;

  // 2. Instructor or Admin: direct access to curriculum starting at first lesson
  if (isOwner || isAdmin) {
    redirect(`/courses/${slug}/lessons/${firstLesson.id}`);
  }

  // 3. Enrolled Student: forward to next incomplete lesson (or first lesson if 100% complete)
  if (user && isEnrolled) {
    const next = await getNextLesson(user.id, course.id);
    if (next) {
      redirect(`/courses/${slug}/lessons/${next.id}`);
    } else {
      // 100% completed: deterministically redirect to first lesson for review
      redirect(`/courses/${slug}/lessons/${firstLesson.id}`);
    }
  }

  // 4. Anonymous or Unenrolled: redirect to first free preview lesson if available, else course overview
  if (firstPreviewLesson) {
    redirect(`/courses/${slug}/lessons/${firstPreviewLesson.id}`);
  }

  redirect(`/courses/${slug}`);
}
