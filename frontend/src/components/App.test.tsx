import { screen, render, waitFor } from "@testing-library/react";
import { IManageBooks } from "../services/IManageBooks";
import { App } from "./App";

describe("App", () => {
  it("should have a title", async () => {
    const expectedTitle = "Bookcase";
    render(<App bookService={createMockBookService()} />);
    const element = screen.getByTestId("app-header");

    await waitFor(() => {
      expect(element).toHaveTextContent(expectedTitle);
    });
  });
});

const createMockBookService = (): IManageBooks => ({
  getAll: jest.fn().mockReturnValue([]),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
