import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { getInstructorCourse } from "@/services/course";
import { CourseWorkspaceHeader } from "@/components/features/instructor/course-workspace-header";
import { CurriculumBuilder } from "@/components/features/instructor/curriculum-builder";
import { PublishButton } from "@/components/features/instructor/publish-button";
import { NotFoundError, AuthorizationError } from "@/lib/errors";

interface CurriculumPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateMetadata({
  params,
}: CurriculumPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: "Curriculum Builder | Instructor Workspace",
    description: `Manage modules and lessons for course ${resolvedParams.courseId}.`,
  };
}

export default async function CourseCurriculumPage({
  params,
}: CurriculumPageProps) {
  const resolvedParams = await params;
  const session = await requireAuth();

  let course: Awaited<ReturnType<typeof getInstructorCourse>>;
  try {
    course = await getInstructorCourse(
      session.user.id,
      resolvedParams.courseId,
    );
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof AuthorizationError) {
      notFound();
    }
    throw error;
  }

  // Calculate totals for publishing validation
  const moduleCount = course.modules.length;
  const lessonCount = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0,
  );

  return (
    <div>
      <CourseWorkspaceHeader
        course={course}
        currentTab="curriculum"
        actionSlot={
          <PublishButton
            courseId={course.id}
            status={course.status}
            moduleCount={moduleCount}
            lessonCount={lessonCount}
          />
        }
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-foreground text-xl font-bold tracking-tight text-balance">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground max-w-[65ch] text-sm text-pretty">
            Organize modules, arrange lessons in chronological order, and
            configure free preview access for potential students.
          </p>
        </div>

        <CurriculumBuilder
          courseId={course.id}
          courseStatus={course.status}
          initialModules={course.modules}
        />
      </div>
    </div>
  );
}
