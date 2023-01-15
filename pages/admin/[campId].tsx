import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import { Box, Spinner } from "@chakra-ui/react";

import BasicSettings from "../../components/camp-settings/basic-settings";
import CancellationPolicySettings from "../../components/camp-settings/cancellation-policy";
import { Tab } from "../../components/camp-settings/layout";
import { pxToRem } from "../../lib/chakra-ui";
import { useEditCamp } from "../../lib/hooks";

export default function EditCampPage() {
  var router = useRouter();
  var tab = router.query.tab as Tab;
  var { isLoading, camp } = useEditCamp();

  // Using useCallback to prevent unnecessary re-rendering (continuously)
  var DisplayTab = useCallback(() => {
    switch (tab) {
      case Tab.SETTINGS:
        return <BasicSettings />;
      case Tab.LOCATION:
        return <div>Location</div>;
      case Tab.TIMING:
        return <div>Timing</div>;
      case Tab.CANCELLATION:
        return <CancellationPolicySettings />;
      case Tab.ACTIVITIES:
        return <div>Activity</div>;
      case Tab.IMAGES:
        return <div>Image</div>;
      case Tab.TAGS:
        return <div>Tag</div>;
      case Tab.DISCOUNTS:
        return <div>Discount</div>;
      default:
        return <div>Invalid tab</div>;
    }
  }, [tab]);

  useEffect(
    function handleTabChange() {
      if (camp && (!tab || !Object.values(Tab).includes(tab))) {
        router.replace(`/admin/${camp.campId}?tab=${Tab.SETTINGS}`);
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
