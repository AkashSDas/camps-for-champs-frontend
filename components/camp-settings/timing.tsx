import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Spinner, Text, useToast, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useEditCamp, useUser } from "../../lib/hooks";
import { TimingInput } from "../../lib/input-schema";
import { updateTimingSettings } from "../../services/camp.service";
import { CampSettingsLayout } from "./layout";

export default function TimingSettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var { register, handleSubmit, formState } = useForm<TimingInput>({
    defaultValues: {
      startDate: camp?.startDate ? new Date(camp?.startDate) : undefined,
      endDate: camp?.endDate ? new Date(camp?.endDate) : undefined,
    },
  });

  var mutation = useMutation({
    mutationFn: async (data: TimingInput) => {
      var payload = {};
      if (data.startDate) payload = { ...payload, startDate: data.startDate };
      if (data.endDate) payload = { ...payload, endDate: data.endDate };

      return updateTimingSettings(
        camp?.campId as string,
        payload,
        accessToken as string
      );
    },
    onSuccess: function updateCampSettingSuccess(data, _variables, _context) {
      if (!data?.success) {
        if (data == undefined) return;

        toast({
          title: "Update camp setting failed",
          description: data?.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Setting updated",
          description: data?.message,
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
          onSubmit={handleSubmit(
            async (data) => await mutation.mutateAsync(data)
          )}
          as="form"
          w="full"
          maxW={pxToRem(800)}
          pt={pxToRem(28 + 24)}
          gap={pxToRem(24)}
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            Timing
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          <HStack>
            <Heading size="sm">Start</Heading>
            <Text>
              {camp?.startDate &&
                new Date(camp?.startDate as string).toLocaleDateString() +
                  " " +
                  new Date(camp?.startDate as string).toLocaleTimeString()}
            </Text>
          </HStack>

          <HStack>
            <Heading size="sm">End</Heading>
            <Text>
              {camp?.endDate &&
                new Date(camp?.endDate as string).toLocaleDateString() +
                  " " +
                  new Date(camp?.endDate as string).toLocaleTimeString()}
            </Text>
          </HStack>

          <Divider w="full" maxW={pxToRem(400)} />

          <StartTimingInput />
          <EndTimingInput />

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

  // =====================================
  // Components
  // =====================================

  function StartTimingInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.startDate}>
        <FormLabel>Start date/time</FormLabel>
        <Input
          type="datetime-local"
          {...register("startDate")}
          borderColor={
            formState.errors.startDate
              ? "b.red4"
              : formState.touchedFields.startDate
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.startDate?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }

  function EndTimingInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.endDate}>
        <FormLabel>End date/time</FormLabel>
        <Input
          type="datetime-local"
          {...register("endDate")}
          borderColor={
            formState.errors.endDate
              ? "b.red4"
              : formState.touchedFields.endDate
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>{formState.errors.endDate?.message}</FormErrorMessage>
      </FormControl>
    );
  }
}
