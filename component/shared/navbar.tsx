import NextLink from "next/link";
import { useMutation } from "react-query";

import { Badge, Button, HStack } from "@chakra-ui/react";

import { theme as customTheme } from "../../lib/chakra";
import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { logout } from "../../services/auth";
import Logo from "../icons/logo";

export default function Navbar() {
  var { isLoggedIn } = useUser();

  var mutation = useMutation({
    mutationFn: logout,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", "access-token"] });
      var previousUser = queryClient.getQueryData(["user"]);
      var previousAccessToken = queryClient.getQueryData(["access-token"]);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["access-token"], null);

      return { previousUser, previousAccessToken };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["user"], context?.previousUser);
      queryClient.setQueryData(["access-token"], context?.previousAccessToken);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "access-token"] });
    },
  });

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

        {isLoggedIn ? (
          <Button variant="ghost" onClick={() => mutation.mutate()}>
            Logout
          </Button>
        ) : (
          <NextLink href="/auth/signup">
            <Button variant="lightSolid" overflow="hidden">
              Get started
            </Button>
          </NextLink>
        )}

        {/* Admin stuff */}
        {isLoggedIn && (
          <>
            <Button variant="ghost">Create camp</Button>

            <Badge
              colorScheme="orange"
              h={pxToRem(32)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              px={pxToRem(8)}
              rounded="full"
              fontSize="md"
              color={customTheme.color.brand.orange}
              bg={customTheme.color.brand.lightOrange}
            >
              Admin
            </Badge>
          </>
        )}
      </HStack>
    </HStack>
  );
}
