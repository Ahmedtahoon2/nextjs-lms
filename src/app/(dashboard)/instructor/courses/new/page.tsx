import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/components/features/instructor/course-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create New Course | Instructor Workspace",
  description:
    "Set up the basic details for your new course before building curriculum.",
};

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mb-6">
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
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Create a New Course
          </CardTitle>
          <CardDescription className="text-muted-foreground text-pretty max-w-[65ch]">
            Fill in the essential information for your course. You will be able
            to organize modules, lessons, and content in the next step.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
