import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import ResizeTextarea from "react-textarea-autosize";

import { Button, Checkbox, Divider, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Select, SimpleGrid, Spinner, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { Accessibility, Amenity } from "../../lib/camp";
import { pxToRem, theme } from "../../lib/chakra-ui";
import { useEditCamp, useUser } from "../../lib/hooks";
import { BasicSettingInput } from "../../lib/input-schema";
import { basicSettingSchema } from "../../lib/yup-schema";
import { updateCampSetting } from "../../services/camp.service";
import { CampSettingsLayout } from "./layout";

export default function BasicSettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var { register, handleSubmit, formState, watch, getValues, setValue } =
    useForm<BasicSettingInput>({
      defaultValues: {
        name: camp?.name ?? "",
        about: camp?.about ?? "",
        accessibilities: camp?.accessibilities ?? [],
        amenities: camp?.amenities ?? [],
        price: camp?.price ?? 0,
        campLimit: camp?.campLimit ?? 0,
      },
      resolver: yupResolver(basicSettingSchema),
    });

  var mutation = useMutation({
    mutationFn: async (data: BasicSettingInput) =>
      updateCampSetting(camp?.campId as string, data, accessToken as string),
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
            Basic Settings
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          <NameInput />
          <AboutInput />
          <AccessibilityInput />
          <AmenityInput />
          <PriceInput />
          <CampLimitInput />

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
  // Utilities
  // =====================================

  function toggleAccessibility(value: Accessibility) {
    if ((getValues().accessibilities as Accessibility[]).includes(value)) {
      setValue(
        "accessibilities",
        (getValues().accessibilities as Accessibility[]).filter(
          (v) => v != value
        )
      );
    } else {
      setValue("accessibilities", [
        ...(getValues().accessibilities as Accessibility[]),
        value,
      ]);
    }
  }

  // =====================================
  // Components
  // =====================================

  function AccessibilityInput() {
    return (
      <FormControl
        w={pxToRem(400)}
        isInvalid={!!formState.errors.accessibilities}
      >
        <FormLabel>Accessibility</FormLabel>

        <HStack spacing={pxToRem(16)}>
          <Checkbox
            isChecked={(watch("accessibilities") as Accessibility[]).includes(
              Accessibility.ROAD
            )}
            onChange={() => toggleAccessibility(Accessibility.ROAD)}
          >
            Road
          </Checkbox>
          <Checkbox
            isChecked={(watch("accessibilities") as Accessibility[]).includes(
              Accessibility.WATER
            )}
            onChange={() => toggleAccessibility(Accessibility.WATER)}
          >
            Water
          </Checkbox>
          <Checkbox
            isChecked={(watch("accessibilities") as Accessibility[]).includes(
              Accessibility.AIR
            )}
            onChange={() => toggleAccessibility(Accessibility.AIR)}
          >
            Air
          </Checkbox>
        </HStack>

        <FormErrorMessage>
          {formState.errors.accessibilities?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }

  function AmenityInput(): JSX.Element {
    function toggleAmenity(value: Amenity) {
      if ((getValues().amenities as Amenity[]).includes(value)) {
        setValue(
          "amenities",
          (getValues().amenities as Amenity[]).filter((v) => v != value)
        );
      } else {
        setValue("amenities", [...(getValues().amenities as Amenity[]), value]);
      }
    }

    return (
      <FormControl w={pxToRem(400)}>
        <FormLabel>Amenities</FormLabel>
        <SimpleGrid
          w="full"
          minChildWidth={pxToRem(200)}
          flexWrap="wrap"
          justifyContent="start"
        >
          {Object.values(Amenity)?.map((amenity: Amenity) => (
            <Checkbox
              key={amenity}
              pr={pxToRem(16)}
              isChecked={(watch("amenities") as Amenity[]).includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
            >
              {amenity}
            </Checkbox>
          ))}
        </SimpleGrid>

        <FormErrorMessage>
          {formState.errors.amenities?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }

  function AboutInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.about}>
        <FormLabel>About</FormLabel>
        <Input
          type="text"
          as={ResizeTextarea}
          {...register("about")}
          minH={pxToRem(100)}
          py={pxToRem(12)}
          borderColor={
            formState.errors.about
              ? "b.red4"
              : formState.touchedFields.about
              ? "b.green4"
              : "b.grey4"
          }
          resize="none"
        />

        <FormErrorMessage>{formState.errors.about?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  function NameInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          {...register("name")}
          borderColor={
            formState.errors.about
              ? "b.red4"
              : formState.touchedFields.about
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  function PriceInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.price}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          {...register("price")}
          min={0}
          borderColor={
            formState.errors.price
              ? "b.red4"
              : formState.touchedFields.price
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>{formState.errors.price?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  function CampLimitInput() {
    return (
      <FormControl w={pxToRem(400)} isInvalid={!!formState.errors.campLimit}>
        <FormLabel>Camp limit</FormLabel>
        <Input
          type="number"
          {...register("campLimit")}
          min={0}
          borderColor={
            formState.errors.campLimit
              ? "b.red4"
              : formState.touchedFields.campLimit
              ? "b.green4"
              : "b.grey4"
          }
        />

        <FormErrorMessage>
          {formState.errors.campLimit?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
}
