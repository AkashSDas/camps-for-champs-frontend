import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { Button, FormControl, FormErrorMessage, FormLabel, Input, Spinner, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/chakra-ui";
import { useUser } from "../../lib/hooks";
import { CompleteOauthSignupInput, SignupInput } from "../../lib/input-schema";
import { queryClient } from "../../lib/react-query";
import { completeOauthSignupSchema, signupSchema } from "../../lib/yup-schema";
import { completeOauthSignup, signup } from "../../services/auth.service";

export default function CompleteSignupForm(): JSX.Element {
  var toast = useToast();
  var router = useRouter();
  var { accessToken } = useUser();
  var { reset, register, handleSubmit, formState } =
    useForm<CompleteOauthSignupInput>({
      defaultValues: { email: "" },
      resolver: yupResolver(completeOauthSignupSchema),
    });

  var mutation = useMutation({
    mutationFn: (data: CompleteOauthSignupInput) =>
      completeOauthSignup(accessToken as string, data),
    onSuccess: async function signupSuccess(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "OAuth signup failed",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else if (data.success && data.user) {
        await queryClient.invalidateQueries(["user"]);

        toast({
          title: "Signup completed",
          description: data.message,
          status: "success",
          isClosable: true,
        });

        reset();
        router.push("/");
      } else {
        toast({
          title: "OAuth signup failed",
          description: "Please try again later",
          status: "error",
          isClosable: true,
        });
      }
    },
    onError(error) {
      toast({
        title: "OAuth signup failed",
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

      {/* Submit button */}
      <Button
        variant="solid"
        type="submit"
        disabled={formState.isSubmitting}
        px={formState.isSubmitting ? pxToRem(64) : pxToRem(32)}
      >
        {formState.isSubmitting ? <Spinner /> : "Complete signup"}
      </Button>
    </VStack>
  );
}
