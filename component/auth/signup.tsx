import NextLink from "next/link";

import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";
import CompleteOAuthForm from "./complete-oauth-form";
import SignupForm from "./signup-form";

export default function SignupSection() {
  function openSignupWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup/${provider}`,
      "_self"
    );
  }

  var { user } = useUser();

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} w={pxToRem(400)}>
      <Heading fontSize={pxToRem(40)}>
        {!user ? "Signup" : "Complete Signup"}
      </Heading>

      {user && (
        <Text textAlign="center" fontWeight="500">
          Your account will be connected to your new CampsForChamps account.
          Wrong identity?{" "}
          <Text cursor="pointer" style={{ color: "#1877F2" }}>
            Start over
          </Text>
        </Text>
      )}

      <VStack justifyContent="center" gap={pxToRem(24)} width="full">
        {/* OAuth buttons */}
        {!user && (
          <HStack gap={pxToRem(32)}>
            <Button
              variant="outline"
              onClick={() => openSignupWindow("google")}
            >
              <GoogleIcon />
            </Button>

            <Button variant="outline">
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

        {!user && <Heading size="md">OR</Heading>}

        {!user ? <SignupForm /> : <CompleteOAuthForm />}

        <Text fontWeight="medium">
          Already have an account?{" "}
          <NextLink href="/auth/login" style={{ color: "#1877F2" }}>
            Login
          </NextLink>
        </Text>
      </VStack>
    </VStack>
  );
}
