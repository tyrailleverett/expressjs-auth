import bcrypt from "bcrypt";
import db from "../db/db";
import type { UserReturnDTO } from "./user.model";

export const registerUser = async (
  username: string,
  password: string,
  avatar: string
): Promise<UserReturnDTO> => {
  const existingUser = await db("users").select("*").where({ username });

  if (existingUser.length) throw new Error("Username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const [registeredUser] = await db("users")
    .insert({
      username,
      password: hashedPassword,
      avatar
    })
    .returning(["id", "username", "avatar"]);

  if (!registeredUser) throw new Error("Unable to register User");

  return registeredUser;
};

export const removeUser = async (id: number): Promise<void> => {
  const deletedUser = await db("users").where({ id }).del().returning("*");

  if (!deletedUser.length) throw new Error("Unable to delete user");
};
