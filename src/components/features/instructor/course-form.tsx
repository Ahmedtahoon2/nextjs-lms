"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gooeyToast } from "@/components/ui/goey-toaster";
import {
  createCourseSchema,
  type CreateCourseInput,
} from "@/lib/validations/course";
import { createCourseAction, updateCourseAction } from "@/actions/course";
import { CourseLevel } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";

interface CourseFormProps {
  mode: "create" | "edit";
  courseId?: string;
  initialData?: {
    title?: string;
    description?: string | null;
    level?: CourseLevel;
    category?: string | null;
    thumbnailUrl?: string | null;
  };
}

export function CourseForm({ mode, courseId, initialData }: CourseFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      level: initialData?.level ?? CourseLevel.ALL_LEVELS,
      category: initialData?.category ?? "",
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
    },
  });

  const selectedLevel = watch("level") || CourseLevel.ALL_LEVELS;

  const onSubmit = async (data: CreateCourseInput) => {
    setServerError(null);

    try {
      if (mode === "create") {
        const result = await createCourseAction(data);
        if (result.success) {
          gooeyToast.success("Course created successfully!");
          router.push(`/instructor/courses/${result.data.id}/curriculum`);
        } else {
          setServerError(result.error || "Failed to create course.");
          gooeyToast.error(result.error || "Failed to create course.");
        }
      } else {
        if (!courseId) throw new Error("Missing courseId for edit mode");
        const result = await updateCourseAction(courseId, data);
        if (result.success) {
          gooeyToast.success("Course settings saved successfully!");
          router.refresh();
        } else {
          setServerError(result.error || "Failed to update course.");
          gooeyToast.error(result.error || "Failed to update course.");
        }
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      gooeyToast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div
          role="alert"
          className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-2.5 rounded-lg border p-3.5 text-sm"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Course Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Course Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="e.g. Master Next.js 16 with Fullstack Architecture"
          {...register("title")}
          aria-invalid={Boolean(errors.title)}
          className="h-10"
        />
        {errors.title && (
          <p className="text-destructive text-xs">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Course Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what students will learn in this course..."
          rows={4}
          {...register("description")}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <p className="text-destructive text-xs">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category & Level Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category
          </Label>
          <Input
            id="category"
            placeholder="e.g. Web Development"
            {...register("category")}
            aria-invalid={Boolean(errors.category)}
            className="h-10"
          />
          {errors.category && (
            <p className="text-destructive text-xs">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Difficulty Level</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                CourseLevel.ALL_LEVELS,
                CourseLevel.BEGINNER,
                CourseLevel.INTERMEDIATE,
                CourseLevel.ADVANCED,
              ] as const
            ).map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() =>
                    setValue("level", lvl, { shouldValidate: true })
                  }
                  className={`flex h-10 items-center justify-center rounded-md border text-xs font-medium transition-all active:scale-[0.98] ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : "border-input bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  {lvl.replace("_", " ")}
                </button>
              );
            })}
          </div>
          {errors.level && (
            <p className="text-destructive text-xs">{errors.level.message}</p>
          )}
        </div>
      </div>

      {/* Thumbnail URL */}
      <div className="space-y-2">
        <Label htmlFor="thumbnailUrl" className="text-sm font-medium">
          Cover Image URL
        </Label>
        <Input
          id="thumbnailUrl"
          type="url"
          placeholder="https://images.example.com/cover.jpg"
          {...register("thumbnailUrl")}
          aria-invalid={Boolean(errors.thumbnailUrl)}
          className="h-10"
        />
        {errors.thumbnailUrl && (
          <p className="text-destructive text-xs">
            {errors.thumbnailUrl.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="min-h-10 min-w-10 active:scale-[0.98]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 min-w-10 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {mode === "create" ? "Creating Course..." : "Saving Changes..."}
            </>
          ) : mode === "create" ? (
            "Create Course & Build Curriculum"
          ) : (
            "Save Course Settings"
          )}
        </Button>
      </div>
    </form>
  );
}
