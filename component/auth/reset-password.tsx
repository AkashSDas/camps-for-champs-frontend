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
import { LoginInput, loginSchema, ResetPasswordInput, resetPasswordSchema } from "../../lib/schema";
import { login, resetPassword } from "../../services/auth";
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../icons/social";

export default function ResetPasswordSection() {
  var router = useRouter();
  var { reset, register, handleSubmit, formState } =
    useForm<ResetPasswordInput>({
      defaultValues: { password: "", confirmPassword: "" },
      resolver: yupResolver(resetPasswordSchema),
    });

  async function onSubmit(data: ResetPasswordInput) {
    try {
      var response = await resetPassword(data, router.query.token as string);

      if (response.success) {
        toast.success(response.message);
        reset();
      } else {
        let error = response.error;
        let errorMsg = error?.message;
        if (!errorMsg) toast.error("Something went wrong");
        else {
          if (Array.isArray(errorMsg)) {
            toast.error(error?.message[0] ?? "Something went wrong");
          } else toast.error(error?.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <VStack justifyContent="center" gap={pxToRem(32)} w={pxToRem(400)}>
      <Heading fontSize={pxToRem(40)}>Reset Password</Heading>

      {/* Reset password form */}
      <VStack
        w="full"
        as="form"
        justifyContent="center"
        gap={pxToRem(24)}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
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

        <FormControl
          isInvalid={formState.errors.confirmPassword ? true : false}
        >
          <FormLabel>Confirm password</FormLabel>
          <Input
            type="password"
            variant="base"
            {...register("confirmPassword")}
            borderColor={
              formState.errors.confirmPassword
                ? "red.500"
                : formState.touchedFields.confirmPassword
                ? "green.500"
                : "#CDCDCD"
            }
          />

          <FormErrorMessage>
            {formState.errors.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          variant="regularSolid"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Loading..." : "Update password"}
        </Button>
      </VStack>

      <Text fontWeight="medium">
        Already have an account?{" "}
        <NextLink href="/auth/login" style={{ color: "#1877F2" }}>
          Login
        </NextLink>
      </Text>
    </VStack>
  );
}
