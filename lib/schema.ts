import { object, string } from "yup";

// ===========================
// Auth
// ===========================

export interface SignupInput {
  email: string;
  password: string;
}

// Signup
export var signupSchema = object().shape({
  email: string()
    .email({ message: "Invalid" })
    .required({ message: "Required" }),
  password: string().required({ message: "Required" }),
});
