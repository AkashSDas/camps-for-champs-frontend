import { ArrowDownIcon } from "../../components/icons";
import { ImageType } from "../../lib/camp";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function CampPage() {
  var { camp, isLoading } = useCamp();

  if (isLoading || !camp) {
    return (
      <Center mt={pxToRem(40)}>
        <Box pt={pxToRem(128)}>
          <Spinner size="lg" />
        </Box>
      </Center>
    );
  }

  return (
    <Grid
      mt={pxToRem(40)}
      maxW={pxToRem(1264)}
      templateColumns="repeat(5, 1fr)"
      mx={pxToRem(32)}
    >
      <GridItem colSpan={4}>
        <CampInfo />
      </GridItem>

      <GridItem colSpan={1}>
        <BookingPanel />
      </GridItem>
    </Grid>
  );
}

function BookingPanel() {
  var { camp } = useCamp();

  return (
    <VStack
      w="full"
      minW={pxToRem(400)}
      maxW={pxToRem(400)}
      bg="b.grey0"
      shadow="md"
      gap={pxToRem(2)}
      px={pxToRem(16)}
      py={pxToRem(6)}
      rounded={pxToRem(12)}
      position="sticky"
      top={pxToRem(64)}
    >
      <HStack justifyContent="space-between" w="full">
        <HStack>
          <Text fontFamily="heading" fontSize="lg">
            {camp?.price}
          </Text>
          <Text fontSize="xs">/unit</Text>
        </HStack>

        <Text fontSize={pxToRem(12.8)}>Minimum nights: 1</Text>
      </HStack>

      {/* Select guests */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Guests
          </Text>

          <Text fontSize={pxToRem(12.8)}>No guest</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      {/* Select check in */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check in
          </Text>

          <Text fontSize={pxToRem(12.8)}>Select date</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      {/* Select check out */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check out
          </Text>

          <Text fontSize={pxToRem(12.8)}>Select date</Text>
        </HStack>

        <IconButton aria-label="Select guests" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      <Box>
        <Button variant="solid" px={pxToRem(64)} h={pxToRem(48)}>
          Book now
        </Button>
      </Box>
    </VStack>
  );
}

function CampInfo() {
  var { camp } = useCamp();

  return (
    <VStack alignItems="start" gap={pxToRem(24)} w="full" maxW={pxToRem(800)}>
      <Heading>{camp?.name}</Heading>
      <BasicInfo />
      <Text lineHeight="140%">{camp?.about}</Text>
      <Images />
      <LocationInfo />
      <Amenities />
    </VStack>
  );

  function Amenities() {
    return (
      <VStack w="full" maxW={pxToRem(800)} pt={pxToRem(24)}>
        <Heading as="h3" fontSize="2xl" textAlign="center">
          Amenities
        </Heading>

        <SimpleGrid
          w="full"
          minChildWidth={pxToRem(200)}
          flexWrap="wrap"
          justifyContent="start"
        >
          {camp?.amenities.map((amenity) => (
            <Text key={amenity}>
              <HStack mr={pxToRem(16)}>
                <Text fontFamily="heading">-</Text>{" "}
                <Text>{capitalize(amenity.replace(/_/g, " "))}</Text>
              </HStack>
            </Text>
          ))}
        </SimpleGrid>
      </VStack>
    );
  }

  function LocationInfo() {
    return (
      <VStack w="full" maxW={pxToRem(800)} pt={pxToRem(24)}>
        <Heading as="h3" fontSize="2xl" textAlign="center">
          Location
        </Heading>

        <Text textAlign="center">{camp?.address}</Text>

        <HStack gap={pxToRem(8)}>
          <Text fontFamily="heading" mr={pxToRem(8)}>
            {camp?.location?.coordinates[0]} lat
          </Text>

          <Divider orientation="vertical" h={pxToRem(22)} />

          <Text fontFamily="heading" mr={pxToRem(8)}>
            {camp?.location?.coordinates[1]} log
          </Text>
        </HStack>

        {camp?.images.find((img) => img.type == ImageType.LOCATION) && (
          <Box w="full" h={pxToRem(300)} rounded={pxToRem(20)}>
            <Image
              src={
                camp?.images.find((img) => img.type == ImageType.LOCATION)?.URL
              }
              alt="Camp location"
              w="full"
              h="full"
              objectFit="cover"
              rounded={pxToRem(20)}
            />
          </Box>
        )}

        <HStack textAlign="center">
          <Text fontFamily="heading">Google map link:</Text>
          <Link
            href={camp?.googleMapURL}
            target="_blank"
            mr={pxToRem(16)}
            fontStyle="italic"
            textDecoration="underline"
            fontFamily="body"
          >
            {camp?.googleMapURL}
          </Link>
        </HStack>
      </VStack>
    );
  }

  function Images() {
    return (
      <Box w="full" maxW={pxToRem(800)} pt={pxToRem(24)}>
        <Heading as="h3" fontSize="2xl" mb={pxToRem(16)} textAlign="center">
          Images
        </Heading>

        <Box overflow="auto">
          <HStack w="fit-content" overflowX="scroll" gap={pxToRem(32)}>
            {camp?.images.map((image) => (
              <Box key={image.URL} w={pxToRem(300)}>
                <Image
                  objectFit="cover"
                  src={image.URL}
                  alt={image.description}
                  w={pxToRem(300)}
                  h={pxToRem(180)}
                  rounded={pxToRem(20)}
                />
              </Box>
            ))}
          </HStack>
        </Box>
      </Box>
    );
  }

  function BasicInfo() {
    return (
      <VStack alignItems="start" gap={pxToRem(8)}>
        <HStack>
          <Text fontFamily="heading" mr={pxToRem(8)}>
            Accessibility:
          </Text>
          {camp?.accessibilities.map((accessibility) => (
            <Text key={accessibility}>
              {capitalize(accessibility.replace(/_/g, " "))}
            </Text>
          ))}
        </HStack>

        <HStack>
          <Text fontFamily="heading" mr={pxToRem(8)}>
            Cancellation policy:
          </Text>
          <Text>
            {capitalize(
              camp?.cancellationPolicy?.type.replace(/_/g, " ") as string
            )}
          </Text>
        </HStack>

        <HStack>
          <Text fontFamily="heading" mr={pxToRem(8)}>
            Check in:
          </Text>
          <Text>
            {formatTimeTo12Hour(getTimeFromDatetime(camp?.startDate as string))}
          </Text>

          <Text fontFamily="heading" mr={pxToRem(8)}>
            Check out:
          </Text>
          <Text>
            {formatTimeTo12Hour(getTimeFromDatetime(camp?.endDate as string))}
          </Text>
        </HStack>
      </VStack>
    );
  }
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getTimeFromDatetime(datetime: string) {
  return datetime.split("T")[1].slice(0, 5);
}

function formatTimeTo12Hour(time: string) {
  var [hour, minute] = time.split(":");
  var hour12 = parseInt(hour) % 12;
  var ampm = parseInt(hour) < 12 ? "AM" : "PM";
  return `${hour12}:${minute} ${ampm}`;
}
