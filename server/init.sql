CREATE TABLE IF NOT EXISTS test_users(
   id SERIAL PRIMARY KEY,
   email TEXT UNIQUE ,
   password text,
   firstname TEXT,
   lastname TEXT,
   picture TEXT,
   bio TEXT,
   city TEXT,
   state TEXT,
   birthday TEXT,
   adventures TEXT,
   comments TEXT,
   stamp TIMESTAMP
);

INSERT INTO test_users (email, password) VALUES ('test@example.com', 'password123');

-- sample user
-- test1@gmail.com
-- Abcd1234