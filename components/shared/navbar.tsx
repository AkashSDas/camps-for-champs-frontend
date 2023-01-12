import NextLink from "next/link";

import { Button, Center, Divider, HStack, IconButton } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { LoginIcon, LogoutIcon, SearchIcon } from "../icons";
import Logo from "../icons/logo";

export default function Navbar(): JSX.Element {
  var { isLoggedIn } = useUser();

  return (
    <HStack
      as="nav"
      w="full"
      h={pxToRem(56)}
      px={pxToRem(24)}
      justifyContent="space-between"
      alignItems="center"
      gap={pxToRem(16)}
      borderBottomWidth={pxToRem(1)}
      borderColor={theme.colors.b.grey2}
    >
      <Logo />

      <HStack alignItems="center" gap={pxToRem(8)}>
        <IconButton aria-label="Search camps" variant="icon-ghost">
          <SearchIcon className="icon-normal-stroke" h={20} w={20} />
        </IconButton>

        <Center h={pxToRem(22)}>
          <Divider
            orientation="vertical"
            variant="solid"
            borderColor={theme.colors.b.grey2}
          />
        </Center>

        {isLoggedIn ? (
          <IconButton aria-label="Logout" variant="icon-ghost">
            <LogoutIcon className="icon-normal-stroke" />
          </IconButton>
        ) : (
          <NextLink href="/auth/login">
            <IconButton aria-label="Login with email" variant="icon-ghost">
              <LoginIcon className="icon-normal-stroke" />
            </IconButton>
          </NextLink>
        )}

        {!isLoggedIn && (
          <NextLink href="/auth/signup">
            <Button data-testid="get-started" variant="inverted">
              Get started
            </Button>
          </NextLink>
        )}
      </HStack>
    </HStack>
  );
}
