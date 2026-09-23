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
      <div className="border-border text-muted-foreground rounded-xl border border-dashed p-8 text-center">
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
            className="border-border/60 bg-card overflow-hidden rounded-xl border shadow-xs transition-colors"
          >
            {/* Module Accordion Header */}
            <button
              type="button"
              onClick={() => toggleModule(mod.id)}
              className="hover:bg-muted/40 focus-visible:ring-ring flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-hidden active:scale-[0.99] motion-reduce:transform-none"
              aria-expanded={isOpen}
              aria-controls={`module-panel-${mod.id}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Module {modIdx + 1}
                </span>
                <span className="font-heading text-foreground text-sm font-semibold text-balance">
                  {mod.title}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
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
                  className={`text-muted-foreground flex h-7 w-7 items-center justify-center rounded-md transition-transform duration-200 ${
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
                className="border-border/40 bg-muted/10 divide-border/30 divide-y border-t"
              >
                {mod.description && (
                  <div className="text-muted-foreground px-4 py-2.5 text-xs leading-relaxed text-pretty">
                    {mod.description}
                  </div>
                )}

                {mod.lessons.length === 0 ? (
                  <div className="text-muted-foreground px-4 py-3 text-xs italic">
                    No lessons in this module yet.
                  </div>
                ) : (
                  mod.lessons.map((lesson, lessonIdx) => {
                    const hasAccess =
                      lesson.isFreePreview || isEnrolled || canAccessCourse;

                    return (
                      <div
                        key={lesson.id}
                        className="hover:bg-muted/30 flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 text-xs transition-colors"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {/* Status Icon */}
                          {lesson.isCompleted ? (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                              aria-label="Completed lesson"
                            />
                          ) : hasAccess ? (
                            <PlayCircle
                              className="text-primary h-4 w-4 shrink-0"
                              aria-label="Playable lesson"
                            />
                          ) : (
                            <Lock
                              className="text-muted-foreground/60 h-4 w-4 shrink-0"
                              aria-label="Locked lesson (enrollment required)"
                            />
                          )}

                          {/* Lesson Title & Link */}
                          <div className="flex min-w-0 flex-col">
                            {hasAccess ? (
                              <Link
                                href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                                className="text-foreground hover:text-primary focus-visible:ring-ring truncate rounded-xs font-medium transition-colors focus-visible:ring-1 focus-visible:outline-hidden"
                              >
                                {lessonIdx + 1}. {lesson.title}
                              </Link>
                            ) : (
                              <span className="text-muted-foreground truncate font-medium">
                                {lessonIdx + 1}. {lesson.title}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Badges & Duration */}
                        <div className="flex shrink-0 items-center gap-2">
                          {lesson.isFreePreview && (
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary px-1.5 py-0 text-[10px] font-medium"
                            >
                              Free Preview
                            </Badge>
                          )}
                          {lesson.durationMinutes !== null &&
                            lesson.durationMinutes > 0 && (
                              <div className="text-muted-foreground flex items-center gap-1 text-[11px] tabular-nums">
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
