import { pxToRem } from "../../lib/chakra-ui";
import { queryClient } from "../../lib/react-query";
import { signup } from "../../services/auth.service";
import { SignupInput } from "../../lib/input-schema";
import { signupSchema } from "../../lib/yup-schema";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function SignupForm(): JSX.Element {
  var toast = useToast();
  var router = useRouter();
  var { reset, register, handleSubmit, formState } = useForm<SignupInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signupSchema),
  });

  var mutation = useMutation({
    mutationFn: (data: SignupInput) => signup(data),
    onSuccess: async function signupSuccess(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "Account not created",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else if (data.success && data.user) {
        await queryClient.invalidateQueries(["user"]);

        toast({
          title: "Account created",
          description: data.message,
          status: "success",
          isClosable: true,
        });

        reset();
        router.push("/");
      } else {
        toast({
          title: "Account not created",
          description: "Please try again later",
          status: "error",
          isClosable: true,
        });
      }
    },
    onError(error) {
      toast({
        title: "Account not created",
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
      onSubmit={handleSubmit(async (data) => await mutation.mutateAsync(data))}
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
