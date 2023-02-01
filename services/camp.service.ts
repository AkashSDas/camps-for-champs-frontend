import fetchFromAPI from "../lib/axios";
import { CampStatus } from "../lib/camp";
import {
  BasicSettingInput,
  CancellationPolicyInput,
  LocationInput,
  TimingInput,
} from "../lib/input-schema";
import {
  GetCampResponse,
  GetCampsResponse,
  UpdateCampSettingsResponse,
} from "./types/camp.service.type";

export async function adminCheckForRequest(userRoles: string[], cb: Function) {
  if (userRoles.includes("admin")) return await cb();
  else {
    return {
      message: "You are not authorized to perform this action",
      success: false,
    };
  }
}

export async function createCamp(accessToken: string) {
  var response = await fetchFromAPI("/camp", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return {
      success: true,
      message: "Successfully created camp",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getCamp(
  id: string,
  accessToken: string
): Promise<GetCampResponse> {
  var response = await fetchFromAPI(`/camp/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched camp",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateCampSetting(
  id: string,
  data: BasicSettingInput,
  accessToken: string
): Promise<UpdateCampSettingsResponse> {
  var response = await fetchFromAPI(`/camp/${id}/settings`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Settings updated",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateCancellationPolicySettings(
  id: string,
  data: CancellationPolicyInput,
  accessToken: string
): Promise<UpdateCampSettingsResponse> {
  var response = await fetchFromAPI(`/camp/${id}/cancellation-policy`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Settings updated",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateLocationSettings(
  id: string,
  data: LocationInput,
  accessToken: string
): Promise<UpdateCampSettingsResponse> {
  var response = await fetchFromAPI(`/camp/${id}/location`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Settings updated",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateTimingSettings(
  id: string,
  data: TimingInput,
  accessToken: string
): Promise<UpdateCampSettingsResponse> {
  var response = await fetchFromAPI(`/camp/${id}/timing`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Settings updated",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function updateStatus(
  id: string,
  data: { status: CampStatus },
  accessToken: string
): Promise<UpdateCampSettingsResponse> {
  var response = await fetchFromAPI(`/camp/${id}/status`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Settings updated",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getCamps(accessToken: string): Promise<GetCampsResponse> {
  var response = await fetchFromAPI("/camp", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched camps",
      camps: response.data.camps,
    };
  }

  return { message: response.error.message, success: false };
}

export async function getPublicCamps(): Promise<GetCampsResponse> {
  var response = await fetchFromAPI("/public-camp/public", { method: "GET" });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Successfully fetched camps",
      camps: response.data.camps,
    };
  }

  return { message: response.error.message, success: false };
}

export async function addImage(
  id: string,
  data: FormData,
  accessToken: string
) {
  var response = await fetchFromAPI(`/camp/${id}/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Image uploaded",
      camp: response.data.camp,
      image: response.data.image,
    };
  }

  return { message: response.error.message, success: false };
}

export async function removeImage(
  id: string,
  data: { id?: string; URL: string },
  accessToken: string
) {
  var response = await fetchFromAPI(`/camp/${id}/image`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
    data,
  });

  if (response.statusCode == 200) {
    return {
      success: true,
      message: "Image removed",
      camp: response.data.camp,
    };
  }

  return { message: response.error.message, success: false };
}
