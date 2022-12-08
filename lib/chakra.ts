import { extendTheme } from "@chakra-ui/react";

import { pxToRem } from "./pxToRem";

export var theme = extendTheme({
  fonts: {
    heading: `'Cubano', sans-serif`,
    body: `'Poppins', sans-serif`,
    button: `'Poppins', sans-serif`,
  },
  color: {
    brand: {
      lightOrange: "#FFF3EE",
    },
  },
  components: {
    Button: {
      variants: {
        ghost: {
          _hover: { bg: "#EBEBEB" },
          _active: { bg: "#E0E0E0" },
          fontFamily: "body",
          fontWeight: "medium",
          rounded: "full",
          fontSize: "md",
          h: pxToRem(40),
        },
        outline: {
          _hover: { bg: "#EBEBEB" },
          _active: { bg: "#E0E0E0" },
          fontFamily: "body",
          fontWeight: "medium",
          rounded: "full",
          fontSize: "md",
          h: pxToRem(40),
          px: pxToRem(24),
          border: "1px solid #F0F0F0",
        },
        lightSolid: {
          bg: "#FFF3EE",
          color: "#DF6531",
          _hover: { bg: "#F7ECE7" },
          _active: { bg: "#F0E5E0" },
          fontFamily: "body",
          fontWeight: "medium",
          rounded: "full",
          fontSize: "md",
          h: pxToRem(40),
          px: pxToRem(16),
        },
        bigSolid: {
          bg: "#DF6531",
          color: "#FFFFFF",
          _hover: { bg: "#D15F2E" },
          _active: { bg: "#C75A2C" },
          fontFamily: "body",
          fontWeight: "medium",
          rounded: "full",
          fontSize: "md",
          h: pxToRem(60),
          px: pxToRem(32),
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "#22201F",
      },
    },
    Text: {
      baseStyle: {
        color: "#4B4B4B",
        fontFamily: "body",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "#4B4B4B",
        fontFamily: "body",
        fontWeight: "medium",
        fontSize: "sm",
      },
    },
    Input: {
      defaultProps: {
        variant: "base",
      },
      variants: {
        base: {
          field: {
            border: "0px solid",
            borderBottom: "2px solid",
            bg: "#FAFAFA",
            borderColor: "#CDCDCD",
            borderRadius: "0",
            h: pxToRem(44),
            fontFamily: "body",
            fontWeight: "medium",
            outline: "0",
          },
        },
      },
    },
  },
});
