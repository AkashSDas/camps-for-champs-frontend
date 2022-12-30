import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useRef, useState } from "react";
import { FormState, useForm, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { CampImageType } from "../../lib/camp";
import { useEditCamp, useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { campLocationSchema } from "../../lib/schema";
import { addCampImage, updateCampLocation } from "../../services/camp";

interface CampInputProps {
  formState: FormState<CampLocationInput>;
  register: UseFormRegister<CampLocationInput>;
}

enum OperationalState {
  MAHARASHTRA = "maharashtra",
}

enum OperationalCity {
  MUMBAI = "mumbai",
}

export interface CampLocationInput {
  state: OperationalState;
  city: OperationalCity;
  address: string;
  latitude: number;
  longitude: number;
}

export default function CampLocationSettingsTab() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();

  var { register, handleSubmit, formState, watch, setValue } =
    useForm<CampLocationInput>({
      defaultValues: {
        state: camp?.location?.state ?? "",
        city: camp?.location?.city ?? "",
        address: camp?.location?.address ?? "",
        latitude: camp?.location?.latitude ?? 0,
        longitude: camp?.location?.longitude ?? 0,
      },
      resolver: yupResolver(campLocationSchema),
    });

  async function onSubmit(data: CampLocationInput) {
    var response = await updateCampLocation(camp?._id, data, accessToken);
    if (response.success) {
      toast.success("Camp location updated");
    } else {
      toast.error("Failed to update camp location");
    }
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
      <OperationalStateInput register={register} formState={formState} />
      <OperationalCityInput register={register} formState={formState} />
      <AddressInput register={register} formState={formState} />
      <LatitudeInput register={register} formState={formState} />
      <LongitudeInput register={register} formState={formState} />

      <Button
        maxW="fit-content"
        variant="regularSolid"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Saving..." : "Save"}
      </Button>

      <Divider />

      <UpdateCampLocationImage />
    </Box>
  );
}

function LatitudeInput({ register, formState }: CampInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="latitude">Latitude</FormLabel>
      <Input
        id="latitude"
        type="number"
        variant="base"
        {...register("latitude")}
        min={-90}
        max={90}
        required
      />
      <FormErrorMessage>{formState.errors.latitude?.message}</FormErrorMessage>
    </FormControl>
  );
}

function LongitudeInput({ register, formState }: CampInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="longitude">Longitude</FormLabel>
      <Input
        id="longitude"
        type="number"
        variant="base"
        {...register("longitude")}
        min={-90}
        max={90}
        required
      />
      <FormErrorMessage>{formState.errors.longitude?.message}</FormErrorMessage>
    </FormControl>
  );
}

function AddressInput({ register, formState }: CampInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="address">Address</FormLabel>
      <Input
        id="address"
        as="textarea"
        type="text"
        variant="base"
        {...register("address")}
        h={pxToRem(180)}
        p={pxToRem(16)}
        minLength={0}
        maxLength={512}
        required
      />
      <FormErrorMessage>{formState.errors.address?.message}</FormErrorMessage>
    </FormControl>
  );
}

function OperationalStateInput({ register }: CampInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="state">Operational state</FormLabel>
      <Select id="state" placeholder="Select state" {...register("state")}>
        {Object.values(OperationalState).map((state) => (
          <option key={state} value={state}>
            {state[0].toUpperCase() + state.slice(1)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

function OperationalCityInput({ register }: CampInputProps) {
  return (
    <FormControl>
      <FormLabel htmlFor="city">Operational city</FormLabel>
      <Select id="city" placeholder="Select city" {...register("city")}>
        {Object.values(OperationalCity).map((city) => (
          <option key={city} value={city}>
            {city[0].toUpperCase() + city.slice(1)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

function UpdateCampLocationImage() {
  var { camp } = useEditCamp();
  var [image, setImage] = useState<File>();
  var inputRef = useRef<any>();
  var [loading, setLoading] = useState(false);
  var { accessToken } = useUser();

  var mutation = useMutation({
    mutationFn: () => uploadImage(),
    onSuccess: async (response) => {
      if (response?.success) {
        toast.success("Location image updated");
      } else {
        toast.error("Failed to update location image");
      }
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

  function updateImage(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
  }

  async function uploadImage() {
    if (!image) return;
    setLoading(true);

    var formData = new FormData();
    formData.append("campImage", image);
    formData.append("type", CampImageType.LOCATION);
    formData.append("description", "Camp location image");

    var { success, imageURL } = await addCampImage(
      camp._id,
      formData,
      accessToken
    );

    setLoading(false);
    return { success, imageURL };
  }

  return (
    <VStack w="full" gap={pxToRem(8)}>
      <HStack w="full" justifyContent="space-between" alignItems="center">
        <Text fontFamily="heading">Map image from Google Maps</Text>
        <HStack justifyContent="space-between" alignItems="center">
          <>
            <Button
              onClick={() => inputRef.current.click()}
              disabled={loading}
              variant="ghost"
            >
              Edit Image
            </Button>
            <Input
              type="file"
              hidden
              ref={inputRef}
              onChange={(e) => updateImage(e)}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </>

          <Button
            onClick={() => mutation.mutate()}
            disabled={!image || loading}
            variant="ghost"
          >
            {loading ? "Loading..." : "Upload Image"}
          </Button>
        </HStack>
      </HStack>

      <Image
        src={
          image
            ? URL.createObjectURL(image)
            : camp?.images?.find((v: any) => v.type == CampImageType.LOCATION)
                ?.URL ?? "https://media.giphy.com/media/UI6nnmio98eoE/giphy.gif"
        }
        alt="Camp location image"
        objectFit="cover"
        rounded="2xl"
        w="full"
        h={pxToRem(360)}
      />
    </VStack>
  );
}
