import express from "express";
import {
    deleteUser,
    getUser,
    login,
    logout,
    register
} from "../controllers/auth.controller";
import authenticate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import {
    authDeleteSchema,
    authLoginSchema,
    authRegisterSchema
} from "../schemas/auth.schema";
import passport from "../config/passport";

const authRouter = express.Router();

authRouter.post("/register", validate(authRegisterSchema), register);
authRouter.post(
    "/login",
    validate(authLoginSchema),
    passport.authenticate("local"),
    login
);
authRouter.post("/logout", logout);
authRouter.get("/user", authenticate, getUser);
authRouter.delete("/delete", validate(authDeleteSchema), deleteUser);

export default authRouter;
