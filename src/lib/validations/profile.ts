import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  headline: z
    .string()
    .trim()
    .max(100, "Headline cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .trim()
    .max(1000, "Bio cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .trim()
    .url("Invalid website URL")
    .max(200, "Website URL cannot exceed 200 characters")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .string()
    .trim()
    .url("Invalid avatar URL")
    .max(500, "Avatar URL cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
