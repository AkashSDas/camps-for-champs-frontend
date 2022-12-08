import { object, string } from "yup";

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
