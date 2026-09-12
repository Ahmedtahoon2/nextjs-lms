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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Instructor Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/instructor/courses"
              className="flex items-center gap-2 text-foreground font-semibold"
            >
              <GraduationCap className="size-5 text-primary" />
              <span>EduPlatform</span>
            </Link>

            <Badge
              variant="secondary"
              className="hidden sm:inline-flex text-xs font-medium"
            >
              Instructor Workspace
            </Badge>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Instructor navigation"
            >
              <Link
                href="/instructor/courses"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <LayoutDashboard className="size-4" />
                My Courses
              </Link>
              <Link
                href="/instructor/courses/new"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <PlusCircle className="size-4" />
                New Course
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="hidden items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors sm:flex"
            >
              <BookOpen className="size-3.5" />
              Student Catalog
            </Link>

            <ModeToggle />

            <div className="flex items-center gap-2 border-l border-border pl-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold leading-none">
                  {session.user.name || "Instructor"}
                </span>
                <span className="text-[10px] text-muted-foreground">
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
