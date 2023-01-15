import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import ResizeTextarea from "react-textarea-autosize";

import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useEditCamp, useUser } from "../../lib/hooks";
import { CancellationPolicyInput } from "../../lib/input-schema";
import { cancellationPolicySchema } from "../../lib/yup-schema";
import { updateCampSetting, updateCancellationPolicySettings } from "../../services/camp.service";
import { CampSettingsLayout } from "./layout";

export default function CancellationPolicySettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var {
    register,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    control,
  } = useForm<CancellationPolicyInput>({
    defaultValues: {
      type: camp?.cancellationPolicy?.type ?? undefined,
      description: camp?.cancellationPolicy?.description ?? "",
    },
    resolver: yupResolver(cancellationPolicySchema),
  });

  var mutation = useMutation({
    mutationFn: async (data: CancellationPolicyInput) =>
      updateCancellationPolicySettings(
        camp?.campId as string,
        data,
        accessToken as string
      ),
    onSuccess: function updateCampSettingSuccess(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "Update camp setting failed",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Setting updated",
          description: data.message,
          status: "success",
          isClosable: true,
        });
      }
    },
    onError(error) {
      toast({
        title: "Update camp setting failed",
        description: (error as any)?.message ?? "Please try again later",
        status: "error",
        isClosable: true,
      });
    },
  });

  return (
    <CampSettingsLayout>
      <VStack w="full">
        <VStack
          as="form"
          onSubmit={handleSubmit(
            async (data) => await mutation.mutateAsync(data)
          )}
          w="full"
          maxW={pxToRem(800)}
          pt={pxToRem(28 + 24)}
          gap={pxToRem(24)}
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            Cancellation Policy
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          {/* Cancellation policy type */}
          <FormControl w={pxToRem(400)}>
            <FormLabel>Policy Type</FormLabel>

            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value}>
                  <HStack>
                    <Radio value="flexible">Flexible</Radio>
                    <Radio value="moderate">Moderate</Radio>
                    <Radio value="strict">Strict</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* Descripton input */}
          <FormControl
            w={pxToRem(400)}
            isInvalid={!!formState.errors.description}
          >
            <FormLabel>About</FormLabel>
            <Input
              type="text"
              as={ResizeTextarea}
              {...register("description")}
              minH={pxToRem(100)}
              py={pxToRem(12)}
              borderColor={
                formState.errors.description
                  ? "b.red4"
                  : formState.touchedFields.description
                  ? "b.green4"
                  : "b.grey4"
              }
              resize="none"
            />

            <FormErrorMessage>
              {formState.errors.description?.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" px={pxToRem(64)} variant="solid">
            {mutation.isLoading ? (
              <Spinner />
            ) : (
              <Text color={theme.colors.b.grey0}>Save</Text>
            )}
          </Button>
        </VStack>
      </VStack>
    </CampSettingsLayout>
  );
}
