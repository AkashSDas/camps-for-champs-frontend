import fetchFromAPI from "../lib/axios";
import { LoginInput, SignupInput } from "../lib/input-schema";

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

export async function getNewAccessToken() {
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
