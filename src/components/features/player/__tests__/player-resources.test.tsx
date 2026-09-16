import { render, screen } from "@testing-library/react";
import { PlayerResources } from "../player-resources";

describe("PlayerResources Component", () => {
  it("renders safe downloadable and reference links", () => {
    const resources = [
      { name: "Cheatsheet PDF", url: "https://example.com/sheet.pdf" },
      { name: "GitHub Repo", url: "http://github.com/example/repo" },
    ];

    render(<PlayerResources resources={resources} />);

    expect(screen.getByText("Lesson Resources (2)")).toBeInTheDocument();
    expect(screen.getByText("Cheatsheet PDF")).toBeInTheDocument();
    expect(screen.getByText("GitHub Repo")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://example.com/sheet.pdf");
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("filters out unsafe or javascript: protocols", () => {
    const resources = [
      { name: "Safe File", url: "https://example.com/doc.pdf" },
      { name: "Malicious Scheme", url: "javascript:alert(1)" },
      { name: "Empty Name", url: "https://example.com/empty" },
    ];
    resources[2].name = "";

    render(<PlayerResources resources={resources} />);

    expect(screen.getByText("Lesson Resources (1)")).toBeInTheDocument();
    expect(screen.getByText("Safe File")).toBeInTheDocument();
    expect(screen.queryByText("Malicious Scheme")).not.toBeInTheDocument();
  });

  it("returns null when no valid resources exist", () => {
    const { container } = render(<PlayerResources resources={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
