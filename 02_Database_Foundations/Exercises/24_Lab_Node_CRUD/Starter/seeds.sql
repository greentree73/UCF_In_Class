-- ============================================
-- Seed Data for Users and Orders Tables
-- ============================================
-- This file populates the database with sample data
-- Run this file with: psql -U postgres -d node_pg_demo -f seeds.sql

-- ============================================
-- Insert Users
-- ============================================
-- Insert 10 sample users into the users table
INSERT INTO users (name, email, created_at) VALUES
  ('Alice Johnson', 'alice@example.com', '2025-01-01 10:00:00'),
  ('Bob Smith', 'bob@example.com', '2025-01-02 11:30:00'),
  ('Charlie Brown', 'charlie@example.com', '2025-01-03 09:15:00'),
  ('Diana Prince', 'diana@example.com', '2025-01-04 14:20:00'),
  ('Eve Martinez', 'eve@example.com', '2025-01-05 16:45:00'),
  ('Frank Ocean', 'frank@example.com', '2025-01-06 08:30:00'),
  ('Grace Lee', 'grace@example.com', '2025-01-07 12:00:00'),
  ('Henry Ford', 'henry@example.com', '2025-01-08 13:25:00'),
  ('Iris West', 'iris@example.com', '2025-01-09 15:40:00'),
  ('Jack Ryan', 'jack@example.com', '2025-01-10 10:10:00');

-- ============================================
-- Insert Orders
-- ============================================
-- Insert 15 sample orders for the users
-- Note: user_id references the id from the users table
-- Some users have multiple orders, some have none (to demonstrate different JOIN scenarios)

INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
  -- Alice's orders (user_id: 1)
  (1, 'Laptop', 999.99, '2025-01-15'),
  (1, 'Wireless Mouse', 29.99, '2025-01-16'),
  
  -- Bob's orders (user_id: 2)
  (2, 'Mechanical Keyboard', 149.99, '2025-01-14'),
  (2, 'USB-C Hub', 49.99, '2025-01-18'),
  (2, 'Monitor', 299.99, '2025-01-20'),
  
  -- Charlie's order (user_id: 3)
  (3, 'Headphones', 199.99, '2025-01-12'),
  
  -- Diana's orders (user_id: 4)
  (4, 'Webcam', 89.99, '2025-01-17'),
  (4, 'Desk Lamp', 34.99, '2025-01-19'),
  
  -- Eve's order (user_id: 5)
  (5, 'Office Chair', 299.99, '2025-01-13'),
  
  -- Grace's orders (user_id: 7)
  (7, 'Standing Desk', 449.99, '2025-01-11'),
  (7, 'Cable Management Kit', 24.99, '2025-01-21'),
  
  -- Henry's order (user_id: 8)
  (8, 'Tablet', 499.99, '2025-01-16'),
  
  -- Iris's orders (user_id: 9)
  (9, 'Smartphone', 799.99, '2025-01-14'),
  (9, 'Phone Case', 19.99, '2025-01-15');

-- Note: Frank (user_id: 6) and Jack (user_id: 10) have no orders
-- This allows students to see the difference between INNER JOIN and LEFT JOIN

-- ============================================
-- Verification Queries
-- ============================================
-- Display the data to verify insertion
SELECT 'Users Count:' as info, COUNT(*) as count FROM users;
SELECT 'Orders Count:' as info, COUNT(*) as count FROM orders;

-- Show all users
SELECT * FROM users ORDER BY id;

-- Show all orders
SELECT * FROM orders ORDER BY user_id, order_date;

--show all user orders
select u.name AS user_name, u.email AS user_email, o.product_name, o.amount, o.order_date from users u inner join orders o on u.id = o.user_id order by name, order_date;
