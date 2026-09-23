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
      <div className="border-border/60 text-muted-foreground rounded-xl border border-dashed p-8 text-center text-xs">
        No written lesson notes are provided for this session.
      </div>
    );
  }

  return (
    <div
      className="prose dark:prose-invert prose-headings:font-heading prose-headings:text-balance prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline max-w-none leading-relaxed text-pretty"
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
