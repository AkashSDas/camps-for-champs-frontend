import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import ResizeTextarea from "react-textarea-autosize";

import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Spinner, Text, useToast, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useEditCamp, useUser } from "../../lib/hooks";
import { updateLocationSettings } from "../../services/camp.service";
import { CampSettingsLayout } from "./layout";

export default function LocationSettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var { register, handleSubmit, formState } = useForm({
    defaultValues: {
      address: camp?.address ?? "",
      latitude: camp?.location ? camp.location.coordinates[0] : undefined,
      longitude: camp?.location ? camp.location.coordinates[1] : undefined,
      googleMapURL: camp?.googleMapURL ?? undefined,
    },
  });

  var mutation = useMutation({
    mutationFn: async (data: typeof formState.defaultValues) => {
      // If latitude is given then longitude must be given and vice versa
      if (data?.latitude || data?.longitude) {
        if (!data?.latitude || !data?.longitude) {
          toast({
            title: "Update camp setting failed",
            description: "Please provide both latitude and longitude",
            status: "error",
            isClosable: true,
          });
          return;
        }
      }

      var payload = {
        address: data?.address ?? undefined,
        coordinates:
          data?.latitude && data?.longitude
            ? `${data.latitude},${data.longitude}`
            : undefined,
        googleMapURL:
          data?.googleMapURL == ""
            ? undefined
            : data?.googleMapURL ?? undefined,
      };

      data?.googleMapURL == "";

      return updateLocationSettings(
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
            Location
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          {/* Address input */}
          <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              as={ResizeTextarea}
              {...register("address")}
              minH={pxToRem(100)}
              py={pxToRem(12)}
              borderColor={
                formState.errors.address
                  ? "b.red4"
                  : formState.touchedFields.address
                  ? "b.green4"
                  : "b.grey4"
              }
              resize="none"
            />

            <FormErrorMessage>
              {formState.errors.address?.message}
            </FormErrorMessage>
          </FormControl>

          {/* Latitude and longitude inputs */}
          <LatitudeInput />
          <LongitudeInput />

          {/* Google map URL input */}
          <GoogleMapURLInput />

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

  function GoogleMapURLInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.googleMapURL}>
        <FormLabel>Google map URL</FormLabel>
        <Input
          type="url"
          {...register("googleMapURL")}
          borderColor={
            formState.errors.googleMapURL
              ? "b.red4"
              : formState.touchedFields.googleMapURL
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.googleMapURL?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }

  function LatitudeInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.latitude}>
        <FormLabel>Latitude</FormLabel>
        <Input
          type="number"
          {...register("latitude")}
          min={-90}
          max={90}
          borderColor={
            formState.errors.latitude
              ? "b.red4"
              : formState.touchedFields.latitude
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.latitude?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }

  function LongitudeInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.longitude}>
        <FormLabel>Longitude</FormLabel>
        <Input
          type="number"
          {...register("longitude")}
          min={-180}
          max={180}
          borderColor={
            formState.errors.longitude
              ? "b.red4"
              : formState.touchedFields.longitude
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.longitude?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
}
