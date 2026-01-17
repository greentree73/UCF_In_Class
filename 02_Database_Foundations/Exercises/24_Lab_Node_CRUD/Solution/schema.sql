-- ============================================
-- Database Schema for Users and Orders
-- ============================================
-- This file creates the tables needed for the JOIN query exercise
-- Run this file with: psql -U postgres -d node_pg_demo -f schema.sql

-- Drop existing tables if they exist (cleanup)
-- CASCADE removes dependent objects (like foreign key constraints)
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- Create Users Table
-- ============================================
-- This table stores basic user information
CREATE TABLE users (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing unique identifier
  name VARCHAR(100) NOT NULL,         -- User's full name
  email VARCHAR(100) UNIQUE NOT NULL, -- Email address (must be unique)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When user was created
);

-- ============================================
-- Create Orders Table
-- ============================================
-- This table stores orders made by users
-- It has a FOREIGN KEY relationship with the users table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,                    -- Auto-incrementing unique identifier
  user_id INTEGER NOT NULL,                 -- Reference to the user who made the order
  product_name VARCHAR(200) NOT NULL,       -- Name of the product ordered
  amount DECIMAL(10, 2) NOT NULL,           -- Order amount (up to 10 digits, 2 decimal places)
  order_date DATE DEFAULT CURRENT_DATE,     -- Date the order was placed
  
  -- Foreign Key Constraint
  -- Links user_id to the id column in the users table
  -- ON DELETE CASCADE means if a user is deleted, their orders are also deleted
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create an index on user_id for faster JOIN queries
-- Indexes improve query performance when filtering or joining on this column
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Display table information
\dt
\d users
\d orders
