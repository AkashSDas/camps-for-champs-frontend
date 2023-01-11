import { VStack } from "@chakra-ui/react";

import Navbar from "./navbar";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <VStack>
      <Navbar />
      {children}
    </VStack>
  );
}
