import { Book } from "@bookcase/book";
import { Repository } from "./Repository";
import { v4 as uuidV4 } from "uuid";

export class BookRepository implements Repository<Book> {
  private books: Book[];

  constructor() {
    this.books = books;
  }

  async getAll(): Promise<Book[]> {
    return this.books;
  }

  async create(input: Omit<Book, "id">): Promise<Book> {
    const id = uuidV4();
    const newBook: Book = {
      id,
      ...input,
    };
    this.books.concat(newBook);

    return newBook;
  }

  async update(entity: Book): Promise<void> {
    this.books = this.books.map((b) => {
      if (b.id === entity.id) {
        return entity;
      }

      return b;
    });
  }

  async delete(entity: Book): Promise<void> {
    const index = this.books.indexOf(entity);
    if (index < 0) {
      throw new Error("BookRepository.delete: given book not found");
    }

    this.books.splice(index, 1);
  }
}

const books: Book[] = [
  {
    id: uuidV4(),
    title: "Moukanpeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1986",
  },
  {
    id: uuidV4(),
    title: "Satakieli lauloi yöllä",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1987",
  },
  {
    id: uuidV4(),
    title: "Marraskuu on musta hauta",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1988",
  },
  {
    id: uuidV4(),
    title: "Sukkanauhakäärme",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1989",
  },
  {
    id: uuidV4(),
    title: "Jäätynyt enkeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1990",
  },
  {
    id: uuidV4(),
    title: "Kuoleman kapellimestari",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1991",
  },
  {
    id: uuidV4(),
    title: "Vares ja kaidan tien kulkijat",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1992",
  },
  {
    id: uuidV4(),
    title: "Enkelit kanssasi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1995",
  },
  {
    id: uuidV4(),
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1997",
  },
  {
    id: uuidV4(),
    title: "Pahan suudelma",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1998",
  },
  {
    id: uuidV4(),
    title: "Keltainen leski",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1999",
  },
  {
    id: uuidV4(),
    title: "Mullan maku",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2000",
  },
  {
    id: uuidV4(),
    title: "Kolmastoista yö",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2001",
  },
  {
    id: uuidV4(),
    title: "Black Jack",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2003",
  },
  {
    id: uuidV4(),
    title: "Huhtikuun tytöt",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2004",
  },
  {
    id: uuidV4(),
    title: "Nuoruustango",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2005",
  },
  {
    id: uuidV4(),
    title: "Hard Luck Cafe",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2006",
  },
  {
    id: uuidV4(),
    title: "Uhkapelimerkki",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2007",
  },
  {
    id: uuidV4(),
    title: "Lännen mies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2008",
  },
  {
    id: uuidV4(),
    title: "Valkovenäläinen",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2009",
  },
  {
    id: uuidV4(),
    title: "Kolmijalkainen mies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2010",
  },
  {
    id: uuidV4(),
    title: "Mustasiipi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2011",
  },
  {
    id: uuidV4(),
    title: "Sheriffi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2012",
  },
  {
    id: uuidV4(),
    title: "Intiaani",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2013",
  },
  {
    id: uuidV4(),
    title: "Cowboy",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2014",
  },
  {
    id: uuidV4(),
    title: "Tulivuori",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2015",
  },
  {
    id: uuidV4(),
    title: "Hot Dog",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2016",
  },
  {
    id: uuidV4(),
    title: "Kakolan kalpea",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2017",
  },
  {
    id: uuidV4(),
    title: "Gekko",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2018",
  },
  {
    id: uuidV4(),
    title: "Tolvana",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2019",
  },
  {
    id: uuidV4(),
    title: "Soopeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2020",
  },
  {
    id: uuidV4(),
    title: "Sulhasmies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2021",
  },
  {
    id: uuidV4(),
    title: "Hotel California",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2022",
  },
];
