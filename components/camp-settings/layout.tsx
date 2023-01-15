import { useRouter } from "next/router";

import { Box, IconButton, Tooltip, VStack } from "@chakra-ui/react";

import { pxToRem, theme } from "../../lib/chakra-ui";
import { useEditCamp } from "../../lib/hooks";
import { AlaramIcon, ImageIcon, LocationIcon, ReceiptIcon, SettingsIcon } from "../icons";

export enum Tab {
  SETTINGS = "settings",
  LOCATION = "location",
  TIMING = "timing",
  CANCELLATION = "cancellation-policy",
  ACTIVITIES = "activities",
  IMAGES = "images",
  TAGS = "tags",
  DISCOUNTS = "discounts",
}

export function CampSettingsLayout({ children }: { children: JSX.Element }) {
  return (
    <Box position="relative" w="full" mb={pxToRem(256)}>
      <Sidebar />
      <Box>{children}</Box>
    </Box>
  );
}

function Sidebar() {
  var router = useRouter();
  var { camp } = useEditCamp();

  function navigationToSetting(tab: Tab) {
    router.push(`/admin/${camp?.campId}?tab=${tab}`);
  }

  return (
    <VStack
      position="fixed"
      w={pxToRem(80)}
      borderRight="1px solid"
      borderColor={theme.colors.b.grey1}
      h="calc(100vh - 56px)"
      py={pxToRem(32)}
      gap={pxToRem(32)}
    >
      <Tooltip label="Settings" placement="right">
        <IconButton
          aria-label="Camp basic settings"
          variant="icon-ghost"
          onClick={() => navigationToSetting(Tab.SETTINGS)}
        >
          <SettingsIcon className="icon-normal-fill" />
        </IconButton>
      </Tooltip>

      <Tooltip label="Timing" placement="right">
        <IconButton
          aria-label="Camp timing settings"
          variant="icon-ghost"
          onClick={() => navigationToSetting(Tab.TIMING)}
        >
          <AlaramIcon className="icon-normal-stroke" />
        </IconButton>
      </Tooltip>

      <Tooltip label="Location" placement="right">
        <IconButton
          aria-label="Camp location settings"
          variant="icon-ghost"
          onClick={() => navigationToSetting(Tab.LOCATION)}
        >
          <LocationIcon className="icon-normal-stroke" />
        </IconButton>
      </Tooltip>

      <Tooltip label="Cancellation Policy" placement="right">
        <IconButton
          aria-label="Camp cancellation policy settings"
          variant="icon-ghost"
          onClick={() => navigationToSetting(Tab.CANCELLATION)}
        >
          <ReceiptIcon className="icon-normal-stroke" />
        </IconButton>
      </Tooltip>

      <Tooltip label="Images" placement="right">
        <IconButton
          aria-label="Camp images"
          variant="icon-ghost"
          onClick={() => navigationToSetting(Tab.IMAGES)}
        >
          <ImageIcon className="icon-normal-stroke" />
        </IconButton>
      </Tooltip>
    </VStack>
  );
}
