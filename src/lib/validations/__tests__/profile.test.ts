import { updateProfileSchema } from "../profile";

describe("updateProfileSchema", () => {
  it("accepts valid full profile data", () => {
    const validData = {
      name: "John Doe",
      headline: "Senior Software Engineer",
      bio: "10 years of experience building web applications.",
      website: "https://johndoe.com",
      avatarUrl: "https://johndoe.com/avatar.jpg",
    };

    const result = updateProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("accepts valid profile with only required name and empty optionals", () => {
    const minimalData = {
      name: "Alice",
      headline: "",
      bio: "",
      website: "",
      avatarUrl: "",
    };

    const result = updateProfileSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it("rejects name with less than 2 characters", () => {
    const result = updateProfileSchema.safeParse({
      name: "A",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Name must be at least 2 characters",
      );
    }
  });

  it("rejects name longer than 50 characters", () => {
    const result = updateProfileSchema.safeParse({
      name: "A".repeat(51),
    });

    expect(result.success).toBe(false);
  });

  it("rejects headline longer than 100 characters", () => {
    const result = updateProfileSchema.safeParse({
      name: "Valid Name",
      headline: "A".repeat(101),
    });

    expect(result.success).toBe(false);
  });

  it("rejects bio longer than 1000 characters", () => {
    const result = updateProfileSchema.safeParse({
      name: "Valid Name",
      bio: "A".repeat(1001),
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid website URL", () => {
    const result = updateProfileSchema.safeParse({
      name: "Valid Name",
      website: "not-a-valid-url",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Invalid website URL");
    }
  });

  it("rejects invalid avatar URL", () => {
    const result = updateProfileSchema.safeParse({
      name: "Valid Name",
      avatarUrl: "ftp://not-an-http-or-https-url::",
    });

    expect(result.success).toBe(false);
  });
});
