-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS testdb;

-- 데이터베이스 사용
USE testdb;

-- 테이블 생성
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 아이템 삽입
INSERT INTO items (name, description, price) VALUES
('Item 1', 'Description for item 1', 9.99),
('Item 2', 'Description for item 2', 19.99),
('Item 3', 'Description for item 3', 29.99),
('Item 4', 'Description for item 4', 39.99),
('Item 5', 'Description for item 5', 49.99);