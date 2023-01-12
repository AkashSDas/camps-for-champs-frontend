import { User } from "./user.service.type";

export interface GetNewAccessTokenResponse {
  success: boolean;
  message?: string;
  user?: User;
  accessToken?: string;
}
