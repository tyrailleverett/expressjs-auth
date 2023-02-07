import { type Request, type Response } from "express";
import { registerUser } from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response
): Promise<Response | undefined> => {
    try {
        const { username, password } = req.body;
        await registerUser(username, password);
        return res.status(200).end();
    } catch (err) {
        console.log(err);
    }
};

export const login = (req: Request, res: Response): Response => {
    return res.status(200).end();
};

export const logout = (req: Request, res: Response): Response => {
    req.logout((err) => {
        if (err) throw err;
    });
    return res.status(200).end();
};
