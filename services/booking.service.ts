import fetchFromAPI from "../lib/axios";
import { BookCampInput } from "../lib/input-schema";
import { BookCampResponse } from "./types/booking.service.type";

export async function bookCamp(
  accessToken: string,
  campId: string,
  data: BookCampInput
): Promise<BookCampResponse> {
  var response = await fetchFromAPI(`/booking/camp/${campId}`, {
    method: "POST",
    data,
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
