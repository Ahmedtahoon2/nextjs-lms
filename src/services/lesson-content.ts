import * as lessonContentRepository from "@/repositories/lesson-content";
import * as authorizationService from "@/services/authorization";
import * as enrollmentService from "@/services/enrollment";
import { normalizeVideoUrl } from "@/lib/video";
import { markdownToSanitizedHtml } from "@/lib/sanitizer";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { CourseStatus, type LessonContent, type Course } from "@prisma/client";
import type { UpdateLessonContentInput } from "@/lib/validations/lesson-content";
import * as courseRepository from "@/repositories/course";
import { parseSafeResources } from "@/lib/validations/catalog";

export type LessonContentDetail = {
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  bodyMarkdown: string | null;
  bodyHtml: string | null;
  videoUrl: string | null;
  resources: Array<{ name: string; url: string }>;
  isFreePreview: boolean;
};

/**
 * Retrieves lesson content enforcing 4-tier read authorization:
 * - If lesson is free preview AND course is PUBLISHED: accessible to anonymous and authenticated users.
 * - Otherwise: restricted strictly to the authoring instructor or admin.
 *   (Includes placeholder hook for Task 05 student enrollment).
 */
export async function getLessonContent(
  userId: string | null,
  lessonId: string,
): Promise<LessonContentDetail> {
  const hierarchy = await lessonContentRepository.findLessonHierarchy(lessonId);
  if (!hierarchy) {
    throw new NotFoundError("Lesson not found");
  }

  const course = hierarchy.module.course;
  const isPublicPreview =
    hierarchy.isFreePreview && course.status === CourseStatus.PUBLISHED;

  if (!isPublicPreview) {
    if (!userId) {
      throw new AuthenticationError(
        "Authentication required to view this lesson content",
      );
    }

    const isOwner = course.instructorId === userId;
    const isAdmin = await authorizationService.hasRole(userId, "admin");

    if (!isOwner && !isAdmin) {
      if (course.status === CourseStatus.PUBLISHED) {
        const isEnrolled = await enrollmentService.isUserEnrolled(
          userId,
          course.id,
        );
        if (!isEnrolled) {
          throw new AuthorizationError(
            "You must enroll in this course to access this lesson",
          );
        }
      } else {
        throw new AuthorizationError(
          "You do not have permission to view this lesson content",
        );
      }
    }
  }

  const content =
    await lessonContentRepository.findLessonContentByLessonId(lessonId);

  const rawResources = content?.resources;
  const parsedResources: Array<{ name: string; url: string }> = Array.isArray(
    rawResources,
  )
    ? (rawResources as Array<{ name: string; url: string }>)
    : [];

  return {
    lessonId: hierarchy.id,
    lessonTitle: hierarchy.title,
    courseId: course.id,
    bodyMarkdown: content?.bodyMarkdown ?? null,
    bodyHtml: content?.bodyHtml ?? null,
    videoUrl: content?.videoUrl ?? null,
    resources: parsedResources,
    isFreePreview: hierarchy.isFreePreview,
  };
}

/**
 * Updates or creates lesson content.
 * Enforces:
 * 1. Role: Caller must hold 'instructor' or 'admin' role.
 * 2. Ownership: Caller must be the authoring instructor of the parent course, or admin.
 * 3. Lifecycle state guard: Content editing is allowed for DRAFT and PUBLISHED courses,
 *    but strictly rejected for ARCHIVED courses.
 * 4. Normalization: Video URLs are validated and transformed to embed URLs using WHATWG URL parser.
 * 5. Sanitization: Markdown is compiled to HTML and strictly sanitized on the server before persisting.
 */
export async function updateLessonContent(
  userId: string,
  input: UpdateLessonContentInput,
): Promise<LessonContent> {
  await authorizationService.requireAnyRole(userId, ["instructor", "admin"]);

  const hierarchy = await lessonContentRepository.findLessonHierarchy(
    input.lessonId,
  );
  if (!hierarchy) {
    throw new NotFoundError("Lesson not found");
  }

  const course = hierarchy.module.course;

  if (course.status === CourseStatus.ARCHIVED) {
    throw new ValidationError(
      "Cannot modify lesson content of an archived course",
    );
  }

  const isOwner = course.instructorId === userId;
  const isAdmin = await authorizationService.hasRole(userId, "admin");

  if (!isOwner && !isAdmin) {
    throw new AuthorizationError(
      "You are not authorized to modify this lesson content",
    );
  }

  let normalizedVideoUrl: string | null | undefined;
  if (input.videoUrl !== undefined) {
    normalizedVideoUrl = input.videoUrl
      ? normalizeVideoUrl(input.videoUrl)
      : null;
  }

  let sanitizedHtml: string | null | undefined;
  if (input.bodyMarkdown !== undefined) {
    sanitizedHtml = input.bodyMarkdown
      ? await markdownToSanitizedHtml(input.bodyMarkdown)
      : null;
  }

  return lessonContentRepository.upsertLessonContent(input.lessonId, {
    bodyMarkdown: input.bodyMarkdown,
    bodyHtml: sanitizedHtml,
    videoUrl: normalizedVideoUrl,
    resources: input.resources,
  });
}

export interface LessonNavigation {
  previousLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
  totalLessons: number;
  currentIndex: number;
}

/**
 * Resolves sequential lesson navigation within a specific course.
 * CRITICAL SECURITY: Asserts that currentLessonId belongs to courseId.
 * Throws NotFoundError if the lesson does not belong to the course.
 */
export async function getLessonNavigation(
  courseId: string,
  currentLessonId: string,
): Promise<LessonNavigation> {
  const course = await courseRepository.findCourseById(courseId, {
    includeCurriculum: true,
  });

  if (!course) {
    throw new NotFoundError("Course not found");
  }

  type NavigationLesson = { id: string; title: string; orderIndex: number };
  type NavigationModule = { orderIndex: number; lessons?: NavigationLesson[] };

  const rawModules = (course as { modules?: NavigationModule[] }).modules ?? [];
  const sortedModules = [...rawModules].sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );

  const flattenedLessons: Array<{ id: string; title: string }> = [];
  for (const mod of sortedModules) {
    const sortedLessons = [...(mod.lessons ?? [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
    for (const lesson of sortedLessons) {
      flattenedLessons.push({ id: lesson.id, title: lesson.title });
    }
  }

  const currentIndex = flattenedLessons.findIndex(
    (l) => l.id === currentLessonId,
  );
  if (currentIndex === -1) {
    throw new NotFoundError("Lesson does not belong to this course");
  }

  return {
    previousLesson:
      currentIndex > 0 ? flattenedLessons[currentIndex - 1] : null,
    nextLesson:
      currentIndex < flattenedLessons.length - 1
        ? flattenedLessons[currentIndex + 1]
        : null,
    totalLessons: flattenedLessons.length,
    currentIndex: currentIndex + 1,
  };
}

/**
 * Resolves lesson content for the student learning player.
 *
 * CRITICAL SECURITY INVARIANTS:
 * 1. Resolves course by courseSlug.
 * 2. Resolves lesson hierarchy by lessonId.
 * 3. Asserts lesson belongs to the requested course: hierarchy.module.course.id === course.id.
 *    (Throws NotFoundError to eliminate cross-course ID probing).
 * 4. Enforces student authorization:
 *    - Free preview on PUBLISHED course: allowed for anyone.
 *    - Instructor owner / admin: allowed even for DRAFT/ARCHIVED.
 *    - Enrolled student: allowed ONLY IF course.status === PUBLISHED and user has ACTIVE/COMPLETED enrollment.
 *      (Students CANNOT access archived courses even with an old enrollment).
 *    - Unenrolled / unauthenticated: throws AuthenticationError / AuthorizationError.
 * 5. Strictly normalizes and sanitizes untrusted resource JSON via parseSafeResources.
 */
export async function getCourseLessonForPlayer(params: {
  courseSlug: string;
  lessonId: string;
  userId?: string | null;
}): Promise<{
  course: Course;
  lesson: LessonContentDetail;
  navigation: LessonNavigation;
}> {
  const { courseSlug, lessonId, userId } = params;

  // 1. Establish course boundary from slug
  const course = await courseRepository.findCourseBySlug(courseSlug);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  // 2. Resolve lesson hierarchy
  const hierarchy = await lessonContentRepository.findLessonHierarchy(lessonId);
  if (!hierarchy) {
    throw new NotFoundError("Lesson not found");
  }

  // 3. MANDATORY CROSS-COURSE ISOLATION CHECK
  if (hierarchy.module.course.id !== course.id) {
    throw new NotFoundError("Lesson not found in this course");
  }

  // 4. Authorization check
  const isPublicPreview =
    hierarchy.isFreePreview && course.status === CourseStatus.PUBLISHED;

  if (!isPublicPreview) {
    if (!userId) {
      throw new AuthenticationError(
        "Authentication required to view this lesson content",
      );
    }

    const isOwner = course.instructorId === userId;
    const isAdmin = await authorizationService.hasRole(userId, "admin");

    if (!isOwner && !isAdmin) {
      // Guardrail: Archived courses are forbidden to regular students even with old enrollment
      if (course.status !== CourseStatus.PUBLISHED) {
        throw new NotFoundError("Course not found");
      }

      const isEnrolled = await enrollmentService.isUserEnrolled(
        userId,
        course.id,
      );
      if (!isEnrolled) {
        throw new AuthorizationError(
          "You must enroll in this course to access this lesson",
        );
      }
    }
  }

  // 5. Fetch lesson content and parse safe resources
  const content =
    await lessonContentRepository.findLessonContentByLessonId(lessonId);
  const safeResources = parseSafeResources(content?.resources);

  // 6. Resolve deterministic navigation within course boundary
  const navigation = await getLessonNavigation(course.id, lessonId);

  return {
    course,
    lesson: {
      lessonId: hierarchy.id,
      lessonTitle: hierarchy.title,
      courseId: course.id,
      bodyMarkdown: content?.bodyMarkdown ?? null,
      bodyHtml: content?.bodyHtml ?? null,
      videoUrl: content?.videoUrl ?? null,
      resources: safeResources,
      isFreePreview: hierarchy.isFreePreview,
    },
    navigation,
  };
}
