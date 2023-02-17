import pgSession from "connect-pg-simple";
import session from "express-session";

const PGStore = pgSession(session);
const inProd = process.env.NODE_ENV === "production";

const sessionConfig: any = {
    store: new PGStore({ createTableIfMissing: true }),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    secret: process.env.SECRET as string,
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
