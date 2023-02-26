import { type NextFunction, type Request, type Response } from "express";

const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | null => {
    if (req.isUnauthenticated()) {
        return res.status(401).end();
    }
    next();
    return null;
};

export default authenticate;
