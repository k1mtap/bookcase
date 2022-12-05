import styled from "styled-components";
import { BookInputField } from "./BookInputField";
import { BookTextArea } from "./BookTextArea";
import { BookFormButton } from "./BookFormButton";
import { Book } from "@bookcase/book";
import { useEffect, useState } from "react";
import { Container, Header } from "../Common";
import { ChildProps } from "../../controllers/BooksController";
import { CreateBookInput } from "../../services/IManageBooks";

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props extends Omit<ChildProps, "books" | "createBook"> {
  book: Book | null;
  createBook: (createBookInput: CreateBookInput) => Promise<void>;
}

export const BookForm: React.FC<Props> = ({
  book,
  createBook,
  updateBook,
  deleteBook,
}) => {
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

  const handleCreateBook = async () => {
    if (isInvalidBook) {
      return;
    }

    const newBook: CreateBookInput = {
      title,
      author,
      description,
    };

    if (book === null || !isEqual(newBook, book)) {
      await createBook(newBook);
    }
  };

  const handleUpdateBook = async () => {
    if (book === null || isInvalidBook || !bookHasBeenModified) {
      return;
    }

    const updatedBook: Book = {
      id: book.id,
      title,
      author,
      description,
    };

    await updateBook(updatedBook);
  };

  const handleDeleteBook = async () => {
    if (book === null || bookHasBeenModified) {
      return;
    }

    await deleteBook(book);
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  const isInvalidBook = title.trim().length === 0 || author.trim().length === 0;
  const bookHasBeenModified =
    book! &&
    (book.title !== title ||
      book.author !== author ||
      book.description !== description);

  return (
    <Container data-testid="book-form">
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
          <BookFormButton title="Save New" handleOnClick={handleCreateBook} />
          <BookFormButton title="Save" handleOnClick={handleUpdateBook} />
          <BookFormButton title="Delete" handleOnClick={handleDeleteBook} />
        </Container>
      </Form>
    </Container>
  );
};

const isEqual = (newBook: CreateBookInput, oldBook: Book): boolean => {
  if (newBook.title === oldBook.title && newBook.author === oldBook.author) {
    return true;
  }

  return false;
};
