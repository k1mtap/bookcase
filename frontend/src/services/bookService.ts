import { Book } from "@bookcase/book";
import { CreateBookInput, IManageBooks } from "./IManageBooks";
import { v4 as uuidV4 } from "uuid";

export class BookService implements IManageBooks {
  async getAll(): Promise<Book[]> {
    return books;
  }

  async create(input: CreateBookInput): Promise<Book> {
    const id = uuidV4();
    const book = {
      ...input,
      id,
    };

    return book;
  }

  async update(_book: Book): Promise<void> {}

  async delete(_book: Book): Promise<void> {}
}

const books: Book[] = [
  {
    id: "1",
    title: "Kakolan kalpea",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2017",
  },
  {
    id: "2",
    title: "Gekko",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2018",
  },
  {
    id: "3",
    title: "Tolvana",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2019",
  },
  {
    id: "4",
    title: "Soopeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2020",
  },
  {
    id: "5",
    title: "Sulhasmies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2021",
  },
  {
    id: "6",
    title: "Hotel California",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2022",
  },
];
