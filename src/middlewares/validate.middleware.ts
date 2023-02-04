import { type NextFunction, type Request, type Response } from "express";
import { type ZodSchema } from "zod";

const validate =
    (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            });
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    };

export default validate;
