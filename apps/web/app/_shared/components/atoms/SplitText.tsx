import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface SplitTextProps extends TextProps {
  children: string;
  split: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  split,
  ...textProps
}) => {
  // Function to split the text based on the 'split' prop
  const getSplitText = (text: string): string => {
    if (text.length <= split * 2) {
      return text; // Return the original text if it's too short to split
    }
    const start = text.substring(0, split);
    const end = text.substring(text.length - split);
    return `${start}...${end}`;
  };

  return <Text {...textProps}>{getSplitText(children)}</Text>;
};

export default SplitText;
