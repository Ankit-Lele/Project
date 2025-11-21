CREATE DATABASE product_system;

USE product_system;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  unique_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url TEXT,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  unique_id CHAR(36) NOT NULL,
  category_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT INTO categories (name, unique_id) VALUES
('Electronics', '550e8400-e29b-41d4-a716-446655440000'),
('Mobiles', '550e8400-e29b-41d4-a716-446655440001'),
('Laptops', '550e8400-e29b-41d4-a716-446655440002'),
('Fashion', '550e8400-e29b-41d4-a716-446655440003'),
('Home Appliances', '550e8400-e29b-41d4-a716-446655440004'),
('Furniture', '550e8400-e29b-41d4-a716-446655440005'),
('Sports', '550e8400-e29b-41d4-a716-446655440006'),
('Toys', '550e8400-e29b-41d4-a716-446655440007'),
('Books', '550e8400-e29b-41d4-a716-446655440008'),
('Beauty', '550e8400-e29b-41d4-a716-446655440009');

INSERT INTO users (email, password) VALUES
('john@example.com', 'pass123'),
('emma@example.com', 'pass123'),
('mike@example.com', 'pass123'),
('sara@example.com', 'pass123'),
('alex@example.com', 'pass123'),
('lisa@example.com', 'pass123'),
('david@example.com', 'pass123'),
('sophia@example.com', 'pass123'),
('ryan@example.com', 'pass123'),
('olivia@example.com', 'pass123');

SELECT id, name FROM categories;
describe categories;
INSERT INTO products (name, image_url, price, unique_id, category_id, created_at, updated_at) VALUES
('Product 1', 'http://localhost:5500/uploads/product1.jpg', 100.00, '660e8400-e29b-41d4-a716-446655440000', 1, NOW(), NOW()),
('Product 2', 'http://localhost:5500/uploads/product2.jpg', 200.00, '660e8400-e29b-41d4-a716-446655440001', 2, NOW(), NOW()),
('Product 3', 'http://localhost:5500/uploads/product3.jpg', 300.00, '660e8400-e29b-41d4-a716-446655440002', 3, NOW(), NOW()),
('Product 4', 'http://localhost:5500/uploads/product4.jpg', 400.00, '660e8400-e29b-41d4-a716-446655440003', 4, NOW(), NOW()),
('Product 5', 'http://localhost:5500/uploads/product5.jpg', 500.00, '660e8400-e29b-41d4-a716-446655440004', 5, NOW(), NOW()),
('Product 6', 'http://localhost:5500/uploads/product6.jpg', 600.00, '660e8400-e29b-41d4-a716-446655440005', 6, NOW(), NOW()),
('Product 7', 'http://localhost:5500/uploads/product7.jpg', 700.00, '660e8400-e29b-41d4-a716-446655440006', 7, NOW(), NOW()),
('Product 8', 'http://localhost:5500/uploads/product8.jpg', 800.00, '660e8400-e29b-41d4-a716-446655440007', 8, NOW(), NOW()),
('Product 9', 'http://localhost:5500/uploads/product9.jpg', 900.00, '660e8400-e29b-41d4-a716-446655440008', 9, NOW(), NOW()),
('Product 10', 'http://localhost:5500/uploads/product10.jpg', 1000.00, '660e8400-e29b-41d4-a716-446655440009', 10, NOW(), NOW());

UPDATE products
SET image_url = 'http://localhost:5500/uploads/productx.jpg';

select * FROM PRODUCTS;
