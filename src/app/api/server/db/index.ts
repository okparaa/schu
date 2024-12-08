import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./tables";
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema, logger: false });
