import * as authorizationService from "../authorization";
import * as userRoleRepository from "@/repositories/user-role";
import * as roleRepository from "@/repositories/role";
import { AuthorizationError, NotFoundError } from "@/lib/errors";

jest.mock("@/repositories/user-role");
jest.mock("@/repositories/role");
jest.mock("@/repositories/user");

const mockUserRoleRepository = userRoleRepository as jest.Mocked<
  typeof userRoleRepository
>;
const mockRoleRepository = roleRepository as jest.Mocked<typeof roleRepository>;

describe("Authorization Service - Role Assignment Restrictions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const adminUserId = "admin-user-id";
  const regularUserId = "regular-user-id";
  const targetUserId = "target-user-id";

  const mockAdminRole = {
    id: "admin-role-id",
    name: "admin",
    description: "Administrator",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockInstructorRole = {
    id: "instructor-role-id",
    name: "instructor",
    description: "Course Instructor",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("assignRoleToUserByName", () => {
    it("allows admin user to assign instructor role to another user", async () => {
      // Mock that adminUserId has admin role
      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "ur-1",
          userId: adminUserId,
          roleId: mockAdminRole.id,
          createdAt: new Date(),
          role: mockAdminRole,
        },
      ]);

      mockRoleRepository.findRoleByName.mockResolvedValue(mockInstructorRole);
      mockUserRoleRepository.findUserRole.mockResolvedValue(null);
      mockUserRoleRepository.assignRoleToUser.mockResolvedValue({
        id: "new-ur-id",
        userId: targetUserId,
        roleId: mockInstructorRole.id,
        createdAt: new Date(),
      });

      const result = await authorizationService.assignRoleToUserByName(
        adminUserId,
        targetUserId,
        "instructor",
      );

      expect(result).toBeDefined();
      expect(mockRoleRepository.findRoleByName).toHaveBeenCalledWith(
        "instructor",
      );
      expect(mockUserRoleRepository.assignRoleToUser).toHaveBeenCalledWith(
        targetUserId,
        mockInstructorRole.id,
      );
    });

    it("rejects non-admin user attempting to assign a role", async () => {
      // Regular user has no admin role
      mockUserRoleRepository.findUserRoles.mockResolvedValue([]);

      await expect(
        authorizationService.assignRoleToUserByName(
          regularUserId,
          targetUserId,
          "instructor",
        ),
      ).rejects.toThrow(AuthorizationError);

      expect(mockRoleRepository.findRoleByName).not.toHaveBeenCalled();
      expect(mockUserRoleRepository.assignRoleToUser).not.toHaveBeenCalled();
    });

    it("throws NotFoundError if the specified role name does not exist", async () => {
      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "ur-1",
          userId: adminUserId,
          roleId: mockAdminRole.id,
          createdAt: new Date(),
          role: mockAdminRole,
        },
      ]);

      mockRoleRepository.findRoleByName.mockResolvedValue(null);

      await expect(
        authorizationService.assignRoleToUserByName(
          adminUserId,
          targetUserId,
          "non-existent-role",
        ),
      ).rejects.toThrow(NotFoundError);

      expect(mockUserRoleRepository.assignRoleToUser).not.toHaveBeenCalled();
    });
  });

  describe("removeRoleFromUserByName", () => {
    it("allows admin to remove role from a user", async () => {
      mockUserRoleRepository.findUserRoles.mockResolvedValue([
        {
          id: "ur-1",
          userId: adminUserId,
          roleId: mockAdminRole.id,
          createdAt: new Date(),
          role: mockAdminRole,
        },
      ]);

      mockRoleRepository.findRoleByName.mockResolvedValue(mockInstructorRole);
      mockUserRoleRepository.findUserRole.mockResolvedValue({
        id: "existing-ur-id",
        userId: targetUserId,
        roleId: mockInstructorRole.id,
        createdAt: new Date(),
      });
      mockUserRoleRepository.removeRoleFromUser.mockResolvedValue({
        id: "existing-ur-id",
        userId: targetUserId,
        roleId: mockInstructorRole.id,
        createdAt: new Date(),
      });

      const result = await authorizationService.removeRoleFromUserByName(
        adminUserId,
        targetUserId,
        "instructor",
      );

      expect(result).toBeDefined();
      expect(mockUserRoleRepository.removeRoleFromUser).toHaveBeenCalledWith(
        targetUserId,
        mockInstructorRole.id,
      );
    });

    it("rejects non-admin attempting to remove a role", async () => {
      mockUserRoleRepository.findUserRoles.mockResolvedValue([]);

      await expect(
        authorizationService.removeRoleFromUserByName(
          regularUserId,
          targetUserId,
          "instructor",
        ),
      ).rejects.toThrow(AuthorizationError);

      expect(mockUserRoleRepository.removeRoleFromUser).not.toHaveBeenCalled();
    });
  });
});
