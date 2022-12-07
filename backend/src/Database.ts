import knex, { Knex } from "knex";

export class Database {
  private config: Knex.Config<any>;
  private knex?: Knex<any, unknown[]>;

  constructor(config: Knex.Config) {
    this.config = config;
  }

  async init() {
    this.knex = knex(this.config);
    await this.knex.migrate.latest();
    await this.knex.seed.run();
  }

  async close() {
    this.knex?.destroy();
  }

  getBuilder(): Knex {
    if (!this.knex) {
      throw new Error("not connected");
    }

    return this.knex;
  }
}
