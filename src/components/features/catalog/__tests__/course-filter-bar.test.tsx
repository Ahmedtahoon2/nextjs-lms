import { render, screen, fireEvent } from "@testing-library/react";
import { CourseFilterBar } from "../course-filter-bar";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => "/courses",
  useSearchParams: () => new URLSearchParams(""),
}));

describe("CourseFilterBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input, category dropdown, level dropdown, and sort dropdown", () => {
    render(
      <CourseFilterBar categories={["Web Development", "Data Science"]} />,
    );

    expect(
      screen.getByPlaceholderText(/search courses by title or topic/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/filter by difficulty level/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/sort courses by/i)).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Data Science")).toBeInTheDocument();
  });

  it("updates search filter on form submit", () => {
    render(<CourseFilterBar categories={[]} />);

    const searchInput = screen.getByPlaceholderText(
      /search courses by title or topic/i,
    );
    fireEvent.change(searchInput, { target: { value: "react" } });
    const form = searchInput.closest("form");
    expect(form).not.toBeNull();
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockPush).toHaveBeenCalledWith("/courses?search=react");
  });

  it("updates category filter when a category is selected", () => {
    render(<CourseFilterBar categories={["Web Dev"]} />);

    const categorySelect = screen.getByLabelText(/filter by category/i);
    fireEvent.change(categorySelect, { target: { value: "Web Dev" } });

    expect(mockPush).toHaveBeenCalledWith("/courses?category=Web+Dev");
  });

  it("renders Clear button when filters are active and clears filters on click", () => {
    render(
      <CourseFilterBar
        categories={["Web Dev"]}
        currentSearch="python"
        currentCategory="Web Dev"
      />,
    );

    const clearButton = screen.getByText("Clear");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(mockPush).toHaveBeenCalledWith("/courses");
  });
});
