import { Pool } from "pg";
import dotenv from "dotenv";
import pgvector from "pgvector/pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", async (client) => {
  await pgvector.registerTypes(client);

  // Enable the vector extension if not already enabled
  await client.query('CREATE EXTENSION IF NOT EXISTS vector');
});

export default pool;
