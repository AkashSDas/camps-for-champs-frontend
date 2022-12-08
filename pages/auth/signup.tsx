import { HStack } from "@chakra-ui/react";

import Promotion from "../../component/auth/promotion";
import SignupSection from "../../component/auth/signup";
import { pxToRem } from "../../lib/pxToRem";

export default function SignupPage() {
  return (
    <HStack
      as="main"
      mt={pxToRem(64)}
      pl={pxToRem(64)}
      pr={pxToRem(160)}
      justifyContent="space-between"
    >
      <Promotion />
      <SignupSection />
    </HStack>
  );
}
