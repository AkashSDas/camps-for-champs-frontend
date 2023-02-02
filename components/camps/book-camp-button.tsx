import { bookCamp } from "../../services/booking.service";
import { BookCampInput } from "../../lib/input-schema";
import { Button, Spinner, Text, useToast } from "@chakra-ui/react";
import { pxToRem } from "../../lib/chakra-ui";
import { useCamp, useUser } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";
import { useState } from "react";

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
  var { accessToken } = useUser();
  var [loading, setLoading] = useState(false);

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
        title: "Camp will start after your check in date",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (camp?.endDate && checkOut > new Date(camp.endDate)) {
      toast({
        title: "Camp will end before your check out date",
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
    if (!submitValidation() || !camp) return;
    if (!accessToken) {
      toast({
        title: "Please login to book a camp",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    var bookingData: BookCampInput = {
      checkIn: checkIn!.toISOString(),
      checkOut: checkOut!.toISOString(),
      guests: guests.filter((g) => {
        if (g.count == 0) return false;
        return true;
      }),
      amountToCharge: (camp as any).price * campUnitsBooked,
      campUnitsBooked,
    };

    setLoading(true);
    var response = await bookCamp(accessToken!, camp!.campId, bookingData);
    setLoading(false);

    if (response.success) {
      toast({
        title: "Booking successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    toast({
      title: response.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="solid"
      px={pxToRem(64)}
      h={pxToRem(48)}
    >
      {loading ? <Spinner /> : "Book now"}
    </Button>
  );
}
