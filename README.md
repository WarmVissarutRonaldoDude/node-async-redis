Node Async Redis - async redis client for node.js
===========================
[![Build Status](https://travis-ci.org/WarmVissarutRonaldoDude/node-async-redis.svg?branch=master)](https://travis-ci.org/WarmVissarutRonaldoDude/node-async-redis)
[![npm](https://img.shields.io/npm/v/node-async-redis.svg)](https://www.npmjs.com/package/node-async-redis)
[![Coverage Status](https://coveralls.io/repos/github/WarmVissarutRonaldoDude/node-async-redis/badge.svg?branch=master)](https://coveralls.io/github/WarmVissarutRonaldoDude/node-async-redis?branch=master)

## How to install

```
yarn add node-async-redis
```
or
```
npm install node-async-redis
```

## How to use

### createRedisClient

Create redis client which expose all available redis command with async prefix.

Example:
```js
const redisClient = createRedisClient();
await redisClient.setAsync("string key", "string value");
```

Original functions still exist.

Example:
```js
redisClient.set("string key", "string value");
```

See all commands here : https://github.com/NodeRedis/redis-commands

#### Create async redis client with default config

Client will automatically created with default config and read connection config from `process.env`

```
process.env.REDIS_HOST=127.0.0.1
process.env.REDIS_PORT=6379
```

```js
const { createRedisClient } = require('node-async-redis');

const redisClient = createRedisClient();
redisClient.on("error", (error) => {
    console.log("Error : ", error);
})

const asyncFunction = async () => {
    await redisClient.setAsync("string key", "string value");
    const value = await redisClient.getAsync("string key");
    ...
}
```

#### Create async redis client with custom config

For available configuration please take a look here : https://github.com/NodeRedis/node_redis

```js
const { createRedisClient } = require('node-async-redis');
const redisClient = createRedisClient({
   host: "127.0.0.1"
   port: "6379",
   enable_offline_queue: false
});

redisClient.on("error", (error) => {
    console.log("Error : ", error);
})

const asyncFunction = async () => {
    await redisClient.setAsync("string key", "string value");
    const value = await redisClient.getAsync("string key");
    ...
}
```

### redis

Expose original redis module from : https://github.com/NodeRedis/node_redis

```js
const { redis } = require('node-async-redis');
const originalRedisClient = redis.createClient();
```
