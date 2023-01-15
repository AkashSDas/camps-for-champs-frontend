// =====================================
// Auth
// =====================================

import { Accessibility, Amenity } from "./camp";

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
