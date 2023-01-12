import { extendTheme } from "@chakra-ui/react";

export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

// =====================================
// Styles
// =====================================

var fonts = {
  heading: "Cubano, sans-serif",
  body: "Poppins, sans-serif",
  button: "Poppins, sans-serif",
};

var colors = {
  /** Brand colors */
  b: {
    red0: "#FFE4E1",
    red1: "#F78C83",
    red2: "#E35D52",
    red3: "#CF554A",
    red4: "#B54A41",
    green0: "#A8FFB1",
    green1: "#98F5A1",
    green2: "#7CCC84",
    green3: "#65B56D",
    green4: "#5A9E61",
    blue0: "#D4E0F4",
    blue1: "#B0C9F4",
    blue2: "#73A3F4",
    blue3: "#4285F4",
    blue4: "#2976F4",
    grey0: "#FFFFFF",
    grey1: "#F5F5F5",
    grey2: "#EDEDED",
    grey3: "#D1D1D1",
    grey4: "#545454",
    grey5: "#22201F",
    orange0: "#FFFBFA",
    orange1: "#FFEAE0",
    orange2: "#FFB494",
    orange3: "#FF7E47",
    orange4: "#FF6D2E",
    orange5: "#FF5B14",
    orange6: "#DF6531",
  },
};

var Button = {
  variants: {
    inverted: {
      bg: colors.b.orange1,
      color: colors.b.orange6,
      fontFamily: "body",
      fontWeight: "normal",
      rounded: "full",
      fontSize: "md",
      h: pxToRem(40),
      px: pxToRem(12),
      _hover: { bg: "#FFDBCC" },
      _active: { bg: "#FFCFBA" },
    },
    "icon-ghost": {
      h: pxToRem(40),
      px: pxToRem(10),
      rounded: pxToRem(14),
      _hover: { bg: colors.b.grey1 },
      _active: { bg: colors.b.grey2 },
    },
  },
};

export var theme = extendTheme({
  fonts,
  colors,
  components: { Button },
});
