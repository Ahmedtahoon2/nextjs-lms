import { Download, ExternalLink, FileText } from "lucide-react";

interface PlayerResourceItem {
  name: string;
  url: string;
}

export interface PlayerResourcesProps {
  resources: PlayerResourceItem[];
}

/**
 * Validates that a resource URL strictly uses safe http/https protocols.
 */
function isSafeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Renders verified downloadable or external resources attached to a lesson.
 */
export function PlayerResources({ resources }: PlayerResourcesProps) {
  const validResources = resources.filter(
    (res) => res.name?.trim() && isSafeUrl(res.url),
  );

  if (validResources.length === 0) {
    return null;
  }

  return (
    <div className="border-border/60 bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-xs">
      <div className="flex items-center gap-2">
        <FileText className="text-primary h-4 w-4" aria-hidden="true" />
        <h3 className="font-heading text-foreground text-sm font-semibold">
          Lesson Resources ({validResources.length})
        </h3>
      </div>

      <ul className="flex flex-col gap-2">
        {validResources.map((resource) => (
          <li key={resource.url}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/50 bg-background/50 text-foreground hover:border-primary/40 hover:bg-muted/40 hover:text-primary focus-visible:ring-ring flex min-h-10 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:outline-hidden active:scale-[0.96] motion-reduce:transform-none"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Download
                  className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{resource.name}</span>
              </div>
              <ExternalLink
                className="text-muted-foreground/60 h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
