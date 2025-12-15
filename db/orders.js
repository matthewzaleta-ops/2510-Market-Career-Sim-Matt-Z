import db from "./client.js";
import { v4 as uuidv4 } from "uuid";

export async function createOrder({ date, note, user_id }) {
  const SQL = `
  INSERT INTO orders
    (id, date, note, user_id)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *;
  `;
  const result = await db.query(SQL, [uuidv4(), date, note, user_id]);

  return result.rows[0];
}

export async function getOrdersByUserId(id) {
  const SQL = `
  SELECT *
  FROM orders
  WHERE user_id = $1
  `;
  const { rows: orders } = await db.query(SQL, [id]);
  return orders;
}

export async function getOrderById(id) {
  const SQL = `
  SELECT *
  FROM orders
  WHERE id = $1
  `;
  const {
    rows: [order],
  } = await db.query(SQL, [id]);
  return order;
}

export async function getOrdersByProductId(id) {
  const SQL = `
  SELECT orders.*
  FROM
    orders
    JOIN orders_productss ON orders.id = orderss_products.order_id
  WHERE orders_products.product_id = $1
  `;
  const { rows: orders } = await db.query(SQL, [id]);
  return orders;
}
