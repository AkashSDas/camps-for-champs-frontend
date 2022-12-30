import { useEffect, useState } from "react";
import {
  FormState,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  HStack,
  Input,
  Radio,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEditCamp, useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import {
  Amenity,
  CampAccessibilityType,
  campDetailSchema,
  CampDetailsInput,
} from "../../lib/schema";
import { updateCampSettings } from "../../services/camp";
import { toast } from "react-hot-toast";

export interface CampDetailsInputProps {
  formState: FormState<CampDetailsInput>;
  register: UseFormRegister<CampDetailsInput>;
}

export default function CampSettingsTab() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();

  var { register, handleSubmit, formState, getValues, setValue, watch } =
    useForm<CampDetailsInput>({
      defaultValues: {
        name: camp?.name ?? "",
        description: camp?.description ?? "",
        price: camp?.price ?? 0,
        campLimit: camp?.campLimit ?? 0,
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
        accessibilities: camp?.accessibilities ?? [],
      },
      resolver: yupResolver(campDetailSchema),
    });

  async function onSubmit(data: CampDetailsInput) {
    var response = await updateCampSettings(camp?._id, data, accessToken);
    if (response.success) {
      toast.success("Camp settings updated");
    } else {
      toast.error("Failed to update camp settings");
    }
  }

  function AmenityInput(): JSX.Element {
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
              isChecked={watch("amenities").includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
            >
              {amenity}
            </Checkbox>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  function Accessibility(): JSX.Element {
    function toggleAccessibility(value: CampAccessibilityType) {
      if (getValues().accessibilities.includes(value)) {
        setValue(
          "accessibilities",
          getValues().accessibilities.filter((v) => v != value)
        );
      } else {
        setValue("accessibilities", [...getValues().accessibilities, value]);
      }
    }

    return (
      <VStack align="flex-start" spacing={pxToRem(16)}>
        <Text fontWeight="bold">Accessibility</Text>
        <Text fontSize="sm" color="gray.500">
          {JSON.stringify(formState.errors?.accessibilities?.message)}
        </Text>
        <HStack spacing={pxToRem(16)}>
          <Checkbox
            isChecked={watch("accessibilities").includes(
              CampAccessibilityType.ROAD
            )}
            onChange={() => toggleAccessibility(CampAccessibilityType.ROAD)}
          >
            Road
          </Checkbox>
          <Checkbox
            isChecked={watch("accessibilities").includes(
              CampAccessibilityType.WATER
            )}
            onChange={() => toggleAccessibility(CampAccessibilityType.WATER)}
          >
            Water
          </Checkbox>
          <Checkbox
            isChecked={watch("accessibilities").includes(
              CampAccessibilityType.AIR
            )}
            onChange={() => toggleAccessibility(CampAccessibilityType.AIR)}
          >
            Air
          </Checkbox>
        </HStack>
      </VStack>
    );
  }

  return (
    <Box
      as="form"
      mb={pxToRem(64)}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={pxToRem(32)}
      w="full"
      maxW={pxToRem(800)}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Text>{JSON.stringify(camp?.checkOutTime)}</Text>

      {/* Basic inputs */}
      <NameInput register={register} formState={formState} />
      <DescriptionInput register={register} formState={formState} />
      <PriceInput register={register} formState={formState} />
      <CampUnitLimitInput register={register} formState={formState} />

      {/* Complex inputs */}

      <CheckInHrInput
        register={register}
        formState={formState}
        setValue={setValue}
      />
      <CheckOutHrInput
        register={register}
        formState={formState}
        setValue={setValue}
      />

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
      <Input
        type="text"
        variant="base"
        {...register("name")}
        minLength={0}
        maxLength={128}
        required
      />
      <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
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
        minLength={0}
        maxLength={4096}
        required
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
      <Input
        type="number"
        variant="base"
        {...register("price")}
        min={0}
        required
      />
      <FormErrorMessage>{formState.errors.price?.message}</FormErrorMessage>
    </FormControl>
  );
}

function CampUnitLimitInput({ register, formState }: CampDetailsInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="campLimit">Camp Limit</FormLabel>
      <Input
        type="number"
        variant="base"
        {...register("campLimit")}
        min={0}
        required
      />
      <FormErrorMessage>{formState.errors.campLimit?.message}</FormErrorMessage>
    </FormControl>
  );
}

function CheckInHrInput({
  register,
  formState,
  setValue,
}: CampDetailsInputProps & { setValue: UseFormSetValue<CampDetailsInput> }) {
  var { camp } = useEditCamp();
  var [meridiem, setMeridiem] = useState<"AM" | "PM">(
    camp?.checkInTime?.meridiem ?? "AM"
  );

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
              min={1}
              max={12}
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
              {...register("checkInTime.minute")}
              min={0}
              max={60}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">min</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkInTime?.minute?.message}
          </FormErrorMessage>
        </VStack>

        {/* Meridiem */}
        <HStack>
          <Text
            fontFamily="heading"
            color={meridiem == "AM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              setMeridiem("PM");
              setValue("checkInTime.meridiem", "AM");
            }}
          >
            AM
          </Text>
          <Text
            fontFamily="heading"
            color={meridiem == "PM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              setMeridiem("PM");
              setValue("checkInTime.meridiem", "PM");
            }}
          >
            PM
          </Text>
        </HStack>
      </HStack>
    </FormControl>
  );
}

function CheckOutHrInput({
  register,
  formState,
  setValue,
}: CampDetailsInputProps & { setValue: UseFormSetValue<CampDetailsInput> }) {
  var { camp } = useEditCamp();
  var [meridiem, setMeridiem] = useState<"AM" | "PM">(
    camp?.checkOutTime?.meridiem ?? "AM"
  );

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
              {...register("checkOutTime.minute")}
              min={0}
              max={60}
              w={pxToRem(100)}
            />

            <Text fontWeight="medium">min</Text>
          </HStack>

          <FormErrorMessage>
            {formState.errors.checkOutTime?.minute?.message}
          </FormErrorMessage>
        </VStack>

        {/* Meridiem */}
        <HStack>
          <Text
            fontFamily="heading"
            color={meridiem == "AM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              setMeridiem("PM");
              setValue("checkOutTime.meridiem", "AM");
            }}
          >
            AM
          </Text>
          <Text
            fontFamily="heading"
            color={meridiem == "PM" ? "#DF6531" : ""}
            fontWeight="medium"
            cursor="pointer"
            onClick={() => {
              setMeridiem("PM");
              setValue("checkOutTime.meridiem", "PM");
            }}
          >
            PM
          </Text>
        </HStack>
      </HStack>
    </FormControl>
  );
}
