import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function CourseCardSkeleton() {
  return (
    <Card className="flex h-full animate-pulse flex-col overflow-hidden">
      <div className="bg-muted/60 aspect-video w-full" />
      <CardHeader className="gap-2 pb-2">
        <div className="bg-muted/70 h-3 w-20 rounded-md" />
        <div className="bg-muted/80 h-5 w-4/5 rounded-md" />
        <div className="space-y-1 pt-1">
          <div className="bg-muted/50 h-3 w-full rounded-md" />
          <div className="bg-muted/50 h-3 w-2/3 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="flex gap-4">
          <div className="bg-muted/60 h-3 w-16 rounded-md" />
          <div className="bg-muted/60 h-3 w-16 rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="border-border/40 flex items-center justify-between border-t pt-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-muted/70 h-6 w-6 rounded-full" />
          <div className="bg-muted/60 h-3 w-20 rounded-md" />
        </div>
        <div className="bg-muted/70 h-8 w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
