import React, { FormEvent, useState } from "react";
import { bookCamp } from "../../services/booking.service";
import { BookCampInput } from "../../lib/input-schema";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntentAndCharge } from "../../services/payments.service";
import { pxToRem } from "../../lib/chakra-ui";
import { StripeCardElement } from "@stripe/stripe-js";
import { useCamp, useUser } from "../../lib/hooks";
import { useCampBookingStore } from "../../store/camp-booking.store";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Heading,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";

export default function BookCampButton() {
  var [loading, setLoading] = useState(false);
  var [paymentLoading, setPaymentLoading] = useState(false);
  var [paymentIntent, setPaymentIntent] = useState<any>(null);
  var toast = useToast();
  var router = useRouter();
  var stripe = useStripe();
  var elements = useElements();

  var { camp } = useCamp();
  var { accessToken, user } = useUser();
  var { checkIn, checkOut, guests, campUnitsBooked } = useCampBookingStore(
    (state) => ({
      checkIn: state.checkIn,
      guests: state.guests,
      checkOut: state.checkOut,
      campUnitsBooked: state.campUnitsBooked,
    })
  );

  async function handleSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!handleValidation()) return;
    if (!stripe || !elements || !camp || !user) return;
    setPaymentLoading(true);

    var response = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: { email: user.email },
        },
      }
    );

    if (response.error) {
      displayToast(response.error.message ?? "Payment failed", "error");
      setPaymentLoading(false);
      return;
    }

    if (response.paymentIntent?.status == "succeeded") {
      displayToast("Payment successful", "success");
      setPaymentIntent(null);

      let bookingData: BookCampInput = {
        checkIn: checkIn!.toISOString(),
        checkOut: checkOut!.toISOString(),
        guests: guests.filter((g) => {
          if (g.count == 0) return false;
          return true;
        }),
        amountToCharge: (camp as any).price * campUnitsBooked,
        campUnitsBooked,
      };

      let response = await bookCamp(accessToken!, camp!.campId, bookingData);
      if (!response.success) {
        displayToast(response.message, "error");
        setPaymentLoading(false);
        return;
      }

      displayToast("Booking successful", "success");
      router.push("/bookings");
    }

    setPaymentLoading(false);
  }

  return (
    <VStack w="full">
      <Button
        hidden={paymentIntent}
        disabled={loading}
        onClick={createPaymentIntent}
        variant="solid"
        px={pxToRem(64)}
        h={pxToRem(48)}
      >
        {loading ? <Spinner /> : "Book now"}
      </Button>

      <VStack
        hidden={!paymentIntent}
        onSubmit={handleSubmit}
        w="full"
        gap={pxToRem(24)}
      >
        <Divider />

        <Heading size="md" mb={pxToRem(16)}>
          Payment
        </Heading>

        <CardElement
          options={{ hidePostalCode: true }}
          className="stripe-card-element"
        />

        <Button
          disabled={!stripe || !elements || !camp || paymentLoading}
          type="submit"
          variant="solid"
          px={pxToRem(64)}
          h={pxToRem(48)}
          onClick={handleSubmit as any}
        >
          {paymentLoading ? <Spinner /> : "Pay now"}
        </Button>
      </VStack>
    </VStack>
  );

  // =============================
  // Helper Functions
  // =============================

  function displayToast(msg: string, status: "error" | "success") {
    toast({
      title: msg,
      status,
      duration: 5000,
      isClosable: true,
    });
  }

  async function createPaymentIntent() {
    if (!stripe || !elements || !camp) return;
    if (!user) {
      displayToast("Please login to book a camp", "error");
      return;
    }

    var amountToCharge = Math.min(Math.max(camp.price as any, 50), 99999999);
    setLoading(true);
    var response = await createPaymentIntentAndCharge(
      amountToCharge,
      accessToken as string
    );
    if (!response.success && !response.paymentIntent) {
      displayToast(response.message, "error");
      setLoading(false);
      return;
    }

    var pi = response.paymentIntent;
    setPaymentIntent(pi);
    console.log(pi);
    setLoading(false);
  }

  function handleValidation() {
    var isValid = false;

    if (!checkIn || !checkOut || guests.length == 0) {
      displayToast("Please fill in all required fields", "error");
    } else if (checkIn > checkOut) {
      displayToast("Check in date cannot be after check out date", "error");
    } else if (checkIn < new Date(Date.now())) {
      displayToast("Check in date cannot be in the past", "error");
    } else if (
      new Date(checkOut.getTime() - checkIn.getTime()) >
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    ) {
      displayToast("Maximum booking duration is 60 days", "error");
    } else if (camp?.startDate && checkIn < new Date(camp.startDate)) {
      displayToast("Camp will start after your check in date", "error");
    } else if (camp?.endDate && checkOut > new Date(camp.endDate)) {
      displayToast("Camp will end before your check out date", "error");
    } else {
      isValid = true;
    }

    return isValid;
  }
}
