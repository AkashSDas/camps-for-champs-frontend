import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth";

export function useAccessToken() {
  var { data, status } = useQuery("access-token", getNewAccessToken);
  return { data, status };
}
