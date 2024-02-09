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
import SplitText from "../atoms/SplitText";
interface ITopNavigationBarProps {
  address?: string;
  chainId?: number;
  handleOnChangeChain?: any;
  onClickConnectButton?: any;
  chainOptions?: any;
}

const TopNavigationBar: FC<ITopNavigationBarProps> = ({
  address,
  chainId,
  handleOnChangeChain,
  chainOptions,
  onClickConnectButton,
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
      <Flex alignItems="center">
        <Box w="140px" color="white" fontWeight="bold" fontSize="lg">
          MultiSendX
        </Box>
        <Flex align="center" gap={2}>
          <Link
            px={2}
            py={1}
            fontSize="small"
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
            fontSize="small"
            rounded={"md"}
            href={"/recent-transactions"}
            as={NextLink}
            _hover={{ textDecoration: "none", bg: "purple.500" }}
          >
            Transaction History
          </Link>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" gap={4}>
        {address && (
          <Flex alignItems="center" gap={2}>
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
            <SplitText split={5} fontSize="xs">
              {address}
            </SplitText>
          </Flex>
        )}

        <Button size="xs" onClick={onClickConnectButton}>
          {address ? "Disconnect" : "Connect"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default TopNavigationBar;
