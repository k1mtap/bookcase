import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { App } from "./components/App";
import { colors } from "./components/Common";
import { BookService } from "./services/bookService";
import { resolveEnvVariable } from "@bookcase/util";

const baseUrl = resolveEnvVariable("REACT_APP_HOST");

const Global = createGlobalStyle`
  body {
    background: ${colors.bgBody};
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: ${colors.fontColor};
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const bookService = new BookService(baseUrl);

root.render(
  <React.StrictMode>
    <Global />
    <App bookService={bookService} />
  </React.StrictMode>
);
