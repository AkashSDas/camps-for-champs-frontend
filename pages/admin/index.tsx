import { Camp } from "../../services/types/camp.service.type";
import { CampStatus, ImageType } from "../../lib/camp";
import { pxToRem } from "../../lib/chakra-ui";
import { useEditCamps } from "../../lib/hooks";
import { useRouter } from "next/router";

import {
  Badge,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function AdminPage() {
  var { camps, isLoading } = useEditCamps();

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
        <Heading as="h1" size="lg">
          Admin | All Camps
        </Heading>

        <Divider w="full" maxW={pxToRem(400)} />

        {isLoading && <Spinner size="lg" />}

        {!isLoading && camps && (
          <SimpleGrid columns={[1, 2]} spacing={pxToRem(24)}>
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
      maxW={pxToRem(400)}
      rounded="2xl"
      cursor="pointer"
      _hover={{ bg: "b.grey1" }}
      onClick={() => router.push(`/admin/${camp.campId}`)}
    >
      <CardBody p={pxToRem(8)} gap={pxToRem(8)}>
        <Image
          h={pxToRem(200)}
          w={pxToRem(400)}
          objectFit="cover"
          src={
            camp.images.find((img) => (img.type = ImageType.COVER))?.URL ??
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt={camp.name ?? "Camp image"}
          borderRadius="xl"
        />

        <Stack mt={pxToRem(8)} pb={pxToRem(8)}>
          <Text fontWeight="semibold" color="b.grey5">
            {camp.name ?? "Untitled"}
          </Text>

          <HStack>
            <Badge
              w="fit-content"
              variant="subtle"
              letterSpacing={pxToRem(2)}
              bg={camp.status == CampStatus.ACTIVE ? "b.green1" : "b.red1"}
            >
              {camp.status}
            </Badge>

            {camp.price && (
              <Badge w="fit-content" variant="outline">
                ₹{camp.price}
              </Badge>
            )}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
