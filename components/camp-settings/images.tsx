import ResizeTextarea from "react-textarea-autosize";
import { addImage, removeImage } from "../../services/camp.service";
import { BackspaceIcon } from "../icons";
import { Camp, GetCampResponse } from "../../services/types/camp.service.type";
import { CampSettingsLayout } from "./layout";
import { ImageInput } from "../../lib/input-schema";
import { ImageType } from "../../lib/camp";
import { pxToRem, theme } from "../../lib/chakra-ui";
import { queryClient } from "../../lib/react-query";
import { useEditCamp, useUser } from "../../lib/hooks";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function ImagesSettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();
  var [img, setImg] = useState<File | null>(null);
  var imgRef = useRef<HTMLInputElement>(null);

  var { register, handleSubmit, formState, reset } = useForm<ImageInput>({
    defaultValues: {
      type: undefined,
      URL: undefined,
      description: "",
    },
  });

  var mutation = useMutation({
    mutationFn: async (data: ImageInput) => {
      console.log(data.type);
      if (!data.type) {
        return {
          success: false,
          message: "Please select image type",
        } as GetCampResponse;
      }

      var formData = new FormData();
      formData.append("type", data.type);
      img && formData.append("campImage", img);
      data.URL && formData.append("URL", data.URL);
      data.description && formData.append("description", data.description);
      return addImage(camp?.campId as string, formData, accessToken as string);
    },
    onSuccess: function addImageSuccess(data, _variables, _context) {
      if (!data.success) {
        toast({
          title: "Add image failed",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Image added",
          description: data.message,
          status: "success",
          isClosable: true,
        });

        queryClient.setQueryData(["edit-camp", camp?.campId], {
          success: true,
          message: "Image added",
          camp: data.camp,
        } as GetCampResponse);

        setImg(null);
        reset();
      }
    },
    onError: function addImageError(_error, _variables, _context) {
      toast({
        title: "Add image failed",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    var file = (e.target.files as any)[0];
    if (file) setImg(file);
  }

  return (
    <CampSettingsLayout>
      <VStack w="full" gap={pxToRem(64)}>
        <VStack
          as="form"
          w="full"
          maxW={pxToRem(800)}
          pt={pxToRem(28 + 24)}
          gap={pxToRem(24)}
          alignItems="center"
          onSubmit={handleSubmit(
            async (data) => await mutation.mutateAsync(data)
          )}
        >
          <Heading as="h1" size="lg">
            Images
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          <SelectImageType />
          <Description />
          <URLInput />
          <ImageInput />

          <Button type="submit" px={pxToRem(64)} variant="solid">
            {mutation.isLoading ? (
              <Spinner />
            ) : (
              <Text color={theme.colors.b.grey0}>Save</Text>
            )}
          </Button>
        </VStack>

        <CampImages />
      </VStack>
    </CampSettingsLayout>
  );

  // ==================================
  // Components
  // ==================================

  function SelectImageType() {
    return (
      <FormControl
        w={pxToRem(400)}
        id="type"
        isInvalid={!!formState.errors.type}
      >
        <FormLabel>Type</FormLabel>
        <Select {...register("type")} placeholder="Select image type">
          {Object.values(ImageType).map((type) => (
            <option key={type} value={type}>
              {type[0].toUpperCase() + type.slice(1)}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{formState.errors.type?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  function Description() {
    return (
      <FormControl
        w={pxToRem(400)}
        id="description"
        isInvalid={!!formState.errors.description}
      >
        <FormLabel>Description</FormLabel>
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
    );
  }

  function URLInput() {
    return (
      <FormControl w={pxToRem(400)} id="URL" isInvalid={!!formState.errors.URL}>
        <FormLabel>URL</FormLabel>
        <Input
          type="url"
          {...register("URL")}
          borderColor={
            formState.errors.URL
              ? "b.red4"
              : formState.touchedFields.URL
              ? "b.green4"
              : "b.grey4"
          }
        />
        <FormErrorMessage>{formState.errors.URL?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  function ImageInput() {
    return (
      <FormControl w={pxToRem(400)} id="image">
        <FormLabel>Image</FormLabel>
        <Button
          disabled={mutation.isLoading}
          onClick={() => imgRef.current?.click()}
          variant="outline"
        >
          {img ? img.name : "Select image"}
        </Button>
        <Input
          ref={imgRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {img && (
          <Box>
            <Image
              src={img ? URL.createObjectURL(img) : ""}
              h={pxToRem(200)}
              objectFit="cover"
              alt="Selected image"
            />
          </Box>
        )}
      </FormControl>
    );
  }
}

function CampImages() {
  var { camp } = useEditCamp();

  return (
    <VStack w="full" maxW={pxToRem(800)}>
      <Heading as="h3" size="lg">
        Images
      </Heading>

      <Divider w="full" maxW={pxToRem(400)} />

      {camp?.images.map((img) => (
        <ImageCard key={img.URL} img={img} />
      ))}
    </VStack>
  );
}

function ImageCard({ img }: { img: Camp["images"][0] }) {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var mutation = useMutation({
    mutationFn: async ({ id, URL }: { URL: string; id?: string }) => {
      return removeImage(
        camp?.campId as string,
        { id, URL },
        accessToken as string
      );
    },
    onSuccess: function removeImageSuccess(data, variables) {
      if (!data.success) {
        toast({
          title: "Failed to remove image",
          description: data.message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Image removed",
          description: data.message,
          status: "success",
          isClosable: true,
        });

        queryClient.setQueryData(["edit-camp", camp?.campId], {
          success: true,
          message: "Image added",
          camp: data.camp,
        } as GetCampResponse);
      }
    },
    onError: function removeImageError() {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    },
  });

  return (
    <Card key={img.URL}>
      <CardBody p={pxToRem(8)} gap={pxToRem(8)}>
        <Image
          src={img.URL}
          alt="Camp image"
          borderRadius="xl"
          h={pxToRem(200)}
          w={pxToRem(400)}
          objectFit="cover"
        />

        <Text>{img.description}</Text>

        <HStack w="full" justifyContent="space-between" mt={pxToRem(8)}>
          <Badge w="fit-content" variant="subtle">
            {img.type}
          </Badge>

          <Tooltip label="Remove">
            <IconButton
              disabled={mutation.isLoading}
              onClick={async () =>
                await mutation.mutateAsync({
                  id: img.id,
                  URL: img.URL,
                })
              }
              aria-label="Remove image"
              variant="icon-ghost"
            >
              {mutation.isLoading ? (
                <Spinner size="sm" />
              ) : (
                <BackspaceIcon className="icon-normal-stroke" h={20} w={20} />
              )}
            </IconButton>
          </Tooltip>
        </HStack>
      </CardBody>
    </Card>
  );
}
