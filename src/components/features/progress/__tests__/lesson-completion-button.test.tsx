import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LessonCompletionButton } from "../lesson-completion-button";
import * as progressActions from "@/actions/progress";
import { actionSuccess, actionFailure } from "@/lib/action-result";

jest.mock("@/actions/progress");

const mockActions = progressActions as jest.Mocked<typeof progressActions>;

describe("LessonCompletionButton", () => {
  const lessonId = "clh1234567890123456789012";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'Mark as Complete' when initialIsCompleted is false", () => {
    render(
      <LessonCompletionButton lessonId={lessonId} initialIsCompleted={false} />,
    );
    expect(
      screen.getByRole("button", { name: /mark lesson complete/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
  });

  it("renders 'Completed' when initialIsCompleted is true", () => {
    render(
      <LessonCompletionButton lessonId={lessonId} initialIsCompleted={true} />,
    );
    const button = screen.getByRole("button", {
      name: /mark lesson incomplete/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles completion from incomplete to complete", async () => {
    const onToggleSuccess = jest.fn();
    mockActions.toggleLessonCompletionAction.mockResolvedValueOnce(
      actionSuccess({
        progress: {
          id: "prog_1",
          userId: "user_1",
          lessonId,
          isCompleted: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
        },
        enrollment: {
          id: "enr_1",
          userId: "user_1",
          courseId: "course_1",
          status: "ACTIVE",
          progressPercentage: 25,
          enrolledAt: new Date(),
          completedAt: null,
          lastAccessedAt: new Date(),
        },
        percentage: 25,
      }),
    );

    render(
      <LessonCompletionButton
        lessonId={lessonId}
        initialIsCompleted={false}
        onToggleSuccess={onToggleSuccess}
      />,
    );

    const button = screen.getByRole("button", {
      name: /mark lesson complete/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockActions.toggleLessonCompletionAction).toHaveBeenCalledWith({
        lessonId,
        completed: true,
      });
      expect(onToggleSuccess).toHaveBeenCalledWith(true);
      expect(screen.getByText("Completed")).toBeInTheDocument();
    });
  });

  it("toggles completion from complete to incomplete", async () => {
    const onToggleSuccess = jest.fn();
    mockActions.toggleLessonCompletionAction.mockResolvedValueOnce(
      actionSuccess({
        progress: {
          id: "prog_1",
          userId: "user_1",
          lessonId,
          isCompleted: false,
          completedAt: null,
          lastAccessedAt: new Date(),
        },
        enrollment: {
          id: "enr_1",
          userId: "user_1",
          courseId: "course_1",
          status: "ACTIVE",
          progressPercentage: 0,
          enrolledAt: new Date(),
          completedAt: null,
          lastAccessedAt: new Date(),
        },
        percentage: 0,
      }),
    );

    render(
      <LessonCompletionButton
        lessonId={lessonId}
        initialIsCompleted={true}
        onToggleSuccess={onToggleSuccess}
      />,
    );

    const button = screen.getByRole("button", {
      name: /mark lesson incomplete/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockActions.toggleLessonCompletionAction).toHaveBeenCalledWith({
        lessonId,
        completed: false,
      });
      expect(onToggleSuccess).toHaveBeenCalledWith(false);
      expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
    });
  });

  it("displays error message on action failure", async () => {
    mockActions.toggleLessonCompletionAction.mockResolvedValueOnce(
      actionFailure(
        "You must enroll in this course to access this lesson",
        "FORBIDDEN",
      ),
    );

    render(
      <LessonCompletionButton lessonId={lessonId} initialIsCompleted={false} />,
    );

    const button = screen.getByRole("button", {
      name: /mark lesson complete/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "You must enroll in this course to access this lesson",
      );
    });
  });
});
