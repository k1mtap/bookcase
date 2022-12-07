import { Knex } from "knex";
import { v4 as uuidV4 } from "uuid";
import { Book } from "@bookcase/book";

export async function seed(knex: Knex): Promise<void> {
  const databaseIsEmpty = (await knex("books")).length === 0;

  if (databaseIsEmpty) {
    await knex("books").insert(books);
  }
}

const books: Book[] = [
  {
    bookId: uuidV4(),
    title: "Moukanpeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1986",
  },
  {
    bookId: uuidV4(),
    title: "Satakieli lauloi yöllä",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1987",
  },
  {
    bookId: uuidV4(),
    title: "Marraskuu on musta hauta",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1988",
  },
  {
    bookId: uuidV4(),
    title: "Sukkanauhakäärme",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1989",
  },
  {
    bookId: uuidV4(),
    title: "Jäätynyt enkeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1990",
  },
  {
    bookId: uuidV4(),
    title: "Kuoleman kapellimestari",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1991",
  },
  {
    bookId: uuidV4(),
    title: "Vares ja kaidan tien kulkijat",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1992",
  },
  {
    bookId: uuidV4(),
    title: "Enkelit kanssasi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1995",
  },
  {
    bookId: uuidV4(),
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1997",
  },
  {
    bookId: uuidV4(),
    title: "Pahan suudelma",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1998",
  },
  {
    bookId: uuidV4(),
    title: "Keltainen leski",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 1999",
  },
  {
    bookId: uuidV4(),
    title: "Mullan maku",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2000",
  },
  {
    bookId: uuidV4(),
    title: "Kolmastoista yö",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2001",
  },
  {
    bookId: uuidV4(),
    title: "Black Jack",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2003",
  },
  {
    bookId: uuidV4(),
    title: "Huhtikuun tytöt",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2004",
  },
  {
    bookId: uuidV4(),
    title: "Nuoruustango",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2005",
  },
  {
    bookId: uuidV4(),
    title: "Hard Luck Cafe",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2006",
  },
  {
    bookId: uuidV4(),
    title: "Uhkapelimerkki",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2007",
  },
  {
    bookId: uuidV4(),
    title: "Lännen mies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2008",
  },
  {
    bookId: uuidV4(),
    title: "Valkovenäläinen",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2009",
  },
  {
    bookId: uuidV4(),
    title: "Kolmijalkainen mies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2010",
  },
  {
    bookId: uuidV4(),
    title: "Mustasiipi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2011",
  },
  {
    bookId: uuidV4(),
    title: "Sheriffi",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2012",
  },
  {
    bookId: uuidV4(),
    title: "Intiaani",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2013",
  },
  {
    bookId: uuidV4(),
    title: "Cowboy",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2014",
  },
  {
    bookId: uuidV4(),
    title: "Tulivuori",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2015",
  },
  {
    bookId: uuidV4(),
    title: "Hot Dog",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2016",
  },
  {
    bookId: uuidV4(),
    title: "Kakolan kalpea",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2017",
  },
  {
    bookId: uuidV4(),
    title: "Gekko",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2018",
  },
  {
    bookId: uuidV4(),
    title: "Tolvana",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2019",
  },
  {
    bookId: uuidV4(),
    title: "Soopeli",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2020",
  },
  {
    bookId: uuidV4(),
    title: "Sulhasmies",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2021",
  },
  {
    bookId: uuidV4(),
    title: "Hotel California",
    author: "Reijo Mäki",
    description: "Dekkari vuodelta 2022",
  },
];
