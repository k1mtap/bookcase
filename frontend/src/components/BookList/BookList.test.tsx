import { Book } from "@bookcase/book";
import { render, screen } from "@testing-library/react";
import { BookList } from "./BookList";

describe("BookList", () => {
  it("should show a title 'List'", () => {
    const expectedTitle = "List";
    render(<BookList books={books} onClick={() => {}} />);
    const titleElement = screen.getByTestId("booklist-header");

    expect(titleElement).toHaveTextContent(expectedTitle);
  });

  it("should show the column title 'Title'", () => {
    const expectedColumnTitle = "Title";
    render(<BookList books={books} onClick={() => {}} />);
    const columnHeaderElement = screen.getByTestId(
      "booklist-column-header-title"
    );

    expect(columnHeaderElement).toHaveTextContent(expectedColumnTitle);
  });

  it("should show the column title 'Author'", () => {
    const expectedColumnTitle = "Author";
    render(<BookList books={books} onClick={() => {}} />);
    const columnHeaderElement = screen.getByTestId(
      "booklist-column-header-author"
    );

    expect(columnHeaderElement).toHaveTextContent(expectedColumnTitle);
  });

  it("should render a list of the given books", () => {
    const expectedBooksLength = books.length;
    render(<BookList books={books} onClick={() => {}} />);
    const bookRowElements = screen.getAllByTestId("book-table-row");

    expect(bookRowElements).toHaveLength(expectedBooksLength);
  });
});

const books: Book[] = [
  {
    id: "1",
    title: "title1",
    author: "author1",
    description: "description1",
  },
  {
    id: "2",
    title: "title2",
    author: "author2",
    description: "description2",
  },
  {
    id: "3",
    title: "title3",
    author: "author3",
    description: "description3",
  },
];
