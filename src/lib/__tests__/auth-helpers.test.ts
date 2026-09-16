import { requireAuth, requireRole, getCurrentUser } from "@/lib/auth-helpers";
import * as authService from "@/services/auth";
import * as authorizationService from "@/services/authorization";
import { AuthenticationError, AuthorizationError } from "@/lib/errors";

jest.mock("@/services/auth");
jest.mock("@/services/authorization");

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockAuthorizationService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("authHelpers", () => {
  const mockUser = {
    id: "user-123",
    email: "user@example.com",
    name: "Test User",
    emailVerified: true,
    image: null,
    headline: null,
    bio: null,
    avatarUrl: null,
    website: null,
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("requireAuth", () => {
    it("returns session when user is authenticated", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);

      const session = await requireAuth();

      expect(session).toEqual(mockSession);
      expect(mockAuthService.getCurrentSession).toHaveBeenCalledTimes(1);
    });

    it("throws AuthenticationError when user is not authenticated", async () => {
      mockAuthService.getCurrentSession.mockRejectedValue(
        new AuthenticationError("Authentication required"),
      );

      await expect(requireAuth()).rejects.toThrow(AuthenticationError);
    });
  });

  describe("requireRole", () => {
    it("returns session when user has the specified role", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthorizationService.requireRole.mockResolvedValue(undefined);

      const session = await requireRole("instructor");

      expect(session).toEqual(mockSession);
      expect(mockAuthorizationService.requireRole).toHaveBeenCalledWith(
        "user-123",
        "instructor",
      );
    });

    it("throws AuthorizationError when user lacks the required role", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthorizationService.requireRole.mockRejectedValue(
        new AuthorizationError("Missing required role: instructor"),
      );

      await expect(requireRole("instructor")).rejects.toThrow(
        AuthorizationError,
      );
      expect(mockAuthorizationService.requireRole).toHaveBeenCalledWith(
        "user-123",
        "instructor",
      );
    });

    it("throws AuthenticationError when user is unauthenticated", async () => {
      mockAuthService.getCurrentSession.mockRejectedValue(
        new AuthenticationError("Authentication required"),
      );

      await expect(requireRole("instructor")).rejects.toThrow(
        AuthenticationError,
      );
      expect(mockAuthorizationService.requireRole).not.toHaveBeenCalled();
    });
  });

  describe("getCurrentUser", () => {
    it("returns user object when session exists", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);

      const user = await getCurrentUser();

      expect(user).toEqual(mockUser);
    });

    it("returns null when session retrieval fails or user is unauthenticated", async () => {
      mockAuthService.getCurrentSession.mockRejectedValue(
        new AuthenticationError("No session"),
      );

      const user = await getCurrentUser();

      expect(user).toBeNull();
    });
  });
});
