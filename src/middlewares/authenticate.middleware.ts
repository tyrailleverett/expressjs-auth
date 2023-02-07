import { type NextFunction, type Response } from "express";

const authenicate = (
    req: any,
    res: Response,
    next: NextFunction
): Response | undefined => {
    if (req.isUnauthenticated()) {
        return res.status(401).end();
    }
    next();
};

export default authenicate;
