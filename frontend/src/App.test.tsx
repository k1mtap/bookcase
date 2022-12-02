import { screen, render } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("should have a title", () => {
    const expectedTitle = "Bookcase";
    render(<App />);
    const element = screen.getByTestId("title");

    expect(element).toHaveTextContent(expectedTitle);
  });
});
