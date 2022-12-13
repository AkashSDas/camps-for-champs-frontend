import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { Box } from "@chakra-ui/react";

import { useCampEditorShallowRouting } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { ActivityIcon, CancellationPolicyIcon, DiscountIcon, ImageIcon, LocationIcon, PublicViewIcon, SettingsIcon, TagIcon } from "../icons";

export default function CampEditorSidebar() {
  var { navigateToTab } = useCampEditorShallowRouting("settings");

  function NavLink({ children, tab }: { children: JSX.Element; tab: string }) {
    return <div onClick={navigateToTab(tab)}>{children}</div>;
  }

  return (
    <Box
      position="fixed"
      w={pxToRem(80)}
      py={pxToRem(64)}
      rounded={pxToRem(24)}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={pxToRem(48)}
      bg="#22201F"
      left={pxToRem(32)}
      top="50%"
      transform="translateY(-45%)"
    >
      <NavLink tab="settings">
        <SettingsIcon />
      </NavLink>

      <NavLink tab="location">
        <LocationIcon />
      </NavLink>

      <NavLink tab="cancellation-policy">
        <CancellationPolicyIcon />
      </NavLink>

      <NavLink tab="activity">
        <ActivityIcon />
      </NavLink>

      <NavLink tab="image">
        <ImageIcon />
      </NavLink>

      <NavLink tab="tag">
        <TagIcon />
      </NavLink>

      <NavLink tab="discount">
        <DiscountIcon />
      </NavLink>

      <NavLink tab="public-view">
        <PublicViewIcon />
      </NavLink>
    </Box>
  );
}
