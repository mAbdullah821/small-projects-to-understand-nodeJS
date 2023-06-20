const redis = require('redis');

const redisClient = redis.createClient(); // REDIS_PORT = 6379;

redisClient.on('error', (err) => console.log('Redis Client Error:-> ', err));

redisClient.on('ready', () => console.log('Redis Connected!'));

redisClient.connect();

module.exports = redisClient;
