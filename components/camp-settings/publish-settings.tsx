import { CampSettingsLayout } from "./layout";
import { CampStatus } from "../../lib/camp";
import { pxToRem } from "../../lib/chakra-ui";
import { updateStatus } from "../../services/camp.service";
import { useEditCamp, useUser } from "../../lib/hooks";
import { useMutation } from "react-query";

import {
  Divider,
  Heading,
  HStack,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function PublishSettings() {
  var { camp } = useEditCamp();
  var { accessToken } = useUser();
  var toast = useToast();

  var mutation = useMutation({
    mutationFn: (status: CampStatus) => {
      return updateStatus(camp?.campId!, { status }, accessToken!);
    },
    onSuccess: (data) => {
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
          w="full"
          maxW={pxToRem(800)}
          pt={pxToRem(28 + 24)}
          gap={pxToRem(24)}
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            Publish
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          {/* Update camp status */}
          <HStack
            w={pxToRem(400)}
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading as="h2" size="md">
              Status
            </Heading>

            <Select
              w={pxToRem(160)}
              cursor="pointer"
              defaultValue={camp?.status}
              onChange={(e) => mutation.mutate(e.target.value as CampStatus)}
              disabled={mutation.isLoading}
            >
              {Object.entries(CampStatus).map(([key, value]) => (
                <option key={key} value={value}>
                  {value[0].toUpperCase() + value.slice(1)}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
      </VStack>
    </CampSettingsLayout>
  );
}
