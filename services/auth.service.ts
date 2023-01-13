import fetchFromAPI from "../lib/axios";
import { CompleteOauthSignupInput, LoginInput, SignupInput } from "../lib/input-schema";
import { GetNewAccessTokenResponse } from "./types/auth.service.type";

export async function signup(data: SignupInput) {
  var response = await fetchFromAPI("/auth/email-signup", {
    method: "POST",
    data,
  });

  if (response.statusCode == 201) {
    return {
      success: true,
      message: "Account created successfully",
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getNewAccessToken(): Promise<GetNewAccessTokenResponse> {
  var response = await fetchFromAPI("/auth/access-token", { method: "GET" });

  if (response.statusCode == 200) {
    return {
      success: true,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { message: response.error.message, success: false };
}

export async function login(data: LoginInput) {
  var response = await fetchFromAPI("/auth/email-login", {
    method: "POST",
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully logged in",
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { message: response.error.message, success: false };
}

export async function logout(accessToken: string) {
  var response = await fetchFromAPI("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: true, message: "Successfully logged out" };
  }

  return { message: response.error.message, success: false };
}

export async function completeOauthSignup(
  accessToken: string,
  input: CompleteOauthSignupInput
) {
  var response = await fetchFromAPI("/auth/complete-oauth-signup", {
    method: "PUT",
    data: input,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Signup completed",
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { message: response.error.message, success: false };
}

export async function cancelOauthSignup(accessToken: string) {
  var response = await fetchFromAPI("/auth/cancel-oauth-signup", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return { success: true, message: "Signup cancelled" };
  }

  return { message: response.error.message, success: false };
}
