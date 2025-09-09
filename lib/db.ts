import postgres from "postgres";

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error("POSTGRES_URL is not set");
}

const sql = postgres(databaseUrl, {
  prepare: false,
  ssl: process.env.NODE_ENV === "production",
});

export default sql;
