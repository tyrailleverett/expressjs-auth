import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true
});

redisClient.on("connect", () => {
  console.log("Connected to redis successfully");
});

redisClient.on("error", (err) => {
  console.log("error", err);
});

redisClient.connect();

export default redisClient;
