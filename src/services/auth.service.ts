import bcrypt from "bcrypt";
import { prisma } from "../db/db";
import UserAlreadyExistError from "../errors/userAlreadyExistError";
import type { User } from "../models/user";

export const registerUser = async (
    username: string,
    password: string
): Promise<User> => {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        throw new UserAlreadyExistError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registeredUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    if (!registeredUser) {
        throw new Error("Unable to register User");
    }

    return registeredUser;
};
