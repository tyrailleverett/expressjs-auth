/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("avatar").notNullable();
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => knex.schema.dropTable("users");
