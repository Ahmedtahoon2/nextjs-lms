"use client";

import { usePlayerContext } from "@/components/features/player/player-context";
import { CourseProgressBar } from "@/components/features/progress/course-progress-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CourseOverviewModule } from "@/services/course";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Lock,
  PlayCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface PlayerSidebarProps {
  courseSlug: string;
  courseTitle: string;
  modules: CourseOverviewModule[];
  currentLessonId: string;
  progressPercentage?: number | null;
  completedLessons?: number;
  totalLessons?: number;
  isEnrolled: boolean;
  canAccessCourse: boolean;
}

export function PlayerSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  progressPercentage,
  completedLessons,
  totalLessons,
  isEnrolled,
  canAccessCourse,
}: PlayerSidebarProps) {
  const { isSidebarOpen, closeSidebar } = usePlayerContext();

  // Find module containing the current lesson and initialize open state
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      for (const mod of modules) {
        const containsCurrent = mod.lessons.some(
          (l) => l.id === currentLessonId,
        );
        if (containsCurrent) {
          initial[mod.id] = true;
        }
      }
      // If no module contains current lesson (or first load), open first module
      if (Object.keys(initial).length === 0 && modules.length > 0) {
        initial[modules[0].id] = true;
      }
      return initial;
    },
  );

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle ESC key to dismiss mobile drawer
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, closeSidebar]);

  // Sidebar curriculum list content (reused in desktop and mobile)
  const curriculumContent = (
    <div className="flex flex-col gap-4">
      {/* Progress header */}
      {(isEnrolled || canAccessCourse) &&
        progressPercentage !== null &&
        progressPercentage !== undefined && (
          <div className="border-border/50 border-b pb-4">
            <CourseProgressBar
              progressPercentage={progressPercentage}
              totalLessons={totalLessons}
              completedLessons={completedLessons}
              showCelebration={false}
            />
          </div>
        )}

      {/* Modules List */}
      <div className="flex flex-col gap-2">
        {modules.map((mod, modIdx) => {
          const isOpen = Boolean(openModules[mod.id]);
          const lessonsCount = mod.lessons.length;
          const completedInMod = mod.lessons.filter(
            (l) => l.isCompleted,
          ).length;

          return (
            <div
              key={mod.id}
              className="border-border/60 bg-card overflow-hidden rounded-xl border shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="hover:bg-muted/40 focus-visible:ring-ring flex min-h-12 w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors focus-visible:ring-2 focus-visible:outline-hidden active:scale-[0.99] motion-reduce:transform-none"
                aria-expanded={isOpen}
                aria-controls={`player-mod-${mod.id}`}
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Module {modIdx + 1}
                  </span>
                  <span className="text-foreground truncate text-xs font-semibold">
                    {mod.title}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-muted-foreground text-[11px] tabular-nums">
                    {isEnrolled || canAccessCourse
                      ? `${completedInMod}/${lessonsCount}`
                      : `${lessonsCount} lessons`}
                  </span>
                  <ChevronDown
                    className={`text-muted-foreground h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {isOpen && (
                <div
                  id={`player-mod-${mod.id}`}
                  className="divide-border/30 border-border/40 bg-muted/10 divide-y border-t"
                >
                  {mod.lessons.length === 0 ? (
                    <div className="text-muted-foreground px-3 py-2 text-[11px] italic">
                      No lessons in this module.
                    </div>
                  ) : (
                    mod.lessons.map((lesson, lessonIdx) => {
                      const isActive = lesson.id === currentLessonId;
                      const hasAccess =
                        lesson.isFreePreview || isEnrolled || canAccessCourse;

                      return (
                        <div
                          key={lesson.id}
                          className={`flex min-h-11 items-center justify-between gap-2.5 px-3 py-2 text-xs transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium shadow-2xs"
                              : "hover:bg-muted/30"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            {/* Completion / Status Icon */}
                            {lesson.isCompleted ? (
                              <CheckCircle2
                                className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                                aria-label="Completed lesson"
                              />
                            ) : hasAccess ? (
                              <PlayCircle
                                className={`h-4 w-4 shrink-0 ${
                                  isActive
                                    ? "text-primary font-bold"
                                    : "text-muted-foreground/80"
                                }`}
                                aria-label={
                                  isActive
                                    ? "Current lesson"
                                    : "Playable lesson"
                                }
                              />
                            ) : (
                              <Lock
                                className="text-muted-foreground/50 h-4 w-4 shrink-0"
                                aria-label="Locked lesson (enrollment required)"
                              />
                            )}

                            {/* Lesson Link or Disabled Text */}
                            <div className="flex min-w-0 flex-col">
                              {hasAccess ? (
                                <Link
                                  href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                                  onClick={closeSidebar}
                                  className={`focus-visible:ring-ring truncate transition-colors focus-visible:ring-1 focus-visible:outline-hidden ${
                                    isActive
                                      ? "text-primary font-semibold"
                                      : "text-foreground hover:text-primary"
                                  }`}
                                  aria-current={isActive ? "page" : undefined}
                                >
                                  {lessonIdx + 1}. {lesson.title}
                                </Link>
                              ) : (
                                <span className="text-muted-foreground truncate">
                                  {lessonIdx + 1}. {lesson.title}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Free preview badge & duration */}
                          <div className="flex shrink-0 items-center gap-1.5">
                            {lesson.isFreePreview && (
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary px-1.5 py-0 text-[10px] font-medium"
                              >
                                Preview
                              </Badge>
                            )}
                            {lesson.durationMinutes !== null &&
                              lesson.durationMinutes > 0 && (
                                <div className="text-muted-foreground flex items-center gap-0.5 text-[10px] tabular-nums">
                                  <Clock
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
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
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className="border-border/60 bg-card/40 hidden w-80 shrink-0 overflow-y-auto border-r p-4 lg:block"
        style={{ height: "calc(100vh - 3.5rem)" }}
        aria-label="Course curriculum navigation"
      >
        {curriculumContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          id="player-curriculum-drawer"
          aria-label="Course curriculum drawer"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={closeSidebar}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="border-border/60 bg-background relative z-10 flex h-full w-4/5 max-w-sm flex-col border-r p-4 shadow-xl">
            <div className="border-border/50 mb-4 flex items-center justify-between border-b pb-3">
              <div className="flex min-w-0 flex-col">
                <span className="text-muted-foreground truncate text-xs font-semibold">
                  Curriculum
                </span>
                <span className="font-heading text-foreground truncate text-sm font-bold">
                  {courseTitle}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={closeSidebar}
                aria-label="Close curriculum drawer"
                className="min-h-10 min-w-10 active:scale-[0.96] motion-reduce:transform-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {curriculumContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
