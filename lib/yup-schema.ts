import { array, number, object, string } from "yup";

import { Accessibility, Amenity } from "./camp";

// =====================================
// Auth
// =====================================

export var signupSchema = object({
  email: string().email("Invalid").required("Required"),
  password: string()
    .min(8, "Too short")
    .max(20, "Too long")
    .matches(
      /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
      "Weak"
    )
    .required("Required"),
}).required("Required");

export var loginSchema = object({
  email: string().email("Invalid").required("Required"),
  password: string()
    .min(8, "Too short")
    .max(20, "Too long")
    .matches(
      /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
      "Invalid"
    )
    .required("Required"),
}).required("Required");

export var completeOauthSignupSchema = object({
  email: string().email("Invalid").required("Required"),
}).required("Required");

// =====================================
// Camp Edit
// =====================================

export var basicSettingSchema = object({
  name: string().max(128, "Too long").optional(),
  about: string().max(4096, "Too long").optional(),
  // accessibilities: array()
  //   .oneOf(Object.values(Accessibility) as any[])
  //   .optional(),
  // amenities: array()
  //   .oneOf(Object.values(Amenity) as any[])
  //   .optional(),
  price: number().min(0, "Too low").optional(),
  campLimit: number().min(0, "Too low").optional(),
});
