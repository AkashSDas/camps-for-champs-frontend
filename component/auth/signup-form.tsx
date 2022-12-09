import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { SignupInput, signupSchema } from "../../lib/schema";
import { signup } from "../../services/auth";

export default function SignupForm() {
  var router = useRouter();
  var { reset, register, handleSubmit, formState } = useForm<SignupInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signupSchema),
  });

  var mutation = useMutation({
    mutationFn: (data: SignupInput) => signup(data),
    onSuccess: async (_response) => {
      await queryClient.invalidateQueries(["access-token"]);
      toast.success("Signup successful");
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
    <VStack
      w="full"
      as="form"
      justifyContent="center"
      gap={pxToRem(24)}
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
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
  );
}
