import "../styles/globals.css";

import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";

import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "@next/font/google";
import localFont from "@next/font/local";

import Navbar from "../component/shared/navbar";
import { theme } from "../lib/chakra";
import { queryClient } from "../lib/react-query";

import type { AppProps } from "next/app";
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"] });
const cubano = localFont({
  src: "../public/cubano.ttf",
  variable: "--font-cubano",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${poppins.className} ${cubano.className}`}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </ChakraProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
