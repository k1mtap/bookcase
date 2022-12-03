import { Book } from "@bookcase/book";
import styled from "styled-components";

const Span = styled.span`
  &:hover {
    color: #afb9ac;
    cursor: pointer;
  }
`;

interface Props {
  book: Book;
}

export const BookTableRow: React.FC<Props> = ({ book }) => {
  return (
    <tr data-testid="book-table-row">
      <td>
        <Span>{book.title}</Span>
      </td>
      <td>{book.author}</td>
    </tr>
  );
};
