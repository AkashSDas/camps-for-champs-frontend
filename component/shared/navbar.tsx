import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

import { Badge, Button, HStack, useStatStyles } from "@chakra-ui/react";

import { theme as customTheme } from "../../lib/chakra";
import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { logout } from "../../services/auth";
import { createCamp } from "../../services/camp";
import Logo from "../icons/logo";

export default function Navbar() {
  var { isLoggedIn, accessToken, user } = useUser();

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

  var [creatingCamp, setCreatingCamp] = useState(false);
  var router = useRouter();

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
        {isLoggedIn && user.roles.includes("admin") && (
          <>
            <Button
              variant="ghost"
              disabled={creatingCamp}
              onClick={async () => {
                setCreatingCamp(true);

                var response = await createCamp(accessToken);
                console.log(response);
                if (response.error) {
                  toast.error(
                    response.error?.message ?? "Failed to create camp"
                  );
                } else if (response.success) {
                  toast.success("Camp created successfully");
                  let id = response.camp._id;
                  router.push(`/admin/camp/${id}`);
                }

                setCreatingCamp(false);
              }}
            >
              Create camp
            </Button>

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
