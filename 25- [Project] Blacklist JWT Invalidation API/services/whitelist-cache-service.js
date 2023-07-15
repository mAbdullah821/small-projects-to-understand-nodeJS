const { REDIS_TOKEN_TTL } = require('../utils/config');
const RedisClient = require('../utils/redisConnection');

// ----- Set
// O(1)
// SADD ---> s_add
// SREM ---> s_remove
// SISMEMBER ---> s_is_member
// SCARD ---> size

// O(n)
// SMEMBERS ---> s_members

//------ General
// EXPIRE ---> make_expire_After_n_seconds
// EXISTS ---> is_key_exists
const throwCacheError = () => {
  throw new Error('Internal Cache error!');
};

const addUserTokenToWhitelist = async (userId, deviceId) => {
  try {
    const redisClient = await RedisClient.getClient();
    const isUserWhitelisted = await redisClient.exists(userId);
    await redisClient.sAdd(userId, deviceId);

    if (!isUserWhitelisted) await redisClient.expire(userId, REDIS_TOKEN_TTL);
  } catch (err) {
    console.log(err);
    throwCacheError();
  }
};

const removeSingleUserTokenFromWhitelist = async (userId, deviceId) => {
  try {
    const redisClient = await RedisClient.getClient();
    await redisClient.sRem(userId, deviceId);
  } catch (err) {
    console.log(err);
    throwCacheError();
  }
};

const removeAllUserTokensFromWhitelist = async (userId) => {
  try {
    const redisClient = await RedisClient.getClient();
    await redisClient.del(userId);
  } catch (err) {
    console.log(err);
    throwCacheError();
  }
};

const removeAllUsersTokensFromWhitelist = async () => {
  try {
    const redisClient = await RedisClient.getClient();
    await redisClient.flushAll();
  } catch (err) {
    console.log(err);
    throwCacheError();
  }
};

const isWhitelistedToken = async (userId, deviceId) => {
  try {
    const redisClient = await RedisClient.getClient();
    const isWhitelisted = await redisClient.sIsMember(userId, deviceId);
    return isWhitelisted;
  } catch (err) {
    console.log(err);
    throwCacheError();
  }
};

module.exports = {
  addUserTokenToWhitelist,
  removeSingleUserTokenFromWhitelist,
  removeAllUserTokensFromWhitelist,
  removeAllUsersTokensFromWhitelist,
  isWhitelistedToken,
};
