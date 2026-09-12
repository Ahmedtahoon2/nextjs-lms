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
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Users className="size-4 text-primary" />
            <span>Total Enrolled</span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {totalStudents}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Clock className="size-4 text-amber-500" />
            <span>Active</span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {activeStudents}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Completed</span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {completedStudents}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <GraduationCap className="size-4 text-primary" />
            <span>Avg. Progress</span>
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {avgProgress}%
          </p>
        </div>
      </div>

      {/* Roster Table or Empty State */}
      {totalStudents === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 p-8 text-center shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
            <Users className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No students enrolled yet
          </h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-[45ch] text-pretty">
            Once your course is published, students who enroll will appear in
            this roster with their real-time progress metrics.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full text-left text-sm"
              aria-label="Enrolled students roster"
            >
              <thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
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
              <tbody className="divide-y divide-border/60">
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
                              className="size-9 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {initials}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground text-sm leading-tight">
                              {user.name || "Student"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Enrolled Date */}
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-muted-foreground">
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
                        <div className="flex items-center gap-3 max-w-45">
                          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(100, Math.max(0, enrollment.progressPercentage))}%`,
                              }}
                            />
                          </div>
                          <span className="font-mono text-xs font-medium text-foreground w-9 text-right tabular-nums">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 whitespace-nowrap text-right">
                        {enrollment.status === EnrollmentStatus.COMPLETED ||
                        enrollment.progressPercentage === 100 ? (
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 text-xs"
                          >
                            Completed
                          </Badge>
                        ) : enrollment.status === EnrollmentStatus.ARCHIVED ? (
                          <Badge
                            variant="outline"
                            className="bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/30 text-xs"
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
