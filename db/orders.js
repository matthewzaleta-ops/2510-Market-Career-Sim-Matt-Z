import db from "./client.js";
import { v4 as uuidv4 } from "uuid";

export async function createOrder(date, note, userId) {
  const SQL = `
  INSERT INTO orders
    (date, note, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);
  return order;
}
