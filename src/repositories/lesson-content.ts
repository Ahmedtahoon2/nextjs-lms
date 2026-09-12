import { prisma } from "@/lib/db";
import { type LessonContent, type CourseStatus, Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

export type LessonHierarchy = {
  id: string;
  title: string;
  isFreePreview: boolean;
  moduleId: string;
  module: {
    id: string;
    courseId: string;
    course: {
      id: string;
      instructorId: string;
      status: CourseStatus;
    };
  };
};

export type UpsertLessonContentData = {
  bodyMarkdown?: string | null;
  bodyHtml?: string | null;
  videoUrl?: string | null;
  resources?: Array<{ name: string; url: string }> | null;
};

/**
 * Retrieves the full lesson hierarchy in a single efficient query.
 * Provides necessary context for authorization (instructor ownership, course status, free preview).
 */
export async function findLessonHierarchy(
  lessonId: string,
): Promise<LessonHierarchy | null> {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      isFreePreview: true,
      moduleId: true,
      module: {
        select: {
          id: true,
          courseId: true,
          course: {
            select: {
              id: true,
              instructorId: true,
              status: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Finds lesson content by unique lesson ID.
 */
export async function findLessonContentByLessonId(
  lessonId: string,
): Promise<LessonContent | null> {
  return prisma.lessonContent.findUnique({
    where: { lessonId },
  });
}

/**
 * Upserts lesson content.
 * Catches foreign key constraint violations (P2003) and record not found errors (P2025)
 * caused by concurrent lesson or course deletions, mapping them cleanly to NotFoundError.
 */
export async function upsertLessonContent(
  lessonId: string,
  data: UpsertLessonContentData,
): Promise<LessonContent> {
  try {
    const resourcesValue = data.resources
      ? (data.resources as Prisma.InputJsonValue)
      : data.resources === null
        ? Prisma.JsonNull
        : undefined;

    return await prisma.lessonContent.upsert({
      where: { lessonId },
      create: {
        lessonId,
        bodyMarkdown: data.bodyMarkdown ?? null,
        bodyHtml: data.bodyHtml ?? null,
        videoUrl: data.videoUrl ?? null,
        resources: resourcesValue ?? Prisma.JsonNull,
      },
      update: {
        bodyMarkdown:
          data.bodyMarkdown !== undefined ? data.bodyMarkdown : undefined,
        bodyHtml: data.bodyHtml !== undefined ? data.bodyHtml : undefined,
        videoUrl: data.videoUrl !== undefined ? data.videoUrl : undefined,
        resources: resourcesValue,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2003" || error.code === "P2025")
    ) {
      throw new NotFoundError("Lesson not found");
    }
    throw error;
  }
}
