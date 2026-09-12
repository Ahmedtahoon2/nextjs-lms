import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

const ALLOWED_IFRAME_HOSTNAMES = new Set([
  "youtube.com",
  "www.youtube.com",
  "player.vimeo.com",
  "vimeo.com",
  "loom.com",
  "www.loom.com",
]);

export const SANITIZER_CONFIG: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "blockquote",
    "pre",
    "code",
    "ul",
    "ol",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "del",
    "hr",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "a",
    "img",
    "iframe",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height"],
    iframe: ["src", "width", "height", "allowfullscreen", "frameborder"],
    code: ["class"],
    pre: ["class"],
    th: ["align"],
    td: ["align"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: {
    iframe: ["https"],
    img: ["http", "https"],
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
  },
  exclusiveFilter: (frame) => {
    // 1. Strict WHATWG URL verification for iframes
    if (frame.tag === "iframe") {
      const src = frame.attribs["src"];
      if (!src) return true; // Drop iframe without src

      try {
        const parsed = new URL(src);
        if (parsed.protocol !== "https:") {
          return true; // Drop non-https iframes
        }

        const hostname = parsed.hostname.toLowerCase();
        if (!ALLOWED_IFRAME_HOSTNAMES.has(hostname)) {
          return true; // Drop untrusted host
        }
      } catch {
        return true; // Drop invalid URL
      }
    }

    // 2. Strict WHATWG URL verification for images (reject data:, javascript:, file:)
    if (frame.tag === "img") {
      const src = frame.attribs["src"];
      if (!src) return true;

      try {
        const parsed = new URL(src);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          return true; // Drop unsupported schemes
        }
      } catch {
        return true; // Drop malformed URL
      }
    }

    return false;
  },
};

/**
 * Server-side pipeline:
 * Markdown -> marked.parse() -> sanitize-html with strict WHATWG URL validation -> persisted bodyHtml
 *
 * Guarantees:
 * - Strips <script> tags and all executable code blocks
 * - Strips all inline event handlers (onload, onerror, onclick, etc.)
 * - Strips javascript: and data: pseudo-protocols from links and images
 * - Restricts iframe hosts strictly to YouTube, Vimeo, and Loom via parsed WHATWG hostname
 * - External links enforce target="_blank" and rel="noopener noreferrer"
 */
export async function markdownToSanitizedHtml(
  markdown: string,
): Promise<string> {
  if (!markdown || !markdown.trim()) {
    return "";
  }

  // 1. Parse markdown to raw HTML
  const rawHtml = await marked.parse(markdown, {
    gfm: true,
    breaks: true,
  });

  // 2. Sanitize raw HTML
  const cleanHtml = sanitizeHtml(rawHtml, SANITIZER_CONFIG);

  return cleanHtml;
}
