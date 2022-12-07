import { Book } from "@bookcase/book";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BookForm } from "./BookForm";

describe("BookForm", () => {
  it("should have a form title", () => {
    const expectedTitle = "Form";
    renderBookForm();
    const formElement = screen.getByTestId("book-form");

    expect(formElement).toHaveTextContent(expectedTitle);
  });

  it("should show an input field for 'Title'", () => {
    const expectedText = "Title";
    renderBookForm();
    const labelElement = screen.getByTestId("book-input-field-title");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(expectedText);
  });

  it("should show an input field for 'Author'", () => {
    const expectedText = "Author";
    renderBookForm();
    const labelElement = screen.getByTestId("book-input-field-author");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(expectedText);
  });

  it("should show an input field for 'Description'", () => {
    const expectedText = "Description";
    renderBookForm();
    const labelElement = screen.getByTestId("book-text-area");

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(expectedText);
  });

  it("should show a button for 'Save New'", () => {
    const expectedText = "Save New";
    renderBookForm();
    const buttonElement = screen.getByTestId("form-button-save-new");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(expectedText);
  });

  it("should show a button for 'Save'", () => {
    const expectedText = "Save";
    renderBookForm();
    const buttonElement = screen.getByTestId("form-button-save");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(expectedText);
  });

  it("should show a button for 'Delete'", () => {
    const expectedText = "Delete";
    renderBookForm();
    const buttonElement = screen.getByTestId("form-button-delete");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(expectedText);
  });

  it("should show the given book information on the input fields", () => {
    const expectedTitle = "book title";
    const expectedAuthor = "book author";
    const expectedDescription = "book description";
    const expectedElementLength = 3;
    const book = createBook({
      title: expectedTitle,
      author: expectedAuthor,
      description: expectedDescription,
    });
    renderBookForm({ book });

    const inputElements = screen.getAllByRole("textbox");
    const titleInput = screen.getByLabelText("Title");
    const authorInput = screen.getByLabelText("Author");
    const descriptionInput = screen.getByLabelText("Description");

    expect(inputElements).toHaveLength(expectedElementLength);

    expect(titleInput).toHaveValue(expectedTitle);
    expect(authorInput).toHaveValue(expectedAuthor);
    expect(descriptionInput).toHaveValue(expectedDescription);
  });

  describe("creating a book", () => {
    it("should not create a new book if title is missing", () => {
      const mockCreateBook = jest.fn();
      renderBookForm({ createBook: mockCreateBook });

      const authorInput = screen.getByLabelText("Author");
      const saveNewButton = screen.getByTestId("form-button-save-new");

      fireEvent.change(authorInput, { target: { value: "foo" } });

      fireEvent.click(saveNewButton);

      expect(mockCreateBook).not.toBeCalled();
    });

    it("should not create a new book if author is missing", () => {
      const mockCreateBook = jest.fn();
      renderBookForm({ createBook: mockCreateBook });

      const titleInput = screen.getByLabelText("Title");
      const saveNewButton = screen.getByTestId("form-button-save-new");

      fireEvent.change(titleInput, { target: { value: "foo" } });

      fireEvent.click(saveNewButton);

      expect(mockCreateBook).not.toBeCalled();
    });

    it("should not create a new book when the book title and author are equal with the given book", () => {
      const mockCreateBook = jest.fn();
      const title = "book title";
      const author = "book author";
      const book = createBook({
        title,
        author,
        description: "anything",
      });
      renderBookForm({ book, createBook: mockCreateBook });

      const titleInput = screen.getByLabelText("Title");
      const authorInput = screen.getByLabelText("Author");

      fireEvent.change(titleInput, { target: { value: title } });
      fireEvent.change(authorInput, { target: { value: author } });

      expect(mockCreateBook).not.toBeCalled();
    });

    it("should create a new book with the given input values", () => {
      const mockCreateBook = jest.fn();
      const expectedTitle = "book title";
      const expectedAuthor = "book author";
      const expectedDescription = "book description";
      const expectedNewBook = {
        title: expectedTitle,
        author: expectedAuthor,
        description: expectedDescription,
      };
      renderBookForm({ createBook: mockCreateBook });

      const titleInput = screen.getByLabelText("Title");
      const authorInput = screen.getByLabelText("Author");
      const descriptionInput = screen.getByLabelText("Description");
      const saveNewButton = screen.getByTestId("form-button-save-new");

      fireEvent.change(titleInput, { target: { value: expectedTitle } });
      fireEvent.change(authorInput, { target: { value: expectedAuthor } });
      fireEvent.change(descriptionInput, {
        target: { value: expectedDescription },
      });

      expect(mockCreateBook).not.toBeCalled();

      fireEvent.click(saveNewButton);

      expect(mockCreateBook).toBeCalledWith(expectedNewBook);
    });
  });

  describe("updating a book", () => {
    it("should not update a book when the given book is null", () => {
      const mockUpdateBook = jest.fn();
      const book = null;
      renderBookForm({ updateBook: mockUpdateBook, book });

      const updateButton = screen.getByTestId("form-button-save");

      fireEvent.click(updateButton);

      expect(mockUpdateBook).not.toBeCalled();
    });

    it("should not update a book if title is missing", () => {
      const mockUpdateBook = jest.fn();
      const book = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      renderBookForm({ updateBook: mockUpdateBook, book });

      const titleInput = screen.getByLabelText("Title");
      const updateButton = screen.getByTestId("form-button-save");

      fireEvent.change(titleInput, { target: { value: "" } });
      fireEvent.click(updateButton);

      expect(mockUpdateBook).not.toBeCalled();
    });

    it("should not update a book if author is missing", () => {
      const mockUpdateBook = jest.fn();
      const book = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      renderBookForm({ updateBook: mockUpdateBook, book });

      const authorInput = screen.getByLabelText("Author");
      const updateButton = screen.getByTestId("form-button-save");

      fireEvent.change(authorInput, { target: { value: "" } });
      fireEvent.click(updateButton);

      expect(mockUpdateBook).not.toBeCalled();
    });

    it("should not update a book if no fields have been modified", () => {
      const mockUpdateBook = jest.fn();
      const book = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      renderBookForm({ updateBook: mockUpdateBook, book });

      const updateButton = screen.getByTestId("form-button-save");

      fireEvent.click(updateButton);

      expect(mockUpdateBook).not.toBeCalled();
    });

    it("should update a book with the updated values", () => {
      const mockUpdateBook = jest.fn();
      const book = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      const updatedTitle = "updated title";
      const updatedDescription = "updated description";
      renderBookForm({ updateBook: mockUpdateBook, book });
      const expectedUpdatedBook = {
        ...book,
        title: updatedTitle,
        description: updatedDescription,
      };

      const titleInput = screen.getByLabelText("Title");
      const descriptionInput = screen.getByLabelText("Description");
      const updateButton = screen.getByTestId("form-button-save");

      fireEvent.change(titleInput, {
        target: { value: updatedTitle },
      });
      fireEvent.change(descriptionInput, {
        target: { value: updatedDescription },
      });

      expect(mockUpdateBook).not.toBeCalled();

      fireEvent.click(updateButton);

      expect(mockUpdateBook).toBeCalledWith(expectedUpdatedBook);
    });
  });

  describe("deleting a book", () => {
    it("should not delete a book if the given book is null", () => {
      const mockDeleteBook = jest.fn();
      const book = null;
      renderBookForm({ deleteBook: mockDeleteBook, book });

      const deleteButton = screen.getByTestId("form-button-delete");

      fireEvent.click(deleteButton);

      expect(mockDeleteBook).not.toBeCalled();
    });

    it("should delete the given book", async () => {
      const mockDeleteBook = jest.fn();
      const bookToBeDeleted = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      renderBookForm({ deleteBook: mockDeleteBook, book: bookToBeDeleted });

      const deleteButton = screen.getByTestId("form-button-delete");

      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockDeleteBook).toBeCalledWith(bookToBeDeleted);
      });
    });

    it("should empty the input fields after deleting a book", async () => {
      const mockDeleteBook = jest.fn();
      const bookToBeDeleted = createBook({
        title: "book title",
        author: "book author",
        description: "book description",
      });
      renderBookForm({ deleteBook: mockDeleteBook, book: bookToBeDeleted });

      const deleteButton = screen.getByTestId("form-button-delete");

      fireEvent.click(deleteButton);

      const titleInput = screen.getByLabelText("Title");
      const authorInput = screen.getByLabelText("Author");
      const descriptionInput = screen.getByLabelText("Description");
      const elements = [titleInput, authorInput, descriptionInput];

      await waitFor(() => {
        for (const element of elements) {
          expect(element).toHaveValue("");
        }
      });
    });
  });
});

interface RenderOptions {
  book?: Book | null;
  createBook?: () => Promise<void>;
  updateBook?: () => Promise<void>;
  deleteBook?: () => Promise<void>;
}

const renderBookForm = (options: RenderOptions = {}) => {
  render(
    <BookForm
      book={options.book === null ? null : options.book ?? createBook()}
      createBook={options.createBook ?? jest.fn()}
      updateBook={options.updateBook ?? jest.fn()}
      deleteBook={options.deleteBook ?? jest.fn()}
    />
  );
};

interface Options {
  title?: string;
  author?: string;
  description?: string;
}

const createBook = (options: Options = {}): Book => ({
  bookId: "1",
  title: options.title ?? "",
  author: options.author ?? "",
  description: options.description ?? "",
});
