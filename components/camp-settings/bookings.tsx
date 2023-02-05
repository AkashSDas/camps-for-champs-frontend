import { CampSettingsLayout } from "./layout";
import { pxToRem } from "../../lib/chakra-ui";
import { queryClient } from "../../lib/react-query";
import { updateBookingStatus } from "../../services/booking.service";
import { useCampBookings, useEditCamp, useUser } from "../../lib/hooks";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  BookingStatus,
  GetBookingsResponse,
} from "../../services/types/booking.service.type";
import {
  Badge,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useToast,
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

              <Td>
                <UpdateBookingStatusButtong
                  bookingId={b.bookingId}
                  status={b.status}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

interface Props {
  bookingId: string;
  status: BookingStatus;
}

function UpdateBookingStatusButtong({ bookingId, status }: Props) {
  var { accessToken } = useUser();
  var { camp } = useEditCamp();
  var router = useRouter();
  var toast = useToast();

  var mutation = useMutation({
    mutationFn: (status: BookingStatus) => {
      return updateBookingStatus(
        accessToken as string,
        bookingId,
        camp?.campId as string,
        status
      );
    },
    onMutate: async function (status: BookingStatus) {
      var data = queryClient.getQueriesData([
        "camp-bookings",
        accessToken,
        router.query?.campId,
      ]) as any;

      queryClient.setQueriesData(
        ["camp-bookings", accessToken, router.query?.campId],
        {
          ...data[0][1],
          bookings: (data[0][1] as any)?.bookings?.map((b: any) => ({
            ...b,
            status: status,
          })),
        }
      );

      return { previousData: data[0][1] };
    },
    onSuccess(data, variables, context) {
      if (!data.success) {
        toast({
          title: "Failed to update status",
          status: "error",
          isClosable: true,
          duration: 5000,
        });

        queryClient.setQueriesData(
          ["camp-bookings", accessToken, router.query?.campId],
          context?.previousData
        );
      } else {
        toast({
          title: "Status updated",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      }
    },
    onError: (_err, _status, context) => {
      toast({
        title: "Failed to update status",
        status: "error",
        isClosable: true,
        duration: 5000,
      });

      queryClient.setQueriesData(
        ["camp-bookings", accessToken, router.query?.campId],
        context?.previousData
      );
    },
  });

  if (!(status == BookingStatus.PENDING)) {
    return <HStack>...</HStack>;
  }

  if (mutation.isLoading) {
    return (
      <HStack>
        <Spinner size="sm" />
      </HStack>
    );
  }

  return (
    <HStack gap={0}>
      <Button
        h={pxToRem(32)}
        rounded="md"
        px={pxToRem(12)}
        variant="outline"
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate(BookingStatus.FULFILLED);
        }}
      >
        Accept
      </Button>
      <Button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate(BookingStatus.CANCELLED);
        }}
        h={pxToRem(32)}
        rounded="md"
        px={pxToRem(12)}
        variant="outline"
      >
        Cancel
      </Button>
    </HStack>
  );
}
