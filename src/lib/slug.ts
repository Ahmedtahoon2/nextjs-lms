/**
 * Generates a URL-safe, Unicode-aware slug from text.
 *
 * Rules:
 * - Normalizes Unicode using NFKD (decomposing accented characters).
 * - Strips combining diacritical marks (e.g. "Café" -> "Cafe").
 * - Preserves Unicode letters and digits natively via `\p{L}\p{N}` regex without external libraries.
 *   (e.g., Arabic "تعلم البرمجة" -> "تعلم-البرمجة").
 * - Converts Latin characters to lowercase.
 * - Replaces non-letter/number sequences with a single hyphen.
 * - Strips leading and trailing hyphens.
 * - If the result is empty (e.g., input was only punctuation like "???"),
 *   returns the deterministic fallback string.
 */
export function slugify(text: string, fallback = "item"): string {
  const normalized = text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();

  const slug = normalized
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug.length > 0 ? slug : fallback;
}
