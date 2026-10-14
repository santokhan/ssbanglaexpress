import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Prisma clients can survive module reloads during Next.js development. Rebuild
// a stale singleton after schema changes so newly generated model delegates exist.
const cachedPrisma = globalForPrisma.prisma;
export const prisma = cachedPrisma && "publicRate" in cachedPrisma
  ? cachedPrisma
  : new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
