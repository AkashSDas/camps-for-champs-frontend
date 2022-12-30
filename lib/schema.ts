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
  price: number;
  campLimit: number;

  checkInTime: { hour: number; minute: number; meridiem: "AM" | "PM" };
  checkOutTime: { hour: number; minute: number; meridiem: "AM" | "PM" };

  accessibility: CampAccessibilityType[];
  amenities: Amenity[];
}

export var campDetailSchema = object({
  name: string().min(0).max(128).required("Required"),
  description: string().min(0).max(4096).required("Required"),
  price: number().min(0).optional(),
  campLimit: number().min(0).optional(),

  checkInTime: object({
    hour: number().min(1).max(12).required("Required"),
    minute: number().min(0).max(60).required("Required"),
    meridiem: string().oneOf(["AM", "PM"]).required("Required"),
  }).required("Required"),
  checkOutTime: object({
    hour: number().min(1).max(12).required("Required"),
    minute: number().min(0).max(60).required("Required"),
    meridiem: string().oneOf(["AM", "PM"]).required("Required"),
  }).required("Required"),

  // accessibility: array()
  //   .optional()
  //   .oneOf(Object.values(CampAccessibilityType) as any[]),
  // amenities: array()
  //   .optional()
  //   .oneOf(Object.values(Amenity) as any[]),
}).required("Required");
