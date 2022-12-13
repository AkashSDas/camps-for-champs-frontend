import { Box } from "@chakra-ui/react";

import MainContent from "../../component/camp-editor/main-content";
import CampEditorSidebar from "../../component/camp-editor/sidebar";
import { pxToRem } from "../../lib/pxToRem";

export default function EditCampPage() {
  return (
    <Box position="relative" mt={pxToRem(32)}>
      <CampEditorSidebar />
      <MainContent />
    </Box>
  );
}
