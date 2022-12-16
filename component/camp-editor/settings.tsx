import { useEffect, useState } from "react";
import { FormState, useForm, UseFormRegister } from "react-hook-form";

import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Radio, Text, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEditCamp, useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { Amenity, CampAccessibilityType, campDetailSchema, CampDetailsInput } from "../../lib/schema";

export interface CampDetailsInputProps {
  formState: FormState<CampDetailsInput>;
  register: UseFormRegister<CampDetailsInput>;
}

export default function CampSettingsTab() {
  var { camp } = useEditCamp();
  var { reset, register, handleSubmit, formState, getValues, setValue, watch } =
    useForm<CampDetailsInput>({
      defaultValues: {
        name: camp?.name ?? "",
        description: camp?.description ?? "",
        price: camp?.price,
        campLimit: camp?.campLimit,
        checkInTime: camp?.checkInTime ?? {
          hour: 0,
          minute: 0,
          meridiem: "AM",
        },
        checkOutTime: camp?.checkOutTime ?? {
          hour: 0,
          minute: 0,
          meridiem: "AM",
        },
        amenities: camp?.amenities ?? [],
        accessibility: camp?.accessibility ?? [],
      },
      // resolver: yupResolver(campDetailSchema),
    });

  async function onSubmit(data: CampDetailsInput) {
    console.log(data);
  }

  function AmenityInput() {
    function toggleAmenity(value: Amenity) {
      if (getValues().amenities.includes(value)) {
        setValue(
          "amenities",
          getValues().amenities.filter((v) => v != value)
        );
      } else {
        setValue("amenities", [...getValues().amenities, value]);
      }
    }

    return (
      <VStack align="flex-start" spacing={pxToRem(16)}>
        <Text fontWeight="bold">Amenities</Text>
        <HStack spacing={pxToRem(16)} flexWrap="wrap" justifyContent="start">
          {Object.values(Amenity)?.map((amenity: Amenity) => (
            <Radio
              key={amenity}
              isChecked={watch("amenities").includes(amenity)}
              onClick={() => toggleAmenity(amenity)}
            >
              {amenity}
            </Radio>
          ))}
        </HStack>
      </VStack>
    );
  }

  function Accessibility() {
    function toggleAccessibility(value: CampAccessibilityType) {
      if (getValues().accessibility.includes(value)) {
        setValue(
          "accessibility",
          getValues().accessibility.filter((v) => v != value)
        );
      } else {
        setValue("accessibility", [...getValues().accessibility, value]);
      }
    }

    return (
      <VStack align="flex-start" spacing={pxToRem(16)}>
        <Text fontWeight="bold">Accessibility</Text>
        <HStack spacing={pxToRem(16)}>
          <Radio
            isChecked={watch("accessibility").includes(
              CampAccessibilityType.ROAD
            )}
            onClick={() => toggleAccessibility(CampAccessibilityType.ROAD)}
          >
            Road
          </Radio>
          <Radio
            isChecked={watch("accessibility").includes(
              CampAccessibilityType.WATER
            )}
            onClick={() => toggleAccessibility(CampAccessibilityType.WATER)}
          >
            Water
          </Radio>
          <Radio
            isChecked={watch("accessibility").includes(
              CampAccessibilityType.AIR
            )}
            onClick={() => {
              console.log("air");
              toggleAccessibility(CampAccessibilityType.AIR);
            }}
          >
            Air
          </Radio>
        </HStack>
      </VStack>
    );
  }

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={pxToRem(32)}
      w="full"
      maxW={pxToRem(800)}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <NameInput register={register} formState={formState} />
      <DescriptionInput register={register} formState={formState} />
      <PriceInput register={register} formState={formState} />
      <CampUnitLimitInput register={register} formState={formState} />
      <CheckInHrInput register={register} formState={formState} />
      <CheckOutHrInput register={register} formState={formState} />
      <Accessibility />
      <AmenityInput />

      <Button
        maxW="fit-content"
        variant="regularSolid"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
}

function NameInput({ register, formState }: CampDetailsInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input type="text" variant="base" {...register("name")} />
      <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
    </FormControl>
  );
}

function CampUnitLimitInput({ register, formState }: CampDetailsInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="campLimit">Camp Limit</FormLabel>
      <Input type="number" variant="base" {...register("campLimit")} />
      <FormErrorMessage>{formState.errors.campLimit?.message}</FormErrorMessage>
    </FormControl>
  );
}

function CheckOutHrInput({ register, formState }: CampDetailsInputProps) {
  var [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  return (
    <FormControl>
      <FormLabel>Check out time</FormLabel>

      <HStack gap={pxToRem(32)}>
        {/* Hour */}
        <VStack>
          <HStack gap={pxToRem(12)}>
            <Input
              type="number"
              variant="base"
              {...register("checkOutTime.hour")}
              min={0}
              max={24}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">hr</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkOutTime?.hour?.message}
          </FormErrorMessage>
        </VStack>

        {/* Minute */}
        <VStack>
          <HStack gap={pxToRem(12)}>
            <Input
              type="number"
              variant="base"
              {...register("checkOutTime.mintues")}
              min={0}
              max={60}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">min</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkOutTime?.mintues?.message}
          </FormErrorMessage>
        </VStack>

        {/* Meridiem */}
        <HStack>
          <Text
            fontFamily="heading"
            color={meridiem == "AM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => setMeridiem("AM")}
          >
            AM
          </Text>
          <Text
            fontFamily="heading"
            color={meridiem == "PM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => setMeridiem("PM")}
          >
            PM
          </Text>
        </HStack>
      </HStack>
    </FormControl>
  );
}

function CheckInHrInput({ register, formState }: CampDetailsInputProps) {
  var [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");

  return (
    <FormControl>
      <FormLabel>Check in time</FormLabel>

      <HStack gap={pxToRem(32)}>
        {/* Hour */}
        <VStack>
          <HStack gap={pxToRem(12)}>
            <Input
              type="number"
              variant="base"
              {...register("checkInTime.hour")}
              min={0}
              max={24}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">hr</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkInTime?.hour?.message}
          </FormErrorMessage>
        </VStack>

        {/* Minute */}
        <VStack>
          <HStack gap={pxToRem(12)}>
            <Input
              type="number"
              variant="base"
              {...register("checkInTime.mintues")}
              min={0}
              max={60}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">min</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkInTime?.mintues?.message}
          </FormErrorMessage>
        </VStack>

        {/* Meridiem */}
        <HStack>
          <Text
            fontFamily="heading"
            color={meridiem == "AM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => setMeridiem("AM")}
          >
            AM
          </Text>
          <Text
            fontFamily="heading"
            color={meridiem == "PM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => setMeridiem("PM")}
          >
            PM
          </Text>
        </HStack>
      </HStack>
    </FormControl>
  );
}

function DescriptionInput({ register, formState }: CampDetailsInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        as="textarea"
        type="text"
        variant="base"
        {...register("description")}
        h={pxToRem(180)}
        p={pxToRem(16)}
      />
      <FormErrorMessage>
        {formState.errors.description?.message}
      </FormErrorMessage>
    </FormControl>
  );
}

function PriceInput({ register, formState }: CampDetailsInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="price">Price</FormLabel>
      <Input type="number" variant="base" {...register("price")} />
      <FormErrorMessage>{formState.errors.price?.message}</FormErrorMessage>
    </FormControl>
  );
}
