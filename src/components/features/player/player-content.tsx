export interface PlayerContentProps {
  bodyHtml: string | null;
}

/**
 * Server-rendered lesson content display.
 * Employs server-sanitized HTML from Task 04 pipeline.
 */
export function PlayerContent({ bodyHtml }: PlayerContentProps) {
  if (!bodyHtml?.trim()) {
    return (
      <div className="rounded-xl border border-dashed border-border/60 p-8 text-center text-xs text-muted-foreground">
        No written lesson notes are provided for this session.
      </div>
    );
  }

  return (
    <div
      className="prose dark:prose-invert max-w-none text-pretty leading-relaxed prose-headings:font-heading prose-headings:text-balance prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: bodyHtml is strictly pre-sanitized via server-side sanitize-html pipeline
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
