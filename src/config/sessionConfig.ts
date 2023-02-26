import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const inProd = process.env.NODE_ENV === "production";

const RedisStore = connectRedis(session);
const redisClient = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true
});

redisClient.on("connect", () => {
  console.log("Connected to redis successfully");
});

redisClient.connect().catch(console.error);

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
