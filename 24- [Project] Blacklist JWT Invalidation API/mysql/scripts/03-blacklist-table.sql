USE nodeAppDB

CREATE TABLE IF NOT EXISTS blacklist(
  userId int,
  deviceId int,
  blacklistedAt int,
  tokenExp int unsigned,
  constraint PK_blacklist primary key(userId, deviceId)
);