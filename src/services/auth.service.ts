import bcrypt from "bcrypt";
import prisma from "../db/prisma";
import type { UserReturnDTO } from "../models/user";

export const registerUser = async (
    username: string,
    password: string
): Promise<UserReturnDTO> => {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        },
        select: {
            id: true,
            username: true
        }
    });
    if (!registeredUser) {
        throw new Error("Unable to register User");
    }

    return registeredUser;
};

export const removeUser = async (id: number): Promise<void> => {
    try {
        await prisma.user.delete({
            where: { id }
        });
    } catch (err) {
        throw new Error("Unable to delete user");
    }
};
