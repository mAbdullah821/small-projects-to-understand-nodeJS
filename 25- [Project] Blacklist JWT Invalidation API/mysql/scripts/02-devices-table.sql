USE nodeAppDB

CREATE TABLE IF NOT EXISTS devices(
  id int auto_increment,
  name varchar(50) not null,
  userId int,
  tokenExp int unsigned,
  constraint Unique_user_device unique(userId, name),
  constraint PK_devices primary key (id),
  constraint FK_users foreign key (userId) references users(id)
);