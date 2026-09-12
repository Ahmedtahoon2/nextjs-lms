import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { getInstructorCourse } from "@/services/course";
import { CourseWorkspaceHeader } from "@/components/features/instructor/course-workspace-header";
import { CourseForm } from "@/components/features/instructor/course-form";
import { CourseDangerZone } from "@/components/features/instructor/course-danger-zone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotFoundError, AuthorizationError } from "@/lib/errors";

interface SettingsPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateMetadata({
  params,
}: SettingsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: "Course Settings | Instructor Workspace",
    description: `Configure metadata and settings for course ${resolvedParams.courseId}.`,
  };
}

export default async function CourseSettingsPage({
  params,
}: SettingsPageProps) {
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

  return (
    <div>
      <CourseWorkspaceHeader course={course} currentTab="settings" />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground text-balance">
              General Information
            </CardTitle>
            <CardDescription className="text-muted-foreground text-pretty max-w-[65ch]">
              Update the course title, description, category, and difficulty
              level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseForm
              mode="edit"
              courseId={course.id}
              initialData={{
                title: course.title,
                description: course.description,
                level: course.level,
                category: course.category,
                thumbnailUrl: course.thumbnailUrl,
              }}
            />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <CourseDangerZone
          courseId={course.id}
          courseTitle={course.title}
          status={course.status}
        />
      </div>
    </div>
  );
}
