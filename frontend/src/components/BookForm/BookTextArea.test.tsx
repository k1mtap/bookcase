import { fireEvent, render, screen } from "@testing-library/react";
import { BookTextArea } from "./BookTextArea";

describe("BookTextArea", () => {
  it("should show a label 'Description'", () => {
    const expectedLabel = "Description";
    render(<BookTextArea value="" onChange={() => {}} />);

    const bookTextAreaElement = screen.getByTestId("book-text-area");

    expect(bookTextAreaElement).toHaveTextContent(expectedLabel);
  });

  it("should show the given text area value", () => {
    const expectedValue = "bar";
    render(<BookTextArea value={expectedValue} onChange={() => {}} />);

    const textAreaElement = screen.getByRole("textbox");

    expect(textAreaElement).toHaveValue(expectedValue);
  });

  it("should call the given callback on modifying the text area field", () => {
    const expectedValue = "bar";
    const callback = jest.fn();
    render(<BookTextArea value="" onChange={callback} />);

    const textAreaElement = screen.getByRole("textbox");
    fireEvent.change(textAreaElement, { target: { value: expectedValue } });

    expect(callback).toBeCalledWith(expectedValue);
  });
});
