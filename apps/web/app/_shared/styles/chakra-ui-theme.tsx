import { extendTheme, theme, StyleFunctionProps } from "@chakra-ui/react";

const colors = {
  primary: {
    50: "#edeafe",
    100: "#c9c4ee",
    200: "#a69ce0",
    300: "#8375d4",
    400: "#5f4ec8",
    500: "#4734ae",
    600: "#362988",
    700: "#271d61",
    800: "#17113b",
    900: "#080518",
  },
  secondary: {
    50: "#ededff",
    100: "#cccce9",
    200: "#aaa9d5",
    300: "#8987c4",
    400: "#6865b2",
    500: "#4e4b98",
    600: "#3c3b77",
    700: "#2b2a56",
    800: "#191935",
    900: "#090717",
  },
  accent: {
    50: "#ece8ff",
    100: "#c5bbfa",
    200: "#9f90f0",
    300: "#7864e9",
    400: "#5237e1",
    500: "#381ec8",
    600: "#2b179c",
    700: "#1e1071",
    800: "#110946",
    900: "#06021d",
  },
  timberwolf: {
    50: "#f3f3ec",
    100: "#dcdad6",
    200: "#c4c1bd",
    300: "#aba8a2",
    400: "#948f88",
    500: "#7a756e",
    600: "#5f5b55",
    700: "#44413c",
    800: "#292723",
    900: "#120c05",
  },
};

const customTheme = extendTheme({
  colors,
  semanticTokens: {
    colors: {
      "input-focus": { _light: "pink.500", _dark: "pink.300" },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "default",
        bg: "#17113b",
      },
    }),
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          color: "white",
          _active: {
            borderColor: "red.500",
          },
          _placeholder: { opacity: 1, color: "gray.500" },
          // Get rid of the autofill background color
          _autofill: {
            transition: "background-color 0s 600000s, color 0s 600000s",
          },
        },
      },
      // styles for different sizes ("sm", "md", "lg")
      sizes: {},
      // styles for different visual variants ("outline", "solid")
      variants: {
        outline: {
          field: {
            // borderColor: "primary.500",
            _focus: {
              // borderColor: "primary.500",
              boxShadow: "none",
            },
            _hover: {
              // borderColor: "primary.500",
            },
            _active: {
              // borderColor: "primary.500",
            },
          },
        },
      },
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {
        size: "sm",
        variant: "outline",
      },
    },
  },
});

export default customTheme;
