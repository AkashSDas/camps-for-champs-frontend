import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import { Box, Spinner } from "@chakra-ui/react";

import { pxToRem } from "../../lib/chakra-ui";
import { useEditCamp } from "../../lib/hooks";

export default function EditCampPage() {
  var router = useRouter();
  var tab = router.query.tab as string;
  var { isLoading, camp } = useEditCamp();

  // Using useCallback to prevent unnecessary re-rendering (continuously)
  var DisplayTab = useCallback(() => {
    switch (tab) {
      case "settings":
        return <div>Settings</div>;
      case "location":
        return <div>Location</div>;
      case "cancellation-policy":
        return <div>Policy</div>;
      case "activity":
        return <div>Activity</div>;
      case "image":
        return <div>Image</div>;
      case "tag":
        return <div>Tag</div>;
      case "discount":
        return <div>Discount</div>;
      default:
        return <div>Invalid tab</div>;
    }
  }, [tab]);

  useEffect(
    function handleTabChange() {
      if (
        camp &&
        (!tab ||
          ![
            "settings",
            "location",
            "cancellation-policy",
            "activity",
            "image",
            "tag",
            "discount",
          ].includes(tab))
      ) {
        router.replace(`/admin/${camp.campId}?tab=settings`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, !!camp]
  );

  if (isLoading) {
    return (
      <Box pt={pxToRem(128)}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (!camp) return <Box>404</Box>;

  return <DisplayTab />;
}
