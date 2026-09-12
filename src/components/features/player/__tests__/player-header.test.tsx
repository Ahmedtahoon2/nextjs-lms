import { render, screen } from "@testing-library/react";
import { PlayerProvider } from "../player-context";
import { PlayerHeader } from "../player-header";

describe("PlayerHeader Component", () => {
  it("renders course title, lesson title, overview link, and curriculum toggle", () => {
    render(
      <PlayerProvider>
        <PlayerHeader
          courseTitle="TypeScript Fundamentals"
          courseSlug="ts-fundamentals"
          lessonTitle="Type Narrowing"
        />
      </PlayerProvider>,
    );

    expect(screen.getByText("TypeScript Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Type Narrowing")).toBeInTheDocument();

    const overviewLink = screen.getByRole("link", {
      name: /back to course overview/i,
    });
    expect(overviewLink).toHaveAttribute("href", "/courses/ts-fundamentals");

    const drawerBtn = screen.getByRole("button", {
      name: /open course curriculum menu/i,
    });
    expect(drawerBtn).toBeInTheDocument();
    expect(drawerBtn).toHaveAttribute("aria-expanded", "false");
  });
});
