import fetchFromAPI from "../lib/axios";
import { BookCampInput } from "../lib/input-schema";
import {
  BookCampResponse,
  BookingStatus,
  GetBookingResponse,
  GetBookingsResponse,
} from "./types/booking.service.type";

export async function bookCamp(
  accessToken: string,
  campId: string,
  data: BookCampInput
): Promise<BookCampResponse> {
  var response = await fetchFromAPI(`/booking/camp/${campId}`, {
    method: "POST",
    data,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return {
      success: true,
      message: "Successfully fetched camp",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getUserBookings(
  accessToken: string
): Promise<GetBookingsResponse> {
  var response = await fetchFromAPI(`/booking/user`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched bookings",
      bookings: response.data.bookings,
    };
  }

  return { message: response.error.message, success: false };
}

export async function checkActiveBooking(accessToken: string, campId: string) {
  var response = await fetchFromAPI(`/booking/user/${campId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Got booking for the camp",
      booking: response.data.booking,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getCampBookings(
  accessToken: string,
  campId: string
): Promise<GetBookingsResponse> {
  var response = await fetchFromAPI(`/booking/camp/${campId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched bookings",
      bookings: response.data.bookings,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateBookingStatus(
  accessToken: string,
  bookingId: string,
  campId: string,
  status: BookingStatus
): Promise<GetBookingResponse> {
  var response = await fetchFromAPI(
    `/booking/status/${bookingId}/camp/${campId}`,
    {
      method: "PUT",
      data: { status },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  console.log(response);
  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched bookings",
      booking: response.data.booking,
    };
  }

  return { message: response.error.message, success: false };
}
