import BookCampButton from "./book-camp-button";
import GuestAndUnitModal from "./guest-and-unit-modal";
import { ArrowDownIcon, MinusIcon } from "../icons";
import { formatDateTime } from "./camp-info";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";
import {
  VStack,
  HStack,
  IconButton,
  Button,
  Text,
  Box,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
} from "@chakra-ui/react";

export default function BookingPanel() {
  var { camp } = useCamp();
  var { isOpen, onOpen, onClose } = useDisclosure();
  var { checkIn, checkOut, guests } = useCampBookingStore((state) => ({
    checkIn: state.checkIn,
    guests: state.guests,
    checkOut: state.checkOut,
  }));

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
      <GuestAndUnitModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      />

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

          <Text fontSize={pxToRem(12.8)}>
            {`${guests.find((g) => g.type == "adult")?.count} adults ` +
              (guests.find((g) => g.type == "child")!?.count > 0
                ? `, ${guests.find((g) => g.type == "child")?.count} children `
                : "") +
              (guests.find((g) => g.type == "pet")!?.count > 0
                ? `, ${guests.find((g) => g.type == "pet")?.count} pets `
                : "")}
          </Text>
        </HStack>

        <IconButton
          aria-label="Select guests"
          variant="icon-ghost"
          onClick={onOpen}
        >
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </HStack>

      {/* Select check in */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check in
          </Text>

          <Text fontSize={pxToRem(12.8)}>
            {checkIn ? formatDateTime(checkIn) : "Select date"}
          </Text>
        </HStack>

        <CheckInInput />
      </HStack>

      {/* Select check out */}
      <HStack justifyContent="space-between" w="full" h={pxToRem(34)}>
        <HStack>
          <Text fontFamily="heading" fontSize="md">
            Check out
          </Text>

          <Text fontSize={pxToRem(12.8)}>
            {checkOut ? formatDateTime(checkOut) : "Select date"}
          </Text>
        </HStack>

        <CheckOutInput />
      </HStack>

      <BookCampButton />
    </VStack>
  );
}

function CheckOutInput() {
  var { setCheckOut } = useCampBookingStore((state) => ({
    setCheckOut: state.setCheckOut,
  }));

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="Open datetime picker" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          <Input
            type="datetime-local"
            onChange={(e) => setCheckOut(new Date(e.target.value))}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function CheckInInput() {
  var { setCheckIn } = useCampBookingStore((state) => ({
    setCheckIn: state.setCheckIn,
  }));

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="Open datetime picker" variant="icon-ghost">
          <ArrowDownIcon className="icon-normal-stroke" />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          <Input
            type="datetime-local"
            onChange={(e) => setCheckIn(new Date(e.target.value))}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
