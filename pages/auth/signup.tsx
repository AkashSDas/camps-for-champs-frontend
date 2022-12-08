import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

import Promotion from "../../component/auth/promotion";
import { theme as customTheme } from "../../lib/chakra";
import { pxToRem } from "../../lib/pxToRem";

export default function SignupPage() {
  return (
    <HStack as="main" mt={pxToRem(64)} px={pxToRem(64)}>
      <Promotion />
    </HStack>
  );
}
