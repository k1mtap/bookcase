import { Book } from "@bookcase/book";
import { isEqual } from "lodash";
import React from "react";
import styled from "styled-components";
import { colors } from "../Common";

const Span = styled.span<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`;

const Tr = styled.tr<{ active: boolean | undefined }>`
  color: ${({ active }) => (active ? `${colors.divider}` : "inherit")};
  border-bottom: 1px solid ${colors.divider};
  &:hover {
    color: ${colors.border};
    cursor: pointer;
  }
`;

interface Props {
  book: Book;
  onClick: (book: Book) => void;
  active?: boolean;
}

const propsAreEqual = (prevProps: Props, newProps: Props): boolean => {
  return (
    isEqual(prevProps.book, newProps.book) &&
    isEqual(prevProps.active, newProps.active)
  );
};

export const BookTableRow: React.FC<Props> = React.memo(
  ({ book, onClick, active }) => {
    return (
      <Tr
        onClick={() => onClick(book)}
        active={active}
        data-testid="book-table-row"
      >
        <td>
          <Span width={370}>{book.title}</Span>
        </td>
        <td>
          <Span width={210}>{book.author}</Span>
        </td>
      </Tr>
    );
  },
  propsAreEqual
);
