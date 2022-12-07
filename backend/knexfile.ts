import { resolveEnvVariable } from "@bookcase/util";
import { Knex } from "knex";

const databaseUrl = resolveEnvVariable("DATABASE_URL");

export const knexFile: Knex.Config = {
  client: "pg",
  connection: databaseUrl,
  migrations: {
    extension: "ts",
    directory: "migrations",
    tableName: "migrations_history",
  },
  seeds: {
    extension: "ts",
    directory: "seeds",
  },
};
