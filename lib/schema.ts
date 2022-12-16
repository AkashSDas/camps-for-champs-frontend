import { array, number, object, ref, string } from "yup";

// ===========================
// Auth
// ===========================

export interface SignupInput {
  email: string;
  password: string;
}

// Signup
export var signupSchema = object({
  email: string().email("Invalid").required("Required"),
  password: string().required("Required"),
}).required("Required");

export interface LoginInput {
  email: string;
  password: string;
}

// Signup
export var loginSchema = object({
  email: string().email("Invalid").required("Required"),
  password: string().required("Required"),
}).required("Required");

export interface CompleteOAuthInput {
  email: string;
}

// Signup
export var completeOAuthSchema = object({
  email: string().email("Invalid").required("Required"),
}).required("Required");

export interface ForgotPasswordInput {
  email: string;
}

// Signup
export var forgotPasswordSchema = object({
  email: string().email("Invalid").required("Required"),
}).required("Required");

export var resetPasswordSchema = object({
  password: string().required("Required"),
  confirmPassword: string()
    .required("Required")
    .oneOf([ref("password"), null], "Passwords must match"),
}).required("Required");

export interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
}

// Camp

export enum CampAccessibilityType {
  ROAD = "road",
  WATER = "water",
  AIR = "air",
}

export enum Amenity {
  WIFI = "wifi",
  CHARGING_PORT = "charging_port",
  COVERED_AREA = "covered_area",
  ATTACHED_BATHROOM = "attached_bathroom",
  DRINKING_WATER = "drinking_water",
  PHONE_NETWORK = "phone_network",
  PET_FRIENDLY = "pet_friendly",
  AIR_CONDITIONING = "air_conditioning",
  PARKING = "parking",
  RESTAURANT = "restaurant",
  BAR = "bar",
  SWIMMING_POOL = "swimming_pool",
  SPA = "spa",
}

export interface CampDetailsInput {
  name: string;
  description: string;
  accessibility: CampAccessibilityType[];
  amenities: Amenity[];
  checkInTime: { hour: string; mintues: string; meridiem: "AM" | "PM" };
  checkOutTime: { hour: string; mintues: string; meridiem: "AM" | "PM" };
  price: number;
  campLimit: number;
}

export var campDetailSchema = object({
  name: string().required("Required"),
  description: string().required("Required"),
  accessibility: array()
    .required("Required")
    .oneOf(Object.values(CampAccessibilityType) as any[]),
  amenities: array()
    .required("Required")
    .oneOf(Object.values(Amenity) as any[]),
  checkInTime: object({
    hour: string().required("Required"),
    mintues: string().required("Required"),
    meridiem: string().required("Required"),
  }).required("Required"),
  checkOutTime: object({
    hour: string().required("Required"),
    mintues: string().required("Required"),
    meridiem: string().required("Required"),
  }).required("Required"),
  price: number().required("Required"),
  campLimit: number().required("Required"),
}).required("Required");
