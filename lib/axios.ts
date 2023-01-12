import axios, { AxiosError, AxiosRequestConfig } from "axios";

export var axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

async function fetchFromAPI(URL: string, config: AxiosRequestConfig) {
  try {
    var response = await axiosInstance(URL, config);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        var error: any = err.response;
      } else if (err.message == "Network Error") {
        var error: any = {
          status: 500,
          data: { message: "Network Error" },
        };
      }
    } else {
      throw new Error("Error occurred while making request to the backend");
    }
  }

  return {
    statusCode: response!?.status ?? error?.status ?? 500,
    data: response!?.data ?? error?.data ?? {},
    error: error?.data,
    success: response!?.status < 300,
  };
}

export default fetchFromAPI;
