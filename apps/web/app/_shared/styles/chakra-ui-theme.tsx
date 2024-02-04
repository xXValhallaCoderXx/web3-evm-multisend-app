import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    500: "#2d0c59", // dark purple
    300: "#5c4baf", // light purple
  },
  secondary: {
    500: "#462ADF",
  },
  highlight: {
    500: "#ff61d2", // vivid pink
    300: "#ff85e9", // soft pink
  },
  accent: {
    500: "#f8e71c", // yellow
  },
  neutral: {
    500: "#8b9dac", // grey blue
    100: "#ffffff", // white
    900: "#000000", // black
  },
};

const theme = extendTheme({
  colors,
});

export default theme;
