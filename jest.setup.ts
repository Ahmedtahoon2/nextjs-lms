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
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
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
  })),
}));

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
