import { Book } from "@bookcase/book";
import { fireEvent, render, screen } from "@testing-library/react";
import { BookTableRow } from "./BookTableRow";

describe("BookTableRow", () => {
  it("should show the book title", () => {
    const expectedTitle = "foo";
    const book = createBook({ title: expectedTitle });

    renderBookTableRow(book);
    const element = screen.getByTestId("book-table-row");

    expect(element).toHaveTextContent(expectedTitle);
  });

  it("should show the book author", () => {
    const expectedAuthor = "foo";
    const book = createBook({ author: expectedAuthor });

    renderBookTableRow(book);
    const element = screen.getByTestId("book-table-row");

    expect(element).toHaveTextContent(expectedAuthor);
  });

  it("should call the given callback with the book when clicked", () => {
    const callback = jest.fn();
    const expectedBook = createBook();

    renderBookTableRow(expectedBook, callback);
    const rowElement = screen.getByTestId("book-table-row");

    fireEvent.click(rowElement);

    expect(callback).toBeCalledWith(expectedBook);
  });
});

const renderBookTableRow = (book: Book, onClick: () => void = () => {}) => {
  render(
    <table>
      <tbody>
        <BookTableRow book={book} onClick={onClick} />
      </tbody>
    </table>
  );
};

interface BookOptions {
  title?: string;
  author?: string;
}

const createBook = (options: BookOptions = {}): Book => ({
  bookId: "1",
  title: options.title ?? "title",
  author: options.author ?? "author",
  description: "description",
});
