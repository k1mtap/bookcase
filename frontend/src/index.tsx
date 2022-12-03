import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { App } from "./components/App";
import { BookService } from "./services/bookService";

const Global = createGlobalStyle`
  body {
    background: #585c57;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #1d1f1e;
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
