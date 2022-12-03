import { Book } from "@bookcase/book";
import { IManageBooks } from "./IManageBooks";

export class BookService implements IManageBooks {
  getAll(): Book[] {
    return books;
  }
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
