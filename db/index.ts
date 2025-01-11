import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Invoice, Customer, Revenue, User, InvoiceStatus } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
const db = drizzle({
  client: pool,
  schema: { Invoice, Customer, Revenue, User, InvoiceStatus },
});

export { db };
