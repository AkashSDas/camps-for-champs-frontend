import { Box, VStack } from "@chakra-ui/react";

import { pxToRem } from "../../lib/chakra-ui";
import Navbar from "./navbar";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <VStack position="relative">
      <Navbar />
      <Box pt={pxToRem(56)} w="full">
        {children}
      </Box>
    </VStack>
  );
}
