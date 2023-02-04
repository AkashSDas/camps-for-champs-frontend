import { getNewAccessToken } from "../services/auth.service";
import { stat } from "fs";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  checkActiveBooking,
  getCampBookings,
  getUserBookings,
} from "../services/booking.service";
import {
  getCamp,
  getCamps,
  getPublicCamp,
  getPublicCamps,
} from "../services/camp.service";

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

export function useCamp() {
  var router = useRouter();
  var { data, status } = useQuery(
    ["public-camp", router.query?.campId],
    () => getPublicCamp(router.query.campId as string),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!router.query.campId,
    }
  );

  return {
    camp: data?.camp,
    message: data?.message,
    isLoading: status == "loading",
  };
}

export function useUserBookings() {
  var { accessToken } = useUser();
  var { data, status } = useQuery(
    ["user-bookings", accessToken],
    () => getUserBookings(accessToken as string),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: accessToken != null,
    }
  );

  return {
    bookings: data?.bookings,
    message: data?.message,
    isLoading: status == "loading",
  };
}

export function useCheckActiveBooking() {
  var { accessToken } = useUser();
  var router = useRouter();
  var { data, status } = useQuery(
    ["check-active-booking", accessToken, router.query?.campId],
    () =>
      checkActiveBooking(accessToken as string, router.query?.campId as string),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: accessToken != null && router.query?.campId != null,
    }
  );

  return {
    booking: data?.booking,
    message: data?.message,
    isLoading: status == "loading",
  };
}

export function useCampBookings() {
  var { accessToken } = useUser();
  var router = useRouter();
  var { data, status } = useQuery(
    ["camp-bookings", accessToken, router.query?.campId],
    () =>
      getCampBookings(accessToken as string, router.query?.campId as string),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: accessToken != null && router.query?.campId != null,
    }
  );

  return {
    bookings: data?.bookings,
    message: data?.message,
    isLoading: status == "loading",
  };
}
