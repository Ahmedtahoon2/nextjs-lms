import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileForm } from "../profile-form";
import * as profileActions from "@/actions/profile";

jest.mock("@/actions/profile");

const mockProfileActions = profileActions as jest.Mocked<typeof profileActions>;

describe("ProfileForm", () => {
  const initialData = {
    name: "Alex Smith",
    headline: "Full Stack Engineer",
    bio: "Passionate about educational software.",
    website: "https://alexsmith.dev",
    avatarUrl: "https://alexsmith.dev/avatar.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial profile values", () => {
    render(<ProfileForm initialData={initialData} />);

    expect(screen.getByLabelText(/full name/i)).toHaveValue("Alex Smith");
    expect(screen.getByLabelText(/headline/i)).toHaveValue(
      "Full Stack Engineer",
    );
    expect(screen.getByLabelText(/biography/i)).toHaveValue(
      "Passionate about educational software.",
    );
    expect(screen.getByLabelText(/website/i)).toHaveValue(
      "https://alexsmith.dev",
    );
    expect(screen.getByLabelText(/avatar url/i)).toHaveValue(
      "https://alexsmith.dev/avatar.png",
    );
  });

  it("submits updated data and displays success feedback", async () => {
    mockProfileActions.updateProfileAction.mockResolvedValue({
      success: true,
      data: {
        id: "user-1",
        name: "Alex Updated",
        email: "alex@example.com",
        image: null,
        headline: "Principal Engineer",
        bio: initialData.bio,
        website: initialData.website,
        avatarUrl: initialData.avatarUrl,
        createdAt: new Date(),
      },
    });

    render(<ProfileForm initialData={initialData} />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "Alex Updated" } });

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProfileActions.updateProfileAction).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Alex Updated",
        }),
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(/profile updated successfully/i),
      ).toBeInTheDocument();
    });
  });

  it("displays error alert when action returns failure", async () => {
    mockProfileActions.updateProfileAction.mockResolvedValue({
      success: false,
      error: "You cannot modify another user's profile",
      code: "FORBIDDEN",
    });

    render(<ProfileForm initialData={initialData} />);

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/you cannot modify another user's profile/i),
      ).toBeInTheDocument();
    });
  });
});
