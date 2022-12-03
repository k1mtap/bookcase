import { Book } from "@bookcase/book";
import { render, screen } from "@testing-library/react";
import { BookTableRow } from "./BookTableRow";

describe("BookTableRow", () => {
  it("should show the book title", () => {
    const expectedTitle = "foo";
    const book: Book = {
      id: "1",
      title: expectedTitle,
      author: "author",
      description: "description",
    };

    renderBookTableRow(book);
    const element = screen.getByTestId("book-table-row");

    expect(element).toHaveTextContent(expectedTitle);
  });

  it("should show the book author", () => {
    const expectedAuthor = "foo";
    const book: Book = {
      id: "1",
      title: "title",
      author: expectedAuthor,
      description: "description",
    };

    renderBookTableRow(book);
    const element = screen.getByTestId("book-table-row");

    expect(element).toHaveTextContent(expectedAuthor);
  });
});

const renderBookTableRow = (book: Book) => {
  render(
    <table>
      <tbody>
        <BookTableRow book={book} />
      </tbody>
    </table>
  );
};
