import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const isDevelopment = process.env.NODE_ENV === "development";

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        ...(isDevelopment && { log: ["query"] })
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
