import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import { getNewAccessToken } from "../services/auth";
import { getCampInfo } from "../services/camp";
import { getUser } from "../services/user";

export function useEditCamp() {
  var router = useRouter();
  var { data, status } = useQuery(
    ["get-edit-camp", router.query.campId as string],
    () => getCampInfo(router.query.campId as string),
    { enabled: router.query.campId != null }
  );

  return { camp: data?.camp, status, error: data?.error };
}

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

export function useCampEditorShallowRouting(defaultTab: string) {
  var router = useRouter();
  var navigateToSettings = useRef(false);

  useEffect(
    function () {
      if (!router.query.campId && !navigateToSettings.current) return;

      router.push(
        `/admin/${router.query.campId}?tab=${defaultTab}`,
        undefined,
        { shallow: true }
      );
      navigateToSettings.current = true;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.query.campId]
  );

  function navigateToTab(tab: string) {
    return function () {
      router.push(`/admin/${router.query.campId}?tab=${tab}`, undefined, {
        shallow: true,
      });
    };
  }

  return {
    campId: router.query.campId,
    navigateToTab,
    currentTab: router.query.tab,
  };
}
