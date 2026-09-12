import { actionSuccess, actionFailure } from "@/lib/action-result";

describe("actionResult", () => {
  it("creates a successful action result with data", () => {
    const result = actionSuccess({ id: "123", name: "Test" });

    expect(result).toEqual({
      success: true,
      data: { id: "123", name: "Test" },
    });
  });

  it("creates a successful action result with void/empty data", () => {
    const result = actionSuccess(undefined);

    expect(result).toEqual({
      success: true,
      data: undefined,
    });
  });

  it("creates an action failure result with basic error message", () => {
    const result = actionFailure("Something went wrong");

    expect(result).toEqual({
      success: false,
      error: "Something went wrong",
      code: undefined,
      details: undefined,
    });
  });

  it("creates an action failure result with error code and field details", () => {
    const result = actionFailure("Validation failed", "VALIDATION_ERROR", {
      title: ["Title is required"],
    });

    expect(result).toEqual({
      success: false,
      error: "Validation failed",
      code: "VALIDATION_ERROR",
      details: {
        title: ["Title is required"],
      },
    });
  });
});
