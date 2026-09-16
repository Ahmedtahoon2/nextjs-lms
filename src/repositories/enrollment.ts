import { prisma } from "@/lib/db";
import {
  type CourseEnrollment,
  EnrollmentStatus,
  Prisma,
} from "@prisma/client";
import { NotFoundError } from "@/lib/errors";

/**
 * Finds an enrollment by the composite unique key (userId, courseId).
 */
export async function findEnrollment(
  userId: string,
  courseId: string,
): Promise<CourseEnrollment | null> {
  return prisma.courseEnrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });
}

/**
 * Creates a new enrollment. If a duplicate enrollment already exists (P2002),
 * returns the existing record idempotently. If the referenced course or user
 * does not exist (P2003), maps to NotFoundError.
 */
export async function createEnrollment(
  userId: string,
  courseId: string,
): Promise<CourseEnrollment> {
  try {
    return await prisma.courseEnrollment.create({
      data: {
        userId,
        courseId,
        status: EnrollmentStatus.ACTIVE,
        progressPercentage: 0,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const existing = await findEnrollment(userId, courseId);
        if (existing) {
          return existing;
        }
      }
      if (error.code === "P2003") {
        throw new NotFoundError("Course not found");
      }
    }
    throw error;
  }
}

/**
 * Updates an enrollment record by ID.
 */
export async function updateEnrollment(
  id: string,
  data: {
    status?: EnrollmentStatus;
    progressPercentage?: number;
    completedAt?: Date | null;
    lastAccessedAt?: Date;
  },
  tx?: Prisma.TransactionClient,
): Promise<CourseEnrollment> {
  const client = tx ?? prisma;
  return client.courseEnrollment.update({
    where: { id },
    data,
  });
}

/**
 * Returns all enrollments for a user, ordered by most recent first.
 * Includes the course relation for display purposes.
 */
export async function findEnrollmentsByUserId(
  userId: string,
): Promise<CourseEnrollment[]> {
  return prisma.courseEnrollment.findMany({
    where: { userId },
    orderBy: { enrolledAt: "desc" },
    include: { course: true },
  });
}

export interface CourseEnrollmentWithUser extends CourseEnrollment {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    avatarUrl: string | null;
  };
}

/**
 * Returns all enrollments for a course (instructor/admin view).
 * Includes student user details to display in roster.
 */
export async function findEnrollmentsByCourseId(
  courseId: string,
): Promise<CourseEnrollmentWithUser[]> {
  return prisma.courseEnrollment.findMany({
    where: { courseId },
    orderBy: { enrolledAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          avatarUrl: true,
        },
      },
    },
  });
}

/**
 * Bounded batch query to fetch enrollments for a user across multiple courses.
 * Used by catalog to prevent N+1 queries.
 */
export async function findEnrollmentsForUserAndCourses(
  userId: string,
  courseIds: string[],
): Promise<CourseEnrollment[]> {
  if (courseIds.length === 0) return [];
  return prisma.courseEnrollment.findMany({
    where: {
      userId,
      courseId: { in: courseIds },
    },
  });
}
