import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("books", (table) => {
    table.increments("id");
    table.uuid("bookId").notNullable().unique();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("description");
    table.unique(["title", "author"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("books");
}
