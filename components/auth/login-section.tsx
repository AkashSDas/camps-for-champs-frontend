import NextLink from "next/link";

import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import LoginForm from "./login-form";

export default function LoginSection(): JSX.Element {
  var { isLoggedIn } = useUser();

  function openLoginWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}-login`,
      "_self"
    );
  }

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
