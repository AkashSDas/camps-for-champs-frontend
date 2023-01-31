import React from "react";
import ResizeTextarea from "react-textarea-autosize";
import { Textarea } from "@chakra-ui/react";


function AutoResizeTextarea(props: any, ref: any) {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
}

export default React.forwardRef(AutoResizeTextarea);
