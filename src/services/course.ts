import * as courseRepository from "@/repositories/course";
import { requireAnyRole, hasRole } from "@/services/authorization";
import { slugify } from "@/lib/slug";
import type {
  CreateCourseInput,
  UpdateCourseInput,
} from "@/lib/validations/course";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import {
  type CourseLevel,
  CourseStatus,
  EnrollmentStatus,
  type Course,
  type CourseEnrollment,
  type Prisma,
} from "@prisma/client";
import * as enrollmentRepository from "@/repositories/enrollment";
import * as lessonProgressRepository from "@/repositories/lesson-progress";
import {
  catalogQuerySchema,
  type CatalogQueryInput,
} from "@/lib/validations/catalog";

/**
 * Asserts that the calling user is either the authoring instructor or an admin.
 */
async function assertCourseOwnership(
  userId: string,
  course: { instructorId: string },
) {
  if (course.instructorId === userId) {
    return;
  }

  const isAdmin = await hasRole(userId, "admin");
  if (!isAdmin) {
    throw new AuthorizationError(
      "You do not have permission to manage this course",
    );
  }
}

/**
 * Creates a new course with initial status DRAFT and collision-safe slug.
 * Requires instructor or admin role.
 */
export async function createCourse(
  userId: string,
  input: CreateCourseInput,
): Promise<Course> {
  await requireAnyRole(userId, ["instructor", "admin"]);

  const baseSlug = slugify(input.title, "course");

  return courseRepository.createCourseWithSlugRetry(
    {
      title: input.title,
      description: input.description,
      level: input.level,
      category: input.category,
      thumbnailUrl: input.thumbnailUrl,
      instructorId: userId,
    },
    baseSlug,
  );
}

/**
 * Fetches a course by ID with public vs. restricted read authorization.
 * - PUBLISHED: publicly readable by anyone (anonymous or authenticated).
 * - DRAFT / ARCHIVED: readable ONLY by the course author or an admin.
 *   Throws NotFoundError for unauthorized/anonymous users to avoid leaking draft existence.
 */
export async function getCourseById(
  userId: string | null,
  courseId: string,
  options?: courseRepository.CourseQueryOptions,
) {
  const course = await courseRepository.findCourseById(courseId, options);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course.status === CourseStatus.PUBLISHED) {
    return course;
  }

  // DRAFT or ARCHIVED requires ownership or admin
  if (!userId) {
    throw new NotFoundError("Course not found");
  }

  try {
    await assertCourseOwnership(userId, course);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      throw new NotFoundError("Course not found");
    }
    throw error;
  }

  return course;
}

/**
 * Fetches a course by slug with public vs. restricted read authorization.
 */
export async function getCourseBySlug(
  userId: string | null,
  slug: string,
  options?: courseRepository.CourseQueryOptions,
) {
  const course = await courseRepository.findCourseBySlug(slug, options);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course.status === CourseStatus.PUBLISHED) {
    return course;
  }

  if (!userId) {
    throw new NotFoundError("Course not found");
  }

  try {
    await assertCourseOwnership(userId, course);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      throw new NotFoundError("Course not found");
    }
    throw error;
  }

  return course;
}

/**
 * Returns all courses authored by the specified instructor.
 */
export async function getInstructorCourses(userId: string) {
  await requireAnyRole(userId, ["instructor", "admin"]);
  return courseRepository.findCoursesByInstructorId(userId);
}

export type InstructorCourseDetail = Prisma.CourseGetPayload<{
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

/**
 * Returns a course by ID for instructor management views.
 * Strictly asserts that the caller is either the course author or an admin,
 * unconditionally enforcing ownership regardless of publication status.
 */
export async function getInstructorCourse(
  userId: string,
  courseId: string,
): Promise<InstructorCourseDetail> {
  const course = await courseRepository.findCourseById(courseId, {
    includeCurriculum: true,
    includeInstructor: true,
  });
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return course;
}

/**
 * Returns all published courses (public catalog).
 */
export async function getPublishedCourses() {
  return courseRepository.findPublishedCourses();
}

/**
 * Updates course metadata.
 * Strictly enforces slug stability: slug is never modified.
 */
export async function updateCourse(
  userId: string,
  courseId: string,
  input: UpdateCourseInput,
): Promise<Course> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return courseRepository.updateCourse(courseId, {
    title: input.title,
    description: input.description,
    level: input.level,
    category: input.category,
    thumbnailUrl: input.thumbnailUrl,
  });
}

/**
 * Deletes a course atomically under a row lock, cascading to modules and lessons.
 */
export async function deleteCourse(
  userId: string,
  courseId: string,
): Promise<Course> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return courseRepository.deleteCourseAtomic(courseId);
}

/**
 * Transitions course from DRAFT to PUBLISHED.
 * Validates under lock that the course contains at least 1 module and 1 lesson.
 */
export async function publishCourse(
  userId: string,
  courseId: string,
): Promise<Course> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return courseRepository.executeCourseStatusTransition(
    courseId,
    [CourseStatus.DRAFT],
    CourseStatus.PUBLISHED,
    async (tx) => {
      const { moduleCount, lessonCount } =
        await courseRepository.countCurriculumItems(courseId, tx);

      if (moduleCount < 1) {
        throw new ValidationError(
          "Cannot publish a course without at least one module",
        );
      }
      if (lessonCount < 1) {
        throw new ValidationError(
          "Cannot publish a course without at least one lesson",
        );
      }
    },
  );
}

/**
 * Transitions course from PUBLISHED back to DRAFT.
 */
export async function unpublishCourse(
  userId: string,
  courseId: string,
): Promise<Course> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return courseRepository.executeCourseStatusTransition(
    courseId,
    [CourseStatus.PUBLISHED],
    CourseStatus.DRAFT,
  );
}

/**
 * Transitions course from DRAFT or PUBLISHED to ARCHIVED (terminal state for Task 03).
 */
export async function archiveCourse(
  userId: string,
  courseId: string,
): Promise<Course> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return courseRepository.executeCourseStatusTransition(
    courseId,
    [CourseStatus.DRAFT, CourseStatus.PUBLISHED],
    CourseStatus.ARCHIVED,
  );
}

export interface CatalogCourseItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  level: CourseLevel;
  category: string | null;
  instructor: {
    id: string;
    name: string | null;
    image: string | null;
    avatarUrl: string | null;
  };
  modulesCount: number;
  totalLessons: number;
  enrollmentCount: number;
  isEnrolled: boolean;
  progressPercentage: number | null;
}

export interface CatalogCoursesResponse {
  courses: CatalogCourseItem[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CourseOverviewLesson {
  id: string;
  title: string;
  slug: string;
  orderIndex: number;
  durationMinutes: number | null;
  isFreePreview: boolean;
  isCompleted: boolean;
}

export interface CourseOverviewModule {
  id: string;
  title: string;
  description: string | null;
  orderIndex: number;
  lessons: CourseOverviewLesson[];
}

export type FullCourseOverview = Prisma.CourseGetPayload<{
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

export interface CourseOverviewDetail {
  course: FullCourseOverview;
  modules: CourseOverviewModule[];
  enrollment: CourseEnrollment | null;
  isEnrolled: boolean;
  completedLessonIds: string[];
  totalLessons: number;
}

/**
 * Returns paginated published courses decorated with user enrollment state.
 * Employs bounded batch queries to prevent N+1 queries.
 */
export async function getCatalogCourses(
  options: CatalogQueryInput,
  userId?: string | null,
): Promise<CatalogCoursesResponse> {
  const parsed = catalogQuerySchema.parse(options);
  const result = await courseRepository.findPublishedCoursesPaginated(parsed);

  const courseIds = result.courses.map((c) => c.id);
  const enrollmentMap = new Map<string, CourseEnrollment>();

  if (userId && courseIds.length > 0) {
    const enrollments =
      await enrollmentRepository.findEnrollmentsForUserAndCourses(
        userId,
        courseIds,
      );
    for (const e of enrollments) {
      if (
        e.status === EnrollmentStatus.ACTIVE ||
        e.status === EnrollmentStatus.COMPLETED
      ) {
        enrollmentMap.set(e.courseId, e);
      }
    }
  }

  const items: CatalogCourseItem[] = result.courses.map((c) => {
    const enrollment = enrollmentMap.get(c.id);
    return {
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      thumbnailUrl: c.thumbnailUrl,
      level: c.level,
      category: c.category,
      instructor: c.instructor,
      modulesCount: c._count.modules,
      totalLessons: c.totalLessons,
      enrollmentCount: c._count.enrollments,
      isEnrolled: Boolean(enrollment),
      progressPercentage: enrollment ? enrollment.progressPercentage : null,
    };
  });

  return {
    courses: items,
    totalCount: result.totalCount,
    page: result.page,
    limit: result.limit,
    totalPages: result.totalPages,
  };
}

/**
 * Retrieves distinct categories from published courses.
 */
export async function getCatalogCategories(): Promise<string[]> {
  return courseRepository.findPublishedCourseCategories();
}

/**
 * Retrieves course overview, instructor details, ordered curriculum,
 * and user completion state.
 *
 * Enforces:
 * - Publicly viewable if PUBLISHED.
 * - If DRAFT or ARCHIVED, requires author ownership or admin role (throws NotFoundError otherwise).
 * - Enrolled student access to progress requires course to be PUBLISHED (unless author/admin).
 */
export async function getCourseOverview(
  slug: string,
  userId?: string | null,
): Promise<CourseOverviewDetail> {
  const course = await courseRepository.findCourseBySlug(slug, {
    includeCurriculum: true,
    includeInstructor: true,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course.status !== CourseStatus.PUBLISHED) {
    if (!userId) {
      throw new NotFoundError("Course not found");
    }
    const isOwner = course.instructorId === userId;
    const isAdmin = await hasRole(userId, "admin");
    if (!isOwner && !isAdmin) {
      throw new NotFoundError("Course not found");
    }
  }

  let enrollment: CourseEnrollment | null = null;
  let completedLessonIds: string[] = [];
  let isEnrolled = false;

  if (userId) {
    enrollment = await enrollmentRepository.findEnrollment(userId, course.id);
    if (
      enrollment &&
      (enrollment.status === EnrollmentStatus.ACTIVE ||
        enrollment.status === EnrollmentStatus.COMPLETED)
    ) {
      // Guardrail: Student access requires course to be PUBLISHED, unless author/admin
      if (
        course.status === CourseStatus.PUBLISHED ||
        course.instructorId === userId ||
        (await hasRole(userId, "admin"))
      ) {
        isEnrolled = true;
      }
    }

    if (
      isEnrolled ||
      course.instructorId === userId ||
      (await hasRole(userId, "admin"))
    ) {
      const progressRecords =
        await lessonProgressRepository.findProgressByUserAndCourse(
          userId,
          course.id,
        );
      completedLessonIds = progressRecords
        .filter((p) => p.isCompleted)
        .map((p) => p.lessonId);
    }
  }

  const completedSet = new Set(completedLessonIds);

  const rawModules = course.modules;
  const sortedModules = [...rawModules].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  let totalLessons = 0;
  const modules: CourseOverviewModule[] = sortedModules.map((mod) => {
    const sortedLessons = [...mod.lessons].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
    totalLessons += sortedLessons.length;

    return {
      id: mod.id,
      title: mod.title,
      description: mod.description,
      orderIndex: mod.orderIndex,
      lessons: sortedLessons.map((l) => ({
        id: l.id,
        title: l.title,
        slug: l.slug,
        orderIndex: l.orderIndex,
        durationMinutes: l.durationMinutes,
        isFreePreview: l.isFreePreview,
        isCompleted: completedSet.has(l.id),
      })),
    };
  });

  return {
    course,
    modules,
    enrollment,
    isEnrolled,
    completedLessonIds,
    totalLessons,
  };
}
