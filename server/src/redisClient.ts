import Redis from "ioredis";
import { logger } from "@laurenz1606/logger";

//create the redis client
export const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

//listen to the connect event
redisClient.connect(() => {
  logger("Connected to Redis instance!", "info");
});
