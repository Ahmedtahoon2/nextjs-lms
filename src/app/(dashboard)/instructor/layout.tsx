import type { Metadata } from "next";
import Link from "next/link";
import { redirect, forbidden } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
} from "lucide-react";
import { requireAuth } from "@/lib/auth-helpers";
import { hasAnyRole } from "@/services/authorization";
import { ModeToggle } from "@/components/global/theme/mode-toggle";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Instructor Workspace | EduPlatform",
  description: "Manage your courses, curriculum, and students.",
};

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session: Awaited<ReturnType<typeof requireAuth>>;
  try {
    session = await requireAuth();
  } catch {
    redirect("/sign-in");
    return null;
  }

  const isInstructorOrAdmin = await hasAnyRole(session.user.id, [
    "instructor",
    "admin",
  ]);

  if (!isInstructorOrAdmin) {
    forbidden();
    return null;
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Instructor Top Bar */}
      <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/instructor/courses"
              className="text-foreground flex items-center gap-2 font-semibold"
            >
              <GraduationCap className="text-primary size-5" />
              <span>EduPlatform</span>
            </Link>

            <Badge
              variant="secondary"
              className="hidden text-xs font-medium sm:inline-flex"
            >
              Instructor Workspace
            </Badge>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Instructor navigation"
            >
              <Link
                href="/instructor/courses"
                className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              >
                <LayoutDashboard className="size-4" />
                My Courses
              </Link>
              <Link
                href="/instructor/courses/new"
                className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              >
                <PlusCircle className="size-4" />
                New Course
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition-colors sm:flex"
            >
              <BookOpen className="size-3.5" />
              Student Catalog
            </Link>

            <ModeToggle />

            <div className="border-border flex items-center gap-2 border-l pl-3">
              <div className="flex flex-col text-right">
                <span className="text-xs leading-none font-semibold">
                  {session.user.name || "Instructor"}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {session.user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">{children}</main>
    </div>
  );
}
