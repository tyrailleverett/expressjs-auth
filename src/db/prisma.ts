import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const isDev = process.env.NODE_ENV === "development";

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        ...(isDev && { log: ["query"] })
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
