import { object, ref, string } from "yup";

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
