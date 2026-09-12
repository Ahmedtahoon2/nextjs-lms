import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "node:util";

// Mock TextDecoder for Node environment
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

// Mock Neon serverless
jest.mock("@neondatabase/serverless", () => ({
  Pool: jest.fn(),
  neon: jest.fn(),
  neonConfig: {},
}));

// Mock Prisma adapter for Neon
jest.mock("@prisma/adapter-neon", () => ({
  PrismaNeon: jest.fn(),
}));

// Mock ws
jest.mock("ws", () => ({}));

// Mock Prisma Client
jest.mock("@prisma/client", () => {
  class MockPrismaClientKnownRequestError extends Error {
    code: string;
    constructor(
      message: string,
      { code }: { code: string; clientVersion?: string },
    ) {
      super(message);
      this.code = code;
      this.name = "PrismaClientKnownRequestError";
    }
  }

  return {
    CourseStatus: {
      DRAFT: "DRAFT",
      PUBLISHED: "PUBLISHED",
      ARCHIVED: "ARCHIVED",
    },
    CourseLevel: {
      BEGINNER: "BEGINNER",
      INTERMEDIATE: "INTERMEDIATE",
      ADVANCED: "ADVANCED",
      ALL_LEVELS: "ALL_LEVELS",
    },
    EnrollmentStatus: {
      ACTIVE: "ACTIVE",
      COMPLETED: "COMPLETED",
      ARCHIVED: "ARCHIVED",
    },
    Prisma: {
      PrismaClientKnownRequestError: MockPrismaClientKnownRequestError,
    },
    PrismaClient: jest.fn().mockImplementation(() => ({
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $transaction: jest.fn((cb) =>
        typeof cb === "function" ? cb(this) : Promise.all(cb),
      ),
      $queryRaw: jest.fn(),
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      session: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
      role: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      permission: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      course: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      module: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      lesson: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      lessonContent: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
      },
      courseEnrollment: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      lessonProgress: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        upsert: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
    })),
  };
});

// Mock better-auth
jest.mock("better-auth", () => ({
  betterAuth: jest.fn(() => ({
    api: {
      getSession: jest.fn(),
      signInEmail: jest.fn(),
      signUpEmail: jest.fn(),
      signOut: jest.fn(),
    },
    $Infer: {
      Session: {},
    },
  })),
}));

// Mock better-auth adapters
jest.mock("better-auth/adapters/prisma", () => ({
  prismaAdapter: jest.fn(() => ({})),
}));

// Mock goey-toast
jest.mock("goey-toast", () => ({
  GooeyToaster: () => null,
  gooeyToast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    promise: jest.fn(),
    dismiss: jest.fn(),
    custom: jest.fn(),
    message: jest.fn(),
  },
}));
