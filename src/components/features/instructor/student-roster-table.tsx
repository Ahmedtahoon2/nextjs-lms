import {
  Users,
  GraduationCap,
  CheckCircle2,
  Clock,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { EnrollmentStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import type { CourseEnrollmentWithUser } from "@/repositories/enrollment";

interface StudentRosterTableProps {
  roster: CourseEnrollmentWithUser[];
}

export function StudentRosterTable({ roster }: StudentRosterTableProps) {
  const totalStudents = roster.length;
  const completedStudents = roster.filter(
    (e) =>
      e.status === EnrollmentStatus.COMPLETED || e.progressPercentage === 100,
  ).length;
  const activeStudents = roster.filter(
    (e) => e.status === EnrollmentStatus.ACTIVE,
  ).length;
  const avgProgress =
    totalStudents > 0
      ? Math.round(
          roster.reduce((acc, curr) => acc + curr.progressPercentage, 0) /
            totalStudents,
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border-border bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <Users className="text-primary size-4" />
            <span>Total Enrolled</span>
          </div>
          <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">
            {totalStudents}
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <Clock className="size-4 text-amber-500" />
            <span>Active</span>
          </div>
          <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">
            {activeStudents}
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Completed</span>
          </div>
          <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">
            {completedStudents}
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <GraduationCap className="text-primary size-4" />
            <span>Avg. Progress</span>
          </div>
          <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">
            {avgProgress}%
          </p>
        </div>
      </div>

      {/* Roster Table or Empty State */}
      {totalStudents === 0 ? (
        <div className="border-border bg-card/40 flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center shadow-xs">
          <div className="bg-primary/10 text-primary mb-3 flex size-12 items-center justify-center rounded-xl">
            <Users className="size-6" />
          </div>
          <h3 className="text-foreground text-base font-semibold">
            No students enrolled yet
          </h3>
          <p className="text-muted-foreground mt-1 max-w-[45ch] text-xs text-pretty">
            Once your course is published, students who enroll will appear in
            this roster with their real-time progress metrics.
          </p>
        </div>
      ) : (
        <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
          <div className="overflow-x-auto">
            <table
              className="w-full text-left text-sm"
              aria-label="Enrolled students roster"
            >
              <thead className="border-border bg-muted/40 text-muted-foreground border-b text-xs font-semibold">
                <tr>
                  <th scope="col" className="px-5 py-3.5">
                    Student
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Enrolled Date
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Progress
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border/60 divide-y">
                {roster.map((enrollment) => {
                  const user = enrollment.user;
                  const avatar = user.avatarUrl || user.image;
                  const initials = (user.name || user.email)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Student info */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt={user.name ?? "Student"}
                              width={36}
                              height={36}
                              className="border-border size-9 rounded-full border object-cover"
                            />
                          ) : (
                            <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full text-xs font-semibold">
                              {initials}
                            </div>
                          )}
                          <div>
                            <p className="text-foreground text-sm leading-tight font-medium">
                              {user.name || "Student"}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Enrolled Date */}
                      <td className="text-muted-foreground px-5 py-3.5 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5" />
                          <span>
                            {new Date(enrollment.enrolledAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Progress bar */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex max-w-45 items-center gap-3">
                          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(100, Math.max(0, enrollment.progressPercentage))}%`,
                              }}
                            />
                          </div>
                          <span className="text-foreground w-9 text-right font-mono text-xs font-medium tabular-nums">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        {enrollment.status === EnrollmentStatus.COMPLETED ||
                        enrollment.progressPercentage === 100 ? (
                          <Badge
                            variant="outline"
                            className="border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-400"
                          >
                            Completed
                          </Badge>
                        ) : enrollment.status === EnrollmentStatus.ARCHIVED ? (
                          <Badge
                            variant="outline"
                            className="border-slate-500/30 bg-slate-500/10 text-xs text-slate-700 dark:text-slate-400"
                          >
                            Archived
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/30 text-xs"
                          >
                            Active
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
