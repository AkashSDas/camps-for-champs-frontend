import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation } from "react-query";

import { Button, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { queryClient } from "../../lib/react-query";
import { createOauthSession } from "../../services/auth.service";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import CancelOauthSignup from "./cancel-oauth-signup";
import CompleteSignupForm from "./complete-signup-form";
import SignupForm from "./signup-form";

export default function SignupSection(): JSX.Element {
  var { isLoggedIn } = useUser();
  var router = useRouter();
  var toast = useToast();

  function openSignupWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}-signup`,
      "_self"
    );
  }

  var mutation = useMutation({
    mutationFn: () => createOauthSession(router.query?.token as string),
    onSuccess: async function updateUser(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "Failed to create session",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else if (data.success && data.user) {
        queryClient.setQueryData("user", {
          user: data.user,
          accessToken: data.accessToken,
        });

        toast({
          title: "Session created",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to create session",
          description: "Please try again later",
          status: "error",
          isClosable: true,
        });
      }
    },
    onError(error) {
      toast({
        title: "Failed to create session",
        description: (error as any)?.message ?? "Please try again later",
        status: "error",
        isClosable: true,
      });
    },
  });

  useEffect(
    function checkAndCreateOauthSession() {
      if (router.query?.token) mutation.mutate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query?.token]
  );

  useEffect(
    function redirectUser() {
      if (isLoggedIn) router.replace("/");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn]
  );

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} px={pxToRem(64)}>
      <Heading fontSize={pxToRem(40)}>
        {!isLoggedIn ? "Signup" : "Complete Signup"}
      </Heading>

      {isLoggedIn && (
        <Text w="full" maxW={pxToRem(400)} textAlign="center" fontSize="sm">
          Your account will be connected to your new CampsForChamps account.
          Wrong identity? <CancelOauthSignup />
        </Text>
      )}

      <VStack gap={pxToRem(24)}>
        {!isLoggedIn && (
          <HStack gap={pxToRem(32)}>
            <Button
              variant="outline"
              onClick={() => openSignupWindow("google")}
            >
              <GoogleIcon />
            </Button>

            <Button
              variant="outline"
              onClick={() => openSignupWindow("twitter")}
            >
              <TwitterIcon />
            </Button>

            <Button
              variant="outline"
              onClick={() => openSignupWindow("facebook")}
            >
              <FacebookIcon />
            </Button>
          </HStack>
        )}

        <Text fontFamily="heading">OR</Text>

        {!isLoggedIn ? <SignupForm /> : <CompleteSignupForm />}

        <Text fontWeight="medium">
          Already have an account?{" "}
          <NextLink href="/auth/login" style={{ color: theme.colors.b.blue3 }}>
            Login
          </NextLink>
        </Text>
      </VStack>
    </VStack>
  );
}
