import { Book } from "@bookcase/book";
import { ReactElement, useEffect, useState } from "react";
import { IManageBooks } from "../services/IManageBooks";

interface Props {
  bookService: IManageBooks;
  children: (books: Book[]) => ReactElement | null;
}

export const BooksController = ({
  children,
  bookService,
}: Props): ReactElement | null => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(bookService.getAll());
  }, [bookService]);

  return <>{children(books)}</>;
};
