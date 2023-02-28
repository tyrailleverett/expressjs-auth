import connectRedis from "connect-redis";
import session from "express-session";
import redisClient from "./redis";

const inProd = process.env.NODE_ENV === "production";
const RedisStore = connectRedis(session);

const sessionConfig: any = {
  store: new RedisStore({ client: redisClient as any }),
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
