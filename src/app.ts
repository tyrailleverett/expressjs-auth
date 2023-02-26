import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response
} from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "./config/passport";
import sessionConfig from "./config/sessionConfig";
import indexRouter from "./routes";

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);
app.use((req: Request, res: Response) => res.sendStatus(404));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ err: err.message });
});

export default app;
