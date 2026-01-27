-- User table schema
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO users (username, email) VALUES
  ('johndoe', 'john@example.com'),
  ('janedoe', 'jane@example.com'),
  ('bobsmith', 'bob@example.com');
