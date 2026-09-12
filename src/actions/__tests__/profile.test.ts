import { getProfileAction, updateProfileAction } from "../profile";
import * as authHelpers from "@/lib/auth-helpers";
import * as profileService from "@/services/profile";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";

jest.mock("@/lib/auth-helpers");
jest.mock("@/services/profile");

const mockAuthHelpers = authHelpers as jest.Mocked<typeof authHelpers>;
const mockProfileService = profileService as jest.Mocked<typeof profileService>;

describe("Profile Server Actions", () => {
  const mockUser = {
    id: "user-123",
    email: "user@example.com",
    name: "Jane Doe",
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSession = {
    user: mockUser,
    session: {
      id: "session-123",
      userId: "user-123",
      expiresAt: new Date(Date.now() + 86400000),
      token: "test-token",
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: null,
      userAgent: null,
    },
  };

  const mockProfile: profileService.UserProfile = {
    id: "user-123",
    name: "Jane Doe",
    email: "user@example.com",
    image: null,
    headline: "Engineer",
    bio: "Passionate developer",
    avatarUrl: "https://example.com/avatar.jpg",
    website: "https://example.com",
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfileAction", () => {
    it("returns profile for authenticated user", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockProfileService.getUserProfile.mockResolvedValue(mockProfile);

      const result = await getProfileAction();

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockProfile);
      }
      expect(mockProfileService.getUserProfile).toHaveBeenCalledWith(
        "user-123",
      );
    });

    it("returns UNAUTHORIZED when session is missing", async () => {
      mockAuthHelpers.requireAuth.mockRejectedValue(new AuthenticationError());

      const result = await getProfileAction();

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
    });

    it("returns NOT_FOUND when user does not exist", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockProfileService.getUserProfile.mockRejectedValue(new NotFoundError());

      const result = await getProfileAction();

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("updateProfileAction", () => {
    const validInput = {
      name: "Jane Updated",
      headline: "Senior Engineer",
      bio: "Updated bio",
      website: "https://janedoe.com",
      avatarUrl: "https://janedoe.com/avatar.jpg",
    };

    it("successfully updates profile for the owner", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockProfileService.updateUserProfile.mockResolvedValue({
        ...mockProfile,
        ...validInput,
      });

      const result = await updateProfileAction(validInput);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Jane Updated");
      }
      expect(mockProfileService.updateUserProfile).toHaveBeenCalledWith(
        "user-123",
        "user-123",
        validInput,
      );
    });

    it("returns VALIDATION_ERROR when input is invalid", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);

      const invalidInput = {
        name: "", // name is required and min 2
        website: "not-a-url",
      };

      const result = await updateProfileAction(invalidInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("VALIDATION_ERROR");
        expect(result.details).toBeDefined();
      }
      expect(mockProfileService.updateUserProfile).not.toHaveBeenCalled();
    });

    it("returns UNAUTHORIZED when user is unauthenticated", async () => {
      mockAuthHelpers.requireAuth.mockRejectedValue(new AuthenticationError());

      const result = await updateProfileAction(validInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("UNAUTHORIZED");
      }
      expect(mockProfileService.updateUserProfile).not.toHaveBeenCalled();
    });

    it("returns FORBIDDEN when authorization error is thrown", async () => {
      mockAuthHelpers.requireAuth.mockResolvedValue(mockSession);
      mockProfileService.updateUserProfile.mockRejectedValue(
        new AuthorizationError("Forbidden update"),
      );

      const result = await updateProfileAction(validInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.code).toBe("FORBIDDEN");
      }
    });
  });
});
