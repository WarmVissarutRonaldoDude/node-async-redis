require("dotenv").config();

const redis = require("redis");
const commands = require("redis-commands");
const { promisify } = require("util");

const promisifyRedis = client => {
  const promisifyClient = client;
  const { list: commandList } = commands;
  commandList.forEach(command => {
    promisifyClient[`${command}Async`] = promisify(
      promisifyClient[command]
    ).bind(promisifyClient);
  });
  return promisifyClient;
};

const getRedisClient = (
  options = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
) => promisifyRedis(redis.createClient(options));

const redisClient = getRedisClient();

module.exports = {
  redisClient,
  getRedisClient
};
