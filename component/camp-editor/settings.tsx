import { useForm } from "react-hook-form";

import { Box } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { pxToRem } from "../../lib/pxToRem";
import { campDetailSchema, CampDetailsInput } from "../../lib/schema";

export default function CampSettingsTab() {
  var { reset, register, handleSubmit, formState } = useForm<CampDetailsInput>({
    defaultValues: {},
    resolver: yupResolver(campDetailSchema),
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={pxToRem(32)}
    >
      Camp Settings
    </Box>
  );
}
