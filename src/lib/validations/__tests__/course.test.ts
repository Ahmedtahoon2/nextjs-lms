import {
  createCourseSchema,
  updateCourseSchema,
  createModuleSchema,
  updateModuleSchema,
  reorderModulesSchema,
  createLessonSchema,
  updateLessonSchema,
  reorderLessonsSchema,
} from "../course";

describe("Course Validations", () => {
  describe("createCourseSchema", () => {
    it("accepts valid course creation data", () => {
      const result = createCourseSchema.safeParse({
        title: "Introduction to Next.js",
        description: "A comprehensive guide to Next.js 16 and App Router.",
        level: "BEGINNER",
        category: "Web Development",
        thumbnailUrl: "https://example.com/thumb.jpg",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Introduction to Next.js");
        expect(result.data.level).toBe("BEGINNER");
      }
    });

    it("defaults level to ALL_LEVELS if omitted", () => {
      const result = createCourseSchema.safeParse({
        title: "Fullstack Architecture",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.level).toBe("ALL_LEVELS");
      }
    });

    it("rejects title shorter than 3 characters or longer than 100 characters", () => {
      expect(createCourseSchema.safeParse({ title: "ab" }).success).toBe(false);
      expect(
        createCourseSchema.safeParse({ title: "a".repeat(101) }).success,
      ).toBe(false);
    });

    it("rejects invalid thumbnail URL", () => {
      expect(
        createCourseSchema.safeParse({
          title: "Valid Title",
          thumbnailUrl: "not-a-url",
        }).success,
      ).toBe(false);
    });

    it("allows empty string as thumbnailUrl", () => {
      expect(
        createCourseSchema.safeParse({
          title: "Valid Title",
          thumbnailUrl: "",
        }).success,
      ).toBe(true);
    });
  });

  describe("updateCourseSchema - Strict Rejection", () => {
    it("accepts valid metadata updates", () => {
      const result = updateCourseSchema.safeParse({
        title: "Updated Title",
        description: "Updated description text.",
        level: "ADVANCED",
      });
      expect(result.success).toBe(true);
    });

    it("strictly rejects forbidden status field rather than silently stripping it", () => {
      const result = updateCourseSchema.safeParse({
        title: "Updated Title",
        status: "PUBLISHED",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasStatusKey = result.error.issues.some(
          (issue) =>
            issue.code === "unrecognized_keys" &&
            "keys" in issue &&
            Array.isArray(issue.keys) &&
            issue.keys.includes("status"),
        );
        expect(hasStatusKey).toBe(true);
      }
    });

    it("strictly rejects forbidden slug, id, or instructorId fields", () => {
      expect(
        updateCourseSchema.safeParse({ slug: "custom-slug" }).success,
      ).toBe(false);
      expect(updateCourseSchema.safeParse({ id: "custom-id" }).success).toBe(
        false,
      );
      expect(
        updateCourseSchema.safeParse({ instructorId: "custom-inst" }).success,
      ).toBe(false);
    });
  });

  describe("createModuleSchema & updateModuleSchema", () => {
    it("accepts valid create module data with valid CUID", () => {
      const result = createModuleSchema.safeParse({
        courseId: "clh1234567890123456789012",
        title: "Module 1: Foundations",
        description: "Core concepts overview.",
      });
      expect(result.success).toBe(true);
    });

    it("rejects invalid courseId", () => {
      expect(
        createModuleSchema.safeParse({
          courseId: "not-a-cuid",
          title: "Module 1",
        }).success,
      ).toBe(false);
    });

    it("strictly rejects unknown fields on updateModuleSchema", () => {
      expect(
        updateModuleSchema.safeParse({
          title: "New Module Title",
          orderIndex: 5,
        }).success,
      ).toBe(false);
    });
  });

  describe("reorderModulesSchema & reorderLessonsSchema", () => {
    it("accepts valid reorder payload with cuid array", () => {
      const result = reorderModulesSchema.safeParse({
        courseId: "clh1234567890123456789012",
        orderedIds: ["clh1234567890123456789013", "clh1234567890123456789014"],
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty orderedIds array", () => {
      expect(
        reorderModulesSchema.safeParse({
          courseId: "clh1234567890123456789012",
          orderedIds: [],
        }).success,
      ).toBe(false);
    });

    it("rejects non-cuid IDs in orderedIds", () => {
      expect(
        reorderLessonsSchema.safeParse({
          moduleId: "clh1234567890123456789012",
          orderedIds: ["invalid-id"],
        }).success,
      ).toBe(false);
    });
  });

  describe("createLessonSchema & updateLessonSchema", () => {
    it("accepts valid lesson creation", () => {
      const result = createLessonSchema.safeParse({
        moduleId: "clh1234567890123456789012",
        title: "Routing in Next.js",
        durationMinutes: 45,
        isFreePreview: true,
      });
      expect(result.success).toBe(true);
    });

    it("rejects negative duration or duration exceeding 600 minutes", () => {
      expect(
        createLessonSchema.safeParse({
          moduleId: "clh1234567890123456789012",
          title: "Lesson",
          durationMinutes: -1,
        }).success,
      ).toBe(false);

      expect(
        createLessonSchema.safeParse({
          moduleId: "clh1234567890123456789012",
          title: "Lesson",
          durationMinutes: 601,
        }).success,
      ).toBe(false);
    });

    it("allows null duration on update", () => {
      expect(
        updateLessonSchema.safeParse({
          durationMinutes: null,
        }).success,
      ).toBe(true);
    });

    it("strictly rejects forbidden fields on updateLessonSchema", () => {
      expect(
        updateLessonSchema.safeParse({
          title: "New Title",
          slug: "custom-slug",
        }).success,
      ).toBe(false);
    });
  });
});
