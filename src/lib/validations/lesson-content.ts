import { z } from "zod";

export const lessonIdSchema = z
  .string()
  .cuid({ message: "Invalid lesson ID format" });

export const httpUrlSchema = z
  .string()
  .trim()
  .url("Invalid URL format")
  .max(500, "URL cannot exceed 500 characters")
  .refine((val) => {
    try {
      const u = new URL(val);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, "URL must use http: or https: scheme");

export const resourceAttachmentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Resource name is required")
      .max(100, "Resource name cannot exceed 100 characters"),
    url: httpUrlSchema,
  })
  .strict();

export const updateLessonContentSchema = z
  .object({
    lessonId: lessonIdSchema,
    bodyMarkdown: z
      .string()
      .max(50000, "Content cannot exceed 50,000 characters")
      .optional(),
    videoUrl: httpUrlSchema.optional().or(z.literal("")),
    resources: z
      .array(resourceAttachmentSchema)
      .max(10, "Maximum 10 resources allowed")
      .optional(),
  })
  .strict();

export type ResourceAttachment = z.infer<typeof resourceAttachmentSchema>;
export type UpdateLessonContentInput = z.infer<
  typeof updateLessonContentSchema
>;
