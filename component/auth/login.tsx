import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/pxToRem";
import { LoginInput, loginSchema } from "../../lib/schema";
import { login } from "../../services/auth";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";

export default function LoginSection() {
  var router = useRouter();
  var { reset, register, handleSubmit, formState } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    var response = await login(data);
    if (!response.success) {
      let errorMsg = response.error?.message;
      if (!errorMsg) toast.error("Something went wrong");
      else {
        if (Array.isArray(errorMsg)) {
          toast.error(response.error?.message[0] ?? "Something went wrong");
        } else toast.error(response.error?.message);
      }
    } else {
      toast.success("Login successful");
      reset();
      router.push("/");
    }
  }

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} w={pxToRem(400)}>
      <Heading fontSize={pxToRem(40)}>Login</Heading>

      <VStack justifyContent="center" gap={pxToRem(24)} width="full">
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
            {formState.isSubmitting ? "Loading..." : "Login with email"}
          </Button>
        </VStack>

        <Text fontWeight="medium">
          {"Don't"} have an account?{" "}
          <NextLink href="/auth/signup" style={{ color: "#1877F2" }}>
            Signup
          </NextLink>
        </Text>
      </VStack>
    </VStack>
  );
}
