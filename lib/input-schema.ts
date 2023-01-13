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
