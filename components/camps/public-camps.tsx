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
        maxW={pxToRem(800)}
        pt={pxToRem(28 + 24)}
        pb={pxToRem(256)}
        gap={pxToRem(24)}
        alignItems="center"
      >
        {isLoading && <Spinner size="lg" />}

        {!isLoading && camps && (
          <SimpleGrid columns={[1, 2, 3]} spacing={pxToRem(24)}>
            {camps.map((camp) => (
              <CampCard key={camp.campId} camp={camp} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </VStack>
  );
}

function CampCard({ camp }: { camp: Camp }) {
  var router = useRouter();

  return (
    <Card
      w="full"
      maxW={pxToRem(300)}
      rounded="2xl"
      cursor="pointer"
      _hover={{ bg: "b.grey1" }}
      onClick={() => router.push(`/camp/${camp.campId}`)}
    >
      <CardBody p={pxToRem(8)} gap={pxToRem(8)}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt={camp.name ?? "Camp image"}
          borderRadius="xl"
        />

        <Stack mt={pxToRem(8)} pb={pxToRem(8)}>
          <Text fontWeight="semibold" color="b.grey5">
            {camp.name ?? "Untitled"}
          </Text>

          <HStack>
            {camp.price && (
              <Badge w="fit-content" variant="subtle">
                ₹{camp.price}
              </Badge>
            )}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
