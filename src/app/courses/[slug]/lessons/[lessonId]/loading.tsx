export default function LessonPlayerLoading() {
  return (
    <div className="bg-background flex min-h-screen animate-pulse flex-col">
      {/* Header Skeleton */}
      <div className="border-border/60 bg-background flex h-14 w-full items-center justify-between border-b px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="bg-muted/70 h-8 w-20 rounded-md" />
          <div className="bg-border/60 h-4 w-px" />
          <div className="space-y-1">
            <div className="bg-muted/60 h-3 w-28 rounded-md" />
            <div className="bg-muted/80 h-4 w-40 rounded-md" />
          </div>
        </div>
        <div className="bg-muted/50 h-8 w-24 rounded-md lg:hidden" />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <aside className="border-border/60 bg-card/40 hidden w-80 shrink-0 border-r p-4 lg:block">
          <div className="space-y-4">
            <div className="bg-muted/70 h-4 w-32 rounded-md" />
            <div className="bg-muted/50 h-2 w-full rounded-full" />
            <div className="space-y-2 pt-2">
              <div className="bg-muted/50 h-12 rounded-xl" />
              <div className="bg-muted/40 h-12 rounded-xl" />
              <div className="bg-muted/40 h-12 rounded-xl" />
              <div className="bg-muted/30 h-12 rounded-xl" />
            </div>
          </div>
        </aside>

        {/* Content Skeleton */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <div className="bg-muted/60 aspect-video w-full rounded-xl" />
            <div className="space-y-2">
              <div className="bg-muted/70 h-4 w-24 rounded-md" />
              <div className="bg-muted/80 h-8 w-3/4 rounded-md" />
            </div>
            <div className="space-y-3 pt-2">
              <div className="bg-muted/50 h-4 w-full rounded-md" />
              <div className="bg-muted/50 h-4 w-full rounded-md" />
              <div className="bg-muted/50 h-4 w-5/6 rounded-md" />
              <div className="bg-muted/40 h-4 w-2/3 rounded-md" />
            </div>
          </div>
        </main>
      </div>

      {/* Footer Skeleton */}
      <div className="border-border/60 bg-background flex min-h-16 w-full items-center justify-between border-t px-4 sm:px-6">
        <div className="bg-muted/60 h-9 w-24 rounded-md" />
        <div className="bg-muted/70 h-9 w-36 rounded-md" />
        <div className="bg-muted/60 h-9 w-24 rounded-md" />
      </div>
    </div>
  );
}
