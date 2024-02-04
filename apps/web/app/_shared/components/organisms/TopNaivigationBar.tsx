"use client";

import React, { FC } from "react";
import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  Select,
  Text,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface ITopNavigationBarProps {
  address?: string;
  chainId?: number;
  handleOnChangeChain?: any;
  handleOnClick?: any;
  chainOptions?: any;
}

const TopNavigationBar: FC<ITopNavigationBarProps> = ({
  address,
  chainId,
  handleOnChangeChain,
  chainOptions,
  handleOnClick,
}) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, #2d0c59, #5c4baf)",
    "linear(to-r, #2d0c59, #5c4baf)"
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgGradient={bgGradient}
      color="white"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    >
      {/* Logo or Brand Name */}
      <Box w="200px" color="white" fontWeight="bold" fontSize="lg">
        MultiSendX
      </Box>

      {/* Navigation Links */}
      <Flex align="center" justify="center" gap={2}>
        <Link
          px={2}
          py={1}
          as={NextLink}
          rounded={"md"}
          href={"/multisend/native"}
          _hover={{ textDecoration: "none", bg: "purple.500" }}
        >
          Payments
        </Link>

        <Link
          px={2}
          py={1}
          rounded={"md"}
          href={"/recent-transactions"}
          as={NextLink}
          _hover={{ textDecoration: "none", bg: "purple.500" }}
        >
          Transaction History
        </Link>
        {address && (
          <Select
            onChange={handleOnChangeChain}
            defaultValue={chainId}
            w={140}
            size="xs"
            placeholder="Select Network"
          >
            {chainOptions.map((chain: any) => (
              <option key={chain?.value} value={chain?.value}>
                {chain?.label}
              </option>
            ))}
          </Select>
        )}
        <Flex alignItems="center" justifyContent="space-between" gap={4}>
          <Text fontSize="xs">{address}</Text>
          <Button size="xs" onClick={handleOnClick}>
            {address ? "Disconnect" : "Connect"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TopNavigationBar;
