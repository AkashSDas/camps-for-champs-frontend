import { object, string } from "yup";

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
