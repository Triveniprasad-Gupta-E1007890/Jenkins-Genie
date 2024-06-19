import React from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { modalTheme } from "./themes/modalTheme";
import { tableTheme } from "./themes/tableTheme";
import { inputTheme } from "./themes/inputTheme";

const targetEle = document.querySelector("#breadcrumbs").parentElement;
const app = document.createElement("div");
app.id = "jjf-react-root";

if (targetEle) {
  targetEle.append(app);
}

const container = document.getElementById("jjf-react-root");
const root = createRoot(container);

const theme = extendTheme({
  components: {
    Modal: modalTheme,
    Table: tableTheme,
    Input: inputTheme
  }
});

const jenkinsHomeLink = document.querySelector("a#jenkins-home-link");
if (jenkinsHomeLink) {
  jenkinsHomeLink.style.display = "flex";
}

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
