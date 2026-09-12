import { z } from "zod";

export const courseLevelEnum = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "ALL_LEVELS",
]);

export const createCourseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be at most 1000 characters")
    .optional(),
  level: courseLevelEnum.default("ALL_LEVELS"),
  category: z
    .string()
    .trim()
    .max(50, "Category must be at most 50 characters")
    .optional(),
  thumbnailUrl: z
    .string()
    .trim()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});

export const updateCourseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(1000, "Description must be at most 1000 characters")
      .optional(),
    level: courseLevelEnum.optional(),
    category: z
      .string()
      .trim()
      .max(50, "Category must be at most 50 characters")
      .optional(),
    thumbnailUrl: z
      .string()
      .trim()
      .url("Invalid URL")
      .optional()
      .or(z.literal("")),
  })
  .strict();

export const createModuleSchema = z.object({
  courseId: z.string().cuid("Invalid course ID"),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional(),
});

export const updateModuleSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title must be at most 100 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, "Description must be at most 500 characters")
      .optional(),
  })
  .strict();

export const reorderModulesSchema = z.object({
  courseId: z.string().cuid("Invalid course ID"),
  orderedIds: z
    .array(z.string().cuid("Invalid module ID in orderedIds"))
    .min(1, "Must provide at least one module ID to reorder"),
});

export const createLessonSchema = z.object({
  moduleId: z.string().cuid("Invalid module ID"),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters"),
  durationMinutes: z
    .number()
    .int("Duration must be an integer")
    .nonnegative("Duration cannot be negative")
    .max(600, "Duration cannot exceed 600 minutes")
    .optional(),
  isFreePreview: z.boolean().default(false),
});

export const updateLessonSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title must be at most 100 characters")
      .optional(),
    durationMinutes: z
      .number()
      .int("Duration must be an integer")
      .nonnegative("Duration cannot be negative")
      .max(600, "Duration cannot exceed 600 minutes")
      .optional()
      .nullable(),
    isFreePreview: z.boolean().optional(),
  })
  .strict();

export const reorderLessonsSchema = z.object({
  moduleId: z.string().cuid("Invalid module ID"),
  orderedIds: z
    .array(z.string().cuid("Invalid lesson ID in orderedIds"))
    .min(1, "Must provide at least one lesson ID to reorder"),
});

export const publishCourseSchema = z.object({
  courseId: z.string().cuid("Invalid course ID"),
  publish: z.boolean(),
});

export type CreateCourseInput = z.input<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
export type ReorderModulesInput = z.infer<typeof reorderModulesSchema>;
export type CreateLessonInput = z.input<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type ReorderLessonsInput = z.infer<typeof reorderLessonsSchema>;
export type PublishCourseInput = z.infer<typeof publishCourseSchema>;
