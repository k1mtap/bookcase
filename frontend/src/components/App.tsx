import React from "react";
import styled from "styled-components";
import { colors, Divider, Header } from "./Common";
import { BooksLayout } from "./BooksLayout";
import { BooksController } from "../controllers/BooksController";
import { IManageBooks } from "../services/IManageBooks";

const MainContainer = styled.div`
  width: 1200px;
  margin: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.bgMain};
  border: 1px solid ${colors.borderMain};
  border-radius: 5px;
`;

interface Props {
  bookService: IManageBooks;
}

export const App: React.FC<Props> = ({ bookService }) => {
  return (
    <MainContainer>
      <Header size={3} textDecoration="underline" data-testid="app-header">
        Bookcase
      </Header>
      <Divider />
      <BooksController bookService={bookService}>
        {({ books, createBook, updateBook, deleteBook }) => (
          <BooksLayout
            books={books}
            createBook={createBook}
            updateBook={updateBook}
            deleteBook={deleteBook}
          />
        )}
      </BooksController>
    </MainContainer>
  );
};
