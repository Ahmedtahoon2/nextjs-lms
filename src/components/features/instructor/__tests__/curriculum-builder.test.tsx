import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CurriculumBuilder, type ModuleItem } from "../curriculum-builder";
import { PublishButton } from "../publish-button";
import { CourseStatus, type Course } from "@prisma/client";
import * as curriculumActions from "@/actions/curriculum";
import * as courseActions from "@/actions/course";
import { gooeyToast } from "@/components/ui/goey-toaster";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
  }),
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

jest.mock("@/actions/curriculum");
jest.mock("@/actions/course");

const mockCurriculumActions = curriculumActions as jest.Mocked<
  typeof curriculumActions
>;
const mockCourseActions = courseActions as jest.Mocked<typeof courseActions>;
const mockgooeyToast = gooeyToast as jest.Mocked<typeof gooeyToast>;

describe("CurriculumBuilder & PublishButton Component Tests (Task 07)", () => {
  const courseId = "course-123";

  const initialModules: ModuleItem[] = [
    {
      id: "mod-1",
      title: "Introduction",
      description: null,
      orderIndex: 0,
      courseId,
      lessons: [
        {
          id: "les-1",
          title: "Welcome to the Course",
          slug: "welcome-to-the-course",
          orderIndex: 0,
          durationMinutes: 10,
          isFreePreview: true,
          moduleId: "mod-1",
        },
      ],
    },
    {
      id: "mod-2",
      title: "Core Concepts",
      description: null,
      orderIndex: 1,
      courseId,
      lessons: [
        {
          id: "les-2",
          title: "Deep Dive",
          slug: "deep-dive",
          orderIndex: 0,
          durationMinutes: 20,
          isFreePreview: false,
          moduleId: "mod-2",
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modules and lessons correctly", () => {
    render(
      <CurriculumBuilder
        courseId={courseId}
        courseStatus={CourseStatus.DRAFT}
        initialModules={initialModules}
      />,
    );

    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Core Concepts")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the Course")).toBeInTheDocument();
    expect(screen.getByText("Deep Dive")).toBeInTheDocument();
  });

  it("adding a module immediately updates UI outline upon successful action", async () => {
    mockCurriculumActions.createModuleAction.mockResolvedValue({
      success: true,
      data: {
        id: "mod-3",
        title: "Advanced Topics",
        description: null,
        orderIndex: 2,
        courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    render(
      <CurriculumBuilder
        courseId={courseId}
        courseStatus={CourseStatus.DRAFT}
        initialModules={initialModules}
      />,
    );

    const addModuleButton = screen.getByRole("button", { name: /add module/i });
    fireEvent.click(addModuleButton);

    const input = screen.getByPlaceholderText(/e\.g\. Module 1:/i);
    fireEvent.change(input, { target: { value: "Advanced Topics" } });

    const submitButton = screen.getByRole("button", { name: /create module/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCurriculumActions.createModuleAction).toHaveBeenCalledWith({
        courseId,
        title: "Advanced Topics",
      });
      expect(screen.getByText("Advanced Topics")).toBeInTheDocument();
    });
  });

  it("reordering modules triggers reorder action with correct ordered IDs array", async () => {
    mockCurriculumActions.reorderModulesAction.mockResolvedValue({
      success: true,
      data: [],
    });

    render(
      <CurriculumBuilder
        courseId={courseId}
        courseStatus={CourseStatus.DRAFT}
        initialModules={initialModules}
      />,
    );

    // Click "Move module down" on the first module
    const moveDownButtons = screen.getAllByRole("button", {
      name: /move module down/i,
    });
    expect(moveDownButtons[0]).not.toBeDisabled();

    fireEvent.click(moveDownButtons[0]);

    await waitFor(() => {
      expect(mockCurriculumActions.reorderModulesAction).toHaveBeenCalledWith({
        courseId,
        orderedIds: ["mod-2", "mod-1"],
      });
    });
  });

  it("reordering lessons triggers reorder action with correct lesson IDs", async () => {
    const multiLessonModules: ModuleItem[] = [
      {
        ...initialModules[0],
        lessons: [
          initialModules[0].lessons[0],
          {
            id: "les-1b",
            title: "Second Lesson",
            slug: "second-lesson",
            orderIndex: 1,
            durationMinutes: 15,
            isFreePreview: false,
            moduleId: "mod-1",
          },
        ],
      },
    ];

    mockCurriculumActions.reorderLessonsAction.mockResolvedValue({
      success: true,
      data: [],
    });

    render(
      <CurriculumBuilder
        courseId={courseId}
        courseStatus={CourseStatus.DRAFT}
        initialModules={multiLessonModules}
      />,
    );

    const moveLessonDownButtons = screen.getAllByRole("button", {
      name: /move lesson down/i,
    });
    fireEvent.click(moveLessonDownButtons[0]);

    await waitFor(() => {
      expect(mockCurriculumActions.reorderLessonsAction).toHaveBeenCalledWith({
        moduleId: "mod-1",
        orderedIds: ["les-1b", "les-1"],
      });
    });
  });

  describe("PublishButton Validation", () => {
    it("displays validation warning if course has 0 modules", async () => {
      render(
        <PublishButton
          courseId={courseId}
          status={CourseStatus.DRAFT}
          moduleCount={0}
          lessonCount={0}
        />,
      );

      const publishBtn = screen.getByRole("button", {
        name: /publish course/i,
      });
      fireEvent.click(publishBtn);

      expect(mockgooeyToast.error).toHaveBeenCalledWith(
        "A course must have at least one module and at least one lesson before publishing.",
      );
      expect(mockCourseActions.publishCourseAction).not.toHaveBeenCalled();
    });

    it("displays validation warning if course has 1 module but 0 lessons", async () => {
      render(
        <PublishButton
          courseId={courseId}
          status={CourseStatus.DRAFT}
          moduleCount={1}
          lessonCount={0}
        />,
      );

      const publishBtn = screen.getByRole("button", {
        name: /publish course/i,
      });
      fireEvent.click(publishBtn);

      expect(mockgooeyToast.error).toHaveBeenCalledWith(
        "A course must have at least one module and at least one lesson before publishing.",
      );
      expect(mockCourseActions.publishCourseAction).not.toHaveBeenCalled();
    });

    it("successfully calls publishCourseAction when prerequisites are satisfied", async () => {
      mockCourseActions.publishCourseAction.mockResolvedValue({
        success: true,
        data: {
          id: courseId,
          status: CourseStatus.PUBLISHED,
        } as unknown as Course,
      });

      render(
        <PublishButton
          courseId={courseId}
          status={CourseStatus.DRAFT}
          moduleCount={2}
          lessonCount={3}
        />,
      );

      const publishBtn = screen.getByRole("button", {
        name: /publish course/i,
      });
      fireEvent.click(publishBtn);

      await waitFor(() => {
        expect(mockCourseActions.publishCourseAction).toHaveBeenCalledWith(
          courseId,
        );
        expect(mockgooeyToast.success).toHaveBeenCalledWith(
          expect.stringContaining("Course published"),
        );
      });
    });
  });
});
