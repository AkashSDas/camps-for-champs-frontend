import { ImageType } from "../../lib/camp";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import {
  VStack,
  Heading,
  SimpleGrid,
  HStack,
  Divider,
  Text,
  Image,
  Box,
  Link,
} from "@chakra-ui/react";

export default function CampInfo() {
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
