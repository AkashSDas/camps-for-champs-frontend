import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { Poppins } from "@next/font/google";
import localFont from "@next/font/local";

import Layout from "../components/shared/layout";
import { theme } from "../lib/chakra-ui";

import type { AppProps } from "next/app";
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"] });
const cubano = localFont({
  src: "../public/cubano.ttf",
  variable: "--font-cubano",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.className} ${cubano.className}`}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </div>
  );
}
