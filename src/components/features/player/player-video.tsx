export interface PlayerVideoProps {
  videoUrl: string | null;
  lessonTitle: string;
}

/**
 * Responsive 16:9 video embed player.
 * Supports verified embeds from YouTube, Vimeo, and Loom.
 * Guardrail: Configures safe sandbox attributes with necessary permissions for supported providers.
 */
export function PlayerVideo({ videoUrl, lessonTitle }: PlayerVideoProps) {
  if (!videoUrl) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-md ring-1 ring-border/50">
      <iframe
        src={videoUrl}
        title={`${lessonTitle} video`}
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        loading="lazy"
      />
    </div>
  );
}
