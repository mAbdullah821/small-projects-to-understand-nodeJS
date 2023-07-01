const redis = require('redis');

// Singleton Design pattern
class RedisCache {
  static #isInternalConstructing = false;
  static #redisClient = null;

  constructor() {
    if (!RedisCache.#isInternalConstructing) {
      throw new TypeError('Private Constructor is not constructable');
    }

    RedisCache.#redisClient = redis.createClient({
      socket: {
        reconnectStrategy: (retries) => {
          if (retries >= 10) {
            return new Error(
              'Too many retries on REDIS.  Connection Terminated!'
            );
          }
          return Math.min(retries * 50, 500);
        },
      },
    }); // REDIS_PORT = 6379;

    RedisCache.#redisClient.on('ready', () => console.log('Redis Connected!'));
  }

  static async getClient() {
    if (!RedisCache.#redisClient) {
      RedisCache.#isInternalConstructing = true;

      new RedisCache();

      await RedisCache.#redisClient.connect();

      RedisCache.#isInternalConstructing = false;
    }

    return RedisCache.#redisClient;
  }
}

module.exports = RedisCache;
