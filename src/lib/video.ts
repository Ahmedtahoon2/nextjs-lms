import { ValidationError } from "@/lib/errors";

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
const VIMEO_ID_REGEX = /^\d+$/;
const LOOM_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

/**
 * Normalizes video URLs from YouTube, Vimeo, and Loom into standard embed URLs.
 * Uses WHATWG URL API to prevent hostname spoofing and URL bypass attacks.
 *
 * Supported hosts and formats:
 * - YouTube:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/shorts/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID
 *   -> https://www.youtube.com/embed/VIDEO_ID
 *
 * - Vimeo:
 *   - https://vimeo.com/VIDEO_ID
 *   - https://player.vimeo.com/video/VIDEO_ID
 *   -> https://player.vimeo.com/video/VIDEO_ID
 *
 * - Loom:
 *   - https://www.loom.com/share/VIDEO_ID
 *   - https://www.loom.com/embed/VIDEO_ID
 *   -> https://www.loom.com/embed/VIDEO_ID
 *
 * @throws {ValidationError} If URL is malformed, uses unsupported scheme, points to untrusted host, or has invalid video ID.
 */
export function normalizeVideoUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return "";
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new ValidationError("Invalid video URL format");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new ValidationError("Video URL must use http: or https: scheme");
  }

  const hostname = parsed.hostname.toLowerCase();

  // 1. YouTube
  if (
    hostname === "youtube.com" ||
    hostname === "www.youtube.com" ||
    hostname === "m.youtube.com"
  ) {
    let videoId: string | null = null;
    const pathname = parsed.pathname;

    if (pathname === "/watch") {
      videoId = parsed.searchParams.get("v");
    } else if (pathname.startsWith("/shorts/")) {
      const parts = pathname.split("/").filter(Boolean);
      videoId = parts[1] ?? null;
    } else if (pathname.startsWith("/embed/")) {
      const parts = pathname.split("/").filter(Boolean);
      videoId = parts[1] ?? null;
    }

    if (!videoId || !YOUTUBE_ID_REGEX.test(videoId)) {
      throw new ValidationError("Invalid or missing YouTube video ID");
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (hostname === "youtu.be") {
    const parts = parsed.pathname.split("/").filter(Boolean);
    const videoId = parts[0] ?? null;

    if (!videoId || !YOUTUBE_ID_REGEX.test(videoId)) {
      throw new ValidationError("Invalid or missing YouTube video ID");
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 2. Vimeo
  if (hostname === "vimeo.com" || hostname === "www.vimeo.com") {
    const parts = parsed.pathname.split("/").filter(Boolean);
    const videoId = parts[0] ?? null;

    if (!videoId || !VIMEO_ID_REGEX.test(videoId)) {
      throw new ValidationError("Invalid or missing Vimeo video ID");
    }

    return `https://player.vimeo.com/video/${videoId}`;
  }

  if (hostname === "player.vimeo.com") {
    const parts = parsed.pathname.split("/").filter(Boolean);
    let videoId: string | null = null;
    if (parts[0] === "video" && parts[1]) {
      videoId = parts[1];
    }

    if (!videoId || !VIMEO_ID_REGEX.test(videoId)) {
      throw new ValidationError("Invalid or missing Vimeo video ID");
    }

    return `https://player.vimeo.com/video/${videoId}`;
  }

  // 3. Loom
  if (hostname === "loom.com" || hostname === "www.loom.com") {
    const parts = parsed.pathname.split("/").filter(Boolean);
    let videoId: string | null = null;

    if ((parts[0] === "share" || parts[0] === "embed") && parts[1]) {
      videoId = parts[1];
    }

    if (!videoId || !LOOM_ID_REGEX.test(videoId)) {
      throw new ValidationError("Invalid or missing Loom video ID");
    }

    return `https://www.loom.com/embed/${videoId}`;
  }

  throw new ValidationError(
    "Unsupported video provider. Supported providers are YouTube, Vimeo, and Loom.",
  );
}
