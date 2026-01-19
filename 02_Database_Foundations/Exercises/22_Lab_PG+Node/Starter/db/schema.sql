-- CASCADE removes dependent objects (like foreign key constraints)
DROP TABLE IF EXISTS node_pg_demo;


CREATE DATABASE node_pg_demo;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing unique identifier
  name VARCHAR(100) NOT NULL,         -- User's full name
  email VARCHAR(100) UNIQUE NOT NULL, -- Email address (must be unique)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When user was created
);