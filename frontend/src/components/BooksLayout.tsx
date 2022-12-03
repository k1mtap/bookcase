import { Book } from "@bookcase/book";
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
  return (
    <Container>
      <BookList books={books} />
      <BookForm />
    </Container>
  );
};
