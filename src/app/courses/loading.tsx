import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";
import { CourseGridSkeleton } from "@/components/features/catalog/course-skeleton";

export default function CoursesLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <div className="h-4 w-20 rounded-md bg-muted/70 animate-pulse" />
            <div className="h-8 w-60 rounded-md bg-muted/80 animate-pulse" />
            <div className="h-4 w-96 max-w-full rounded-md bg-muted/60 animate-pulse" />
          </div>

          <div className="mb-8 h-20 rounded-xl bg-muted/50 animate-pulse" />

          <CourseGridSkeleton count={6} />
        </div>
      </main>
      <Footer />
    </>
  );
}
