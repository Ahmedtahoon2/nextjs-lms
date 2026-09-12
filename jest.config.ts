import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./src" });

const config: Config = {
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(htmlparser2|sanitize-html|domhandler|entities)/)",
  ],
};

const asyncConfig = createJestConfig(config);

const jestConfig = async () => {
  const resolved = await asyncConfig();
  resolved.transformIgnorePatterns = [
    "/node_modules/(?!(\\.pnpm|marked|htmlparser2|sanitize-html|dom.*|entities)/)",
  ];
  return resolved;
};

export default jestConfig;
