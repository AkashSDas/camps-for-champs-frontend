import NextLink from "next/link";

import { Heading, Text, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import LoginForm from "./login-form";

export default function LoginSection(): JSX.Element {
  return (
    <VStack justifyContent="center" gap={pxToRem(32)} px={pxToRem(64)}>
      <Heading fontSize={pxToRem(40)}>Login</Heading>

      <LoginForm />

      <Text fontWeight="medium">
        {"Don't"} have an account?{" "}
        <NextLink href="/auth/signup" style={{ color: theme.colors.b.blue3 }}>
          Signup
        </NextLink>
      </Text>
    </VStack>
  );
}
