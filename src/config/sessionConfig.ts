import pgSession from "connect-pg-simple";
import session from "express-session";

const PGStore = pgSession(session);

const sessionConfig = {
    store: new PGStore({ createTableIfMissing: true }),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    secret: process.env.SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: true,
        httpOnly: true
    }
};

export default sessionConfig;
