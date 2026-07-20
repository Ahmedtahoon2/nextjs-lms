import { prisma } from "@/lib/db";
import type { User } from "@prisma/client";

export const userRepository = {
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data: { email: string; name?: string }): Promise<User> {
    return prisma.user.create({ data });
  },

  async update(
    id: number,
    data: { email?: string; name?: string },
  ): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  },

  async list(options?: { skip?: number; take?: number }): Promise<User[]> {
    return prisma.user.findMany({
      skip: options?.skip,
      take: options?.take,
    });
  },
};
