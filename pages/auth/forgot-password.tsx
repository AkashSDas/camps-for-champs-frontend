import { HStack } from "@chakra-ui/react";

import ForgotPasswordSection from "../../component/auth/forgot-password";
import Promotion from "../../component/auth/promotion";
import { pxToRem } from "../../lib/pxToRem";

export default function ForgotPasswordPage() {
  return (
    <HStack
      as="main"
      mt={pxToRem(64)}
      pl={pxToRem(64)}
      pr={pxToRem(160)}
      justifyContent="space-between"
    >
      <Promotion />
      <ForgotPasswordSection />
    </HStack>
  );
}
