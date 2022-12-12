import { AxiosRequestConfig } from "axios";

import fetchFromAPI from "./";

function fetchFromCamp(URL: string, config: AxiosRequestConfig) {
  return fetchFromAPI(`/camp/${URL}`, config);
}

/** Create a camp */
export async function createCamp(accessToken: string) {
  var response = await fetchFromCamp("", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status == 201) return { success: true, camp: response.data };
  return { success: false, error: response.error };
}
