import { fireEvent, render, screen } from "@testing-library/react";
import { PlayerProvider } from "../player-context";
import { PlayerSidebar } from "../player-sidebar";

const mockModules = [
  {
    id: "mod-1",
    title: "Introduction to Next.js",
    description: "Getting started with the basics.",
    orderIndex: 0,
    lessons: [
      {
        id: "les-1",
        title: "Welcome & Setup",
        slug: "welcome-and-setup",
        orderIndex: 0,
        durationMinutes: 10,
        isFreePreview: true,
        isCompleted: true,
      },
      {
        id: "les-2",
        title: "Project Architecture",
        slug: "project-architecture",
        orderIndex: 1,
        durationMinutes: 15,
        isFreePreview: false,
        isCompleted: false,
      },
    ],
  },
  {
    id: "mod-2",
    title: "Server Components Deep Dive",
    description: "Learn how RSC works.",
    orderIndex: 1,
    lessons: [
      {
        id: "les-3",
        title: "Async Server Components",
        slug: "async-server-components",
        orderIndex: 0,
        durationMinutes: 20,
        isFreePreview: false,
        isCompleted: false,
      },
    ],
  },
];

describe("PlayerSidebar Component", () => {
  it("renders modules and lessons with completed checkmarks and active indicator", () => {
    render(
      <PlayerProvider>
        <PlayerSidebar
          courseSlug="nextjs-mastery"
          courseTitle="Next.js Mastery"
          modules={mockModules}
          currentLessonId="les-1"
          isEnrolled={true}
          canAccessCourse={false}
          progressPercentage={50}
          completedLessons={1}
          totalLessons={2}
        />
      </PlayerProvider>,
    );

    expect(screen.getByText("Introduction to Next.js")).toBeInTheDocument();
    expect(screen.getByText("1. Welcome & Setup")).toBeInTheDocument();
    expect(screen.getByText("2. Project Architecture")).toBeInTheDocument();

    // Check completed icon label
    expect(screen.getByLabelText("Completed lesson")).toBeInTheDocument();

    // Check active lesson
    const currentLink = screen.getByRole("link", {
      name: /1\. Welcome & Setup/i,
    });
    expect(currentLink).toHaveAttribute("aria-current", "page");
  });

  it("locks non-preview lessons for unenrolled anonymous visitors", () => {
    render(
      <PlayerProvider>
        <PlayerSidebar
          courseSlug="nextjs-mastery"
          courseTitle="Next.js Mastery"
          modules={mockModules}
          currentLessonId="les-1"
          isEnrolled={false}
          canAccessCourse={false}
        />
      </PlayerProvider>,
    );

    // Free preview lesson is a link
    expect(
      screen.getByRole("link", { name: /1\. Welcome & Setup/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();

    // Non-preview lesson is NOT a link and shows lock icon
    expect(
      screen.queryByRole("link", { name: /2\. Project Architecture/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText("Locked lesson (enrollment required)"),
    ).toBeInTheDocument();
  });

  it("toggles module accordion when module header is clicked", () => {
    render(
      <PlayerProvider>
        <PlayerSidebar
          courseSlug="nextjs-mastery"
          courseTitle="Next.js Mastery"
          modules={mockModules}
          currentLessonId="les-1"
          isEnrolled={true}
          canAccessCourse={false}
        />
      </PlayerProvider>,
    );

    // Module 2 is initially closed because current lesson is in Module 1
    expect(
      screen.queryByText("1. Async Server Components"),
    ).not.toBeInTheDocument();

    // Click Module 2 header button to expand it
    const module2Btn = screen.getByRole("button", {
      name: /Server Components Deep Dive/i,
    });
    fireEvent.click(module2Btn);

    expect(screen.getByText("1. Async Server Components")).toBeInTheDocument();
  });
});
