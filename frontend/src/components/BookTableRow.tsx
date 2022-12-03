import { Book } from "@bookcase/book";
import styled from "styled-components";

const Span = styled.span<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #6a6d6a;
  &:hover {
    color: #afb9ac;
    cursor: pointer;
  }
`;

interface Props {
  book: Book;
  onClick: (book: Book) => void;
}

export const BookTableRow: React.FC<Props> = ({ book, onClick }) => {
  return (
    <Tr data-testid="book-table-row">
      <td>
        <Span width={370} onClick={() => onClick(book)}>
          {book.title}
        </Span>
      </td>
      <td>
        <Span width={210}>{book.author}</Span>
      </td>
    </Tr>
  );
};
