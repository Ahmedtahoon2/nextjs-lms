import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { getInstructorCourse } from "@/services/course";
import { getCourseRoster } from "@/services/enrollment";
import { CourseWorkspaceHeader } from "@/components/features/instructor/course-workspace-header";
import { StudentRosterTable } from "@/components/features/instructor/student-roster-table";
import { NotFoundError, AuthorizationError } from "@/lib/errors";

interface StudentsPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateMetadata({
  params,
}: StudentsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: "Student Roster | Instructor Workspace",
    description: `Inspect student enrollments and progress for course ${resolvedParams.courseId}.`,
  };
}

export default async function CourseStudentsPage({
  params,
}: StudentsPageProps) {
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

  const roster = await getCourseRoster(session.user.id, course.id);

  return (
    <div>
      <CourseWorkspaceHeader course={course} currentTab="students" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground text-balance">
            Enrolled Students
          </h2>
          <p className="text-sm text-muted-foreground text-pretty max-w-[65ch]">
            Track student enrollment activity, completion percentages, and
            identify students who may need assistance.
          </p>
        </div>

        <StudentRosterTable roster={roster} />
      </div>
    </div>
  );
}
