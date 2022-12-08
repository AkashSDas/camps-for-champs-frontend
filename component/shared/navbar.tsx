import NextLink from "next/link";
import { useMutation } from "react-query";

import { Button, HStack } from "@chakra-ui/react";

import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { logout } from "../../services/auth";
import Logo from "../icons/logo";

export default function Navbar() {
  var { user } = useUser();

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

        {user ? (
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
      </HStack>
    </HStack>
  );
}
