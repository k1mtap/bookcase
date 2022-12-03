import { Book } from "@bookcase/book";
import { render } from "@testing-library/react";
import { IManageBooks } from "../services/IManageBooks";
import { BooksController } from "./BooksController";

describe("BooksController", () => {
  it("should fetch the book list", () => {
    const mockBookService = createMockBookService();

    render(
      <BooksController bookService={mockBookService}>
        {() => null}
      </BooksController>
    );

    expect(mockBookService.getAll).toBeCalled();
  });

  it("should pass the books list to the children", async () => {
    const expectedBooks = createMockBooks();
    const mockBookService = createMockBookService(expectedBooks);
    const mockChild = jest.fn().mockReturnValue(null);

    render(
      <BooksController bookService={mockBookService}>
        {mockChild}
      </BooksController>
    );

    expect(mockChild).toBeCalledWith(expectedBooks);
  });
});

const createMockBookService = (
  books: Book[] = createMockBooks()
): IManageBooks => ({
  getAll: jest.fn().mockReturnValue(books),
});

const createMockBooks = () => [
  { id: "1", title: "title1", author: "author1", description: "description1" },
  { id: "2", title: "title2", author: "author2", description: "description2" },
  { id: "3", title: "title3", author: "author3", description: "description3" },
];
