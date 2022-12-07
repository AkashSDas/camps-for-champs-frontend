import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "@next/font/google";
import localFont from "@next/font/local";

import Navbar from "../component/shared/navbar";
import { theme } from "../lib/chakra";

import type { AppProps } from "next/app";
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"] });
const cubano = localFont({
  src: "../public/cubano.ttf",
  variable: "--font-cubano",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.className} ${cubano.className}`}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default App;
