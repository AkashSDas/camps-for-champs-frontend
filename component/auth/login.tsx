import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

import { Button, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { LoginInput, loginSchema } from "../../lib/schema";
import { login } from "../../services/auth";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";

export default function LoginSection() {
  var { user } = useUser();

  function openLoginWindow(provider: "google" | "facebook" | "twitter") {
    window.open(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/${provider}`,
      "_self"
    );
  }

  var router = useRouter();
  var { reset, register, handleSubmit, formState } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  var mutation = useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: async (_response) => {
      await queryClient.invalidateQueries(["access-token"]);
      toast.success("Login successful");
      reset();
      router.push("/");
    },
    onError: (error: any) => {
      let errorMsg = error?.message;
      if (!errorMsg) toast.error("Something went wrong");
      else {
        if (Array.isArray(errorMsg)) {
          toast.error(error?.message[0] ?? "Something went wrong");
        } else toast.error(error?.message);
      }
    },
  });

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} w={pxToRem(400)}>
      <Heading fontSize={pxToRem(40)}>Login</Heading>

      <VStack justifyContent="center" gap={pxToRem(24)} width="full">
        {/* OAuth buttons */}
        <HStack gap={pxToRem(32)}>
          <Button variant="outline" onClick={() => openLoginWindow("google")}>
            <GoogleIcon />
          </Button>

          <Button variant="outline" onClick={() => openLoginWindow("twitter")}>
            <TwitterIcon />
          </Button>

          <Button variant="outline" onClick={() => openLoginWindow("facebook")}>
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
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
        >
          <FormControl isInvalid={formState.errors.email ? true : false}>
            <HStack justifyContent="space-between" alignItems="center">
              <FormLabel>Email</FormLabel>

              <Text
                fontFamily="body"
                fontSize="sm"
                fontWeight="medium"
                pb={pxToRem(8)}
              >
                <NextLink
                  href="/auth/forgot-password"
                  style={{ color: "#1877F2" }}
                >
                  Forgot Password
                </NextLink>
              </Text>
            </HStack>

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
