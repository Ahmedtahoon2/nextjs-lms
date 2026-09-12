export default function LessonPlayerLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background animate-pulse">
      {/* Header Skeleton */}
      <div className="flex h-14 w-full items-center justify-between border-b border-border/60 bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 rounded-md bg-muted/70" />
          <div className="h-4 w-px bg-border/60" />
          <div className="space-y-1">
            <div className="h-3 w-28 rounded-md bg-muted/60" />
            <div className="h-4 w-40 rounded-md bg-muted/80" />
          </div>
        </div>
        <div className="h-8 w-24 rounded-md bg-muted/50 lg:hidden" />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className="hidden w-80 shrink-0 border-r border-border/60 bg-card/40 p-4 lg:block">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded-md bg-muted/70" />
            <div className="h-2 w-full rounded-full bg-muted/50" />
            <div className="space-y-2 pt-2">
              <div className="h-12 rounded-xl bg-muted/50" />
              <div className="h-12 rounded-xl bg-muted/40" />
              <div className="h-12 rounded-xl bg-muted/40" />
              <div className="h-12 rounded-xl bg-muted/30" />
            </div>
          </div>
        </aside>

        {/* Content Skeleton */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <div className="aspect-video w-full rounded-xl bg-muted/60" />
            <div className="space-y-2">
              <div className="h-4 w-24 rounded-md bg-muted/70" />
              <div className="h-8 w-3/4 rounded-md bg-muted/80" />
            </div>
            <div className="space-y-3 pt-2">
              <div className="h-4 w-full rounded-md bg-muted/50" />
              <div className="h-4 w-full rounded-md bg-muted/50" />
              <div className="h-4 w-5/6 rounded-md bg-muted/50" />
              <div className="h-4 w-2/3 rounded-md bg-muted/40" />
            </div>
          </div>
        </main>
      </div>

      {/* Footer Skeleton */}
      <div className="flex min-h-16 w-full items-center justify-between border-t border-border/60 bg-background px-4 sm:px-6">
        <div className="h-9 w-24 rounded-md bg-muted/60" />
        <div className="h-9 w-36 rounded-md bg-muted/70" />
        <div className="h-9 w-24 rounded-md bg-muted/60" />
      </div>
    </div>
  );
}
