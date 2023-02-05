import { CampSettingsLayout } from "./layout";
import { pxToRem } from "../../lib/chakra-ui";
import { useCampBookings } from "../../lib/hooks";
import {
  Badge,
  Divider,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

export default function CampBookings() {
  var { isLoading, bookings } = useCampBookings();

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
            Bookings
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />

          {isLoading || !bookings ? <Spinner /> : <BookingsTable />}
        </VStack>
      </VStack>
    </CampSettingsLayout>
  );
}

function BookingsTable() {
  var { bookings } = useCampBookings();

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Td>Id</Td>
            <Td>Email</Td>
            <Td>Booking status</Td>
            <Td>Action</Td>
          </Tr>
        </Thead>

        <Tbody>
          {bookings?.map((b) => (
            <Tr key={b.bookingId} fontFamily="body" fontSize="sm">
              <Td>{b.bookingId}</Td>
              <Td>{(b.user as any)?.email}</Td>
              <Td>
                <Badge fontFamily="heading">{b.status}</Badge>
              </Td>

              <Td>...</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
