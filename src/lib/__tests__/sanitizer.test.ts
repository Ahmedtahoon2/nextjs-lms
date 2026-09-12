import { markdownToSanitizedHtml } from "../sanitizer";

describe("markdownToSanitizedHtml", () => {
  describe("Valid Markdown Rendering", () => {
    it("renders headings, paragraphs, bold, and italics", async () => {
      const md = `# Title\n\nThis is **bold** and *italic* text.`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain("<h1>Title</h1>");
      expect(html).toContain("<strong>bold</strong>");
      expect(html).toContain("<em>italic</em>");
    });

    it("renders lists and code blocks", async () => {
      const md = `- Item 1\n- Item 2\n\n\`\`\`typescript\nconst x = 1;\n\`\`\``;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain("<ul>");
      expect(html).toContain("<li>Item 1</li>");
      expect(html).toContain(
        '<pre><code class="language-typescript">const x = 1;\n</code></pre>',
      );
    });

    it("renders tables", async () => {
      const md = `| Col 1 | Col 2 |\n|---|---|\n| Val 1 | Val 2 |`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain("<table>");
      expect(html).toContain("<th>Col 1</th>");
      expect(html).toContain("<td>Val 1</td>");
    });

    it("enforces target=_blank and rel=noopener noreferrer on external links", async () => {
      const md = `[Link](https://example.com)`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
      expect(html).toContain('href="https://example.com"');
    });
  });

  describe("XSS Vector Elimination", () => {
    it("strips script tags and their contents", async () => {
      const md = `Hello <script>alert('XSS')</script> World`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("<script");
      expect(html).not.toContain("alert");
      expect(html).toContain("Hello  World");
    });

    it("strips inline event handlers (onerror, onload, onclick)", async () => {
      const md = `<img src="https://example.com/pic.jpg" onerror="alert(1)" onload="alert(2)" onclick="alert(3)">`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("onerror");
      expect(html).not.toContain("onload");
      expect(html).not.toContain("onclick");
      expect(html).not.toContain("alert");
      expect(html).toContain('<img src="https://example.com/pic.jpg"');
    });

    it("strips javascript: pseudo-protocol from links", async () => {
      const md = `[Malicious Link](javascript:alert(document.cookie))`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("javascript:");
      expect(html).not.toContain("alert");
      expect(html).not.toContain("document.cookie");
    });

    it("strips data: URI images", async () => {
      const md = `![Image](data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9YWxlcnQoMSk+PC9zdmc+)`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("data:");
      expect(html).not.toContain("<img");
    });
  });

  describe("Strict Iframe Hostname & Scheme Enforcement", () => {
    it("allows trusted https YouTube iframes", async () => {
      const md = `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain(
        '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"',
      );
    });

    it("allows trusted https Vimeo iframes", async () => {
      const md = `<iframe src="https://player.vimeo.com/video/123456789"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain(
        '<iframe src="https://player.vimeo.com/video/123456789"',
      );
    });

    it("allows trusted https Loom iframes", async () => {
      const md = `<iframe src="https://www.loom.com/embed/abc123def456"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).toContain(
        '<iframe src="https://www.loom.com/embed/abc123def456"',
      );
    });

    it("strips iframe with malicious subdomain bypass (youtube.com.evil.com)", async () => {
      const md = `<iframe src="https://www.youtube.com.evil.com/embed/dQw4w9WgXcQ"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("<iframe");
      expect(html).not.toContain("evil.com");
    });

    it("strips iframe with redirect parameter bypass", async () => {
      const md = `<iframe src="https://evil.com/?redirect=https://www.youtube.com/embed/123"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("<iframe");
    });

    it("strips iframe with non-https scheme (http:)", async () => {
      const md = `<iframe src="http://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("<iframe");
    });

    it("strips untrusted third-party iframes", async () => {
      const md = `<iframe src="https://attacker.org/exploit"></iframe>`;
      const html = await markdownToSanitizedHtml(md);
      expect(html).not.toContain("<iframe");
      expect(html).not.toContain("attacker.org");
    });
  });

  describe("Edge cases", () => {
    it("returns empty string for empty or whitespace input", async () => {
      expect(await markdownToSanitizedHtml("")).toBe("");
      expect(await markdownToSanitizedHtml("   ")).toBe("");
    });
  });
});
