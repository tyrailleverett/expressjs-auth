import { number, object, string } from "zod";

export const authRegisterSchema = object({
  body: object({
    username: string().min(3),
    password: string().min(8),
    avatar: string().min(1)
  })
});

export const authLoginSchema = object({
  body: object({
    username: string(),
    password: string()
  })
});

export const authDeleteSchema = object({
  body: object({ id: number().positive() })
});
