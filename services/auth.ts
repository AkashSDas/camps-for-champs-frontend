import { AxiosRequestConfig } from "axios";

import { SignupInput } from "../lib/schema";
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
