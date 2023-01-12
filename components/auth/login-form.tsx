import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Spinner, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/chakra-ui";
import { LoginInput } from "../../lib/input-schema";
import { queryClient } from "../../lib/react-query";
import { loginSchema } from "../../lib/yup-schema";
import { login } from "../../services/auth.service";

export default function LoginForm(): JSX.Element {
  var toast = useToast();
  var router = useRouter();
  var { reset, register, handleSubmit, formState } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  var mutation = useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: async function loginSuccess(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "Failed to login",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else if (data.success && data.user) {
        queryClient.setQueryData("user", {
          user: data.user,
          accessToken: data.accessToken,
        });

        toast({
          title: "Logged in",
          description: data.message,
          status: "success",
          isClosable: true,
        });

        reset();
        router.push("/");
      } else {
        toast({
          title: "Failed to login",
          description: "Please try again later",
          status: "error",
          isClosable: true,
        });
      }
    },
    onError(error) {
      toast({
        title: "Failed to login",
        description: (error as any)?.message ?? "Please try again later",
        status: "error",
        isClosable: true,
      });
    },
  });

  return (
    <VStack
      w="full"
      as="form"
      justifyContent="center"
      gap={pxToRem(24)}
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      {/* Email field */}
      <FormControl isInvalid={formState.errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          w={pxToRem(400)}
          type="email"
          variant="base"
          {...register("email")}
          borderColor={
            formState.errors.email
              ? "b.red4"
              : formState.touchedFields.email
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
      </FormControl>

      {/* Password field */}
      <FormControl isInvalid={formState.errors.password ? true : false}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          variant="base"
          {...register("password")}
          borderColor={
            formState.errors.password
              ? "b.red4"
              : formState.touchedFields.password
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.password?.message}
        </FormErrorMessage>
      </FormControl>

      {/* Submit button */}
      <Button
        variant="solid"
        type="submit"
        disabled={formState.isSubmitting}
        px={formState.isSubmitting ? pxToRem(64) : pxToRem(32)}
      >
        {formState.isSubmitting ? <Spinner /> : "Signup with email"}
      </Button>
    </VStack>
  );
}
