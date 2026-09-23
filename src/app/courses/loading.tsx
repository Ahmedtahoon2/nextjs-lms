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
            <div className="bg-muted/70 h-4 w-20 animate-pulse rounded-md" />
            <div className="bg-muted/80 h-8 w-60 animate-pulse rounded-md" />
            <div className="bg-muted/60 h-4 w-96 max-w-full animate-pulse rounded-md" />
          </div>

          <div className="bg-muted/50 mb-8 h-20 animate-pulse rounded-xl" />

          <CourseGridSkeleton count={6} />
        </div>
      </main>
      <Footer />
    </>
  );
}
