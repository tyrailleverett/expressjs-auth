import { prisma } from "../db/prisma";

beforeAll(async () => {
    await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY;`;
    await prisma.user.createMany({
        data: [
            { username: "user1", password: "password1" },
            { username: "user2", password: "password2" },
            { username: "user3", password: "password3" }
        ]
    });
});

afterAll(async () => {
    await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY;`;
});
