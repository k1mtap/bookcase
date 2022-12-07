import { Book } from "@bookcase/book";

export type CreateBookInput = Omit<Book, "bookId">;
export interface IManageBooks {
  getAll(): Promise<Book[]>;
  create(input: CreateBookInput): Promise<Book>;
  update(book: Book): Promise<void>;
  delete(book: Book): Promise<void>;
}
