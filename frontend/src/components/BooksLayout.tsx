import { Book } from "@bookcase/book";
import { useEffect, useState } from "react";
import { ChildProps } from "../controllers/BooksController";
import { CreateBookInput } from "../services/IManageBooks";
import { BookForm } from "./BookForm/BookForm";
import { BookList } from "./BookList/BookList";
import { Container } from "./Common";

export const BooksLayout: React.FC<ChildProps> = ({
  books,
  createBook,
  updateBook,
  deleteBook,
}) => {
  const [book, setBook] = useState<Book | null>(null);
  const [newBookInput, setNewBookInput] = useState<CreateBookInput | null>(
    null
  );

  useEffect(() => {
    if (newBookInput) {
      const currentBook = books.find(
        (b) =>
          b.title === newBookInput.title && b.author === newBookInput.author
      )!;
      setBook(currentBook);
      setNewBookInput(null);
    }
    // we don't want to run this function when newBookInput changes, becouse then it would not be found in books yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  return (
    <Container direction="row" marginBottom={20}>
      <BookList
        books={books}
        onClick={(book: Book) => setBook(book)}
        activeBookId={book ? book.id : undefined}
      />
      <BookForm
        book={book}
        createBook={async (createBookInput: CreateBookInput) => {
          setNewBookInput(createBookInput);
          await createBook(createBookInput);
        }}
        updateBook={updateBook}
        deleteBook={deleteBook}
      />
    </Container>
  );
};
