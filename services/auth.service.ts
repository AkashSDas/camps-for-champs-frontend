import fetchFromAPI from "../lib/axios";
import { SignupInput } from "../lib/input-schema";

export async function signup(data: SignupInput) {
  var response = await fetchFromAPI("/auth/email-signup", {
    method: "POST",
    data,
  });

  if (response.statusCode == 201) {
    return {
      message: "Account created successfully",
      user: response.data.user,
      accessToken: response.data.accessToken,
    };
  }

  return { message: response.error.message };
}
