import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import themeVariables from "./theme";

const theme = extendTheme(themeVariables);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
