import { Book } from "@bookcase/book";
import { useState } from "react";
import styled from "styled-components";
import { BookForm } from "./BookForm";
import { BookList } from "./BookList";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface Props {
  books: Book[];
}

export const BooksLayout: React.FC<Props> = ({ books }) => {
  const [book, setBook] = useState<Book | null>(null);

  return (
    <Container>
      <BookList books={books} onClick={(book: Book) => setBook(book)} />
      <BookForm book={book} />
    </Container>
  );
};
