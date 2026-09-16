import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LessonContentEditor } from "../lesson-content-editor";
import * as lessonContentActions from "@/actions/lesson-content";
import { actionSuccess } from "@/lib/action-result";

jest.mock("@/actions/lesson-content");

const mockActions = lessonContentActions as jest.Mocked<
  typeof lessonContentActions
>;

describe("LessonContentEditor", () => {
  const lessonId = "clh1234567890123456789012";

  const initialData = {
    bodyMarkdown: "# Sample Lesson",
    bodyHtml: "<h1>Sample Lesson</h1>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    resources: [{ name: "Slides", url: "https://example.com/slides.pdf" }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial data", () => {
    render(
      <LessonContentEditor lessonId={lessonId} initialData={initialData} />,
    );

    expect(screen.getByLabelText(/Lesson Text/i)).toHaveValue(
      "# Sample Lesson",
    );
    expect(screen.getByLabelText(/Video Lecture URL/i)).toHaveValue(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    );
    expect(screen.getByDisplayValue("Slides")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("https://example.com/slides.pdf"),
    ).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("switches to preview tab and displays rendered HTML", () => {
    render(
      <LessonContentEditor lessonId={lessonId} initialData={initialData} />,
    );

    const previewTab = screen.getByRole("button", { name: /Preview/i });
    fireEvent.click(previewTab);

    expect(screen.getByText("Rendered Lesson Preview")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sample Lesson",
    );
  });

  it("adds and removes resource items", () => {
    render(
      <LessonContentEditor lessonId={lessonId} initialData={initialData} />,
    );

    const addButton = screen.getByRole("button", { name: /Add Link/i });
    fireEvent.click(addButton);

    const inputs = screen.getAllByPlaceholderText(/Resource Name/i);
    expect(inputs.length).toBe(2);

    const deleteButtons = screen.getAllByTitle(/Remove Resource/i);
    fireEvent.click(deleteButtons[1]);

    expect(screen.getAllByPlaceholderText(/Resource Name/i).length).toBe(1);
  });

  it("triggers save action on manual save button click", async () => {
    mockActions.updateLessonContentAction.mockResolvedValue(
      actionSuccess({
        id: "content-1",
        lessonId,
        bodyMarkdown: "# Sample Lesson Updated",
        bodyHtml: "<h1>Sample Lesson Updated</h1>",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        resources: initialData.resources,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    render(
      <LessonContentEditor lessonId={lessonId} initialData={initialData} />,
    );

    const textarea = screen.getByLabelText(/Lesson Text/i);
    fireEvent.change(textarea, {
      target: { value: "# Sample Lesson Updated" },
    });

    const saveButton = screen.getByRole("button", { name: /^Save$/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockActions.updateLessonContentAction).toHaveBeenCalledWith(
        expect.objectContaining({
          lessonId,
          bodyMarkdown: "# Sample Lesson Updated",
        }),
      );
    });

    expect(await screen.findByText("Saved")).toBeInTheDocument();
  });
});
