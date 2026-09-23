import type * as React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";
import { hasRole } from "@/services/authorization";
import { GraduationCap } from "lucide-react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    const isInstructor =
      (await hasRole(user.id, "instructor")) ||
      (await hasRole(user.id, "admin"));

    if (isInstructor) {
      redirect("/instructor/courses");
    } else {
      redirect("/courses");
    }
  }

  return (
    <div className="bg-muted/20 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Platform Branding */}
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="text-foreground inline-flex items-center gap-2.5 text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-xs">
            <GraduationCap className="size-5" aria-hidden="true" />
          </div>
          <span>EduPlatform</span>
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer copyright */}
      <div className="text-muted-foreground mt-8 text-center text-xs">
        © {new Date().getFullYear()} EduPlatform. All rights reserved.
      </div>
    </div>
  );
}
