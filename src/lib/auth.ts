import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Guarantee default "student" role for newly registered users
          const studentRole = await prisma.role.findUnique({
            where: { name: "student" },
          });
          if (studentRole) {
            await prisma.userRole.upsert({
              where: {
                userId_roleId: {
                  userId: user.id,
                  roleId: studentRole.id,
                },
              },
              update: {},
              create: {
                userId: user.id,
                roleId: studentRole.id,
              },
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
});

export type Session = typeof auth.$Infer.Session;
