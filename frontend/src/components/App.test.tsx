import { screen, render } from "@testing-library/react";
import { IManageBooks } from "../services/IManageBooks";
import { App } from "./App";

describe("App", () => {
  it("should have a title", () => {
    const expectedTitle = "Bookcase";
    render(<App bookService={createMockBookService()} />);
    const element = screen.getByTestId("app-header");

    expect(element).toHaveTextContent(expectedTitle);
  });
});

const createMockBookService = (): IManageBooks => ({
  getAll: jest.fn().mockReturnValue([]),
});
