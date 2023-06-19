USE understand_nodejs_database;

CREATE TABLE courses(
	id int not null auto_increment,
  name varchar(50),
  constraint PKC_courses primary key(id)
);

CREATE TABLE users(
	id int not null auto_increment,
  name varchar(50),
  age int,
  course_id int,
  constraint PKC_users primary key(id),
  constraint FKC_courses foreign key(course_id) references courses(id)
);