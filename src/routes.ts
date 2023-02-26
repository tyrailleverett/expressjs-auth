import express, { type Request, type Response } from "express";
import userRouter from "./user/user.route";

const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/healthcheck", (req: Request, res: Response) => {
  res.status(200).end();
});

export default indexRouter;
