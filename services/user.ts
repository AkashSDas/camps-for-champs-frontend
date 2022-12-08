import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "./";

function fetchFromUser(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/user/${URL}`, config);
}

export async function getUser() {
  var response = await fetchFromUser("", { method: "POST" });

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
