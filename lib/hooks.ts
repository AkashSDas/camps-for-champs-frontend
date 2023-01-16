import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth.service";
import { getCamp, getCamps, getPublicCamps } from "../services/camp.service";

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

export function useEditCamp() {
  var router = useRouter();
  var { user, accessToken } = useUser();

  var { data, status } = useQuery(
    ["edit-camp", router.query.campId],
    () => getCamp(router.query.campId as string, accessToken as string),
    {
      enabled:
        !!accessToken && !!router.query.campId && user?.roles.includes("admin"),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    camp: data?.camp,
    message: data?.message,
    isLoading: status == "loading",
  };
}

export function useEditCamps() {
  var { user, accessToken } = useUser();

  var { data, status } = useQuery(
    "edit-camps",
    () => getCamps(accessToken as string),
    {
      enabled: !!accessToken && user?.roles.includes("admin"),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    camps: data?.camps,
    message: data?.message,
    isLoading: status == "loading",
  };
}

export function useCamps() {
  var { data, status } = useQuery("public-camps", getPublicCamps, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    camps: data?.camps,
    message: data?.message,
    isLoading: status == "loading",
  };
}
