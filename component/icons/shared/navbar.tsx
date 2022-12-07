import NextLink from "next/link";

import { Button, HStack } from "@chakra-ui/react";

import { pxToRem } from "../../../lib/pxToRem";
import Logo from "../logo";

export default function Navbar() {
  return (
    <HStack
      as="nav"
      role="navigation"
      justify="space-between"
      alignItems="center"
      h={pxToRem(60)}
      mx={pxToRem(32)}
    >
      <NextLink href="/">
        <Logo />
      </NextLink>

      <HStack
        visibility={{ base: "hidden", sm: "visible" }}
        role="navigation"
        justify="end"
        alignItems="center"
      >
        <Button variant="ghost">Explore</Button>
        <Button variant="lightSolid" overflow="hidden">
          Get started
        </Button>
      </HStack>
    </HStack>
  );
}
