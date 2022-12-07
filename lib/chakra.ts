import { extendTheme } from "@chakra-ui/react";

export var theme = extendTheme({
  fonts: {
    heading: `'Cubano', sans-serif`,
    body: `'Poppins', sans-serif`,
    button: `'Poppins', sans-serif`,
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
        },
      },
    },
  },
});
