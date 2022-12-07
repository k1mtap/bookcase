import { Book } from "@bookcase/book";
import { ReactElement, useEffect, useState } from "react";
import { CreateBookInput, IManageBooks } from "../services/IManageBooks";

export interface ChildProps {
  books: Book[];
  createBook: (book: CreateBookInput) => Promise<Book | null>;
  updateBook: (book: Book) => Promise<void>;
  deleteBook: (book: Book) => Promise<void>;
}
interface Props {
  bookService: IManageBooks;
  children: (childProps: ChildProps) => ReactElement | null;
}

export const BooksController = ({
  children,
  bookService,
}: Props): ReactElement | null => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      setBooks(await bookService.getAll());
    })();
  }, [bookService]);

  const createBook = async (input: CreateBookInput): Promise<Book | null> => {
    if (existingBookHasSameTitleAndAuthor(input, books)) {
      return null;
    }

    try {
      const newBook = await bookService.create(input);
      setBooks(books.concat(newBook));
      return newBook;
    } catch (error) {
      console.log("something went wrong");
      // implement a notification service and send a UI notification for the user
      return null;
    }
  };

  const updateBook = async (book: Book): Promise<void> => {
    if (
      nonExistingBook(book, books) ||
      existingBookHasSameTitleAndAuthor(book, books)
    ) {
      return;
    }

    try {
      await bookService.update(book);
      const booksCopy = [...books];
      const updatedBooks = booksCopy.map((b) => {
        if (b.bookId === book.bookId) {
          return book;
        } else {
          return b;
        }
      });

      setBooks(updatedBooks);
    } catch (error) {
      console.log("something went wrong");
      // implement a notification service and send a UI notification for the user
    }
  };

  const deleteBook = async (book: Book): Promise<void> => {
    if (nonExistingBook(book, books)) {
      return;
    }
    try {
      await bookService.delete(book);
      const filteredBooks = [...books].filter((b) => b.bookId !== book.bookId);

      setBooks(filteredBooks);
    } catch (error) {
      console.log("something went wrong");
      // implement a notification service and send a UI notification for the user
    }
  };

  return <>{children({ books, updateBook, createBook, deleteBook })}</>;
};

const existingBookHasSameTitleAndAuthor = (
  bookInput: CreateBookInput | Book,
  books: Book[]
) => {
  return books.some((b) => {
    const sameValues =
      b.title === bookInput.title && b.author === bookInput.author;

    if ("bookId" in bookInput) {
      return b.bookId !== bookInput.bookId && sameValues;
    } else {
      return sameValues;
    }
  });
};

const nonExistingBook = (book: Book, books: Book[]) => {
  return !books.find((b) => b.bookId === book.bookId);
};
