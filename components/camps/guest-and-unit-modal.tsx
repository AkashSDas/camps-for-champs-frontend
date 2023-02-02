import { AddIcon, MinusIcon } from "../icons";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Heading,
  ModalCloseButton,
  ModalBody,
  VStack,
  ModalFooter,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestAndUnitModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading fontSize="lg" as="h3">
              Guests
            </Heading>
            <ModalCloseButton />
          </HStack>
        </ModalHeader>

        <ModalBody>
          <VStack gap={pxToRem(8)} w="full" alignItems="start">
            <AdultCount />
            <ChildCount />
            <PetCount />
            <CampUnitCount />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CampUnitCount() {
  var { units, increment } = useCampBookingStore((state) => ({
    units: state.campUnitsBooked,
    increment: state.incrementCampUnit,
  }));
  var { camp } = useCamp();

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <VStack gap={pxToRem(0.5)} alignItems="start">
        <Text fontWeight="medium">Camp unit</Text>
        <Text fontSize="xs" opacity={0.6} mt="0 !important">
          each new unit is priced flat
        </Text>
      </VStack>

      <HStack>
        <IconButton
          disabled={units == 1}
          onClick={() => increment(-1)}
          aria-label="Decrease adult"
          variant="icon-ghost"
          size="sm"
        >
          <MinusIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>

        <Text fontFamily="heading">{units}</Text>

        <IconButton
          disabled={units == camp?.campLimit}
          onClick={() => increment(1)}
          aria-label="Increase adult"
          variant="icon-ghost"
          size="sm"
        >
          <AddIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
}

function PetCount() {
  var { camp } = useCamp();
  var store = useCampBookingStore((state) => ({
    guests: state.guests,
    incrementGuest: state.incrementGuest,
    incrementUnit: state.incrementCampUnit,
  }));

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <VStack gap={pxToRem(0.5)} alignItems="start">
        <Text fontWeight="medium">Pet</Text>
        <Text fontSize="xs" opacity={0.6} mt="0 !important">
          any age
        </Text>
      </VStack>

      <HStack>
        <IconButton
          onClick={() => {
            store.incrementGuest("pet", -1);
          }}
          disabled={store.guests.find((g) => g.type == "pet")?.count == 0}
          aria-label="Decrease adult"
          variant="icon-ghost"
          size="sm"
        >
          <MinusIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>

        <Text fontFamily="heading">
          {store.guests.find((g) => g.type == "pet")?.count}
        </Text>

        <IconButton
          onClick={() => {
            store.incrementGuest("pet", 1);
          }}
          disabled={store.guests.find((g) => g.type == "pet")?.count == 2}
          aria-label="Increase adult"
          variant="icon-ghost"
          size="sm"
        >
          <AddIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
}

function ChildCount() {
  var { camp } = useCamp();
  var store = useCampBookingStore((state) => ({
    guests: state.guests,
    incrementGuest: state.incrementGuest,
    incrementUnit: state.incrementCampUnit,
  }));

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <VStack gap={pxToRem(0.5)} alignItems="start">
        <Text fontWeight="medium">Children</Text>
        <Text fontSize="xs" opacity={0.6} mt="0 !important">
          ages 6 yrs to 10 yrs
        </Text>
      </VStack>

      <HStack>
        <IconButton
          onClick={() => {
            store.incrementGuest("child", -1);
            store.incrementUnit(-1);
          }}
          disabled={store.guests.find((g) => g.type == "child")?.count == 0}
          aria-label="Decrease adult"
          variant="icon-ghost"
          size="sm"
        >
          <MinusIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>

        <Text fontFamily="heading">
          {store.guests.find((g) => g.type == "child")?.count}
        </Text>

        <IconButton
          onClick={() => {
            store.incrementGuest("child", 1);
            store.incrementUnit(1);
          }}
          disabled={
            store.guests.reduce((a, b) => a + b.count, 0) == camp?.campLimit
          }
          aria-label="Increase adult"
          variant="icon-ghost"
          size="sm"
        >
          <AddIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
}

function AdultCount() {
  var { camp } = useCamp();
  var store = useCampBookingStore((state) => ({
    guests: state.guests,
    incrementGuest: state.incrementGuest,
    incrementUnit: state.incrementCampUnit,
  }));

  return (
    <HStack w="full" justifyContent="space-between" alignItems="center">
      <VStack gap={pxToRem(0.5)} alignItems="start">
        <Text fontWeight="medium">Adults</Text>
        <Text fontSize="xs" opacity={0.6} mt="0 !important">
          ages 10 yrs and above
        </Text>
      </VStack>

      <HStack>
        <IconButton
          onClick={() => {
            store.incrementGuest("adult", -1);
            store.incrementUnit(-1);
          }}
          disabled={store.guests.find((g) => g.type == "adult")?.count == 1}
          aria-label="Decrease adult"
          variant="icon-ghost"
          size="sm"
        >
          <MinusIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>

        <Text fontFamily="heading">
          {store.guests.find((g) => g.type == "adult")?.count}
        </Text>

        <IconButton
          onClick={() => {
            store.incrementGuest("adult", 1);
            store.incrementUnit(1);
          }}
          disabled={
            store.guests.reduce((a, b) => a + b.count, 0) == camp?.campLimit
          }
          aria-label="Increase adult"
          variant="icon-ghost"
          size="sm"
        >
          <AddIcon className="icon-normal-stroke" h={16} w={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
}
