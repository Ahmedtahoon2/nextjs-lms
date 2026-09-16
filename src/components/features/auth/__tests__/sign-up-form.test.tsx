import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "../sign-up-form";
import { authClient } from "@/lib/auth-client";
import * as authActions from "@/actions/auth";
import { gooeyToast } from "@/components/ui/goey-toaster";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: {
      email: jest.fn(),
    },
  },
}));

jest.mock("@/actions/auth", () => ({
  assignInitialRoleAction: jest.fn(),
}));

jest.mock("@/components/ui/goey-toaster", () => {
  const mockToastObj = {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  };
  return {
    gooeyToast: mockToastObj,
    toast: mockToastObj,
  };
});

describe("SignUpForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all required fields, role selection, and create account button", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /student/i })).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /instructor/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("submits valid student registration and navigates to /courses", async () => {
    (authClient.signUp.email as jest.Mock).mockResolvedValue({
      data: { user: { id: "u-1" } },
      error: null,
    });

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Student" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/at least 8 characters/i), {
      target: { value: "SecurePass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith({
        name: "John Student",
        email: "student@example.com",
        password: "SecurePass123",
      });
      expect(gooeyToast.success).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/courses");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("submits instructor registration, assigns role, and navigates to /instructor/courses", async () => {
    (authClient.signUp.email as jest.Mock).mockResolvedValue({
      data: { user: { id: "u-2" } },
      error: null,
    });
    (authActions.assignInitialRoleAction as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(<SignUpForm />);

    // Select Instructor role
    fireEvent.click(screen.getByRole("radio", { name: /instructor/i }));

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Jane Instructor" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "instructor@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/at least 8 characters/i), {
      target: { value: "SecurePass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith({
        name: "Jane Instructor",
        email: "instructor@example.com",
        password: "SecurePass123",
      });
      expect(authActions.assignInitialRoleAction).toHaveBeenCalledWith(
        "instructor",
      );
      expect(mockPush).toHaveBeenCalledWith("/instructor/courses");
    });
  });

  it("displays server error alert and toast when registration fails", async () => {
    (authClient.signUp.email as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Email already registered" },
    });

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Duplicate User" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "dup@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/at least 8 characters/i), {
      target: { value: "SecurePass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Email already registered",
      );
      expect(gooeyToast.error).toHaveBeenCalledWith("Email already registered");
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
