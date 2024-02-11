"use client";

import React, { FC } from "react";
import { Box, Flex, Text, Select, Button, Tooltip } from "@chakra-ui/react";
import { selectChains } from "@/shared/slice/chains/chains-selector";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import SplitText from "../atoms/SplitText";
interface ITopNavigationBarProps {
  handleOnChangeChain?: any;
  onClickConnectButton?: any;
  chainOptions?: any;
}

const TopNavigationBar: FC<ITopNavigationBarProps> = ({
  handleOnChangeChain,
  chainOptions,
  onClickConnectButton,
}) => {
  const router = useRouter();
  const chains = useAppSelector(selectChains);
  const { isConnected, address, chainId } = useAccount();

  const onClickRoute = (_url: string) => () => {
    router.push(_url);
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bgColor="primary.700"
      color="white"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    >
      <Flex alignItems="center">
        <Box w="140px" color="white" fontWeight="bold" fontSize="lg">
          MultiSendX
        </Box>
        <Flex align="center" gap={6}>
          <Text
            onClick={onClickRoute("/multisend/native")}
            variant="ghost"
            fontSize={14}
            color="timberwolf.300"
            _hover={{
              cursor: "pointer",
              color: "timberwolf.100",
            }}
          >
            Batch Transfers
          </Text>

          <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
            <Text
              variant="ghost"
              fontSize={14}
              color={isConnected ? "timberwolf.300" : "timberwolf.700"}
              _hover={{
                cursor: "pointer",
                color: isConnected ? "timberwolf.100" : "",
              }}
            >
              Transaction History
            </Text>
          </Tooltip>
          <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
            <Text
              onClick={onClickRoute("/contacts")}
              variant="ghost"
              fontSize={14}
              color={isConnected ? "timberwolf.300" : "timberwolf.700"}
              _hover={{
                cursor: "pointer",
                color: isConnected ? "timberwolf.100" : "",
              }}
            >
              Contacts
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" gap={4}>
        {isConnected && (
          <Flex alignItems="center" gap={2}>
            <Select
              onChange={handleOnChangeChain}
              defaultValue={chainId}
              borderColor="primary.500"
              focusBorderColor="secondary.500"
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
              {address ?? ""}
            </SplitText>
          </Flex>
        )}

        <Button
          colorScheme="secondary"
          size="xs"
          onClick={onClickConnectButton}
        >
          {address ? "Disconnect" : "Connect"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default TopNavigationBar;
