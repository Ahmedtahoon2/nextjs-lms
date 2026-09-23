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
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2.5 active:scale-[0.98]"
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

        <span className="text-muted-foreground text-xs font-medium">
          Lesson ID: {lessonData.lessonId}
        </span>
      </div>

      <div className="border-border border-b pb-4">
        <h1 className="text-foreground text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {lessonData.lessonTitle}
        </h1>
        <p className="text-muted-foreground mt-1 max-w-[65ch] text-sm text-pretty">
          Author markdown lessons with sanitized HTML output, embed streaming
          videos, and upload companion resources.
        </p>
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
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
