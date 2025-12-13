import db from "./client.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 5);

  const SQL = `
INSERT INTO users(id, username, password)
VALUES ($1, $2, $3)
RETURNING id, username;

`;
  const result = await db.query(SQL, [uuidv4(), username, hashedPassword]);
  return result.rows[0];
}
