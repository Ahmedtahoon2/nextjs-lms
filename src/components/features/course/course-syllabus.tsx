"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Lock,
  PlayCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CourseOverviewModule } from "@/services/course";

export interface CourseSyllabusProps {
  courseSlug: string;
  modules: CourseOverviewModule[];
  isEnrolled: boolean;
  canAccessCourse: boolean; // Author or Admin
}

export function CourseSyllabus({
  courseSlug,
  modules,
  isEnrolled,
  canAccessCourse,
}: CourseSyllabusProps) {
  // By default, open the first module
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      if (modules.length > 0) {
        initial[modules[0].id] = true;
      }
      return initial;
    },
  );

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (modules.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        <p className="text-sm">
          Curriculum is being prepared. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modules.map((mod, modIdx) => {
        const isOpen = Boolean(openModules[mod.id]);
        const lessonsCount = mod.lessons.length;
        const totalDuration = mod.lessons.reduce(
          (acc, l) => acc + (l.durationMinutes ?? 0),
          0,
        );

        return (
          <div
            key={mod.id}
            className="overflow-hidden rounded-xl border border-border/60 bg-card transition-colors shadow-xs"
          >
            {/* Module Accordion Header */}
            <button
              type="button"
              onClick={() => toggleModule(mod.id)}
              className="flex w-full min-h-[52px] items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/40 active:scale-[0.99] motion-reduce:transform-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={isOpen}
              aria-controls={`module-panel-${mod.id}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Module {modIdx + 1}
                </span>
                <span className="font-heading text-sm font-semibold text-foreground text-balance">
                  {mod.title}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="tabular-nums">
                    {lessonsCount} {lessonsCount === 1 ? "lesson" : "lessons"}
                  </span>
                  {totalDuration > 0 && (
                    <>
                      <span>•</span>
                      <span className="tabular-nums">{totalDuration}m</span>
                    </>
                  )}
                </div>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </button>

            {/* Module Content */}
            {isOpen && (
              <div
                id={`module-panel-${mod.id}`}
                className="border-t border-border/40 bg-muted/10 divide-y divide-border/30"
              >
                {mod.description && (
                  <div className="px-4 py-2.5 text-xs text-muted-foreground leading-relaxed text-pretty">
                    {mod.description}
                  </div>
                )}

                {mod.lessons.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-muted-foreground italic">
                    No lessons in this module yet.
                  </div>
                ) : (
                  mod.lessons.map((lesson, lessonIdx) => {
                    const hasAccess =
                      lesson.isFreePreview || isEnrolled || canAccessCourse;

                    return (
                      <div
                        key={lesson.id}
                        className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 text-xs transition-colors hover:bg-muted/30"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Status Icon */}
                          {lesson.isCompleted ? (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                              aria-label="Completed lesson"
                            />
                          ) : hasAccess ? (
                            <PlayCircle
                              className="h-4 w-4 shrink-0 text-primary"
                              aria-label="Playable lesson"
                            />
                          ) : (
                            <Lock
                              className="h-4 w-4 shrink-0 text-muted-foreground/60"
                              aria-label="Locked lesson (enrollment required)"
                            />
                          )}

                          {/* Lesson Title & Link */}
                          <div className="flex flex-col min-w-0">
                            {hasAccess ? (
                              <Link
                                href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                                className="font-medium text-foreground hover:text-primary transition-colors truncate focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring rounded-xs"
                              >
                                {lessonIdx + 1}. {lesson.title}
                              </Link>
                            ) : (
                              <span className="font-medium text-muted-foreground truncate">
                                {lessonIdx + 1}. {lesson.title}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Badges & Duration */}
                        <div className="flex items-center gap-2 shrink-0">
                          {lesson.isFreePreview && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-primary/10 text-primary font-medium px-1.5 py-0"
                            >
                              Free Preview
                            </Badge>
                          )}
                          {lesson.durationMinutes !== null &&
                            lesson.durationMinutes > 0 && (
                              <div className="flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums">
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                <span>{lesson.durationMinutes}m</span>
                              </div>
                            )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
