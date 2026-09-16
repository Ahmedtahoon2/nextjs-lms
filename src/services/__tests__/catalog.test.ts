import * as courseService from "../course";
import * as courseRepository from "@/repositories/course";
import * as enrollmentRepository from "@/repositories/enrollment";
import { CourseLevel, CourseStatus, EnrollmentStatus } from "@prisma/client";

jest.mock("@/repositories/course");
jest.mock("@/repositories/enrollment");

const mockCourseRepo = courseRepository as jest.Mocked<typeof courseRepository>;
const mockEnrollmentRepo = enrollmentRepository as jest.Mocked<
  typeof enrollmentRepository
>;

describe("Course Service - Catalog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockInstructor = {
    id: "inst-1",
    name: "John Doe",
    image: null,
    avatarUrl: null,
  };

  const sampleCourse1 = {
    id: "course-1",
    title: "TypeScript Mastery",
    slug: "typescript-mastery",
    description: "Learn advanced TypeScript patterns.",
    thumbnailUrl: "https://example.com/ts.jpg",
    status: CourseStatus.PUBLISHED,
    level: CourseLevel.INTERMEDIATE,
    category: "Programming",
    instructorId: "inst-1",
    instructor: mockInstructor,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    _count: { modules: 3, enrollments: 25 },
    totalLessons: 12,
  };

  const sampleCourse2 = {
    id: "course-2",
    title: "Next.js Fullstack",
    slug: "nextjs-fullstack",
    description: "Build production apps with Next.js 16.",
    thumbnailUrl: null,
    status: CourseStatus.PUBLISHED,
    level: CourseLevel.ADVANCED,
    category: "Web Development",
    instructorId: "inst-1",
    instructor: mockInstructor,
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
    _count: { modules: 4, enrollments: 40 },
    totalLessons: 18,
  };

  describe("getCatalogCourses", () => {
    it("returns paginated published courses for anonymous visitors", async () => {
      mockCourseRepo.findPublishedCoursesPaginated.mockResolvedValue({
        courses: [sampleCourse1, sampleCourse2],
        totalCount: 2,
        page: 1,
        limit: 12,
        totalPages: 1,
      });

      const result = await courseService.getCatalogCourses({
        page: 1,
        limit: 12,
        sort: "newest",
      });

      expect(result.courses).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.courses[0].title).toBe("TypeScript Mastery");
      expect(result.courses[0].totalLessons).toBe(12);
      expect(result.courses[0].isEnrolled).toBe(false);
      expect(result.courses[0].progressPercentage).toBeNull();
      expect(
        mockEnrollmentRepo.findEnrollmentsForUserAndCourses,
      ).not.toHaveBeenCalled();
    });

    it("decorates courses with student enrollment and progress when userId is provided", async () => {
      mockCourseRepo.findPublishedCoursesPaginated.mockResolvedValue({
        courses: [sampleCourse1, sampleCourse2],
        totalCount: 2,
        page: 1,
        limit: 12,
        totalPages: 1,
      });

      mockEnrollmentRepo.findEnrollmentsForUserAndCourses.mockResolvedValue([
        {
          id: "enr-1",
          userId: "student-1",
          courseId: "course-1",
          status: EnrollmentStatus.ACTIVE,
          progressPercentage: 50,
          enrolledAt: new Date(),
          completedAt: null,
          lastAccessedAt: new Date(),
        },
      ]);

      const result = await courseService.getCatalogCourses(
        { page: 1, limit: 12, sort: "newest" },
        "student-1",
      );

      expect(
        mockEnrollmentRepo.findEnrollmentsForUserAndCourses,
      ).toHaveBeenCalledWith("student-1", ["course-1", "course-2"]);
      expect(result.courses[0].isEnrolled).toBe(true);
      expect(result.courses[0].progressPercentage).toBe(50);
      expect(result.courses[1].isEnrolled).toBe(false);
      expect(result.courses[1].progressPercentage).toBeNull();
    });

    it("passes search, category, and level filters to repository", async () => {
      mockCourseRepo.findPublishedCoursesPaginated.mockResolvedValue({
        courses: [sampleCourse1],
        totalCount: 1,
        page: 1,
        limit: 12,
        totalPages: 1,
      });

      await courseService.getCatalogCourses({
        search: "type",
        category: "Programming",
        level: CourseLevel.INTERMEDIATE,
        sort: "title_asc",
        page: 1,
        limit: 12,
      });

      expect(mockCourseRepo.findPublishedCoursesPaginated).toHaveBeenCalledWith(
        {
          search: "type",
          category: "Programming",
          level: CourseLevel.INTERMEDIATE,
          sort: "title_asc",
          page: 1,
          limit: 12,
        },
      );
    });

    it("handles empty results gracefully", async () => {
      mockCourseRepo.findPublishedCoursesPaginated.mockResolvedValue({
        courses: [],
        totalCount: 0,
        page: 1,
        limit: 12,
        totalPages: 1,
      });

      const result = await courseService.getCatalogCourses({
        page: 1,
        limit: 12,
        sort: "newest",
      });

      expect(result.courses).toEqual([]);
      expect(result.totalCount).toBe(0);
      expect(result.totalPages).toBe(1);
    });
  });

  describe("getCatalogCategories", () => {
    it("returns distinct published categories", async () => {
      mockCourseRepo.findPublishedCourseCategories.mockResolvedValue([
        "Programming",
        "Web Development",
      ]);

      const categories = await courseService.getCatalogCategories();

      expect(categories).toEqual(["Programming", "Web Development"]);
      expect(
        mockCourseRepo.findPublishedCourseCategories,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
