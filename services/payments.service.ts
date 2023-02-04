import fetchFromAPI from "../lib/axios";

export async function createPaymentIntentAndCharge(
  amountToCharge: number,
  accessToken: string
) {
  var response = await fetchFromAPI(`/payment/charge`, {
    method: "POST",
    data: { amount: amountToCharge },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.statusCode == 201) {
    return {
      success: true,
      message: "Payment done successfully",
      paymentIntent: response.data.paymentIntent,
    };
  }

  return { message: response.error.message, success: false };
}
