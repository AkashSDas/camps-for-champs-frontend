import { useMutation } from "react-query";

import { Badge, Divider, Heading, HStack, Select, useToast, VStack } from "@chakra-ui/react";

import { CampStatus } from "../../lib/camp";
import { pxToRem } from "../../lib/chakra-ui";
import { useEditCamp, useUser } from "../../lib/hooks";
import { updateStatus } from "../../services/camp.service";
import { CampSettingsLayout } from "./layout";

export default function ImagesSettings() {
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
            Images
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />
        </VStack>
      </VStack>
    </CampSettingsLayout>
  );
}
