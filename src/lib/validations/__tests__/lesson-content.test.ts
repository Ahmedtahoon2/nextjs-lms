import {
  lessonIdSchema,
  httpUrlSchema,
  resourceAttachmentSchema,
  updateLessonContentSchema,
} from "../lesson-content";

describe("Lesson Content Validations", () => {
  const validCuid = "clh1234567890123456789012";

  describe("lessonIdSchema", () => {
    it("accepts valid cuid", () => {
      const result = lessonIdSchema.safeParse(validCuid);
      expect(result.success).toBe(true);
    });

    it("rejects non-cuid string", () => {
      const result = lessonIdSchema.safeParse("not-a-cuid");
      expect(result.success).toBe(false);
    });
  });

  describe("httpUrlSchema", () => {
    it("accepts valid https and http URLs", () => {
      expect(
        httpUrlSchema.safeParse("https://example.com/file.pdf").success,
      ).toBe(true);
      expect(httpUrlSchema.safeParse("http://example.com/video").success).toBe(
        true,
      );
    });

    it("rejects javascript: pseudo-protocol", () => {
      const result = httpUrlSchema.safeParse("javascript:alert(1)");
      expect(result.success).toBe(false);
    });

    it("rejects data: URI", () => {
      const result = httpUrlSchema.safeParse("data:text/html,test");
      expect(result.success).toBe(false);
    });

    it("rejects file: and blob: schemes", () => {
      expect(httpUrlSchema.safeParse("file:///etc/passwd").success).toBe(false);
      expect(
        httpUrlSchema.safeParse("blob:https://example.com/uuid").success,
      ).toBe(false);
    });

    it("rejects malformed URLs", () => {
      expect(httpUrlSchema.safeParse("not a url").success).toBe(false);
    });

    it("rejects URL exceeding 500 characters", () => {
      const longUrl = `https://example.com/${"a".repeat(500)}`;
      expect(httpUrlSchema.safeParse(longUrl).success).toBe(false);
    });
  });

  describe("resourceAttachmentSchema", () => {
    it("accepts valid resource attachment", () => {
      const result = resourceAttachmentSchema.safeParse({
        name: "Cheat Sheet PDF",
        url: "https://example.com/cheatsheet.pdf",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty name or name > 100 chars", () => {
      expect(
        resourceAttachmentSchema.safeParse({
          name: "",
          url: "https://example.com/doc",
        }).success,
      ).toBe(false);

      expect(
        resourceAttachmentSchema.safeParse({
          name: "a".repeat(101),
          url: "https://example.com/doc",
        }).success,
      ).toBe(false);
    });

    it("strictly rejects unrecognized keys", () => {
      const result = resourceAttachmentSchema.safeParse({
        name: "Notes",
        url: "https://example.com/notes",
        extraField: "forbidden",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("updateLessonContentSchema", () => {
    it("accepts valid full payload", () => {
      const result = updateLessonContentSchema.safeParse({
        lessonId: validCuid,
        bodyMarkdown: "# Lesson Markdown Content",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        resources: [
          {
            name: "Slide Deck",
            url: "https://example.com/slides.pdf",
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("accepts empty videoUrl string or optional fields", () => {
      const result = updateLessonContentSchema.safeParse({
        lessonId: validCuid,
        videoUrl: "",
      });
      expect(result.success).toBe(true);
    });

    it("rejects bodyMarkdown exceeding 50,000 characters", () => {
      const result = updateLessonContentSchema.safeParse({
        lessonId: validCuid,
        bodyMarkdown: "a".repeat(50001),
      });
      expect(result.success).toBe(false);
    });

    it("rejects more than 10 resources", () => {
      const resources = Array.from({ length: 11 }, (_, i) => ({
        name: `Resource ${i}`,
        url: `https://example.com/res${i}`,
      }));

      const result = updateLessonContentSchema.safeParse({
        lessonId: validCuid,
        resources,
      });
      expect(result.success).toBe(false);
    });

    it("strictly rejects unrecognized fields", () => {
      const result = updateLessonContentSchema.safeParse({
        lessonId: validCuid,
        unknownField: "test",
      });
      expect(result.success).toBe(false);
    });
  });
});
