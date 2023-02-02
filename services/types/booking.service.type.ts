import { Camp } from "./camp.service.type";
import { Guest } from "../../store/camp-booking.store";

export interface Booking {
  user: string;
  camp: string;
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
