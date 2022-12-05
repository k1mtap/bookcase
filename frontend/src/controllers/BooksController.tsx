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
    if (bookAlreadyExists(input, books)) {
      return null;
    }

    const newBook = await bookService.create(input);
    setBooks(books.concat(newBook));

    return newBook;
  };

  const updateBook = async (book: Book): Promise<void> => {
    if (nonExistingBook(book, books)) {
      return;
    }

    await bookService.update(book);
    const booksCopy = [...books];
    const updatedBooks = booksCopy.map((b) => {
      if (b.id === book.id) {
        return book;
      } else {
        return b;
      }
    });

    setBooks(updatedBooks);
  };

  const deleteBook = async (book: Book): Promise<void> => {
    if (nonExistingBook(book, books)) {
      return;
    }

    await bookService.delete(book);
    const filteredBooks = [...books].filter((b) => b.id !== book.id);

    setBooks(filteredBooks);
  };

  return <>{children({ books, updateBook, createBook, deleteBook })}</>;
};

const bookAlreadyExists = (bookInput: CreateBookInput, books: Book[]) => {
  return books.some(
    (b) => b.title === bookInput.title && b.author === bookInput.author
  );
};

const nonExistingBook = (book: Book, books: Book[]) => {
  return !books.find((b) => b.id === book.id);
};
