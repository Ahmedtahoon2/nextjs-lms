import * as authService from "../auth";
import * as sessionRepository from "@/repositories/session";
import * as authorizationService from "@/services/authorization";
import {
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";

jest.mock("@/repositories/session");
jest.mock("@/services/authorization");
jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: jest.fn(),
      signInEmail: jest.fn(),
      signUpEmail: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

const mockSessionRepository = sessionRepository as jest.Mocked<
  typeof sessionRepository
>;
const mockAuthorizationService = authorizationService as jest.Mocked<
  typeof authorizationService
>;

describe("Auth Service - Session Authorization", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("revokeSession", () => {
    const userAId = "user-a-id";
    const userBId = "user-b-id";
    const sessionAId = "session-a-id";
    const sessionBId = "session-b-id";

    it("should allow user to revoke their own session", async () => {
      // User A trying to revoke their own session
      mockSessionRepository.findSessionById.mockResolvedValue({
        id: sessionAId,
        userId: userAId,
        token: "token-a",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        user: {
          id: userAId,
          email: "usera@example.com",
          name: "User A",
          emailVerified: false,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      mockSessionRepository.deleteSession.mockResolvedValue({
        id: sessionAId,
        userId: userAId,
        token: "token-a",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
      });

      await authService.revokeSession(sessionAId, userAId);

      expect(mockSessionRepository.findSessionById).toHaveBeenCalledWith(
        sessionAId,
      );
      expect(mockSessionRepository.deleteSession).toHaveBeenCalledWith(
        sessionAId,
      );
    });

    it("should DENY user from revoking another user's session without permission", async () => {
      // User A trying to revoke User B's session
      mockSessionRepository.findSessionById.mockResolvedValue({
        id: sessionBId,
        userId: userBId,
        token: "token-b",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        user: {
          id: userBId,
          email: "userb@example.com",
          name: "User B",
          emailVerified: false,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      mockAuthorizationService.hasPermission.mockResolvedValue(false);

      await expect(
        authService.revokeSession(sessionBId, userAId),
      ).rejects.toThrow(AuthorizationError);

      expect(mockSessionRepository.findSessionById).toHaveBeenCalledWith(
        sessionBId,
      );
      expect(mockAuthorizationService.hasPermission).toHaveBeenCalledWith(
        userAId,
        "sessions:revoke:any",
      );
      expect(mockSessionRepository.deleteSession).not.toHaveBeenCalled();
    });

    it("should allow admin to revoke another user's session with explicit permission", async () => {
      const adminId = "admin-user-id";

      // Admin trying to revoke User B's session
      mockSessionRepository.findSessionById.mockResolvedValue({
        id: sessionBId,
        userId: userBId,
        token: "token-b",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        user: {
          id: userBId,
          email: "userb@example.com",
          name: "User B",
          emailVerified: false,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      mockAuthorizationService.hasPermission.mockResolvedValue(true);

      mockSessionRepository.deleteSession.mockResolvedValue({
        id: sessionBId,
        userId: userBId,
        token: "token-b",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
      });

      await authService.revokeSession(sessionBId, adminId);

      expect(mockSessionRepository.findSessionById).toHaveBeenCalledWith(
        sessionBId,
      );
      expect(mockAuthorizationService.hasPermission).toHaveBeenCalledWith(
        adminId,
        "sessions:revoke:any",
      );
      expect(mockSessionRepository.deleteSession).toHaveBeenCalledWith(
        sessionBId,
      );
    });

    it("should throw NotFoundError for non-existent session", async () => {
      mockSessionRepository.findSessionById.mockResolvedValue(null);

      await expect(
        authService.revokeSession("non-existent-id", userAId),
      ).rejects.toThrow(NotFoundError);

      expect(mockSessionRepository.deleteSession).not.toHaveBeenCalled();
    });

    it("should reject malformed session IDs", async () => {
      mockSessionRepository.findSessionById.mockResolvedValue(null);

      await expect(authService.revokeSession("", userAId)).rejects.toThrow(
        NotFoundError,
      );

      await expect(
        authService.revokeSession("' OR '1'='1", userAId),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
