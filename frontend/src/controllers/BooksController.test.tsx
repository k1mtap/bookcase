import { Book } from "@bookcase/book";
import { render, waitFor } from "@testing-library/react";
import { CreateBookInput, IManageBooks } from "../services/IManageBooks";
import { BooksController } from "./BooksController";

describe("BooksController", () => {
  it("should fetch the book list", async () => {
    const mockBookService = createMockBookService();

    render(
      <BooksController bookService={mockBookService}>
        {() => null}
      </BooksController>
    );

    await waitFor(() => {
      expect(mockBookService.getAll).toBeCalled();
    });
  });

  it("should pass the books list to the children", async () => {
    const expectedBooks = createMockBooks();
    const mockBookService = createMockBookService({ books: expectedBooks });
    const mockChild = jest.fn().mockReturnValue(null);
    const assertion = { books: expectedBooks };

    render(
      <BooksController bookService={mockBookService}>
        {mockChild}
      </BooksController>
    );

    await waitFor(() => {
      expect(mockChild).toBeCalled();
    });

    await assertStateUpdate(mockChild, assertion);
  });

  it("should pass a createBook function to children", async () => {
    const mockBookService = createMockBookService();
    const mockChild = jest.fn().mockReturnValue(null);
    const assertion = { createBook: expect.any(Function) };

    render(
      <BooksController bookService={mockBookService}>
        {mockChild}
      </BooksController>
    );

    await assertStateUpdate(mockChild, assertion);
  });

  it("should pass an updateBook function to children", async () => {
    const mockBookService = createMockBookService();
    const mockChild = jest.fn().mockReturnValue(null);
    const assertion = { updateBook: expect.any(Function) };

    render(
      <BooksController bookService={mockBookService}>
        {mockChild}
      </BooksController>
    );

    await assertStateUpdate(mockChild, assertion);
  });

  it("should pass a deleteBook function to children", async () => {
    const mockBookService = createMockBookService();
    const mockChild = jest.fn().mockReturnValue(null);
    const assertion = { deleteBook: expect.any(Function) };

    render(
      <BooksController bookService={mockBookService}>
        {mockChild}
      </BooksController>
    );

    await assertStateUpdate(mockChild, assertion);
  });

  describe("#createBook", () => {
    it("should not create a new book if one with the same title and author already exists", async () => {
      const createBookObject: CreateBookInput = {
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const existingBook: Book = {
        bookId: "4",
        ...createBookObject,
      };
      const books = [...createMockBooks(), existingBook];
      const mockBookService = createMockBookService({ books });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      // mockChild.mock.calls[0] is for the component mount, where books state have not been set yet, mockChild.mock.calls[1] is for the rerender after setting the books state
      const { createBook } = mockChild.mock.calls[1][0];
      await createBook(createBookObject);

      await waitFor(async () => {
        expect(mockBookService.create).not.toBeCalled();
      });
    });

    it("should create a new book", async () => {
      const createBookObject: CreateBookInput = {
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const books = createMockBooks();
      const newBook: Book = {
        bookId: "4",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
        createdBook: newBook,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { createBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await createBook(createBookObject);
      });

      expect(mockBookService.create).toBeCalledWith(createBookObject);
    });

    it("should pass the updated books to children", async () => {
      const createBookObject: CreateBookInput = {
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const books = createMockBooks();
      const newBook: Book = {
        bookId: "4",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
        createdBook: newBook,
      });
      const mockChild = jest.fn().mockReturnValue(null);
      const expectedUpdatedBooks = [...books, newBook];

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { createBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await createBook(createBookObject);
      });

      await assertStateUpdate(mockChild, {
        books: expectedUpdatedBooks,
      });
    });
  });

  describe("#updateBook", () => {
    it("should not update a book if the book is not found in the existing books", async () => {
      const books = createMockBooks();
      const updatedBook: Book = {
        bookId: "4",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { updateBook } = mockChild.mock.calls[1][0];
      await updateBook(updatedBook);

      expect(mockBookService.update).not.toBeCalled();
    });

    it("should not update a book if an existing book with same title and author is found", async () => {
      const books = createMockBooks();
      const updatedBook: Book = {
        bookId: "3",
        title: books[0].title,
        author: books[0].author,
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { updateBook } = mockChild.mock.calls[1][0];
      await updateBook(updatedBook);

      expect(mockBookService.update).not.toBeCalled();
    });

    it("should update a book", async () => {
      const books = [...createMockBooks()];
      const updatedBook: Book = {
        bookId: "3",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { updateBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await updateBook(updatedBook);
      });

      expect(mockBookService.update).toBeCalledWith(updatedBook);
    });

    it("should pass the updated books to children", async () => {
      const books = [...createMockBooks()];
      const updatedBook: Book = {
        bookId: "3",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);
      const updatedBooks = [...books];
      updatedBooks.splice(2, 1, updatedBook);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { updateBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await updateBook(updatedBook);
      });

      await assertStateUpdate(mockChild, { books: updatedBooks });
    });
  });

  describe("#deleteBook", () => {
    it("should not delete a book if the book is not found in the existing books", async () => {
      const books = [...createMockBooks()];
      const bookToBeDeleted: Book = {
        bookId: "4",
        title: "foo",
        author: "bar",
        description: "baz",
      };
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { deleteBook } = mockChild.mock.calls[1][0];
      await deleteBook(bookToBeDeleted);

      expect(mockBookService.delete).not.toBeCalled();
    });

    it("should delete a book", async () => {
      const books = [...createMockBooks()];
      const deletedBook = books[2];
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { deleteBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await deleteBook(deletedBook);
      });

      expect(mockBookService.delete).toBeCalledWith(deletedBook);
    });

    it("should pass the updated books to children", async () => {
      const books = [...createMockBooks()];
      const deletedBook = books[2];
      const mockBookService = createMockBookService({
        books,
      });
      const mockChild = jest.fn().mockReturnValue(null);
      const updatedBooks = [...books];
      updatedBooks.splice(2, 1);

      render(
        <BooksController bookService={mockBookService}>
          {mockChild}
        </BooksController>
      );

      await assertStateUpdate(mockChild, { books });

      const { deleteBook } = mockChild.mock.calls[1][0];
      await waitFor(async () => {
        await deleteBook(deletedBook);
      });

      await assertStateUpdate(mockChild, { books: updatedBooks });
    });
  });
});

interface Options {
  books?: Book[];
  createdBook?: Book;
}
const createMockBookService = (options: Options = {}): IManageBooks => ({
  getAll: jest.fn().mockReturnValue(options.books ?? createMockBooks()),
  create: jest.fn().mockReturnValue(options.createdBook),
  update: jest.fn(),
  delete: jest.fn(),
});

const createMockBooks = (): Book[] => [
  {
    bookId: "1",
    title: "title1",
    author: "author1",
    description: "description1",
  },
  {
    bookId: "2",
    title: "title2",
    author: "author2",
    description: "description2",
  },
  {
    bookId: "3",
    title: "title3",
    author: "author3",
    description: "description3",
  },
];

const assertStateUpdate = async (
  mockChild: jest.Mock,
  assertion: { [key: string]: any }
) => {
  await waitFor(() => {
    expect(mockChild).toBeCalledWith(
      expect.objectContaining({
        ...assertion,
      })
    );
  });
};
