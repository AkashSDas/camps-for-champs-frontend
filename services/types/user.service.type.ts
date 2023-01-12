export interface User {
  _id: string;
  active: boolean;
  banned: boolean;
  createdAt: string;
  email?: string;
  oauthProviders: { sid: string; provider: "google" }[];
  roles: string[];
  updatedAt: string;
  userId: string;
  verified: boolean;
}
