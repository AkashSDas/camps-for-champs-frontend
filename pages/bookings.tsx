import { Camp } from "../services/types/camp.service.type";
import { formatDateTime } from "../components/camps/camp-info";
import { pxToRem } from "../lib/chakra-ui";
import { useUserBookings } from "../lib/hooks";
import {
  Box,
  Center,
  Divider,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function UserBookingsPage() {
  var { isLoading, bookings } = useUserBookings();

  if (isLoading) {
    return (
      <Center mt={pxToRem(40)}>
        <Box pt={pxToRem(128)}>
          <Spinner size="lg" />
        </Box>
      </Center>
    );
  }

  if (!bookings || bookings.length == 0) {
    return (
      <Center mt={pxToRem(40)}>
        <Box pt={pxToRem(128)}>
          <Heading as="h1" size="lg">
            You have no bookings
          </Heading>
        </Box>
      </Center>
    );
  }

  return (
    <VStack w="full">
      <VStack
        w="full"
        maxW={pxToRem(800)}
        pt={pxToRem(28 + 24)}
        gap={pxToRem(24)}
        alignItems="center"
      >
        <Heading as="h1" size="lg">
          My Bookings
        </Heading>

        <Divider w="full" maxW={pxToRem(400)} />

        <VStack w="full" maxW={pxToRem(400)} alignItems="flex-start">
          {bookings.map((booking) => (
            <VStack
              key={booking.bookingId}
              w="full"
              bg="b.grey0"
              shadow="md"
              gap={pxToRem(2)}
              px={pxToRem(16)}
              py={pxToRem(6)}
              rounded={pxToRem(12)}
            >
              <Text fontSize="md" fontWeight="bold">
                {(booking.camp as Camp).name}
              </Text>
              <Text fontSize="sm">
                {formatDateTime(new Date(booking.checkIn))} -{" "}
                {formatDateTime(new Date(booking.checkOut))}
              </Text>
              <Text fontFamily="heading">{booking.status}</Text>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
