"use client";

import React, { FC } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Select,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { selectChains } from "@/shared/slice/chains/chains-selector";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import SplitText from "../atoms/SplitText";

const PublicNavigationBar: FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgColor="secondary.700"
      color="white"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    >
      <Flex alignItems="center">
        <Box w="140px" color="white" fontWeight="bold" fontSize="lg">
          MultiSendX
        </Box>
      </Flex>
    </Flex>
  );
};

export default PublicNavigationBar;
