import express from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/auth.controller";
import authenicate from "../middlewares/authenticate.middleware";
import validate from "../middlewares/validate.middleware";
import { authLoginSchema, authRegisterSchema } from "../schemas/auth.schema";
import tc from "../utils/tryCatch";
const authRouter = express.Router();

authRouter.post("/register", validate(authRegisterSchema), tc(register));
authRouter.post(
    "/login",
    validate(authLoginSchema),
    passport.authenticate("local"),
    login
);
authRouter.post("/logout", logout);
authRouter.get("/me", authenicate, (req, res) => {
    console.log(req.isAuthenticated());
    res.end();
});

export default authRouter;
