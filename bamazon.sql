DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales INTEGER NOT NULL DEFAULT 0
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "produce", 10, 10),
("Pear", "produce", 10, 10),
("Peach", "produce", 10, 10),
("Watermelon", "produce", 10, 10),
("Grape", "produce", 10, 10),
("Laptop", "electronics", 1000, 10),
("Desktop", "electronics", 1000, 10),
("Smartphone", "electronics", 1000, 10),
("Television", "electronics", 1000, 10),
("Smartwatch", "electronics", 1000, 10);

CREATE TABLE departments (
    department_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER NOT NULL
   );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("produce", 10000),
("electronics", 100000);