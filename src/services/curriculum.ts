import * as courseRepository from "@/repositories/course";
import * as moduleRepository from "@/repositories/module";
import * as lessonRepository from "@/repositories/lesson";
import { hasRole } from "@/services/authorization";
import { slugify } from "@/lib/slug";
import type {
  CreateModuleInput,
  UpdateModuleInput,
  CreateLessonInput,
  UpdateLessonInput,
} from "@/lib/validations/course";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import type { Module, Lesson } from "@prisma/client";

/**
 * Helper to assert that the caller is either the course author or an admin.
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
      "You do not have permission to modify this course curriculum",
    );
  }
}

/**
 * Creates a new module at the end of the course curriculum.
 * Synchronized through course row lock.
 */
export async function createModule(
  userId: string,
  input: CreateModuleInput,
): Promise<Module> {
  const course = await courseRepository.findCourseById(input.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return moduleRepository.createModuleAtomic({
    courseId: input.courseId,
    title: input.title,
    description: input.description,
  });
}

/**
 * Updates a module's metadata under the course row lock.
 */
export async function updateModule(
  userId: string,
  moduleId: string,
  input: UpdateModuleInput,
): Promise<Module> {
  const mod = await moduleRepository.findModuleById(moduleId);
  if (!mod) {
    throw new NotFoundError("Module not found");
  }

  const course = await courseRepository.findCourseById(mod.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return moduleRepository.updateModuleAtomic(moduleId, mod.courseId, input);
}

/**
 * Deletes a module and re-indexes subsequent siblings under the course row lock.
 */
export async function deleteModule(
  userId: string,
  moduleId: string,
): Promise<Module> {
  const mod = await moduleRepository.findModuleById(moduleId);
  if (!mod) {
    throw new NotFoundError("Module not found");
  }

  const course = await courseRepository.findCourseById(mod.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return moduleRepository.deleteModuleAtomic(moduleId, mod.courseId);
}

/**
 * Reorders modules using two-phase atomic assignment.
 * Sibling fetching and permutation verification run strictly inside the repository transaction.
 */
export async function reorderModules(
  userId: string,
  courseId: string,
  orderedIds: string[],
): Promise<Module[]> {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return moduleRepository.reorderModulesAtomic(courseId, orderedIds);
}

/**
 * Creates a new lesson in the specified module.
 * Synchronized through course row lock with retry on slug/orderIndex collisions.
 */
export async function createLesson(
  userId: string,
  input: CreateLessonInput,
): Promise<Lesson> {
  const mod = await moduleRepository.findModuleById(input.moduleId);
  if (!mod) {
    throw new NotFoundError("Module not found");
  }

  const course = await courseRepository.findCourseById(mod.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  const baseSlug = slugify(input.title, "lesson");

  return lessonRepository.createLessonAtomic({
    moduleId: input.moduleId,
    courseId: mod.courseId,
    title: input.title,
    baseSlug,
    durationMinutes: input.durationMinutes,
    isFreePreview: input.isFreePreview,
  });
}

/**
 * Updates a lesson under the course row lock.
 */
export async function updateLesson(
  userId: string,
  lessonId: string,
  input: UpdateLessonInput,
): Promise<Lesson> {
  const lesson = await lessonRepository.findLessonWithModule(lessonId);

  if (!lesson) {
    throw new NotFoundError("Lesson not found");
  }

  const course = await courseRepository.findCourseById(lesson.module.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return lessonRepository.updateLessonAtomic(
    lessonId,
    lesson.module.courseId,
    input,
  );
}

/**
 * Deletes a lesson and re-indexes subsequent siblings under the course row lock.
 */
export async function deleteLesson(
  userId: string,
  lessonId: string,
): Promise<Lesson> {
  const lesson = await lessonRepository.findLessonWithModule(lessonId);

  if (!lesson) {
    throw new NotFoundError("Lesson not found");
  }

  const course = await courseRepository.findCourseById(lesson.module.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return lessonRepository.deleteLessonAtomic(lessonId, lesson.module.courseId);
}

/**
 * Reorders lessons using two-phase atomic assignment.
 * Sibling fetching and permutation verification run strictly inside the repository transaction.
 */
export async function reorderLessons(
  userId: string,
  moduleId: string,
  orderedIds: string[],
): Promise<Lesson[]> {
  const mod = await moduleRepository.findModuleById(moduleId);
  if (!mod) {
    throw new NotFoundError("Module not found");
  }

  const course = await courseRepository.findCourseById(mod.courseId);
  if (!course) {
    throw new NotFoundError("Course not found");
  }

  await assertCourseOwnership(userId, course);

  return lessonRepository.reorderLessonsAtomic(
    moduleId,
    mod.courseId,
    orderedIds,
  );
}
