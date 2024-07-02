import "./main.css";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { modalTheme } from "./themes/modalTheme";
import { tableTheme } from "./themes/tableTheme";
import { inputTheme } from "./themes/inputTheme";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';

const targetEle = document.querySelector("#breadcrumbs").parentElement;
const app = document.createElement("div");
app.id = "jjf-react-root";

if (targetEle) {
  targetEle.append(app);
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const container = document.getElementById("jjf-react-root");
const root = createRoot(container);

const theme = extendTheme({
  config,
  components: {
    Modal: modalTheme,
    Table: tableTheme,
    Input: inputTheme,
  },
});

const jenkinsHomeLink = document.querySelector("a#jenkins-home-link");
if (jenkinsHomeLink) {
  jenkinsHomeLink.style.display = "flex";
}

const cache = createCache({
  key: 'chakra',
  container
});

root.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </CacheProvider>
  </React.StrictMode>
);
