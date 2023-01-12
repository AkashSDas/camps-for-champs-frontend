import NextLink from "next/link";

import { Heading, Text, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import SignupForm from "./signup-form";

export default function SignupSection(): JSX.Element {
  var { isLoggedIn } = useUser();

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} px={pxToRem(64)}>
      <Heading fontSize={pxToRem(40)}>
        {!isLoggedIn ? "Signup" : "Complete Signup"}
      </Heading>

      {!isLoggedIn ? <SignupForm /> : null}

      <Text fontWeight="medium">
        Already have an account?{" "}
        <NextLink href="/auth/login" style={{ color: theme.colors.b.blue3 }}>
          Login
        </NextLink>
      </Text>
    </VStack>
  );
}
