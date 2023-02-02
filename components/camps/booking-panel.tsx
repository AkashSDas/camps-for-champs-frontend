import GuestAndUnitModal from "./guest-and-unit-modal";
import { AddIcon, ArrowDownIcon, MinusIcon } from "../icons";
import { formatDateTime } from "./camp-info";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";
import { useEffect, useRef, useState } from "react";
import {
  VStack,
  HStack,
  IconButton,
  Button,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  Input,
} from "@chakra-ui/react";

export default function BookingPanel() {
  var { camp } = useCamp();
  var { isOpen, onOpen, onClose } = useDisclosure();
  var { reset, checkIn, checkOut } = useCampBookingStore((state) => ({
    reset: state.reset,
    checkIn: state.checkIn,
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
          reset();
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

          <Text fontSize={pxToRem(12.8)}>No guest</Text>
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

      <Box>
        <Button variant="solid" px={pxToRem(64)} h={pxToRem(48)}>
          Book now
        </Button>
      </Box>
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
