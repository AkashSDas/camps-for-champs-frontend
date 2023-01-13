import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth.service";

export function useUser() {
  var { data, status } = useQuery("user", getNewAccessToken, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: 5 * 60 * 1000, // Refresh every 30 minutes (access token expires in 5mins)
  });

  return {
    isLoggedIn: !!data?.user && !!data?.accessToken,
    user: data?.user,
    accessToken: data?.accessToken,
    message: data?.message,
    isLoading: status == "loading",
  };
}
