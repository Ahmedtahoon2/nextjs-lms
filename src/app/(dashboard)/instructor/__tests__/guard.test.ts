import React from "react";
import InstructorLayout from "../layout";
import { redirect, forbidden } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { hasAnyRole } from "@/services/authorization";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  forbidden: jest.fn(),
}));

jest.mock("@/lib/auth-helpers", () => ({
  requireAuth: jest.fn(),
}));

jest.mock("@/services/authorization", () => ({
  hasAnyRole: jest.fn(),
}));

jest.mock("@/components/global/theme/mode-toggle", () => ({
  ModeToggle: () =>
    React.createElement("div", { "data-testid": "mode-toggle" }),
}));

const mockRedirect = redirect as unknown as jest.Mock;
const mockForbidden = forbidden as unknown as jest.Mock;
const mockRequireAuth = requireAuth as unknown as jest.Mock;
const mockHasAnyRole = hasAnyRole as unknown as jest.Mock;

describe("Instructor Route Guard (Task 07)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects unauthenticated user to /sign-in", async () => {
    mockRequireAuth.mockRejectedValue(new Error("Authentication required"));

    await InstructorLayout({
      children: React.createElement("div", null, "Child"),
    });

    expect(mockRedirect).toHaveBeenCalledWith("/sign-in");
    expect(mockForbidden).not.toHaveBeenCalled();
  });

  it("triggers 403 forbidden for authenticated students without instructor or admin role", async () => {
    mockRequireAuth.mockResolvedValue({
      user: {
        id: "student-1",
        name: "Regular Student",
        email: "student@example.com",
      },
    });
    mockHasAnyRole.mockResolvedValue(false);

    await InstructorLayout({
      children: React.createElement("div", null, "Child"),
    });

    expect(mockHasAnyRole).toHaveBeenCalledWith("student-1", [
      "instructor",
      "admin",
    ]);
    expect(mockForbidden).toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("permits access for authenticated instructor", async () => {
    mockRequireAuth.mockResolvedValue({
      user: {
        id: "instructor-1",
        name: "Dr. Smith",
        email: "smith@example.com",
      },
    });
    mockHasAnyRole.mockResolvedValue(true);

    const jsx = await InstructorLayout({
      children: React.createElement(
        "div",
        { "data-testid": "content" },
        "Instructor Area",
      ),
    });

    expect(mockForbidden).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
    expect(jsx).toBeDefined();
  });

  it("permits access for authenticated admin", async () => {
    mockRequireAuth.mockResolvedValue({
      user: {
        id: "admin-1",
        name: "System Admin",
        email: "admin@example.com",
      },
    });
    mockHasAnyRole.mockResolvedValue(true);

    const jsx = await InstructorLayout({
      children: React.createElement("div", null, "Admin Area"),
    });

    expect(mockForbidden).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
    expect(jsx).toBeDefined();
  });
});
