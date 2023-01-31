import LoginForm from "./login-form";
import NextLink from "next/link";
import { createOauthSession } from "../../services/auth.service";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import { pxToRem, theme } from "../../lib/chakra-ui";
import { queryClient } from "../../lib/react-query";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";

import {
  Button,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function LoginSection(): JSX.Element {
  var { isLoggedIn } = useUser();
  var toast = useToast();
  var router = useRouter();

  function openLoginWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}-login`,
      "_self"
    );
  }

  useEffect(
    function checkInvalidOAuthSignup() {
      if (router.query?.info == "signup-invalid") {
        toast({
          title: "Signup is incomplete",
          description: "You're signup process is incomplete",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      router.push("/auth/login", undefined, { shallow: true });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query?.info]
  );

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
      <Heading fontSize={pxToRem(40)}>Login</Heading>

      <VStack gap={pxToRem(24)}>
        {!isLoggedIn && (
          <HStack gap={pxToRem(32)}>
            <Button variant="outline" onClick={() => openLoginWindow("google")}>
              <GoogleIcon />
            </Button>

            <Button
              variant="outline"
              onClick={() => openLoginWindow("twitter")}
            >
              <TwitterIcon />
            </Button>

            <Button
              variant="outline"
              onClick={() => openLoginWindow("facebook")}
            >
              <FacebookIcon />
            </Button>
          </HStack>
        )}

        <Text fontFamily="heading">OR</Text>

        <LoginForm />

        <Text fontWeight="medium">
          {"Don't"} have an account?{" "}
          <NextLink href="/auth/signup" style={{ color: theme.colors.b.blue3 }}>
            Signup
          </NextLink>
        </Text>
      </VStack>
    </VStack>
  );
}
