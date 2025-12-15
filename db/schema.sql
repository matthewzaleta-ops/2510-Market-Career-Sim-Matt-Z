DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
id UUID PRIMARY KEY,
username text UNIQUE NOT NULL,
password text NOT NULL
);

CREATE TABLE orders(
id UUID PRIMARY KEY,
date DATE NOT NULL,
note VARCHAR(100),
user_id UUID REFERENCES users(id) NOT NULL
);

CREATE TABLE products(
id UUID PRIMARY KEY,
title VARCHAR(100) NOT NULL,
description VARCHAR(100) NOT NULL,
price DECIMAL NOT NULL
);

CREATE TABLE orders_products(
order_id UUID REFERENCES orders(id) NOT NULL,
product_id UUID REFERENCES products(id) NOT NULL,
quantity INTEGER NOT NULL,
CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
);
