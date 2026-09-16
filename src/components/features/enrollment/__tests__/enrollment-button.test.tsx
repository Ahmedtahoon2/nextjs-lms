import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EnrollmentButton } from "../enrollment-button";
import * as enrollmentActions from "@/actions/enrollment";
import { actionSuccess, actionFailure } from "@/lib/action-result";

jest.mock("@/actions/enrollment");

const mockActions = enrollmentActions as jest.Mocked<typeof enrollmentActions>;

describe("EnrollmentButton", () => {
  const courseId = "clh1234567890123456789012";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'Enroll Now' when not enrolled", () => {
    render(<EnrollmentButton courseId={courseId} initialIsEnrolled={false} />);
    expect(
      screen.getByRole("button", { name: /enroll in course/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Enroll Now")).toBeInTheDocument();
  });

  it("renders 'Enrolled' and is disabled when already enrolled", () => {
    render(<EnrollmentButton courseId={courseId} initialIsEnrolled={true} />);
    const button = screen.getByRole("button", { name: /already enrolled/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(screen.getByText("Enrolled")).toBeInTheDocument();
  });

  it("successfully enrolls user and transitions to 'Enrolled' state", async () => {
    const onEnrollSuccess = jest.fn();
    mockActions.enrollInCourseAction.mockResolvedValueOnce(
      actionSuccess({
        id: "enr_1",
        userId: "user_1",
        courseId,
        status: "ACTIVE",
        progressPercentage: 0,
        enrolledAt: new Date(),
        completedAt: null,
        lastAccessedAt: new Date(),
      }),
    );

    render(
      <EnrollmentButton
        courseId={courseId}
        initialIsEnrolled={false}
        onEnrollSuccess={onEnrollSuccess}
      />,
    );

    const button = screen.getByRole("button", { name: /enroll in course/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockActions.enrollInCourseAction).toHaveBeenCalledWith({
        courseId,
      });
      expect(onEnrollSuccess).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Enrolled")).toBeInTheDocument();
    });
  });

  it("displays error message when enrollment fails", async () => {
    mockActions.enrollInCourseAction.mockResolvedValueOnce(
      actionFailure(
        "Cannot enroll in an unpublished course",
        "VALIDATION_ERROR",
      ),
    );

    render(<EnrollmentButton courseId={courseId} initialIsEnrolled={false} />);

    const button = screen.getByRole("button", { name: /enroll in course/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Cannot enroll in an unpublished course",
      );
    });
  });
});
