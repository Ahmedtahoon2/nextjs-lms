"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  FileText,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  Lock,
} from "lucide-react";
import { CourseStatus } from "@prisma/client";
import { gooeyToast } from "@/components/ui/goey-toaster";
import {
  createModuleAction,
  updateModuleAction,
  deleteModuleAction,
  reorderModulesAction,
  createLessonAction,
  updateLessonAction,
  deleteLessonAction,
  reorderLessonsAction,
} from "@/actions/curriculum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LessonItem {
  id: string;
  title: string;
  slug: string;
  orderIndex: number;
  durationMinutes: number | null;
  isFreePreview: boolean;
  moduleId: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  courseId: string;
  lessons: LessonItem[];
}

interface CurriculumBuilderProps {
  courseId: string;
  courseStatus: CourseStatus;
  initialModules: ModuleItem[];
}

export function CurriculumBuilder({
  courseId,
  courseStatus,
  initialModules,
}: CurriculumBuilderProps) {
  const router = useRouter();
  const [modules, setModules] = React.useState<ModuleItem[]>(initialModules);
  const isPublished = courseStatus === CourseStatus.PUBLISHED;
  const isArchived = courseStatus === CourseStatus.ARCHIVED;

  // Sync state if initialModules changes
  React.useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  // Inline editing state for modules
  const [editingModuleId, setEditingModuleId] = React.useState<string | null>(
    null,
  );
  const [editingModuleTitle, setEditingModuleTitle] = React.useState("");

  // Inline editing state for lessons
  const [editingLessonId, setEditingLessonId] = React.useState<string | null>(
    null,
  );
  const [editingLessonTitle, setEditingLessonTitle] = React.useState("");

  // New module creation state
  const [isAddingModule, setIsAddingModule] = React.useState(false);
  const [newModuleTitle, setNewModuleTitle] = React.useState("");
  const [isSubmittingModule, setIsSubmittingModule] = React.useState(false);

  // New lesson creation state per module: map moduleId -> string (title)
  const [addingLessonForModuleId, setAddingLessonForModuleId] = React.useState<
    string | null
  >(null);
  const [newLessonTitle, setNewLessonTitle] = React.useState("");
  const [isSubmittingLesson, setIsSubmittingLesson] = React.useState(false);

  // ──────────────────────────────────────────────
  // Module Actions
  // ──────────────────────────────────────────────

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    setIsSubmittingModule(true);
    try {
      const result = await createModuleAction({
        courseId,
        title: newModuleTitle.trim(),
      });

      if (result.success) {
        gooeyToast.success("Module created.");
        setModules((prev) => [
          ...prev,
          {
            ...result.data,
            lessons: [],
          },
        ]);
        setNewModuleTitle("");
        setIsAddingModule(false);
        router.refresh();
      } else {
        gooeyToast.error(result.error || "Failed to create module.");
      }
    } catch {
      gooeyToast.error("Failed to create module. Please try again.");
    } finally {
      setIsSubmittingModule(false);
    }
  };

  const handleSaveModuleTitle = async (moduleId: string) => {
    if (!editingModuleTitle.trim()) {
      setEditingModuleId(null);
      return;
    }

    const previousTitle = modules.find((m) => m.id === moduleId)?.title;
    // Optimistic update
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, title: editingModuleTitle.trim() } : m,
      ),
    );
    setEditingModuleId(null);

    try {
      const result = await updateModuleAction(moduleId, {
        title: editingModuleTitle.trim(),
      });

      if (result.success) {
        gooeyToast.success("Module updated.");
      } else {
        // Rollback
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId ? { ...m, title: previousTitle ?? m.title } : m,
          ),
        );
        gooeyToast.error(result.error || "Failed to update module.");
      }
    } catch {
      // Rollback
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, title: previousTitle ?? m.title } : m,
        ),
      );
      gooeyToast.error("Failed to update module.");
    }
  };

  const handleDeleteModule = async (moduleId: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete module "${title}" and all its lessons?`,
    );
    if (!confirmed) return;

    const previousModules = [...modules];
    setModules((prev) => prev.filter((m) => m.id !== moduleId));

    try {
      const result = await deleteModuleAction(moduleId);
      if (result.success) {
        gooeyToast.success("Module deleted.");
        router.refresh();
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to delete module.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to delete module.");
    }
  };

  const handleMoveModule = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const reordered = [...modules];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Update orderIndex values locally
    const updated = reordered.map((m, idx) => ({ ...m, orderIndex: idx }));
    const previousModules = [...modules];
    setModules(updated);

    try {
      const result = await reorderModulesAction({
        courseId,
        orderedIds: updated.map((m) => m.id),
      });

      if (result.success) {
        gooeyToast.success("Modules reordered.");
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to reorder modules.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to reorder modules.");
    }
  };

  // ──────────────────────────────────────────────
  // Lesson Actions
  // ──────────────────────────────────────────────

  const handleCreateLesson = async (e: React.FormEvent, moduleId: string) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    setIsSubmittingLesson(true);
    try {
      const result = await createLessonAction({
        moduleId,
        title: newLessonTitle.trim(),
      });

      if (result.success) {
        gooeyToast.success("Lesson created.");
        setModules((prev) =>
          prev.map((mod) => {
            if (mod.id === moduleId) {
              return {
                ...mod,
                lessons: [...mod.lessons, result.data],
              };
            }
            return mod;
          }),
        );
        setNewLessonTitle("");
        setAddingLessonForModuleId(null);
        router.refresh();
      } else {
        gooeyToast.error(result.error || "Failed to create lesson.");
      }
    } catch {
      gooeyToast.error("Failed to create lesson. Please try again.");
    } finally {
      setIsSubmittingLesson(false);
    }
  };

  const handleSaveLessonTitle = async (moduleId: string, lessonId: string) => {
    if (!editingLessonTitle.trim()) {
      setEditingLessonId(null);
      return;
    }

    const previousModules = [...modules];
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.map((l) =>
              l.id === lessonId
                ? { ...l, title: editingLessonTitle.trim() }
                : l,
            ),
          };
        }
        return mod;
      }),
    );
    setEditingLessonId(null);

    try {
      const result = await updateLessonAction(lessonId, {
        title: editingLessonTitle.trim(),
      });

      if (result.success) {
        gooeyToast.success("Lesson updated.");
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to update lesson.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to update lesson.");
    }
  };

  const handleToggleFreePreview = async (
    moduleId: string,
    lessonId: string,
    currentPreview: boolean,
  ) => {
    const previousModules = [...modules];
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.map((l) =>
              l.id === lessonId ? { ...l, isFreePreview: !currentPreview } : l,
            ),
          };
        }
        return mod;
      }),
    );

    try {
      const result = await updateLessonAction(lessonId, {
        isFreePreview: !currentPreview,
      });

      if (result.success) {
        gooeyToast.success(
          !currentPreview
            ? "Lesson marked as Free Preview."
            : "Free preview removed from lesson.",
        );
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to update preview status.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to update preview status.");
    }
  };

  const handleDeleteLesson = async (
    moduleId: string,
    lessonId: string,
    title: string,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete lesson "${title}"?`,
    );
    if (!confirmed) return;

    const previousModules = [...modules];
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          return {
            ...mod,
            lessons: mod.lessons.filter((l) => l.id !== lessonId),
          };
        }
        return mod;
      }),
    );

    try {
      const result = await deleteLessonAction(lessonId);
      if (result.success) {
        gooeyToast.success("Lesson deleted.");
        router.refresh();
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to delete lesson.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to delete lesson.");
    }
  };

  const handleMoveLesson = async (
    moduleId: string,
    index: number,
    direction: "up" | "down",
  ) => {
    const currentModule = modules.find((m) => m.id === moduleId);
    if (!currentModule) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentModule.lessons.length) return;

    const reordered = [...currentModule.lessons];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const updatedLessons = reordered.map((l, idx) => ({
      ...l,
      orderIndex: idx,
    }));
    const previousModules = [...modules];

    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, lessons: updatedLessons } : m,
      ),
    );

    try {
      const result = await reorderLessonsAction({
        moduleId,
        orderedIds: updatedLessons.map((l) => l.id),
      });

      if (result.success) {
        gooeyToast.success("Lessons reordered.");
      } else {
        setModules(previousModules);
        gooeyToast.error(result.error || "Failed to reorder lessons.");
      }
    } catch {
      setModules(previousModules);
      gooeyToast.error("Failed to reorder lessons.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Notice for Published Courses */}
      {isPublished && (
        <section
          aria-label="Course publication status notice"
          className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-300"
        >
          <Lock className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="max-w-[65ch] text-pretty">
            <p className="font-semibold">Course is Published</p>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-400/90">
              Structural modifications (adding, deleting, or reordering modules
              and lessons) are locked while a course is live. To change the
              structure, unpublish the course first. You can still update lesson
              content directly anytime.
            </p>
          </div>
        </section>
      )}

      {/* Modules Outline */}
      {modules.length === 0 ? (
        <div className="border-border bg-card/30 flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="bg-primary/10 text-primary mb-3 flex size-12 items-center justify-center rounded-xl">
            <Layers className="size-6" />
          </div>
          <h3 className="text-foreground text-base font-semibold">
            No curriculum items yet
          </h3>
          <p className="text-muted-foreground mt-1 max-w-[45ch] text-xs text-pretty">
            Begin structuring your course by creating your first module. Modules
            group related lessons together.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((module, modIndex) => (
            <div
              key={module.id}
              className="border-border bg-card overflow-hidden rounded-xl border shadow-xs transition-all"
            >
              {/* Module Header */}
              <div className="border-border/70 bg-muted/40 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
                <div className="flex min-w-50 flex-1 items-center gap-3">
                  {/* Module Reordering Controls */}
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      aria-label="Move module up"
                      disabled={isPublished || isArchived || modIndex === 0}
                      onClick={() => handleMoveModule(modIndex, "up")}
                      className="border-input text-muted-foreground hover:bg-accent hover:text-foreground flex size-9 min-h-9 min-w-9 items-center justify-center rounded-md border active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30 sm:size-8 sm:min-h-8 sm:min-w-8"
                    >
                      <ChevronUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Move module down"
                      disabled={
                        isPublished ||
                        isArchived ||
                        modIndex === modules.length - 1
                      }
                      onClick={() => handleMoveModule(modIndex, "down")}
                      className="border-input text-muted-foreground hover:bg-accent hover:text-foreground flex size-9 min-h-9 min-w-9 items-center justify-center rounded-md border active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30 sm:size-8 sm:min-h-8 sm:min-w-8"
                    >
                      <ChevronDown className="size-4" />
                    </button>
                  </div>

                  <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Module {modIndex + 1}
                  </span>

                  {/* Inline Module Title Editor */}
                  {editingModuleId === module.id ? (
                    <div className="flex max-w-md flex-1 items-center gap-2">
                      <Input
                        value={editingModuleTitle}
                        onChange={(e) => setEditingModuleTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleSaveModuleTitle(module.id);
                          if (e.key === "Escape") setEditingModuleId(null);
                        }}
                        autoFocus
                        className="h-8 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveModuleTitle(module.id)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-8 items-center justify-center rounded-md"
                      >
                        <Check className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingModuleId(null)}
                        className="border-input hover:bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-md border"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center gap-2">
                      <h3 className="text-foreground text-sm font-semibold">
                        {module.title}
                      </h3>
                      {!isPublished && !isArchived && (
                        <button
                          type="button"
                          aria-label={`Rename module ${module.title}`}
                          onClick={() => {
                            setEditingModuleId(module.id);
                            setEditingModuleTitle(module.title);
                          }}
                          className="text-muted-foreground hover:bg-muted hover:text-foreground flex size-7 items-center justify-center rounded"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Module Delete Action */}
                {!isPublished && !isArchived && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete module ${module.title}`}
                    onClick={() => handleDeleteModule(module.id, module.title)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 size-8 active:scale-[0.98]"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>

              {/* Lessons List within Module */}
              <div className="divide-border/40 divide-y p-2 sm:p-3">
                {module.lessons.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center text-xs">
                    No lessons in this module yet.
                  </p>
                ) : (
                  module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="hover:bg-muted/30 flex flex-wrap items-center justify-between gap-2.5 rounded-lg px-3 py-2 transition-colors"
                    >
                      <div className="flex min-w-50 flex-1 items-center gap-3">
                        {/* Lesson Reordering Controls */}
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            aria-label="Move lesson up"
                            disabled={
                              isPublished || isArchived || lessonIndex === 0
                            }
                            onClick={() =>
                              handleMoveLesson(module.id, lessonIndex, "up")
                            }
                            className="border-input text-muted-foreground hover:bg-accent hover:text-foreground flex size-8 min-h-8 min-w-8 items-center justify-center rounded border active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
                          >
                            <ChevronUp className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Move lesson down"
                            disabled={
                              isPublished ||
                              isArchived ||
                              lessonIndex === module.lessons.length - 1
                            }
                            onClick={() =>
                              handleMoveLesson(module.id, lessonIndex, "down")
                            }
                            className="border-input text-muted-foreground hover:bg-accent hover:text-foreground flex size-8 min-h-8 min-w-8 items-center justify-center rounded border active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
                          >
                            <ChevronDown className="size-3.5" />
                          </button>
                        </div>

                        <span className="text-muted-foreground font-mono text-xs">
                          {modIndex + 1}.{lessonIndex + 1}
                        </span>

                        {/* Inline Lesson Title Editor */}
                        {editingLessonId === lesson.id ? (
                          <div className="flex max-w-sm flex-1 items-center gap-2">
                            <Input
                              value={editingLessonTitle}
                              onChange={(e) =>
                                setEditingLessonTitle(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleSaveLessonTitle(module.id, lesson.id);
                                if (e.key === "Escape")
                                  setEditingLessonId(null);
                              }}
                              autoFocus
                              className="h-7 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleSaveLessonTitle(module.id, lesson.id)
                              }
                              className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded"
                            >
                              <Check className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingLessonId(null)}
                              className="border-input text-muted-foreground flex size-7 items-center justify-center rounded border"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-1 items-center gap-2">
                            <span className="text-foreground text-xs font-medium">
                              {lesson.title}
                            </span>
                            {!isPublished && !isArchived && (
                              <button
                                type="button"
                                aria-label={`Rename lesson ${lesson.title}`}
                                onClick={() => {
                                  setEditingLessonId(lesson.id);
                                  setEditingLessonTitle(lesson.title);
                                }}
                                className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center rounded"
                              >
                                <Edit2 className="size-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Lesson Badges & Quick Controls */}
                      <div className="flex items-center gap-2">
                        {/* Free Preview Toggle */}
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleFreePreview(
                              module.id,
                              lesson.id,
                              lesson.isFreePreview,
                            )
                          }
                          disabled={isArchived}
                          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                            lesson.isFreePreview
                              ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 border"
                              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {lesson.isFreePreview ? (
                            <>
                              <Eye className="size-3" />
                              <span>Free Preview</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="size-3" />
                              <span>Locked</span>
                            </>
                          )}
                        </button>

                        {/* Direct Lesson Content Editor Navigation */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 min-h-7 px-2 text-xs active:scale-[0.98]"
                          nativeButton={false}
                          render={
                            <Link
                              href={`/instructor/courses/${courseId}/lessons/${lesson.id}`}
                            >
                              <FileText className="mr-1 size-3" />
                              Content
                            </Link>
                          }
                        />

                        {/* Lesson Delete Action */}
                        {!isPublished && !isArchived && (
                          <button
                            type="button"
                            aria-label={`Delete lesson ${lesson.title}`}
                            onClick={() =>
                              handleDeleteLesson(
                                module.id,
                                lesson.id,
                                lesson.title,
                              )
                            }
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex size-7 items-center justify-center rounded transition-colors"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {/* Add Lesson Form per Module */}
                {!isPublished && !isArchived && (
                  <div className="pt-2">
                    {addingLessonForModuleId === module.id ? (
                      <form
                        onSubmit={(e) => handleCreateLesson(e, module.id)}
                        className="flex items-center gap-2 pt-2"
                      >
                        <Input
                          placeholder="Lesson title..."
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                          className="h-8 flex-1 text-xs"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={
                            isSubmittingLesson || !newLessonTitle.trim()
                          }
                          className="h-8 text-xs active:scale-[0.98]"
                        >
                          {isSubmittingLesson ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            "Add"
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAddingLessonForModuleId(null);
                            setNewLessonTitle("");
                          }}
                          className="h-8 text-xs"
                        >
                          Cancel
                        </Button>
                      </form>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAddingLessonForModuleId(module.id)}
                        className="text-muted-foreground hover:text-foreground h-8 text-xs active:scale-[0.98]"
                      >
                        <Plus className="mr-1.5 size-3.5" />
                        Add Lesson
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Module Button / Form */}
      {!isPublished && !isArchived && (
        <div className="pt-2">
          {isAddingModule ? (
            <form
              onSubmit={handleCreateModule}
              className="border-border bg-card space-y-3 rounded-xl border p-4 shadow-xs"
            >
              <h4 className="text-foreground text-sm font-semibold">
                Add New Module
              </h4>
              <Input
                placeholder="e.g. Module 1: Getting Started with Next.js"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="h-10 text-sm"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmittingModule || !newModuleTitle.trim()}
                  className="min-h-10 min-w-10 active:scale-[0.98]"
                >
                  {isSubmittingModule ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 size-4" />
                  )}
                  Create Module
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddingModule(false);
                    setNewModuleTitle("");
                  }}
                  className="min-h-10 min-w-10 active:scale-[0.98]"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsAddingModule(true)}
              className="min-h-11 w-full border-dashed text-sm active:scale-[0.98]"
            >
              <Plus className="mr-2 size-4" />
              Add Module
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
