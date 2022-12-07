import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "@next/font/google";
import localFont from "@next/font/local";

import { theme } from "../lib/chakra";

import type { AppProps } from "next/app";

const poppins = Poppins({ weight: ["400", "500", "700"] });
const cubano = localFont({
  src: "../public/cubano.ttf",
  variable: "--font-cubano",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.className} ${cubano.className}`}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default App;
