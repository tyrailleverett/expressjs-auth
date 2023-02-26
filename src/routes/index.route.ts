import express, { type Request, type Response } from "express";
import authRouter from "./auth.route";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/healthcheck", (req: Request, res: Response) => {
    res.status(200).end();
});

export default indexRouter;
