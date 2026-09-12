import { z } from "zod";
import { courseLevelEnum } from "./course";

export const catalogSortEnum = z.enum(["newest", "title_asc", "title_desc"]);
export type CatalogSort = z.infer<typeof catalogSortEnum>;

export const catalogQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.string().trim().max(50).optional(),
  level: courseLevelEnum.optional(),
  sort: catalogSortEnum.default("newest"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
});

export type CatalogQueryInput = z.infer<typeof catalogQuerySchema>;

/**
 * Validates untrusted resource JSON objects ensuring only http/https schemes.
 */
export const resourceItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  url: z
    .string()
    .trim()
    .url("Invalid URL format")
    .refine((val) => {
      try {
        const parsed = new URL(val);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Only HTTP and HTTPS protocols are allowed"),
});

export type SafeResourceItem = z.infer<typeof resourceItemSchema>;

export function parseSafeResources(raw: unknown): SafeResourceItem[] {
  if (!Array.isArray(raw)) return [];
  const safeItems: SafeResourceItem[] = [];
  for (const item of raw) {
    const parsed = resourceItemSchema.safeParse(item);
    if (parsed.success) {
      safeItems.push(parsed.data);
    }
  }
  return safeItems;
}
