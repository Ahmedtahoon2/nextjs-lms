import * as enrollmentRepository from "@/repositories/enrollment";
import * as courseRepository from "@/repositories/course";
import { hasRole } from "@/services/authorization";
import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import {
  CourseStatus,
  EnrollmentStatus,
  type CourseEnrollment,
} from "@prisma/client";

/**
 * Enrolls a student in a published course.
 * - Only PUBLISHED courses are enrollable.
 * - Duplicate enrollment is idempotent: returns existing enrollment.
 * - Any authenticated user can enroll (no role check).
 */
export async function enrollInCourse(
  userId: string,
  courseId: string,
): Promise<CourseEnrollment> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  if (course.status !== CourseStatus.PUBLISHED) {
    throw new ValidationError("Cannot enroll in an unpublished course");
  }

  return enrollmentRepository.createEnrollment(userId, courseId);
}

/**
 * Checks whether a user has an active or completed enrollment in a course.
 * ARCHIVED enrollments are not considered enrolled.
 */
export async function isUserEnrolled(
  userId: string,
  courseId: string,
): Promise<boolean> {
  const enrollment = await enrollmentRepository.findEnrollment(
    userId,
    courseId,
  );
  if (!enrollment) {
    return false;
  }

  return (
    enrollment.status === EnrollmentStatus.ACTIVE ||
    enrollment.status === EnrollmentStatus.COMPLETED
  );
}

/**
 * Returns the enrollment record for a user and course, or null.
 */
export async function getEnrollment(
  userId: string,
  courseId: string,
): Promise<CourseEnrollment | null> {
  return enrollmentRepository.findEnrollment(userId, courseId);
}

/**
 * Returns all enrollments for the authenticated user.
 */
export async function getUserEnrollments(
  userId: string,
): Promise<CourseEnrollment[]> {
  return enrollmentRepository.findEnrollmentsByUserId(userId);
}

/**
 * Returns all enrollments for a course.
 * Restricted to the course instructor or an admin.
 */
export async function getCourseEnrollments(
  userId: string,
  courseId: string,
): Promise<enrollmentRepository.CourseEnrollmentWithUser[]> {
  return getCourseRoster(userId, courseId);
}

/**
 * Returns all enrolled students with user identity and completion metrics for a course.
 * Restricted strictly to the course authoring instructor or an admin.
 */
export async function getCourseRoster(
  userId: string,
  courseId: string,
): Promise<enrollmentRepository.CourseEnrollmentWithUser[]> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  const isOwner = course.instructorId === userId;
  const isAdmin = await hasRole(userId, "admin");

  if (!isOwner && !isAdmin) {
    throw new AuthorizationError(
      "You do not have permission to view course enrollments",
    );
  }

  return enrollmentRepository.findEnrollmentsByCourseId(courseId);
}
