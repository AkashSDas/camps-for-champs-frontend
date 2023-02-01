import CampCard from "./camp-card";
import { Camp } from "../../services/types/camp.service.type";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamps } from "../../lib/hooks";
import { useRouter } from "next/router";

import {
  Badge,
  Card,
  CardBody,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function PublicCamps() {
  var { camps, isLoading } = useCamps();

  return (
    <VStack w="full">
      <VStack
        w="full"
        justifyContent="center"
        maxW={pxToRem(1024)}
        pt={pxToRem(28 + 24)}
        pb={pxToRem(256)}
        gap={pxToRem(24)}
        alignItems="center"
      >
        {isLoading && <Spinner size="lg" />}

        {!isLoading && camps && (
          <SimpleGrid
            w="full"
            columns={[1, 2, 3]}
            minChildWidth={pxToRem(300)}
            spacing={pxToRem(24)}
          >
            {camps.map((camp) => (
              <CampCard key={camp.campId} camp={camp} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </VStack>
  );
}
