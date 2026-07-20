import { userRepository } from "@/repositories/user";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1).optional(),
});

const updateUserSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(1).optional(),
});

export const userService = {
  async getById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async getByEmail(email: string) {
    return userRepository.findByEmail(email);
  },

  async create(data: z.infer<typeof createUserSchema>) {
    const validated = createUserSchema.parse(data);

    const existing = await userRepository.findByEmail(validated.email);
    if (existing) {
      throw new Error("Email already in use");
    }

    return userRepository.create(validated);
  },

  async update(id: number, data: z.infer<typeof updateUserSchema>) {
    const validated = updateUserSchema.parse(data);

    const existing = await userRepository.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    return userRepository.update(id, validated);
  },

  async delete(id: number) {
    const existing = await userRepository.findById(id);
    if (!existing) {
      throw new Error("User not found");
    }

    return userRepository.delete(id);
  },

  async list(options?: { skip?: number; take?: number }) {
    return userRepository.list(options);
  },
};
