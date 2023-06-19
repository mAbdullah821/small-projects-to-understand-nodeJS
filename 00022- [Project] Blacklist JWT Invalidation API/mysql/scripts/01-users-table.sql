USE nodeAppDB

CREATE TABLE IF NOT EXISTS users(
  id int auto_increment,
  username varchar(50) not null,
  rule varchar(50) not null default 'user',
  constraint PK_users primary key (id),
  constraint Unique_username unique (username)
);