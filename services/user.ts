import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "./";

function fetchFromUser(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/user/${URL}`, config);
}

export async function getUser(accessToken?: string) {
  var response = await fetchFromUser("me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status == 200) {
    return { success: true, user: response.data.user };
  }

  return { success: false, error: response.error };
}
