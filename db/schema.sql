DROP TABLE IF EXISTS tasks;
-- DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(50) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(6) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task varchar(100) CHECK (task != ''),
  note text,
  priority INTEGER DEFAULT 4,
  due timestamp default CURRENT_TIMESTAMP,
  created_at timestamp NOT NULL default CURRENT_TIMESTAMP,
  completed boolean NOT NULL default false,
  user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag varchar(50),
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE
);
