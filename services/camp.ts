import { AxiosRequestConfig } from "axios";
import { CampLocationInput } from "../component/camp-editor/location";
import { CampDetailsInput } from "../lib/schema";

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

/** Get camp */
export async function getCampInfo(campId: string) {
  var response = await fetchFromCamp(`${campId}/info`, {
    method: "GET",
  });

  if (response.status == 200) {
    return { success: true, camp: response.data.camp };
  }

  return { success: false, error: response.error };
}

/** Update camp settings */
export async function updateCampSettings(
  campId: string,
  data: CampDetailsInput,
  accessToken?: string
) {
  var response = await fetchFromCamp(`${campId}/details`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.status == 200) {
    return { success: true, camp: response.data?.camp };
  }
  return { success: false, error: response.error };
}

/** Update location */
export async function updateCampLocation(
  campId: string,
  data: CampLocationInput,
  accessToken?: string
) {
  var response = await fetchFromCamp(`${campId}/location`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.status == 200) {
    return { success: true, camp: response.data?.camp };
  }
  return { success: false, error: response.error };
}

/** Update camp image */
export async function addCampImage(
  campId: string,
  data: FormData,
  accessToken?: string
) {
  var response = await fetchFromCamp(`${campId}/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.status == 200) {
    return {
      success: true,
      camp: response.data?.camp,
      imageURL: response.data?.imageURL,
    };
  }

  return { success: false, error: response.error };
}
