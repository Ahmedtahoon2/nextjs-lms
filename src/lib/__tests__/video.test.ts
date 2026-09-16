import { normalizeVideoUrl } from "../video";
import { ValidationError } from "@/lib/errors";

describe("normalizeVideoUrl", () => {
  describe("YouTube", () => {
    it("normalizes standard watch URL", () => {
      const result = normalizeVideoUrl(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("normalizes watch URL with query parameters", () => {
      const result = normalizeVideoUrl(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s&feature=shared",
      );
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("normalizes youtu.be short URL", () => {
      const result = normalizeVideoUrl("https://youtu.be/dQw4w9WgXcQ");
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("normalizes youtube shorts URL", () => {
      const result = normalizeVideoUrl(
        "https://www.youtube.com/shorts/dQw4w9WgXcQ",
      );
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("normalizes already embedded youtube URL", () => {
      const result = normalizeVideoUrl(
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
      );
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("handles mobile youtube host (m.youtube.com)", () => {
      const result = normalizeVideoUrl(
        "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
      );
      expect(result).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("rejects invalid youtube ID length", () => {
      expect(() =>
        normalizeVideoUrl("https://www.youtube.com/watch?v=tooShort"),
      ).toThrow(ValidationError);
    });

    it("rejects youtube watch URL without v param", () => {
      expect(() =>
        normalizeVideoUrl("https://www.youtube.com/watch?other=123"),
      ).toThrow(ValidationError);
    });
  });

  describe("Vimeo", () => {
    it("normalizes standard vimeo URL", () => {
      const result = normalizeVideoUrl("https://vimeo.com/123456789");
      expect(result).toBe("https://player.vimeo.com/video/123456789");
    });

    it("normalizes player.vimeo.com URL", () => {
      const result = normalizeVideoUrl(
        "https://player.vimeo.com/video/123456789",
      );
      expect(result).toBe("https://player.vimeo.com/video/123456789");
    });

    it("rejects non-numeric vimeo ID", () => {
      expect(() => normalizeVideoUrl("https://vimeo.com/not-a-number")).toThrow(
        ValidationError,
      );
    });
  });

  describe("Loom", () => {
    it("normalizes loom share URL", () => {
      const result = normalizeVideoUrl(
        "https://www.loom.com/share/abc123def456",
      );
      expect(result).toBe("https://www.loom.com/embed/abc123def456");
    });

    it("normalizes loom embed URL", () => {
      const result = normalizeVideoUrl(
        "https://loom.com/embed/abc123def456_xyz",
      );
      expect(result).toBe("https://www.loom.com/embed/abc123def456_xyz");
    });

    it("rejects missing loom ID", () => {
      expect(() => normalizeVideoUrl("https://www.loom.com/share/")).toThrow(
        ValidationError,
      );
    });
  });

  describe("Security & Validation Bypass Protections", () => {
    it("returns empty string for empty input or whitespace", () => {
      expect(normalizeVideoUrl("")).toBe("");
      expect(normalizeVideoUrl("   ")).toBe("");
    });

    it("rejects malicious hostname prefix / subdomain bypass", () => {
      expect(() =>
        normalizeVideoUrl("https://youtube.com.evil.com/watch?v=dQw4w9WgXcQ"),
      ).toThrow(ValidationError);
      expect(() =>
        normalizeVideoUrl("https://vimeo.com.attacker.org/123456789"),
      ).toThrow(ValidationError);
      expect(() =>
        normalizeVideoUrl("https://loom.com.phishing.net/share/123"),
      ).toThrow(ValidationError);
    });

    it("rejects open-redirect query parameter bypass", () => {
      expect(() =>
        normalizeVideoUrl(
          "https://evil.com/?redirect=https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        ),
      ).toThrow(ValidationError);
    });

    it("rejects non-http/https schemes like javascript: and data:", () => {
      expect(() => normalizeVideoUrl("javascript:alert('XSS')")).toThrow(
        ValidationError,
      );
      expect(() =>
        normalizeVideoUrl("data:text/html,<script>alert(1)</script>"),
      ).toThrow(ValidationError);
      expect(() => normalizeVideoUrl("file:///C:/passwords.txt")).toThrow(
        ValidationError,
      );
    });

    it("rejects unsupported video providers", () => {
      expect(() =>
        normalizeVideoUrl("https://www.dailymotion.com/video/x7tgad0"),
      ).toThrow(ValidationError);
      expect(() =>
        normalizeVideoUrl("https://www.tiktok.com/@user/video/123456"),
      ).toThrow(ValidationError);
    });

    it("rejects completely malformed string", () => {
      expect(() => normalizeVideoUrl("not a url at all")).toThrow(
        ValidationError,
      );
    });
  });
});
