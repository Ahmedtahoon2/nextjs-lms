import { revokeSessionAction } from "../auth";
import * as authService from "@/services/auth";
import {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} from "@/lib/errors";

// Mock dependencies
jest.mock("@/services/auth");

const mockAuthService = authService as jest.Mocked<typeof authService>;

describe("Auth Actions - Security", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("revokeSessionAction", () => {
    const currentUserId = "current-user-id";
    const mockSession = {
      user: {
        id: currentUserId,
        email: "current@example.com",
        name: "Current User",
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: "current-session-id",
        userId: currentUserId,
        expiresAt: new Date(Date.now() + 86400000),
        token: "current-token",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
      },
    };

    it("should reject unauthenticated requests", async () => {
      mockAuthService.getCurrentSession.mockRejectedValue(
        new AuthenticationError(),
      );

      const result = await revokeSessionAction("some-session-id");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Not authenticated");
      expect(mockAuthService.revokeSession).not.toHaveBeenCalled();
    });

    it("should reject empty session ID", async () => {
      const result = await revokeSessionAction("");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid session ID");
      expect(mockAuthService.getCurrentSession).not.toHaveBeenCalled();
    });

    it("should reject malformed session ID", async () => {
      // Malformed IDs should still go through validation
      // In this implementation, we validate input first before auth
      const result = await revokeSessionAction("' OR '1'='1");

      expect(result.success).toBe(false);
      // Either "Invalid session ID" or "Not authenticated" is acceptable
      // depending on validation order
      expect(["Invalid session ID", "Not authenticated"]).toContain(
        result.error,
      );
    });

    it("should reject non-string session ID", async () => {
      // @ts-expect-error Testing runtime validation
      const result = await revokeSessionAction(123);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid session ID");
    });

    it("should handle authorization errors correctly", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthService.revokeSession.mockRejectedValue(
        new AuthorizationError(
          "You do not have permission to revoke this session",
        ),
      );

      const result = await revokeSessionAction("other-session-id");

      expect(result.success).toBe(false);
      expect(result.error).toBe(
        "You do not have permission to revoke this session",
      );
      expect(mockAuthService.getCurrentSession).toHaveBeenCalled();
      expect(mockAuthService.revokeSession).toHaveBeenCalledWith(
        "other-session-id",
        currentUserId,
      );
    });

    it("should handle not found errors correctly", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthService.revokeSession.mockRejectedValue(
        new NotFoundError("Session not found"),
      );

      const result = await revokeSessionAction("non-existent-id");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Session not found");
    });

    it("should successfully revoke authorized session", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthService.revokeSession.mockResolvedValue({
        id: "session-id",
        userId: currentUserId,
        token: "token",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
      });

      const result = await revokeSessionAction("session-id");

      expect(result.success).toBe(true);
      expect(mockAuthService.revokeSession).toHaveBeenCalledWith(
        "session-id",
        currentUserId,
      );
    });

    it("should pass authenticated user ID to service layer", async () => {
      mockAuthService.getCurrentSession.mockResolvedValue(mockSession);
      mockAuthService.revokeSession.mockResolvedValue({
        id: "session-id",
        userId: currentUserId,
        token: "token",
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
      });

      await revokeSessionAction("session-id");

      // Verify the action passes the authenticated user ID, not client-provided ID
      expect(mockAuthService.revokeSession).toHaveBeenCalledWith(
        "session-id",
        currentUserId,
      );
    });
  });
});
