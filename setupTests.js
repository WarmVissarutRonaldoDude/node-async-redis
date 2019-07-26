process.env.REDIS_HOST = "127.0.0.1";
process.env.REDIS_PORT = "6379";

// Mock Redis
const redis = require("redis");
const commands = require("redis-commands");

jest.spyOn(redis, "createClient").mockImplementation(options => {
  const mockClient = {
    options
  };
  const { list: commandList } = commands;
  commandList.forEach(command => {
    mockClient[command] = jest.fn();
  });
  return mockClient;
});
