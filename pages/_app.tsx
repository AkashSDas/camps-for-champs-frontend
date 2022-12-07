import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../lib/chakra";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
