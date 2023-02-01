import { Camp } from "../../services/types/camp.service.type";
import { CampStatus, ImageType } from "../../lib/camp";
import { HeartIcon } from "../icons";
import { pxToRem } from "../../lib/chakra-ui";
import { useRouter } from "next/router";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export default function CampCard({ camp }: { camp: Camp }) {
  var router = useRouter();

  return (
    <Card
      w="full"
      maxW={pxToRem(300)}
      rounded="2xl"
      cursor="pointer"
      _hover={{ bg: "b.grey1" }}
      onClick={() => router.push(`/camp/${camp.campId}`)}
      shadow="none"
    >
      <Header />
      <CampInfo />
    </Card>
  );

  function CampInfo() {
    return (
      <CardBody gap={pxToRem(8)} p={0}>
        <Stack mt={pxToRem(8)} pb={pxToRem(8)} px={pxToRem(8)} gap={pxToRem(4)}>
          <Text fontWeight="semibold" color="b.grey5">
            {camp.name ?? "Untitled"}
          </Text>

          {camp.price && (
            <Text fontFamily="heading" fontSize="lg">
              ₹{camp.price}
            </Text>
          )}
        </Stack>
      </CardBody>
    );
  }

  function Header() {
    return (
      <CardHeader p={0} position="relative">
        <Image
          h={pxToRem(180)}
          w={pxToRem(300)}
          objectFit="cover"
          src={
            camp.images.find((img) => (img.type = ImageType.COVER))?.URL ??
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt={camp.name ?? "Camp image"}
          borderRadius="xl"
        />

        <HStack
          bg="b.grey0"
          rounded="full"
          px={pxToRem(8)}
          h={pxToRem(28)}
          position="absolute"
          top={pxToRem(3)}
          left={pxToRem(3)}
        >
          <Text fontFamily="heading" fontSize="md" color="b.text3">
            {camp.campLimit}
          </Text>
          <Text fontSize={pxToRem(12.8)}>/ unit</Text>
        </HStack>

        <Tooltip label="Add to wistlight" placement="bottom">
          <IconButton
            aria-label="Add to wishlist"
            variant="icon-ghost"
            onClick={(e) => {
              e.stopPropagation();
            }}
            bg="b.grey0"
            rounded="full"
            px={pxToRem(8)}
            h={pxToRem(28)}
            position="absolute"
            top={pxToRem(3)}
            right={pxToRem(3)}
          >
            <HeartIcon className="icon-red-stroke" />
          </IconButton>
        </Tooltip>
      </CardHeader>
    );
  }
}
