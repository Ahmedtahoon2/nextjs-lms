import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAuth } from "@/lib/auth-helpers";
import { getLessonContent } from "@/services/lesson-content";
import { LessonContentEditor } from "@/components/features/curriculum/lesson-content-editor";
import { Button } from "@/components/ui/button";
import { NotFoundError, AuthorizationError } from "@/lib/errors";

interface LessonContentPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export async function generateMetadata({
  params,
}: LessonContentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: "Lesson Content Editor | Instructor Workspace",
    description: `Author markdown content, video, and resources for lesson ${resolvedParams.lessonId}.`,
  };
}

export default async function LessonContentPage({
  params,
}: LessonContentPageProps) {
  const resolvedParams = await params;
  const session = await requireAuth();

  let lessonData: Awaited<ReturnType<typeof getLessonContent>>;
  try {
    lessonData = await getLessonContent(
      session.user.id,
      resolvedParams.lessonId,
    );
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof AuthorizationError) {
      notFound();
    }
    throw error;
  }

  // Cross-course verification: make sure lesson actually belongs to this courseId
  if (lessonData.courseId !== resolvedParams.courseId) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground active:scale-[0.98] -ml-2.5"
          nativeButton={false}
          render={
            <Link
              href={`/instructor/courses/${resolvedParams.courseId}/curriculum`}
            >
              <ArrowLeft className="mr-1.5 size-4" />
              Back to Curriculum
            </Link>
          }
        />

        <span className="text-xs text-muted-foreground font-medium">
          Lesson ID: {lessonData.lessonId}
        </span>
      </div>

      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
          {lessonData.lessonTitle}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty max-w-[65ch]">
          Author markdown lessons with sanitized HTML output, embed streaming
          videos, and upload companion resources.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
        <LessonContentEditor
          lessonId={lessonData.lessonId}
          initialData={{
            bodyMarkdown: lessonData.bodyMarkdown,
            bodyHtml: lessonData.bodyHtml,
            videoUrl: lessonData.videoUrl,
            resources: lessonData.resources,
          }}
        />
      </div>
    </div>
  );
}
