import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth.service";

export function useUser() {
  var { data, status } = useQuery("user", getNewAccessToken, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    isLoggedIn: !!data?.user && !!data?.accessToken,
    user: data?.user,
    accessToken: data?.accessToken,
    message: data?.message,
    isLoading: status == "loading",
  };
}
