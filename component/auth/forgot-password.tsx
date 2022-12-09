import NextLink from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/pxToRem";
import { ForgotPasswordInput, forgotPasswordSchema } from "../../lib/schema";
import { forgotPassword } from "../../services/auth";

export default function ForgotPasswordSection() {
  var { reset, register, handleSubmit, formState } =
    useForm<ForgotPasswordInput>({
      defaultValues: { email: "" },
      resolver: yupResolver(forgotPasswordSchema),
    });

  async function onSubmit(data: ForgotPasswordInput) {
    try {
      var response = await forgotPassword(data);

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
      <Heading fontSize={pxToRem(40)}>Forgot Password</Heading>

      <Text textAlign="center" fontWeight="500">
        Password reset link will be sent to your registered email address
      </Text>

      {/* Forgot password form */}
      <VStack
        w="full"
        as="form"
        justifyContent="center"
        gap={pxToRem(24)}
        onSubmit={handleSubmit((data) => onSubmit(data))}
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

          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button
          variant="regularSolid"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Loading..." : "Send instructions"}
        </Button>
      </VStack>

      <Text fontWeight="medium">
        {"Don't"} have an account?{" "}
        <NextLink href="/auth/signup" style={{ color: "#1877F2" }}>
          Signup
        </NextLink>
      </Text>
    </VStack>
  );
}
