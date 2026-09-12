import * as React from "react";
import { render, screen } from "@testing-library/react";
import { CourseProgressBar } from "../course-progress-bar";

describe("CourseProgressBar", () => {
  it("renders progress percentage and accessible attributes", () => {
    render(<CourseProgressBar progressPercentage={45} />);

    expect(screen.getByText("45% Complete")).toBeInTheDocument();
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "45");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clamps negative values to 0%", () => {
    render(<CourseProgressBar progressPercentage={-10} />);
    expect(screen.getByText("0% Complete")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  it("clamps values over 100 to 100%", () => {
    render(<CourseProgressBar progressPercentage={120} />);
    expect(screen.getByText("100% Complete")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("renders lesson count breakdown when provided", () => {
    render(
      <CourseProgressBar
        progressPercentage={50}
        completedLessons={2}
        totalLessons={4}
      />,
    );

    expect(screen.getByText("2/4 lessons")).toBeInTheDocument();
    expect(screen.getByText("50% Complete")).toBeInTheDocument();
  });

  it("renders celebration badge when reaching 100%", () => {
    render(
      <CourseProgressBar progressPercentage={100} showCelebration={true} />,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Course Completed!")).toBeInTheDocument();
    expect(
      screen.getByText("You have completed all lessons in this course."),
    ).toBeInTheDocument();
  });

  it("does not render celebration badge when below 100%", () => {
    render(
      <CourseProgressBar progressPercentage={99} showCelebration={true} />,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText("Course Completed!")).not.toBeInTheDocument();
  });

  it("does not render celebration badge when showCelebration is false even at 100%", () => {
    render(
      <CourseProgressBar progressPercentage={100} showCelebration={false} />,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
