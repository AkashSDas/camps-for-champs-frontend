import { HStack } from "@chakra-ui/react";

import LoginSection from "../../components/auth/login-section";
import PromotionCard from "../../components/auth/promotion-card";
import { pxToRem } from "../../lib/chakra-ui";

export default function SignupPage(): JSX.Element {
  return (
    <HStack w="full" pt={pxToRem(40)} gap={pxToRem(64)} justifyContent="center">
      <PromotionCard />
      <LoginSection />
    </HStack>
  );
}
