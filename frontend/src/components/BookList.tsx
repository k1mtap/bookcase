import { Book } from "@bookcase/book";
import styled from "styled-components";
import { BookTableRow } from "./BookTableRow";
import { Container, Header } from "./Common";

const Table = styled.table`
  width: 100%;
`;

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
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
            <BookTableRow key={book.id} book={book} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const BookTableHeaders: React.FC = () => {
  return (
    <tr>
      <th>
        <Header size={1} align="left">
          Title
        </Header>
      </th>
      <th>
        <Header size={1} align="left">
          Author
        </Header>
      </th>
    </tr>
  );
};
