CREATE TABLE IF NOT EXISTS user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS order (
  id SERIAL PRIMARY KEY,
  ts TIMESTAMP,
  from_curr VARCHAR(255),
  from_amt DECIMAL(19, 4),
  to_curr VARCHAR(255),
  to_amt DECIMAL(19, 4),
  user_id INT REFERENCES user(id)
);