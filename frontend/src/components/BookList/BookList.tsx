import { Book } from "@bookcase/book";
import styled from "styled-components";
import { Container, Header } from "../Common";
import { BookTableRow } from "./BookTableRow";

const Table = styled.table`
  width: 580px;
  border-collapse: collapse;
`;

const Th = styled.th<{ width: number }>`
  width: ${({ width }) => `${width}%`};
`;

interface Props {
  books: Book[];
  onClick: (book: Book) => void;
  activeBookId?: string;
}

export const BookList: React.FC<Props> = ({ books, onClick, activeBookId }) => {
  return (
    <Container>
      <Header size={2} data-testid="booklist-header">
        List
      </Header>
      <Table data-testid="books-list">
        <thead>
          <BookTableHeaders />
        </thead>
        <tbody>
          {books.map((book) => (
            <BookTableRow
              key={book.bookId}
              book={book}
              onClick={onClick}
              active={book.bookId === activeBookId}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const BookTableHeaders: React.FC = () => {
  return (
    <tr>
      <Th width={65}>
        <Header
          size={1}
          align="left"
          data-testid="booklist-column-header-title"
        >
          Title
        </Header>
      </Th>
      <Th width={35}>
        <Header
          size={1}
          align="left"
          data-testid="booklist-column-header-author"
        >
          Author
        </Header>
      </Th>
    </tr>
  );
};
