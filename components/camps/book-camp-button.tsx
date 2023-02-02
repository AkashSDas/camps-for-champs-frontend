import { BookCampInput } from "../../lib/input-schema";
import { Button, useToast } from "@chakra-ui/react";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";

export default function BookCampButton() {
  var toast = useToast();
  var { checkIn, checkOut, guests, campUnitsBooked } = useCampBookingStore(
    (state) => ({
      checkIn: state.checkIn,
      guests: state.guests,
      checkOut: state.checkOut,
      campUnitsBooked: state.campUnitsBooked,
    })
  );
  var { camp } = useCamp();

  function submitValidation() {
    var isValid = false;

    if (!checkIn || !checkOut || guests.length == 0) {
      toast({
        title: "Please fill in all required fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (checkIn > checkOut) {
      toast({
        title: "Check in date cannot be after check out date",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (checkIn < new Date(Date.now())) {
      toast({
        title: "Check in date cannot be in the past",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (
      new Date(checkOut.getTime() - checkIn.getTime()) >
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    ) {
      toast({
        title: "Maximum booking duration is 60 days",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (camp?.startDate && checkIn < new Date(camp.startDate)) {
      toast({
        title: "Camp is not available for booking yet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (camp?.endDate && checkOut > new Date(camp.endDate)) {
      toast({
        title: "Camp is not available for booking anymore",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      isValid = true;
    }

    return isValid;
  }

  async function handleSubmit() {
    if (!submitValidation() && !camp) return;

    var bookingData: BookCampInput = {
      checkIn: checkIn!.toISOString(),
      checkOut: checkOut!.toISOString(),
      guests: guests,
      amountToCharge: (camp as any).price * campUnitsBooked,
      campUnitsBooked,
    };
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="solid"
      px={pxToRem(64)}
      h={pxToRem(48)}
    >
      Book now
    </Button>
  );
}
