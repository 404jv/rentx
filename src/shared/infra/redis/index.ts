import Redis from "ioredis";
import { promisify } from "util";

const redisClient = new Redis(Number(process.env.REDIS_PORT));

async function getRedis(value: string): Promise<unknown> {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

async function setRedis(key: string, value: string): Promise<unknown> {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, getRedis, setRedis };
