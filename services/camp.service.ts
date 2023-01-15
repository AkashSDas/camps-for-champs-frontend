import fetchFromAPI from "../lib/axios";

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

export async function getCamp(id: string, accessToken: string) {
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
