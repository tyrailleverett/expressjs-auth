import { object, string } from "zod";

export const authRegisterSchema = object({
    body: object({
        username: string().min(3),
        password: string().min(8)
    })
});

export const authLoginSchema = object({
    body: object({
        username: string(),
        password: string()
    })
});
