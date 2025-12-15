import db from "#db/client";

export async function createOrderProduct({ order_id, product_id, quantity }) {
  const SQL = `
  INSERT INTO orders_products
    (order_id, product_id, quantity)
  VALUES
    ($1, $2, $3)
  RETURNING *;
  `;
  const result = await db.query(SQL, [order_id, product_id, quantity]);
  return result.rows[0];
}
