import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function CourseCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden animate-pulse">
      <div className="aspect-video w-full bg-muted/60" />
      <CardHeader className="gap-2 pb-2">
        <div className="h-3 w-20 rounded-md bg-muted/70" />
        <div className="h-5 w-4/5 rounded-md bg-muted/80" />
        <div className="space-y-1 pt-1">
          <div className="h-3 w-full rounded-md bg-muted/50" />
          <div className="h-3 w-2/3 rounded-md bg-muted/50" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="flex gap-4">
          <div className="h-3 w-16 rounded-md bg-muted/60" />
          <div className="h-3 w-16 rounded-md bg-muted/60" />
        </div>
      </CardContent>
      <CardFooter className="border-border/40 flex items-center justify-between border-t pt-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted/70" />
          <div className="h-3 w-20 rounded-md bg-muted/60" />
        </div>
        <div className="h-8 w-20 rounded-md bg-muted/70" />
      </CardFooter>
    </Card>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder list
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
