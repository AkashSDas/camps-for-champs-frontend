import { AxiosRequestConfig } from "axios";

import { CompleteOAuthInput, ForgotPasswordInput, LoginInput, SignupInput } from "../lib/schema";
import fetchFromAPI from "./";

function fetchFromAuth(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/auth/${URL}`, config);
}

export async function signup(input: SignupInput) {
  var response = await fetchFromAuth("signup", {
    method: "POST",
    data: input,
  });

  if (response.status == 201) {
    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false, error: response.error };
}

export async function getNewAccessToken() {
  var response = await fetchFromAuth("access-token", { method: "GET" });
  if (response.status == 200) {
    return {
      success: response.status,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false, error: response.error };
}

export async function login(input: LoginInput) {
  var response = await fetchFromAuth("login", {
    method: "POST",
    data: input,
  });

  if (response.status == 200) {
    return {
      success: true,
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { success: false, error: response.error };
}

export async function logout() {
  var response = await fetchFromAuth("logout", { method: "GET" });
  if (response.status == 200) return { success: true };
  return { success: false, error: response.error };
}

export async function completeOAuth(
  input: CompleteOAuthInput,
  accessToken: string
) {
  var response = await fetchFromAuth("complete-oauth", {
    method: "PUT",
    data: input,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status == 200) {
    return { success: true, user: response.data.user };
  }

  return { success: false, error: response.error };
}

export async function cancelOAuth(accessToken: string) {
  var response = await fetchFromAuth("cancel-oauth", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status == 200) return { success: true };
  return { success: false, error: response.error };
}

export async function forgotPassword(input: ForgotPasswordInput) {
  var response = await fetchFromAuth("forgot-password", {
    method: "POST",
    data: input,
  });

  if (response.status == 200) {
    return { success: true, message: response.data.message };
  }

  return { success: false, error: response.error };
}
