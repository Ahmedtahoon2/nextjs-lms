import { paginationSchema } from "@/lib/validations/pagination";

describe("paginationSchema", () => {
  it("provides default page=1 and limit=12 when empty object provided", () => {
    const result = paginationSchema.safeParse({});

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        page: 1,
        limit: 12,
      });
    }
  });

  it("coerces string page and limit to numbers", () => {
    const result = paginationSchema.safeParse({
      page: "3",
      limit: "24",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        page: 3,
        limit: 24,
      });
    }
  });

  it("rejects non-positive page numbers", () => {
    const resultZero = paginationSchema.safeParse({ page: 0 });
    const resultNegative = paginationSchema.safeParse({ page: -1 });

    expect(resultZero.success).toBe(false);
    expect(resultNegative.success).toBe(false);
  });

  it("rejects limit greater than 100", () => {
    const result = paginationSchema.safeParse({ limit: 101 });

    expect(result.success).toBe(false);
  });

  it("accepts maximum allowed limit of 100", () => {
    const result = paginationSchema.safeParse({ limit: 100 });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.limit).toBe(100);
    }
  });
});
