const commands = require("redis-commands");
const redisAsyncUtils = require(".");

describe("redisUtils", () => {
  const { list: commandList } = commands;

  describe("createRedisClient", () => {
    it("default get redis client", () => {
      const client = redisAsyncUtils.createRedisClient();
      expect(client).toBeTruthy();
      expect(client.options.host).toBe(process.env.REDIS_HOST);
      expect(client.options.port).toBe(process.env.REDIS_PORT);
      commandList.forEach(command => {
        expect(typeof client[command]).toBe("function");
        expect(typeof client[`${command}Async`]).toBe("function");
      });
    });

    it("get redis client with custom options", () => {
      const options = {
        host: "192.168.0.1",
        port: "6666"
      };
      const client = redisAsyncUtils.createRedisClient(options);
      expect(client).toBeTruthy();
      Object.keys(options).forEach(option => {
        expect(client.options[option]).toEqual(options[option]);
      });
      commandList.forEach(command => {
        expect(typeof client[command]).toBe("function");
        expect(typeof client[`${command}Async`]).toBe("function");
      });
    });
  });
});
