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
    { enabled: newAccessTokenData?.user == null }
  );

  // The first request will be made to the `access-token` query, and the second
  // request will be made to the `user` query, if the `access-token` query fails.
  // Therefore giving newAccessTokenStatus precedence over userStatus until `access-token`
  // query fails.
  function getStatus() {
    if (newAccessTokenStatus != "error") return newAccessTokenStatus;
    return userStatus;
  }

  return {
    user: newAccessTokenData?.user || userData?.user,
    status: getStatus(),
  };
}
