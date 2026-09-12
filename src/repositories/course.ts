import { prisma } from "@/lib/db";
import { type Course, CourseLevel, CourseStatus, Prisma } from "@prisma/client";
import { NotFoundError, ValidationError, ConflictError } from "@/lib/errors";

export interface LockedCourseRow {
  id: string;
  status: CourseStatus;
  instructorId: string;
}

/**
 * Acquires a row-level lock on the Course record using PostgreSQL `SELECT ... FOR UPDATE`.
 * Serves as the single authoritative synchronization point between status transitions
 * and curriculum mutations.
 */
export async function lockCourseForUpdate(
  tx: Prisma.TransactionClient,
  courseId: string,
): Promise<LockedCourseRow> {
  const rows = await tx.$queryRaw<LockedCourseRow[]>`
    SELECT id, status, "instructorId" FROM "course" WHERE id = ${courseId} FOR UPDATE;
  `;

  const course = rows[0];
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  return course;
}

export interface CreateCourseData {
  title: string;
  description?: string | null;
  level?: CourseLevel;
  category?: string | null;
  thumbnailUrl?: string | null;
  instructorId: string;
}

/**
 * Inserts a new course with a slug, retrying across candidate suffixes on collision (P2002).
 */
export async function createCourseWithSlugRetry(
  data: CreateCourseData,
  baseSlug: string,
  maxAttempts = 5,
): Promise<Course> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const candidateSlug = attempt === 1 ? baseSlug : `${baseSlug}-${attempt}`;
    try {
      return await prisma.course.create({
        data: {
          title: data.title,
          slug: candidateSlug,
          description: data.description,
          level: data.level ?? CourseLevel.ALL_LEVELS,
          category: data.category,
          thumbnailUrl: data.thumbnailUrl,
          status: CourseStatus.DRAFT,
          instructorId: data.instructorId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        if (attempt === maxAttempts) {
          throw new ConflictError(
            "Failed to generate a unique course slug. Please choose a different title.",
          );
        }
        continue;
      }
      throw error;
    }
  }

  throw new ConflictError("Failed to generate a unique course slug");
}

export interface CourseQueryOptions {
  includeCurriculum?: boolean;
  includeInstructor?: boolean;
}

export type CourseWithCurriculum = Prisma.CourseGetPayload<{
  include: {
    modules: {
      include: {
        lessons: true;
      };
    };
  };
}>;

export type CourseWithInstructor = Prisma.CourseGetPayload<{
  include: {
    instructor: {
      select: {
        id: true;
        name: true;
        image: true;
        avatarUrl: true;
        headline: true;
        bio: true;
      };
    };
  };
}>;

export type CourseWithCurriculumAndInstructor = Prisma.CourseGetPayload<{
  include: {
    modules: {
      include: {
        lessons: true;
      };
    };
    instructor: {
      select: {
        id: true;
        name: true;
        image: true;
        avatarUrl: true;
        headline: true;
        bio: true;
      };
    };
  };
}>;

export function findCourseById(
  id: string,
  options?: undefined,
): Promise<Course | null>;
export function findCourseById(
  id: string,
  options: { includeCurriculum: true; includeInstructor: true },
): Promise<CourseWithCurriculumAndInstructor | null>;
export function findCourseById(
  id: string,
  options: { includeCurriculum: true; includeInstructor?: boolean },
): Promise<CourseWithCurriculum | null>;
export function findCourseById(
  id: string,
  options: { includeInstructor: true; includeCurriculum?: boolean },
): Promise<CourseWithInstructor | null>;
export function findCourseById(
  id: string,
  options?: CourseQueryOptions,
): Promise<
  | Course
  | CourseWithCurriculum
  | CourseWithInstructor
  | CourseWithCurriculumAndInstructor
  | null
>;
export async function findCourseById(
  id: string,
  options?: CourseQueryOptions,
): Promise<
  | Course
  | CourseWithCurriculum
  | CourseWithInstructor
  | CourseWithCurriculumAndInstructor
  | null
> {
  if (options?.includeCurriculum || options?.includeInstructor) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        ...(options.includeCurriculum && {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        }),
        ...(options.includeInstructor && {
          instructor: {
            select: {
              id: true,
              name: true,
              image: true,
              avatarUrl: true,
              headline: true,
              bio: true,
            },
          },
        }),
      },
    }) as Promise<
      | Course
      | CourseWithCurriculum
      | CourseWithInstructor
      | CourseWithCurriculumAndInstructor
      | null
    >;
  }

  return prisma.course.findUnique({
    where: { id },
  });
}

export function findCourseBySlug(
  slug: string,
  options?: undefined,
): Promise<Course | null>;
export function findCourseBySlug(
  slug: string,
  options: { includeCurriculum: true; includeInstructor: true },
): Promise<CourseWithCurriculumAndInstructor | null>;
export function findCourseBySlug(
  slug: string,
  options: { includeCurriculum: true; includeInstructor?: boolean },
): Promise<CourseWithCurriculum | null>;
export function findCourseBySlug(
  slug: string,
  options: { includeInstructor: true; includeCurriculum?: boolean },
): Promise<CourseWithInstructor | null>;
export function findCourseBySlug(
  slug: string,
  options?: CourseQueryOptions,
): Promise<
  | Course
  | CourseWithCurriculum
  | CourseWithInstructor
  | CourseWithCurriculumAndInstructor
  | null
>;
export async function findCourseBySlug(
  slug: string,
  options?: CourseQueryOptions,
): Promise<
  | Course
  | CourseWithCurriculum
  | CourseWithInstructor
  | CourseWithCurriculumAndInstructor
  | null
> {
  if (options?.includeCurriculum || options?.includeInstructor) {
    return prisma.course.findUnique({
      where: { slug },
      include: {
        ...(options.includeCurriculum && {
          modules: {
            orderBy: { orderIndex: "asc" },
            include: {
              lessons: {
                orderBy: { orderIndex: "asc" },
              },
            },
          },
        }),
        ...(options.includeInstructor && {
          instructor: {
            select: {
              id: true,
              name: true,
              image: true,
              avatarUrl: true,
              headline: true,
              bio: true,
            },
          },
        }),
      },
    }) as Promise<
      | Course
      | CourseWithCurriculum
      | CourseWithInstructor
      | CourseWithCurriculumAndInstructor
      | null
    >;
  }

  return prisma.course.findUnique({
    where: { slug },
  });
}

export interface InstructorCourseRow extends Course {
  _count: {
    modules: number;
    enrollments: number;
  };
  totalLessons: number;
}

export async function findCoursesByInstructorId(
  instructorId: string,
): Promise<InstructorCourseRow[]> {
  const rawCourses = await prisma.course.findMany({
    where: { instructorId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          modules: true,
          enrollments: true,
        },
      },
    },
  });

  const courseIds = rawCourses.map((c) => c.id);
  const lessonCountsByCourse = new Map<string, number>();

  if (courseIds.length > 0) {
    const modules = await prisma.module.findMany({
      where: { courseId: { in: courseIds } },
      select: {
        courseId: true,
        _count: {
          select: { lessons: true },
        },
      },
    });

    for (const mod of modules) {
      const current = lessonCountsByCourse.get(mod.courseId) ?? 0;
      lessonCountsByCourse.set(mod.courseId, current + mod._count.lessons);
    }
  }

  return rawCourses.map((c) => ({
    ...c,
    totalLessons: lessonCountsByCourse.get(c.id) ?? 0,
  }));
}

export async function findPublishedCourses() {
  return prisma.course.findMany({
    where: { status: CourseStatus.PUBLISHED },
    orderBy: { createdAt: "desc" },
  });
}

export interface CourseCatalogQueryOptions {
  search?: string;
  category?: string;
  level?: CourseLevel;
  sort?: "newest" | "title_asc" | "title_desc";
  page?: number;
  limit?: number;
}

export interface CatalogCourseRow extends Course {
  instructor: {
    id: string;
    name: string | null;
    image: string | null;
    avatarUrl: string | null;
  };
  _count: {
    modules: number;
    enrollments: number;
  };
  totalLessons: number;
}

export interface PaginatedCoursesResult {
  courses: CatalogCourseRow[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Retrieves paginated published courses with bounded lesson count aggregation.
 * Zero N+1 queries.
 */
export async function findPublishedCoursesPaginated(
  options: CourseCatalogQueryOptions,
): Promise<PaginatedCoursesResult> {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(50, Math.max(1, options.limit ?? 12));
  const skip = (page - 1) * limit;

  const where: Prisma.CourseWhereInput = {
    status: CourseStatus.PUBLISHED,
  };

  if (options.level) {
    where.level = options.level;
  }

  if (options.category?.trim()) {
    where.category = options.category.trim();
  }

  if (options.search?.trim()) {
    const term = options.search.trim();
    where.OR = [
      { title: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
    ];
  }

  let orderBy: Prisma.CourseOrderByWithRelationInput;
  switch (options.sort) {
    case "title_asc":
      orderBy = { title: "asc" };
      break;
    case "title_desc":
      orderBy = { title: "desc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const [rawCourses, totalCount] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
      },
    }),
    prisma.course.count({ where }),
  ]);

  // Bounded batch aggregation for lesson counts across current page of courses (zero N+1)
  const courseIds = rawCourses.map((c) => c.id);
  const lessonCountsByCourse = new Map<string, number>();

  if (courseIds.length > 0) {
    const modules = await prisma.module.findMany({
      where: { courseId: { in: courseIds } },
      select: {
        courseId: true,
        _count: {
          select: { lessons: true },
        },
      },
    });

    for (const mod of modules) {
      const current = lessonCountsByCourse.get(mod.courseId) ?? 0;
      lessonCountsByCourse.set(mod.courseId, current + mod._count.lessons);
    }
  }

  const courses: CatalogCourseRow[] = rawCourses.map((c) => ({
    ...c,
    totalLessons: lessonCountsByCourse.get(c.id) ?? 0,
  }));

  const totalPages = Math.ceil(totalCount / limit) || 1;

  return {
    courses,
    totalCount,
    page,
    limit,
    totalPages,
  };
}

/**
 * Extracts distinct non-empty categories from published courses only.
 */
export async function findPublishedCourseCategories(): Promise<string[]> {
  const results = await prisma.course.findMany({
    where: {
      status: CourseStatus.PUBLISHED,
      category: { not: null },
    },
    select: {
      category: true,
    },
    distinct: ["category"],
    orderBy: {
      category: "asc",
    },
  });

  return results
    .map((r) => r.category)
    .filter((cat): cat is string => Boolean(cat?.trim()));
}

export async function updateCourse(
  id: string,
  data: Prisma.CourseUpdateInput,
): Promise<Course> {
  return prisma.course.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a course atomically inside a transaction holding the course row lock.
 * Cascading deletes modules and lessons while serialized against concurrent curriculum mutations.
 */
export async function deleteCourseAtomic(courseId: string): Promise<Course> {
  return prisma.$transaction(async (tx) => {
    await lockCourseForUpdate(tx, courseId);
    return tx.course.delete({
      where: { id: courseId },
    });
  });
}

/**
 * Counts modules and lessons belonging to a course.
 */
export async function countCurriculumItems(
  courseId: string,
  tx?: Prisma.TransactionClient,
): Promise<{ moduleCount: number; lessonCount: number }> {
  const client = tx ?? prisma;
  const moduleCount = await client.module.count({
    where: { courseId },
  });
  const lessonCount = await client.lesson.count({
    where: {
      module: { courseId },
    },
  });

  return { moduleCount, lessonCount };
}

/**
 * Atomically transitions a course's status under a row-level lock.
 * Verifies prerequisites under lock before updating status.
 */
export async function executeCourseStatusTransition(
  courseId: string,
  fromStatuses: CourseStatus[],
  toStatus: CourseStatus,
  validator?: (tx: Prisma.TransactionClient) => Promise<void>,
): Promise<Course> {
  return prisma.$transaction(async (tx) => {
    const course = await lockCourseForUpdate(tx, courseId);

    if (!fromStatuses.includes(course.status)) {
      throw new ValidationError(
        `Cannot transition course from ${course.status} to ${toStatus}`,
      );
    }

    if (validator) {
      await validator(tx);
    }

    return tx.course.update({
      where: { id: courseId },
      data: { status: toStatus },
    });
  });
}
