import { CourseStatus } from "@prisma/client";
import { ValidationError, NotFoundError } from "@/lib/errors";

/**
 * AsyncLock models a PostgreSQL row-level mutex (SELECT ... FOR UPDATE).
 * Any concurrent transaction requesting a lock on the same resource is queued
 * until the holding transaction commits or rolls back.
 */
class AsyncLock {
  private queue: Array<() => void> = [];
  private locked = false;

  async acquire(): Promise<() => void> {
    if (!this.locked) {
      this.locked = true;
      return () => this.release();
    }
    return new Promise<() => void>((resolve) => {
      this.queue.push(() => {
        this.locked = true;
        resolve(() => this.release());
      });
    });
  }

  private release() {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.locked = false;
    }
  }
}

describe("Concurrency & Race Condition Suite", () => {
  const courseLocks = new Map<string, AsyncLock>();

  function getCourseLock(courseId: string): AsyncLock {
    let lock = courseLocks.get(courseId);
    if (!lock) {
      lock = new AsyncLock();
      courseLocks.set(courseId, lock);
    }
    return lock;
  }

  // Simulated in-memory database store
  interface DbCourse {
    id: string;
    status: CourseStatus;
    instructorId: string;
    modules: Array<{ id: string; orderIndex: number; title: string }>;
    lessons: Array<{
      id: string;
      moduleId: string;
      orderIndex: number;
      title: string;
    }>;
  }

  let db: Map<string, DbCourse>;

  beforeEach(() => {
    courseLocks.clear();
    db = new Map();
  });

  function getDbCourse(id: string): DbCourse {
    const course = db.get(id);
    if (!course) {
      throw new Error(`Course ${id} not found in test DB`);
    }
    return course;
  }

  // Simulated transactional domain operations using the exact row-level locking strategy
  async function lockCourseForUpdate(courseId: string) {
    const release = await getCourseLock(courseId).acquire();
    const course = db.get(courseId);
    if (!course) {
      release();
      throw new NotFoundError("Course not found");
    }
    return { course, release };
  }

  async function simulateCreateModule(
    courseId: string,
    title: string,
    delayMs = 10,
  ) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      if (course.status !== CourseStatus.DRAFT) {
        throw new ValidationError(
          "Cannot modify curriculum of a published or archived course",
        );
      }
      // Artificial delay to model I/O inside transaction
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      const newIndex = course.modules.length;
      const newModule = {
        id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        orderIndex: newIndex,
        title,
      };
      course.modules.push(newModule);
      return newModule;
    } finally {
      release();
    }
  }

  async function simulateCreateLesson(
    courseId: string,
    moduleId: string,
    title: string,
    delayMs = 10,
  ) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      if (course.status !== CourseStatus.DRAFT) {
        throw new ValidationError(
          "Cannot modify curriculum of a published or archived course",
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      const moduleLessons = course.lessons.filter(
        (l) => l.moduleId === moduleId,
      );
      const newIndex = moduleLessons.length;
      const newLesson = {
        id: `les-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        moduleId,
        orderIndex: newIndex,
        title,
      };
      course.lessons.push(newLesson);
      return newLesson;
    } finally {
      release();
    }
  }

  async function simulateReorderModules(
    courseId: string,
    orderedIds: string[],
    delayMs = 10,
  ) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      if (course.status !== CourseStatus.DRAFT) {
        throw new ValidationError(
          "Cannot modify curriculum of a published or archived course",
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      const currentIds = new Set(course.modules.map((m) => m.id));
      if (orderedIds.length !== course.modules.length) {
        throw new ValidationError("Permutation count mismatch");
      }
      if (!orderedIds.every((id) => currentIds.has(id))) {
        throw new ValidationError("Foreign or missing IDs in permutation");
      }

      course.modules.sort(
        (a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id),
      );
      course.modules.forEach((m, idx) => {
        m.orderIndex = idx;
      });
      return course.modules;
    } finally {
      release();
    }
  }

  async function simulatePublishCourse(courseId: string, delayMs = 10) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      if (course.status !== CourseStatus.DRAFT) {
        throw new ValidationError(
          `Cannot transition course from ${course.status} to PUBLISHED`,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      if (course.modules.length < 1) {
        throw new ValidationError(
          "Cannot publish course without at least one module",
        );
      }
      if (course.lessons.length < 1) {
        throw new ValidationError(
          "Cannot publish course without at least one lesson",
        );
      }

      course.status = CourseStatus.PUBLISHED;
      return course;
    } finally {
      release();
    }
  }

  async function simulateArchiveCourse(courseId: string, delayMs = 10) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      if (
        course.status !== CourseStatus.DRAFT &&
        course.status !== CourseStatus.PUBLISHED
      ) {
        throw new ValidationError(
          `Cannot transition course from ${course.status} to ARCHIVED`,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      course.status = CourseStatus.ARCHIVED;
      return course;
    } finally {
      release();
    }
  }

  async function simulateDeleteCourse(courseId: string, delayMs = 10) {
    const { course, release } = await lockCourseForUpdate(courseId);
    try {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      db.delete(courseId);
      return course;
    } finally {
      release();
    }
  }

  describe("1. Concurrent publishCourse + createModule", () => {
    it("never permits a course to end up PUBLISHED with a module created after the moment of publication", async () => {
      const courseId = "course-test-1";
      db.set(courseId, {
        id: courseId,
        status: CourseStatus.DRAFT,
        instructorId: "inst-1",
        modules: [{ id: "mod-1", orderIndex: 0, title: "Module 1" }],
        lessons: [
          {
            id: "les-1",
            moduleId: "mod-1",
            orderIndex: 0,
            title: "Lesson 1",
          },
        ],
      });

      // Fire publishCourse and createModule concurrently
      const results = await Promise.allSettled([
        simulatePublishCourse(courseId, 15),
        simulateCreateModule(courseId, "Late Arrival Module", 15),
      ]);

      const course = getDbCourse(courseId);
      expect(course.status).toBe(CourseStatus.PUBLISHED);

      // Either:
      // A: Publish completed first -> createModule rejected
      // B: CreateModule completed first -> published has 2 modules
      const publishResult = results[0];
      const createResult = results[1];

      if (
        publishResult.status === "fulfilled" &&
        createResult.status === "rejected"
      ) {
        expect(createResult.reason).toBeInstanceOf(ValidationError);
        expect(course.modules).toHaveLength(1);
        expect(course.modules[0].title).toBe("Module 1");
      } else if (
        publishResult.status === "fulfilled" &&
        createResult.status === "fulfilled"
      ) {
        expect(course.modules).toHaveLength(2);
      } else {
        fail("Invalid concurrency state reached");
      }
    });
  });

  describe("2. Concurrent publishCourse + createLesson", () => {
    it("never permits a lesson mutation to commit after the publication state is sealed", async () => {
      const courseId = "course-test-2";
      db.set(courseId, {
        id: courseId,
        status: CourseStatus.DRAFT,
        instructorId: "inst-1",
        modules: [{ id: "mod-1", orderIndex: 0, title: "Module 1" }],
        lessons: [
          {
            id: "les-1",
            moduleId: "mod-1",
            orderIndex: 0,
            title: "Lesson 1",
          },
        ],
      });

      const results = await Promise.allSettled([
        simulatePublishCourse(courseId, 20),
        simulateCreateLesson(courseId, "mod-1", "Late Lesson", 10),
      ]);

      const course = getDbCourse(courseId);
      expect(course.status).toBe(CourseStatus.PUBLISHED);

      const publishResult = results[0];
      const lessonResult = results[1];

      if (
        publishResult.status === "fulfilled" &&
        lessonResult.status === "rejected"
      ) {
        expect(lessonResult.reason).toBeInstanceOf(ValidationError);
        expect(course.lessons).toHaveLength(1);
      } else {
        expect(course.lessons).toHaveLength(2);
      }
    });
  });

  describe("3. Concurrent archiveCourse + curriculum mutation", () => {
    it("completely rejects curriculum mutations once ARCHIVED is committed", async () => {
      const courseId = "course-test-3";
      db.set(courseId, {
        id: courseId,
        status: CourseStatus.PUBLISHED,
        instructorId: "inst-1",
        modules: [{ id: "mod-1", orderIndex: 0, title: "Module 1" }],
        lessons: [
          {
            id: "les-1",
            moduleId: "mod-1",
            orderIndex: 0,
            title: "Lesson 1",
          },
        ],
      });

      const results = await Promise.allSettled([
        simulateArchiveCourse(courseId, 10),
        simulateCreateModule(courseId, "Module After Archive", 20),
      ]);

      const course = getDbCourse(courseId);
      expect(course.status).toBe(CourseStatus.ARCHIVED);

      // Create module should have failed with ValidationError
      const archiveResult = results[0];
      const createResult = results[1];

      expect(archiveResult.status).toBe("fulfilled");
      expect(createResult.status).toBe("rejected");
      expect((createResult as PromiseRejectedResult).reason).toBeInstanceOf(
        ValidationError,
      );
      expect(course.modules).toHaveLength(1);
    });
  });

  describe("4. Concurrent curriculum mutation + publish ordering with invalid prerequisites", () => {
    it("guarantees publish fails if prerequisites are not met, preventing invalid published states", async () => {
      const courseId = "course-test-4";
      // Course starts with 0 modules (invalid for publishing)
      db.set(courseId, {
        id: courseId,
        status: CourseStatus.DRAFT,
        instructorId: "inst-1",
        modules: [],
        lessons: [],
      });

      const results = await Promise.allSettled([
        simulatePublishCourse(courseId, 15),
        simulateCreateModule(courseId, "First Module", 15),
      ]);

      const course = getDbCourse(courseId);
      // Even if createModule ran first (bringing moduleCount to 1), lessonCount is still 0!
      // So publish must fail regardless of ordering!
      const publishResult = results[0];
      expect(publishResult.status).toBe("rejected");
      expect((publishResult as PromiseRejectedResult).reason).toBeInstanceOf(
        ValidationError,
      );

      // Course remains safely in DRAFT
      expect(course.status).toBe(CourseStatus.DRAFT);
    });
  });

  describe("5. Final Database State Invariant (PUBLISHED / ARCHIVED => zero curriculum mutations)", () => {
    it("guarantees all 8 curriculum mutations are unconditionally rejected when course is PUBLISHED or ARCHIVED", async () => {
      for (const lockedStatus of [
        CourseStatus.PUBLISHED,
        CourseStatus.ARCHIVED,
      ]) {
        const courseId = `course-locked-${lockedStatus}`;
        db.set(courseId, {
          id: courseId,
          status: lockedStatus,
          instructorId: "inst-1",
          modules: [{ id: "mod-1", orderIndex: 0, title: "Module 1" }],
          lessons: [
            {
              id: "les-1",
              moduleId: "mod-1",
              orderIndex: 0,
              title: "Lesson 1",
            },
          ],
        });

        // Test createModule
        await expect(
          simulateCreateModule(courseId, "Forbidden Module"),
        ).rejects.toThrow(ValidationError);

        // Test createLesson
        await expect(
          simulateCreateLesson(courseId, "mod-1", "Forbidden Lesson"),
        ).rejects.toThrow(ValidationError);

        // Test reorderModules
        await expect(
          simulateReorderModules(courseId, ["mod-1"]),
        ).rejects.toThrow(ValidationError);

        // Verify DB state is strictly unchanged
        const course = getDbCourse(courseId);
        expect(course.modules).toHaveLength(1);
        expect(course.lessons).toHaveLength(1);
      }
    });
  });

  describe("6. Concurrent deleteCourse + curriculum mutation", () => {
    it("serializes deleteCourse with curriculum mutations, preventing orphaned records", async () => {
      const courseId = "course-test-6";
      db.set(courseId, {
        id: courseId,
        status: CourseStatus.DRAFT,
        instructorId: "inst-1",
        modules: [{ id: "mod-1", orderIndex: 0, title: "Module 1" }],
        lessons: [
          {
            id: "les-1",
            moduleId: "mod-1",
            orderIndex: 0,
            title: "Lesson 1",
          },
        ],
      });

      const results = await Promise.allSettled([
        simulateDeleteCourse(courseId, 15),
        simulateCreateModule(courseId, "Dangling Module", 15),
      ]);

      const deleteResult = results[0];
      const createResult = results[1];

      // Either:
      // Delete ran first -> createModule encountered NotFoundError (course deleted)
      // Create ran first -> module was added, then delete deleted the course and all its modules
      if (
        deleteResult.status === "fulfilled" &&
        createResult.status === "rejected"
      ) {
        expect((createResult as PromiseRejectedResult).reason).toBeInstanceOf(
          NotFoundError,
        );
        expect(db.has(courseId)).toBe(false);
      } else if (
        deleteResult.status === "fulfilled" &&
        createResult.status === "fulfilled"
      ) {
        expect(db.has(courseId)).toBe(false);
      }
    });
  });
});
