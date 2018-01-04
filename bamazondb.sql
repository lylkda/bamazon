DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price INTEGER(11) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES
("Mintendo Tii U", "Electronics", 140, 22),
("Dream Theater", "Book", 8, 15),
("Adjustable Wrench", "Tools", 16, 20),
("YBOX One", "Electronics", 199, 75),
("55in SMART OLED HDTV", "Electronics", 1399, 67),
("BEGO CLASSIC XL CREATIVE BOX", "Toys", 48, 43),
("20W WIRELESS BLUETOOTH 4.0 SPEAKER", "Electronics", 20, 90),
("FIRE ARMS WARRIORS", "Toys", 29, 28),
("BACK-UPS 3-OUTLET UPS", "Electronics", 20, 38),
("Jackson BS Electric Guitar", "Instruments", 150, 27);

SELECT * FROM products;
