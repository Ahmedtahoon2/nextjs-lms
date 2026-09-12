import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "../sign-in-form";
import { authClient } from "@/lib/auth-client";
import { gooeyToast } from "@/components/ui/goey-toaster";

const mockPush = jest.fn();
const mockRefresh = jest.fn();
let mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: jest.fn(),
    },
  },
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

describe("SignInForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("renders email, password inputs and sign-in button", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("toggles password visibility when toggle button is clicked", () => {
    render(<SignInForm />);

    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleBtn = screen.getByRole("button", { name: /show password/i });
    fireEvent.click(toggleBtn);

    expect(passwordInput).toHaveAttribute("type", "text");

    const hideBtn = screen.getByRole("button", { name: /hide password/i });
    fireEvent.click(hideBtn);

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("submits valid credentials and redirects to default /courses", async () => {
    (authClient.signIn.email as jest.Mock).mockResolvedValue({
      data: { user: { id: "u-1" }, session: { id: "s-1" } },
      error: null,
    });

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledWith({
        email: "student@example.com",
        password: "Password123",
      });
      expect(gooeyToast.success).toHaveBeenCalledWith(
        "Signed in successfully!",
      );
      expect(mockPush).toHaveBeenCalledWith("/courses");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("redirects to callbackUrl when provided in search params", async () => {
    mockSearchParams = new URLSearchParams("callbackUrl=/instructor/courses");
    (authClient.signIn.email as jest.Mock).mockResolvedValue({
      data: { user: { id: "u-1" } },
      error: null,
    });

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "instructor@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/instructor/courses");
    });
  });

  it("displays error message and toast when authentication fails", async () => {
    (authClient.signIn.email as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Invalid email or password" },
    });

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "WrongPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Invalid email or password",
      );
      expect(gooeyToast.error).toHaveBeenCalledWith(
        "Invalid email or password",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
