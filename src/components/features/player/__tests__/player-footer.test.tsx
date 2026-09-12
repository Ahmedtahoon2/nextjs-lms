import { render, screen } from "@testing-library/react";
import { PlayerFooter } from "../player-footer";

// Mock toggleLessonCompletionAction
jest.mock("@/actions/progress", () => ({
  toggleLessonCompletionAction: jest.fn().mockResolvedValue({
    success: true,
    data: { progress: { isCompleted: true }, percentage: 50 },
  }),
}));

describe("PlayerFooter Component", () => {
  it("renders active Previous and Next links when adjacent lessons exist", () => {
    render(
      <PlayerFooter
        courseSlug="nextjs-course"
        lessonId="lesson-2"
        previousLesson={{ id: "lesson-1", title: "Intro" }}
        nextLesson={{ id: "lesson-3", title: "Outro" }}
        canTrackProgress={true}
        currentIndex={2}
        totalLessons={3}
      />,
    );

    const prevLink = screen.getByRole("link", { name: /previous/i });
    expect(prevLink).toHaveAttribute(
      "href",
      "/courses/nextjs-course/lessons/lesson-1",
    );

    const nextLink = screen.getByRole("link", { name: /next/i });
    expect(nextLink).toHaveAttribute(
      "href",
      "/courses/nextjs-course/lessons/lesson-3",
    );

    expect(screen.getByText("Lesson 2 of 3")).toBeInTheDocument();
    expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
  });

  it("disables Previous on first lesson and Next on last lesson", () => {
    render(
      <PlayerFooter
        courseSlug="nextjs-course"
        lessonId="lesson-1"
        previousLesson={null}
        nextLesson={null}
        canTrackProgress={false}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const prevBtn = buttons.find((b) => b.textContent?.includes("Previous"));
    const nextBtn = buttons.find((b) => b.textContent?.includes("Next"));

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeDisabled();
    expect(screen.queryByText("Mark as Complete")).not.toBeInTheDocument();
  });
});
