import Layout from "../components/shared/layout";
import localFont from "@next/font/local";
import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Poppins } from "@next/font/google";
import { queryClient } from "../lib/react-query";
import { QueryClientProvider } from "react-query";
import { theme } from "../lib/chakra-ui";
import "../styles/globals.css";

import type { AppProps } from "next/app";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const cubano = localFont({
  src: "../public/cubano.ttf",
  variable: "--font-cubano",
});

export var stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <div className={`${poppins.className} ${cubano.className}`}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </div>
      </QueryClientProvider>
    </Elements>
  );
}
