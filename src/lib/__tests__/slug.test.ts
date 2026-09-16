import { slugify } from "../slug";

describe("slugify utility", () => {
  it("converts standard English text to lowercase hyphenated slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("Introduction to Next.js 16")).toBe(
      "introduction-to-next-js-16",
    );
  });

  it("normalizes accented and diacritical Latin characters", () => {
    expect(slugify("Café au Lait")).toBe("cafe-au-lait");
    expect(slugify("Déjà vu & Crème Brûlée")).toBe("deja-vu-creme-brulee");
  });

  it("preserves non-Latin Unicode scripts natively (e.g. Arabic, Cyrillic, Chinese)", () => {
    expect(slugify("تعلم البرمجة")).toBe("تعلم-البرمجة");
    expect(slugify("مقدمة إلى لغة TypeScript")).toBe(
      "مقدمة-الى-لغة-typescript",
    );
    expect(slugify("Привет Мир")).toBe("привет-мир");
    expect(slugify("你好世界")).toBe("你好世界");
  });

  it("handles leading, trailing, and repeated whitespace and punctuation", () => {
    expect(slugify("   ---Course: Title Here!   ")).toBe("course-title-here");
    expect(slugify("multiple   spaces   and---hyphens")).toBe(
      "multiple-spaces-and-hyphens",
    );
  });

  it("returns deterministic fallback when input contains only punctuation or symbols", () => {
    expect(slugify("???")).toBe("item");
    expect(slugify("!@#$%^&*()_+", "course")).toBe("course");
    expect(slugify("", "lesson")).toBe("lesson");
    expect(slugify("     ", "fallback-slug")).toBe("fallback-slug");
  });
});
