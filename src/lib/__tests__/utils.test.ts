import { cn } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "extra");
    expect(result).toContain("base");
    expect(result).toContain("extra");
    expect(result).not.toContain("hidden");
  });

  it("handles undefined and null", () => {
    const result = cn("base", undefined, null);
    expect(result).toBe("base");
  });

  it("merges tailwind conflicts", () => {
    const result = cn("p-2 p-4");
    expect(result).toBe("p-4");
  });

  it("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
