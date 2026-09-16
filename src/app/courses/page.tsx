import type { Metadata } from "next";
import Link from "next/link";
import { BookX, GraduationCap } from "lucide-react";
import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";
import { CourseCard } from "@/components/features/catalog/course-card";
import { CourseFilterBar } from "@/components/features/catalog/course-filter-bar";
import { CoursePagination } from "@/components/features/catalog/course-pagination";
import { getCatalogCourses, getCatalogCategories } from "@/services/course";
import { getCurrentUser } from "@/lib/auth-helpers";
import { CourseLevel } from "@prisma/client";
import { catalogSortEnum } from "@/lib/validations/catalog";

export const metadata: Metadata = {
  title: "Explore Courses | EduPlatform",
  description:
    "Browse our comprehensive catalog of expert-led courses across programming, web development, and software engineering.",
};

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    level?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedParams = await searchParams;
  const user = await getCurrentUser();

  const levelParam = Object.values(CourseLevel).includes(
    resolvedParams.level as CourseLevel,
  )
    ? (resolvedParams.level as CourseLevel)
    : undefined;

  const [catalogData, categories] = await Promise.all([
    getCatalogCourses(
      {
        search: resolvedParams.search,
        category: resolvedParams.category,
        level: levelParam,
        sort: catalogSortEnum.safeParse(resolvedParams.sort).data ?? "newest",
        page: resolvedParams.page ? Number(resolvedParams.page) : 1,
        limit: 12,
      },
      user?.id,
    ),
    getCatalogCategories(),
  ]);

  const { courses, totalCount, page, totalPages } = catalogData;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header section */}
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>Catalog</span>
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Explore Courses
            </h1>
            <p className="text-muted-foreground max-w-[65ch] text-sm leading-relaxed text-pretty">
              Discover self-paced, interactive curriculums designed to help you
              build real-world software engineering skills.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-8">
            <CourseFilterBar
              categories={categories}
              currentSearch={resolvedParams.search}
              currentCategory={resolvedParams.category}
              currentLevel={resolvedParams.level}
              currentSort={resolvedParams.sort}
            />
          </div>

          {/* Results count & status */}
          <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing{" "}
              <strong className="text-foreground tabular-nums">
                {courses.length}
              </strong>{" "}
              of{" "}
              <strong className="text-foreground tabular-nums">
                {totalCount}
              </strong>{" "}
              {totalCount === 1 ? "course" : "courses"}
            </span>
          </div>

          {/* Course Grid or Empty State */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/50 p-12 text-center">
              <div className="bg-muted text-muted-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <BookX className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-lg font-semibold">
                No courses match your criteria
              </h2>
              <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-relaxed text-pretty">
                Try adjusting your search query, switching categories, or
                clearing filters to see all available courses.
              </p>
              <Link
                href="/courses"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mt-5 inline-flex min-h-10 items-center justify-center rounded-md px-4 text-xs font-medium transition-transform active:scale-[0.96]"
              >
                Reset All Filters
              </Link>
            </div>
          )}

          {/* Pagination */}
          <CoursePagination
            currentPage={page}
            totalPages={totalPages}
            searchParams={resolvedParams}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
