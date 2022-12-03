import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { App } from "./components/App";
import { BookService } from "./services/bookService";

const Global = createGlobalStyle`
  body {
    background: #585c57;
    height: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const bookService = new BookService();

root.render(
  <React.StrictMode>
    <Global />
    <App bookService={bookService} />
  </React.StrictMode>
);
