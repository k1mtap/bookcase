import { Book } from "@bookcase/book";
import axios from "axios";
import { CreateBookInput, IManageBooks } from "./IManageBooks";

export class BookService implements IManageBooks {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async getAll(): Promise<Book[]> {
    const { data } = await axios.get<Book[]>(this.baseUrl);

    return data;
  }

  async create(input: CreateBookInput): Promise<Book> {
    const { data } = await axios.post<Book>(this.baseUrl, input);

    return data;
  }

  async update(book: Book): Promise<void> {
    await axios.put<Book>(`${this.baseUrl}/${book.bookId}`, book);
  }

  async delete(book: Book): Promise<void> {
    await axios.delete<Book>(`${this.baseUrl}/${book.bookId}`, { data: book });
  }
}
