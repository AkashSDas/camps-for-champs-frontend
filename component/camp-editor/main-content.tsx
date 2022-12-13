import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

import { pxToRem } from "../../lib/pxToRem";
import CampSettingsTab from "./settings";

export default function MainContent() {
  var router = useRouter();
  var tab = router.query.tab as string;

  function DisplayTab() {
    switch (tab) {
      case "settings":
        return <CampSettingsTab />;
      case "location":
        return <div>Location</div>;
      case "cancellation-policy":
        return <div>Cancellation Policy</div>;
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
  }

  return (
    <Box ml={pxToRem(122)} display="flex" justifyContent="center">
      <DisplayTab />
    </Box>
  );
}
