import * as userRepository from "@/repositories/user";
import { AuthorizationError, NotFoundError } from "@/lib/errors";
import type { UpdateProfileInput } from "@/lib/validations/profile";

export type UserProfile = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  headline: string | null;
  bio: string | null;
  avatarUrl: string | null;
  website: string | null;
  createdAt: Date;
};

/**
 * Retrieves a user's profile details by user ID.
 * Throws NotFoundError if the user does not exist.
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    headline: user.headline,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    website: user.website,
    createdAt: user.createdAt,
  };
}

/**
 * Updates a user's profile attributes.
 * Strictly enforces self-ownership: sessionUserId must equal targetUserId.
 * Throws AuthorizationError if a user attempts to update another user's profile.
 * Throws NotFoundError if the target user does not exist.
 */
export async function updateUserProfile(
  sessionUserId: string,
  targetUserId: string,
  data: UpdateProfileInput,
): Promise<UserProfile> {
  // Enforce resource self-ownership
  if (sessionUserId !== targetUserId) {
    throw new AuthorizationError(
      "You do not have permission to modify another user's profile",
    );
  }

  const existingUser = await userRepository.findUserById(targetUserId);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  const updatedUser = await userRepository.updateUserProfile(targetUserId, {
    name: data.name,
    headline: data.headline || null,
    bio: data.bio || null,
    avatarUrl: data.avatarUrl || null,
    website: data.website || null,
  });

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
    headline: updatedUser.headline,
    bio: updatedUser.bio,
    avatarUrl: updatedUser.avatarUrl,
    website: updatedUser.website,
    createdAt: updatedUser.createdAt,
  };
}
