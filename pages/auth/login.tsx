import { HStack } from "@chakra-ui/react";

import LoginSection from "../../component/auth/login";
import Promotion from "../../component/auth/promotion";
import { pxToRem } from "../../lib/pxToRem";

export default function LoginPage() {
  return (
    <HStack
      as="main"
      mt={pxToRem(64)}
      pl={pxToRem(64)}
      pr={pxToRem(160)}
      justifyContent="space-between"
    >
      <Promotion />
      <LoginSection />
    </HStack>
  );
}
