import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth";
import { getUser } from "../services/user";

export function useUser() {
  var { data: newAccessTokenData, status: newAccessTokenStatus } = useQuery(
    "access-token",
    getNewAccessToken
  );

  var { data: userData, status: userStatus } = useQuery(
    "user",
    () => getUser(newAccessTokenData?.accessToken),
    {
      enabled:
        newAccessTokenData?.user == null && newAccessTokenStatus == "error",
    }
  );

  // The first request will be made to the `access-token` query, and the second
  // request will be made to the `user` query, if the `access-token` query fails.
  // Therefore giving newAccessTokenStatus precedence over userStatus until `access-token`
  // query fails.
  function getStatus() {
    if (newAccessTokenStatus != "error") return newAccessTokenStatus;
    return userStatus;
  }

  function getLoggedInStatus() {
    if (newAccessTokenData?.user || userData?.user) {
      let user = newAccessTokenData?.user || userData?.user;

      // Checking for required fields to be present, if not then signup is not
      // completed.
      if (user?.email) return true;
    }

    return false;
  }

  return {
    accessToken: newAccessTokenData?.accessToken,
    user: newAccessTokenData?.user || userData?.user,
    isLoggedIn: getLoggedInStatus(),
    status: getStatus(),
  };
}
