import { z } from "zod";

export const enrollCourseSchema = z.object({
  courseId: z.string().cuid({ message: "Invalid course ID format" }),
});

export const toggleLessonProgressSchema = z.object({
  lessonId: z.string().cuid({ message: "Invalid lesson ID format" }),
  completed: z.boolean(),
});

export const courseIdSchema = z
  .string()
  .cuid({ message: "Invalid course ID format" });

export type EnrollCourseInput = z.infer<typeof enrollCourseSchema>;
export type ToggleLessonProgressInput = z.infer<
  typeof toggleLessonProgressSchema
>;
