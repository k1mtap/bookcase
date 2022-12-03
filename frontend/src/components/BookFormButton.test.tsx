import { fireEvent, render, screen } from "@testing-library/react";
import { BookFormButton } from "./BookFormButton";

describe("BookFormButton", () => {
  it("should show a button with the given title", () => {
    const expectedTitle = "foo";

    render(<BookFormButton title={expectedTitle} onClick={() => {}} />);
    const element = screen.getByTestId("form-button-foo");

    expect(element).toHaveTextContent(expectedTitle);
  });

  it("should call the given callback on button click", () => {
    const callback = jest.fn();

    render(<BookFormButton title={"foo"} onClick={callback} />);
    const element = screen.getByTestId("form-button-foo");

    fireEvent.click(element);

    expect(callback).toBeCalled();
  });
});
