import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaSchemaVersion?: string;
};

// Prisma clients can survive module reloads during Next.js development. Rebuild
// the singleton when generated schema changes so its model inputs stay current.
const prismaSchemaVersion = "public-rates-message-role-v1";
const cachedPrisma = globalForPrisma.prisma;
export const prisma = cachedPrisma &&
  globalForPrisma.prismaSchemaVersion === prismaSchemaVersion
  ? cachedPrisma
  : new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaSchemaVersion = prismaSchemaVersion;
}
