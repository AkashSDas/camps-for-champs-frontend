import { Camp } from "./camp.service.type";
import { Guest } from "../../store/camp-booking.store";

export interface Booking {
  user: string | { _id: string; email: string; userId: string };
  camp: string | Camp;
  checkIn: string;
  checkOut: string;
  guests: Guest[];
  status: "pending" | "cancelled" | "fulfilled";
  amountCharged: number;
  campUnitsBooked: number;
  _id: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookCampResponse {
  message: string;
  success: boolean;
  booking?: Booking;
  camp?: Camp;
}

export interface GetBookingsResponse {
  message: string;
  success: boolean;
  bookings?: Booking[];
}
