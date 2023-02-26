import express from "express";
import passport from "../config/passport";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import {
  deleteUser,
  getUser,
  login,
  logout,
  register
} from "./user.controller";
import {
  authDeleteSchema,
  authLoginSchema,
  authRegisterSchema
} from "./user.schema";

const userRouter = express.Router();

userRouter.post("/register", validate(authRegisterSchema), register);
userRouter.post(
  "/login",
  validate(authLoginSchema),
  passport.authenticate("local"),
  login
);
userRouter.post("/logout", logout);
userRouter.get("/user", authenticate, getUser);
userRouter.delete("/delete", validate(authDeleteSchema), deleteUser);

export default userRouter;
