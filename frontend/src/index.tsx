import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";

const Global = createGlobalStyle`
  body {
    background: #363c45;
    height: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>
);
