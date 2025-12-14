import db from "./client.js";
import { v4 as uuidv4 } from "uuid";

export async function createProduct(product) {
  const SQL = `
INSERT INTO products(id, title, description, price)
VALUES ($1, $2, $3, $4)
RETURNING *

`;
  const result = await db.query(SQL, [
    uuidv4(),
    product.title,
    product.description,
    product.price,
  ]);
  return result.rows[0];
}

export async function getProducts() {
  const SQL = `
  SELECT *
  FROM products
  `;
  const { rows: products } = await db.query(SQL);
  return products;
}

export async function getProductsByOrderId(id) {
  const SQL = `
  SELECT products.*
  FROM
    products
    JOIN orders_products ON orders_products.product_id = products.id
    JOIN orders ON orders.id = orders_products.order_id
  WHERE orders.id = $1
  `;
  const { rows: products } = await db.query(SQL, [id]);
  return products;
}
