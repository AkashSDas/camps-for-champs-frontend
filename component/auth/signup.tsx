import { Box } from "framer-motion";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { theme as chakraUiTheme } from "../../lib/chakra";
import { pxToRem } from "../../lib/pxToRem";
import { SignupInput, signupSchema } from "../../lib/schema";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";

export default function SignupSection() {
  var { register, handleSubmit, formState } = useForm<SignupInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signupSchema),
  });

  async function onSubmit(data: SignupInput) {
    console.log(data);
  }

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} w={pxToRem(400)}>
      <Heading fontSize={pxToRem(40)}>Signup</Heading>

      <VStack justifyContent="center" gap={pxToRem(24)}>
        {/* OAuth buttons */}
        <HStack gap={pxToRem(32)}>
          <Button variant="outline">
            <GoogleIcon />
          </Button>

          <Button variant="outline">
            <TwitterIcon />
          </Button>

          <Button variant="outline">
            <FacebookIcon />
          </Button>
        </HStack>

        <Heading size="md">OR</Heading>

        {/* Signup form */}
        <VStack
          w="full"
          as="form"
          justifyContent="center"
          gap={pxToRem(24)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={formState.errors.email ? true : false}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              variant="base"
              {...register("email")}
              borderColor={
                formState.errors.email
                  ? "red.500"
                  : formState.touchedFields.email
                  ? "green.500"
                  : "#CDCDCD"
              }
            />

            <FormErrorMessage>
              {formState.errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formState.errors.password ? true : false}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              variant="base"
              {...register("password")}
              borderColor={
                formState.errors.password
                  ? "red.500"
                  : formState.touchedFields.password
                  ? "green.500"
                  : "#CDCDCD"
              }
            />

            <FormErrorMessage>
              {formState.errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            variant="regularSolid"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Loading..." : "Signup with email"}
          </Button>
        </VStack>

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
