import NextLink from "next/link";

import { Button, HStack } from "@chakra-ui/react";

import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import Logo from "../icons/logo";

export default function Navbar() {
  var { user, status } = useUser();

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
        <NextLink href="/explore">
          <Button variant="ghost">Explore</Button>
        </NextLink>

        {user ? (
          <Button variant="ghost">Logout</Button>
        ) : (
          <NextLink href="/auth/signup">
            <Button variant="lightSolid" overflow="hidden">
              Get started
            </Button>
          </NextLink>
        )}
      </HStack>
    </HStack>
  );
}
