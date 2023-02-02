import { Accessibility, Amenity, ImageType } from "./camp";
import { Guest } from "../store/camp-booking.store";
// =====================================
// Auth
// =====================================

export interface SignupInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CompleteOauthSignupInput {
  email: string;
}

// =====================================
// Camp Edit
// =====================================

export interface BasicSettingInput {
  name?: string;
  about?: string;
  accessibilities?: Accessibility[];
  amenities?: Amenity[];
  price?: number;
  campLimit?: number;
}

export interface CancellationPolicyInput {
  type?: "flexible" | "moderate" | "strict";
  description?: string;
}

export interface LocationInput {
  address?: string;
  coordinates?: string;
  googleMapURL?: string;
}

export interface TimingInput {
  startDate?: Date;
  endDate?: Date;
}

export interface ImageInput {
  type: ImageType;
  URL?: string;
  description?: string;
}

export interface BookCampInput {
  checkIn: string;
  checkOut: string;
  guests: Guest[];
  amountToCharge: number;
  campUnitsBooked: number;
}
