import * as userRepository from "@/repositories/user";
import { NotFoundError } from "@/lib/errors";

export async function getUserById(id: string) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export async function getUserByEmail(email: string) {
  return userRepository.findUserByEmail(email);
}

export async function createUser(data: { email: string; name?: string }) {
  const existing = await userRepository.findUserByEmail(data.email);

  if (existing) {
    throw new Error("Email already in use");
  }

  return userRepository.createUser(data);
}

export async function updateUser(
  id: string,
  data: { name?: string; image?: string },
) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return userRepository.updateUser(id, data);
}

export async function deleteUser(id: string) {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return userRepository.deleteUser(id);
}
