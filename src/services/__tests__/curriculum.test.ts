import * as curriculumService from "../curriculum";
import * as courseRepository from "@/repositories/course";
import * as moduleRepository from "@/repositories/module";
import * as lessonRepository from "@/repositories/lesson";
import * as authorizationService from "@/services/authorization";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import { CourseStatus } from "@prisma/client";

jest.mock("@/repositories/course");
jest.mock("@/repositories/module");
jest.mock("@/repositories/lesson");
jest.mock("@/services/authorization");

const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockModuleRepo = moduleRepository as jest.Mocked<typeof moduleRepository>;
const mockLessonRepo = lessonRepository as jest.Mocked<typeof lessonRepository>;
const mockAuthService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Curriculum Service", () => {
  const instructorId = "instructor-1";
  const otherInstructorId = "instructor-2";
  const adminId = "admin-1";

  const mockCourse = {
    id: "course-123",
    title: "Fullstack Next.js",
    slug: "fullstack-next-js",
    description: "Course description",
    thumbnailUrl: null,
    status: CourseStatus.DRAFT,
    level: "BEGINNER" as const,
    category: null,
    instructorId,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  const mockModule = {
    id: "module-1",
    title: "Module 1",
    description: "Module 1 Description",
    orderIndex: 0,
    courseId: mockCourse.id,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  };

  const mockLesson = {
    id: "lesson-1",
    title: "Lesson 1",
    slug: "lesson-1",
    orderIndex: 0,
    durationMinutes: 30,
    isFreePreview: false,
    moduleId: mockModule.id,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    module: {
      id: mockModule.id,
      courseId: mockCourse.id,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createModule", () => {
    it("allows course owner to create a module", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockModuleRepo.createModuleAtomic.mockResolvedValue(mockModule);

      const result = await curriculumService.createModule(instructorId, {
        courseId: mockCourse.id,
        title: "Module 1",
        description: "Module 1 Description",
      });

      expect(result.id).toBe(mockModule.id);
      expect(mockModuleRepo.createModuleAtomic).toHaveBeenCalledWith({
        courseId: mockCourse.id,
        title: "Module 1",
        description: "Module 1 Description",
      });
    });

    it("rejects non-owner from creating a module", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        curriculumService.createModule(otherInstructorId, {
          courseId: mockCourse.id,
          title: "Intruder Module",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockModuleRepo.createModuleAtomic).not.toHaveBeenCalled();
    });

    it("allows admin to create a module on any course", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(true);
      mockModuleRepo.createModuleAtomic.mockResolvedValue(mockModule);

      const result = await curriculumService.createModule(adminId, {
        courseId: mockCourse.id,
        title: "Admin Module",
      });

      expect(result.id).toBe(mockModule.id);
    });
  });

  describe("updateModule & deleteModule", () => {
    it("allows owner to update module", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockModuleRepo.updateModuleAtomic.mockResolvedValue({
        ...mockModule,
        title: "Updated Title",
      });

      const updated = await curriculumService.updateModule(
        instructorId,
        mockModule.id,
        {
          title: "Updated Title",
        },
      );

      expect(updated.title).toBe("Updated Title");
      expect(mockModuleRepo.updateModuleAtomic).toHaveBeenCalledWith(
        mockModule.id,
        mockCourse.id,
        { title: "Updated Title" },
      );
    });

    it("allows owner to delete module", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockModuleRepo.deleteModuleAtomic.mockResolvedValue(mockModule);

      const deleted = await curriculumService.deleteModule(
        instructorId,
        mockModule.id,
      );

      expect(deleted.id).toBe(mockModule.id);
      expect(mockModuleRepo.deleteModuleAtomic).toHaveBeenCalledWith(
        mockModule.id,
        mockCourse.id,
      );
    });

    it("rejects non-owner from updating or deleting module", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        curriculumService.updateModule(otherInstructorId, mockModule.id, {
          title: "Forbidden",
        }),
      ).rejects.toThrow(AuthorizationError);

      await expect(
        curriculumService.deleteModule(otherInstructorId, mockModule.id),
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe("reorderModules", () => {
    it("delegates reordering to repository atomic reorder", async () => {
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockModuleRepo.reorderModulesAtomic.mockResolvedValue([mockModule]);

      const result = await curriculumService.reorderModules(
        instructorId,
        mockCourse.id,
        [mockModule.id],
      );

      expect(result).toHaveLength(1);
      expect(mockModuleRepo.reorderModulesAtomic).toHaveBeenCalledWith(
        mockCourse.id,
        [mockModule.id],
      );
    });
  });

  describe("createLesson", () => {
    it("creates lesson with generated fallback slug", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockLessonRepo.createLessonAtomic.mockResolvedValue(mockLesson);

      const result = await curriculumService.createLesson(instructorId, {
        moduleId: mockModule.id,
        title: "First Lesson",
        durationMinutes: 20,
        isFreePreview: true,
      });

      expect(result.id).toBe(mockLesson.id);
      expect(mockLessonRepo.createLessonAtomic).toHaveBeenCalledWith({
        moduleId: mockModule.id,
        courseId: mockCourse.id,
        title: "First Lesson",
        baseSlug: "first-lesson",
        durationMinutes: 20,
        isFreePreview: true,
      });
    });

    it("rejects non-owner from creating lesson", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockAuthService.hasRole.mockResolvedValue(false);

      await expect(
        curriculumService.createLesson(otherInstructorId, {
          moduleId: mockModule.id,
          title: "Forbidden Lesson",
        }),
      ).rejects.toThrow(AuthorizationError);

      expect(mockLessonRepo.createLessonAtomic).not.toHaveBeenCalled();
    });
  });

  describe("updateLesson & deleteLesson", () => {
    it("allows owner to update lesson", async () => {
      mockLessonRepo.findLessonWithModule.mockResolvedValue(mockLesson);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockLessonRepo.updateLessonAtomic.mockResolvedValue({
        ...mockLesson,
        title: "Updated Lesson",
      });

      const updated = await curriculumService.updateLesson(
        instructorId,
        mockLesson.id,
        {
          title: "Updated Lesson",
        },
      );

      expect(updated.title).toBe("Updated Lesson");
      expect(mockLessonRepo.updateLessonAtomic).toHaveBeenCalledWith(
        mockLesson.id,
        mockCourse.id,
        { title: "Updated Lesson" },
      );
    });

    it("allows owner to delete lesson", async () => {
      mockLessonRepo.findLessonWithModule.mockResolvedValue(mockLesson);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockLessonRepo.deleteLessonAtomic.mockResolvedValue(mockLesson);

      const deleted = await curriculumService.deleteLesson(
        instructorId,
        mockLesson.id,
      );

      expect(deleted.id).toBe(mockLesson.id);
      expect(mockLessonRepo.deleteLessonAtomic).toHaveBeenCalledWith(
        mockLesson.id,
        mockCourse.id,
      );
    });

    it("throws NotFoundError if lesson does not exist", async () => {
      mockLessonRepo.findLessonWithModule.mockResolvedValue(null);

      await expect(
        curriculumService.updateLesson(instructorId, "non-existent", {
          title: "Test",
        }),
      ).rejects.toThrow(NotFoundError);

      await expect(
        curriculumService.deleteLesson(instructorId, "non-existent"),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("reorderLessons", () => {
    it("delegates reordering to repository atomic reorder", async () => {
      mockModuleRepo.findModuleById.mockResolvedValue(mockModule);
      mockCourseRepo.findCourseById.mockResolvedValue(mockCourse);
      mockLessonRepo.reorderLessonsAtomic.mockResolvedValue([mockLesson]);

      const result = await curriculumService.reorderLessons(
        instructorId,
        mockModule.id,
        [mockLesson.id],
      );

      expect(result).toHaveLength(1);
      expect(mockLessonRepo.reorderLessonsAtomic).toHaveBeenCalledWith(
        mockModule.id,
        mockCourse.id,
        [mockLesson.id],
      );
    });
  });
});
