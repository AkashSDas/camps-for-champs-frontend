import { useRouter } from "next/router";

import { Box } from "@chakra-ui/react";

import { pxToRem } from "../../lib/pxToRem";

export default function MainContent() {
  var router = useRouter();

  return (
    <Box ml={pxToRem(122)} display="flex" justifyContent="center">
      {JSON.stringify(router.query)}
    </Box>
  );
}
