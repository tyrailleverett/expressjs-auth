import knex from "knex";
import knexfile from "./knexfile";

interface KnexfileType {
  development: string;
  testing: string;
  production: string;
}

const env = process.env.NODE_ENV;

if (!env) {
  throw new Error("Please provide NODE_ENV.");
}

const db = knex(knexfile[env as keyof KnexfileType]);

export default db;
