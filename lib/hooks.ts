import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth.service";

export function useUser() {
  var { data, status } = useQuery("user", getNewAccessToken);

  return {
    isLoggedIn: !!data?.user,
    user: data?.user,
    accessToken: data?.accessToken,
    message: data?.message,
    isLoading: status == "loading",
  };
}
