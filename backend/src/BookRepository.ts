import { Book } from "@bookcase/book";
import { Repository } from "./Repository";
import { v4 as uuidV4 } from "uuid";
import { Database } from "./Database";

export class BookRepository implements Repository<Book> {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Book[]> {
    const books = await this.database.getBuilder()<Book>("books");

    return books;
  }

  async create(input: Omit<Book, "bookId">): Promise<Book> {
    const newBook: Book = {
      bookId: uuidV4(),
      ...input,
    };
    await this.database
      .getBuilder()("books")
      .insert(newBook)
      .onConflict(["title", "author"])
      .ignore();

    return newBook;
  }

  async update(entity: Book): Promise<void> {
    await this.database
      .getBuilder()("books")
      .where({ bookId: entity.bookId })
      .update(entity);
  }

  async delete(entityId: string): Promise<void> {
    await this.database.getBuilder()("books").where({ bookId: entityId }).del();
  }
}
