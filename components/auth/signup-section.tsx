import NextLink from "next/link";

import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import SignupForm from "./signup-form";

export default function SignupSection(): JSX.Element {
  var { isLoggedIn } = useUser();

  function openSignupWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${provider}-signup`,
      "_self"
    );
  }

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} px={pxToRem(64)}>
      <Heading fontSize={pxToRem(40)}>
        {!isLoggedIn ? "Signup" : "Complete Signup"}
      </Heading>

      {isLoggedIn && (
        <Text w="full" textAlign="center" fontSize="sm">
          Your account will be connected to your new CampsForChamps account.
          Wrong identity? Cancel
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

        {!isLoggedIn ? <SignupForm /> : null}

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
