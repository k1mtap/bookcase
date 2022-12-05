import { fireEvent, render, screen } from "@testing-library/react";
import { BookInputField } from "./BookInputField";

describe("BookInputField", () => {
  it("should show the given label", () => {
    const expectedLabel = "foo";
    const dataTestId = `book-input-field-foo`;
    render(
      <BookInputField label={expectedLabel} value="" onChange={() => {}} />
    );

    const bookInputFieldElement = screen.getByTestId(dataTestId);

    expect(bookInputFieldElement).toHaveTextContent(expectedLabel);
  });

  it("should show the given input value", () => {
    const expectedValue = "bar";
    render(
      <BookInputField label="" value={expectedValue} onChange={() => {}} />
    );

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveValue(expectedValue);
  });

  it("should call the given callback on modifying the input field", () => {
    const expectedValue = "bar";
    const callback = jest.fn();
    render(<BookInputField label="" value="" onChange={callback} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: expectedValue } });

    expect(callback).toBeCalledWith(expectedValue);
  });
});
