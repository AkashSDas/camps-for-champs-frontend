import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Button, Heading, HStack, Text, useToast, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import LoginForm from "./login-form";

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
