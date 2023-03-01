import pgSession from "connect-pg-simple";
import session from "express-session";

const inProd = process.env.NODE_ENV === "production";
const PGStore = pgSession(session);

const sessionConfig: any = {
  store: new PGStore({ createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: `${inProd ? "true" : "auto"}`,
    httpOnly: true,
    sameSite: `${inProd ? "none" : "lax"}`
  }
};

export default sessionConfig;
