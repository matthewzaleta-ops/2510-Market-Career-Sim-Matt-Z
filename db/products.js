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
