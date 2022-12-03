import styled from "styled-components";
import { BookInputField } from "./BookInputField";
import { BookTextArea } from "./BookTextArea";
import { BookFormButton } from "./BookFormButton";
import { Container, Header } from "./Common";
import { Book } from "@bookcase/book";
import { useEffect, useState } from "react";

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  book: Book | null;
}

export const BookForm: React.FC<Props> = ({ book }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
    }
  }, [book]);

  return (
    <Container>
      <Header size={2} data-testid="booklist-header">
        Form
      </Header>
      <Form>
        <BookInputField
          label="Title"
          value={title}
          onChange={(title: string) => setTitle(title)}
        />
        <BookInputField
          label="Author"
          value={author}
          onChange={(author: string) => setAuthor(author)}
        />
        <BookTextArea
          value={description}
          onChange={(description: string) => setDescription(description)}
        />
        <Container direction="row" justifyContent="space-between">
          <BookFormButton title="Save New" onClick={() => {}} />
          <BookFormButton title="Save" onClick={() => {}} />
          <BookFormButton title="Delete" onClick={() => {}} />
        </Container>
      </Form>
    </Container>
  );
};
