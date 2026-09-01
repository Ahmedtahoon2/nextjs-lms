import * as authorizationService from "../authorization";
import * as userRepository from "@/repositories/user";
import * as userRoleRepository from "@/repositories/user-role";
import { AuthorizationError } from "@/lib/errors";

// Mock dependencies
jest.mock("@/repositories/user");
jest.mock("@/repositories/user-role");

const mockUserRepository = userRepository as jest.Mocked<typeof userRepository>;
const mockUserRoleRepository = userRoleRepository as jest.Mocked<
  typeof userRoleRepository
>;

describe("Authorization Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hasPermission", () => {
    it("should return true when user has the permission", async () => {
      const userId = "user-id";
      const permissionName = "users:read";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [
          {
            id: "user-role-id",
            userId,
            roleId: "role-id",
            createdAt: new Date(),
            role: {
              id: "role-id",
              name: "User",
              description: "Regular user",
              createdAt: new Date(),
              updatedAt: new Date(),
              rolePermissions: [
                {
                  id: "role-perm-id",
                  roleId: "role-id",
                  permissionId: "perm-id",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-id",
                    name: permissionName,
                    description: "Read users",
                    resource: "users",
                    action: "read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              ],
            },
          },
        ],
      });

      const result = await authorizationService.hasPermission(
        userId,
        permissionName,
      );

      expect(result).toBe(true);
    });

    it("should return false when user does not have the permission", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [],
      });

      const result = await authorizationService.hasPermission(
        userId,
        "admin:delete",
      );

      expect(result).toBe(false);
    });
  });

  describe("hasAnyPermission", () => {
    it("should return true when user has at least one permission", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [
          {
            id: "user-role-id",
            userId,
            roleId: "role-id",
            createdAt: new Date(),
            role: {
              id: "role-id",
              name: "User",
              description: "Regular user",
              createdAt: new Date(),
              updatedAt: new Date(),
              rolePermissions: [
                {
                  id: "role-perm-id",
                  roleId: "role-id",
                  permissionId: "perm-id",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-id",
                    name: "users:read",
                    description: "Read users",
                    resource: "users",
                    action: "read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              ],
            },
          },
        ],
      });

      const result = await authorizationService.hasAnyPermission(userId, [
        "users:read",
        "admin:delete",
      ]);

      expect(result).toBe(true);
    });

    it("should return false when user has none of the permissions", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [],
      });

      const result = await authorizationService.hasAnyPermission(userId, [
        "users:delete",
        "admin:delete",
      ]);

      expect(result).toBe(false);
    });
  });

  describe("hasAllPermissions", () => {
    it("should return true when user has all permissions", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [
          {
            id: "user-role-id",
            userId,
            roleId: "role-id",
            createdAt: new Date(),
            role: {
              id: "role-id",
              name: "Admin",
              description: "Administrator",
              createdAt: new Date(),
              updatedAt: new Date(),
              rolePermissions: [
                {
                  id: "role-perm-1",
                  roleId: "role-id",
                  permissionId: "perm-1",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-1",
                    name: "users:read",
                    description: "Read users",
                    resource: "users",
                    action: "read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
                {
                  id: "role-perm-2",
                  roleId: "role-id",
                  permissionId: "perm-2",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-2",
                    name: "users:write",
                    description: "Write users",
                    resource: "users",
                    action: "write",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              ],
            },
          },
        ],
      });

      const result = await authorizationService.hasAllPermissions(userId, [
        "users:read",
        "users:write",
      ]);

      expect(result).toBe(true);
    });

    it("should return false when user is missing at least one permission", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [
          {
            id: "user-role-id",
            userId,
            roleId: "role-id",
            createdAt: new Date(),
            role: {
              id: "role-id",
              name: "User",
              description: "Regular user",
              createdAt: new Date(),
              updatedAt: new Date(),
              rolePermissions: [
                {
                  id: "role-perm-id",
                  roleId: "role-id",
                  permissionId: "perm-id",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-id",
                    name: "users:read",
                    description: "Read users",
                    resource: "users",
                    action: "read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              ],
            },
          },
        ],
      });

      const result = await authorizationService.hasAllPermissions(userId, [
        "users:read",
        "users:delete",
      ]);

      expect(result).toBe(false);
    });
  });

  describe("hasRole", () => {
    it("should return true when user has the role", async () => {
      const userId = "user-id";
      const roleName = "Admin";

      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "user-role-id",
          userId,
          roleId: "role-id",
          createdAt: new Date(),
          role: {
            id: "role-id",
            name: roleName,
            description: "Administrator",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ]);

      const result = await authorizationService.hasRole(userId, roleName);

      expect(result).toBe(true);
    });

    it("should return false when user does not have the role", async () => {
      const userId = "user-id";

      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "user-role-id",
          userId,
          roleId: "role-id",
          createdAt: new Date(),
          role: {
            id: "role-id",
            name: "User",
            description: "Regular user",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ]);

      const result = await authorizationService.hasRole(userId, "Admin");

      expect(result).toBe(false);
    });
  });

  describe("requirePermission", () => {
    it("should not throw when user has permission", async () => {
      const userId = "user-id";
      const permissionName = "users:read";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [
          {
            id: "user-role-id",
            userId,
            roleId: "role-id",
            createdAt: new Date(),
            role: {
              id: "role-id",
              name: "User",
              description: "Regular user",
              createdAt: new Date(),
              updatedAt: new Date(),
              rolePermissions: [
                {
                  id: "role-perm-id",
                  roleId: "role-id",
                  permissionId: "perm-id",
                  createdAt: new Date(),
                  permission: {
                    id: "perm-id",
                    name: permissionName,
                    description: "Read users",
                    resource: "users",
                    action: "read",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                },
              ],
            },
          },
        ],
      });

      await expect(
        authorizationService.requirePermission(userId, permissionName),
      ).resolves.not.toThrow();
    });

    it("should throw AuthorizationError when user lacks permission", async () => {
      const userId = "user-id";

      mockUserRepository.findUserWithRoles.mockResolvedValue({
        id: userId,
        email: "user@example.com",
        name: "Test User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userRoles: [],
      });

      await expect(
        authorizationService.requirePermission(userId, "admin:delete"),
      ).rejects.toThrow(AuthorizationError);
    });
  });

  describe("requireRole", () => {
    it("should not throw when user has role", async () => {
      const userId = "user-id";
      const roleName = "Admin";

      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "user-role-id",
          userId,
          roleId: "role-id",
          createdAt: new Date(),
          role: {
            id: "role-id",
            name: roleName,
            description: "Administrator",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ]);

      await expect(
        authorizationService.requireRole(userId, roleName),
      ).resolves.not.toThrow();
    });

    it("should throw AuthorizationError when user lacks role", async () => {
      const userId = "user-id";

      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "user-role-id",
          userId,
          roleId: "role-id",
          createdAt: new Date(),
          role: {
            id: "role-id",
            name: "User",
            description: "Regular user",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ]);

      await expect(
        authorizationService.requireRole(userId, "Admin"),
      ).rejects.toThrow(AuthorizationError);
    });
  });
});
