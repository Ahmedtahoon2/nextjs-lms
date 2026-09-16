import * as profileService from "../profile";
import * as userRepository from "@/repositories/user";
import { AuthorizationError, NotFoundError } from "@/lib/errors";

jest.mock("@/repositories/user");

const mockUserRepository = userRepository as jest.Mocked<typeof userRepository>;

describe("Profile Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockDbUser = {
    id: "user-123",
    email: "user@example.com",
    name: "Jane Doe",
    emailVerified: true,
    image: "https://example.com/image.jpg",
    headline: "Software Engineer",
    bio: "Passionate about Next.js and TypeScript",
    avatarUrl: "https://example.com/avatar.jpg",
    website: "https://janedoe.dev",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-02"),
  };

  describe("getUserProfile", () => {
    it("returns profile when user exists", async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockDbUser);

      const profile = await profileService.getUserProfile("user-123");

      expect(profile).toEqual({
        id: "user-123",
        name: "Jane Doe",
        email: "user@example.com",
        image: "https://example.com/image.jpg",
        headline: "Software Engineer",
        bio: "Passionate about Next.js and TypeScript",
        avatarUrl: "https://example.com/avatar.jpg",
        website: "https://janedoe.dev",
        createdAt: new Date("2026-01-01"),
      });
      expect(mockUserRepository.findUserById).toHaveBeenCalledWith("user-123");
    });

    it("throws NotFoundError when user does not exist", async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(
        profileService.getUserProfile("non-existent"),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateUserProfile - Self Ownership Enforcement", () => {
    const updateInput = {
      name: "Jane Updated",
      headline: "Staff Engineer",
      bio: "Updated bio text",
      website: "https://updated.dev",
      avatarUrl: "https://updated.dev/avatar.png",
    };

    it("allows a user to update their own profile", async () => {
      mockUserRepository.findUserById.mockResolvedValue(mockDbUser);
      mockUserRepository.updateUserProfile.mockResolvedValue({
        ...mockDbUser,
        ...updateInput,
      });

      const updated = await profileService.updateUserProfile(
        "user-123", // session user
        "user-123", // target user
        updateInput,
      );

      expect(updated.name).toBe("Jane Updated");
      expect(updated.headline).toBe("Staff Engineer");
      expect(mockUserRepository.updateUserProfile).toHaveBeenCalledWith(
        "user-123",
        updateInput,
      );
    });

    it("throws AuthorizationError when user attempts to update another user's profile", async () => {
      // User A (user-123) attempts to modify User B (user-456)
      await expect(
        profileService.updateUserProfile(
          "user-123", // session user A
          "user-456", // target user B
          updateInput,
        ),
      ).rejects.toThrow(AuthorizationError);

      // Verify no DB query was executed
      expect(mockUserRepository.updateUserProfile).not.toHaveBeenCalled();
    });

    it("throws NotFoundError if the target user no longer exists", async () => {
      mockUserRepository.findUserById.mockResolvedValue(null);

      await expect(
        profileService.updateUserProfile("user-123", "user-123", updateInput),
      ).rejects.toThrow(NotFoundError);

      expect(mockUserRepository.updateUserProfile).not.toHaveBeenCalled();
    });
  });
});
