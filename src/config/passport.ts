import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import db from "../db/db";
import { type User } from "../user/user.model";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});

passport.use(
  new LocalStrategy.Strategy(
    async (username: string, password: string, done: any) => {
      const user: User = await db("users")
        .select("*")
        .where({ username })
        .first();

      if (!user) {
        return done(null, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, {
          message: "Wrong username or password"
        });
      }

      const { password: pw, ...userDTO } = user;

      return done(null, userDTO);
    }
  )
);

export default passport;
