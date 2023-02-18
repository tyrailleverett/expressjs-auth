import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const isTesting = process.env.NODE_ENV === "testing";

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        ...(!isTesting && { log: ["query"] })
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
