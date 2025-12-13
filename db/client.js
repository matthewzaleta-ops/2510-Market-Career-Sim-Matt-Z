import pg from "pg";
const db = new pg.Client(
  process.env.DATABASE_URL || "postgresql://matth:Athenee123@localhost/market"
);
export default db;
