import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const adapter = connectionString
  ? new PrismaNeon({ connectionString })
  : undefined;
const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

export async function seedLmsRolesAndPermissions() {
  const permissions = [
    {
      name: "roles:assign",
      description: "Assign and manage user roles",
      resource: "role",
      action: "assign",
    },
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: perm,
    });
  }

  const roles = [
    {
      name: "student",
      description: "Student persona enrolled in courses",
      permissions: [],
    },
    {
      name: "instructor",
      description: "Instructor persona who creates and manages courses",
      permissions: [],
    },
    {
      name: "admin",
      description: "Platform administrator with full role management authority",
      permissions: ["roles:assign"],
    },
  ];

  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: { name: r.name, description: r.description },
    });

    for (const permName of r.permissions) {
      const perm = await prisma.permission.findUnique({
        where: { name: permName },
      });
      if (perm) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: perm.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: perm.id,
          },
        });
      }
    }
  }
}

async function main() {
  console.log("Seeding LMS roles and permissions...");
  await seedLmsRolesAndPermissions();
  console.log("Seeding completed successfully.");
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error("Seeding error:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
