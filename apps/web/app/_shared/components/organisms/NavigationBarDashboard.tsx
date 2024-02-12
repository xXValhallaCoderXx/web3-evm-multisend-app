"use client";
import React, { FC } from "react";
import { Box, Flex, Text, Select, Button, Tooltip } from "@chakra-ui/react";
import ConnectedAvatar from "@/components/molecules/ConnectedAvatar";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

interface ITopNavigationBarProps {
  handleOnChangeChain?: any;
  onClickConnectButton?: any;
  chainOptions?: any;
  isSideMenuOpen?: boolean;
}

const NavigationBarDashboard: FC<ITopNavigationBarProps> = ({
  handleOnChangeChain,
  chainOptions,
  onClickConnectButton,
  isSideMenuOpen,
}) => {
  const router = useRouter();
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
        {!isSideMenuOpen && (
          <Text
            letterSpacing={0.7}
            w="140px"
            ml={-3.5}
            mb={0.5}
            color="white"
            fontWeight="bold"
            fontSize="xl"
          >
            C<span style={{ fontSize: 14 }}>hain</span>B
            <span style={{ fontSize: 14 }}>atch</span>X
          </Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" gap={4}>
        {isConnected && address && (
          <Flex alignItems="center" gap={2}>
            {/* <Select
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
            </Select> */}
            <ConnectedAvatar address={address} />
          </Flex>
        )}

        {!isConnected && (
          <Button colorScheme="accent" size="sm" onClick={onClickConnectButton}>
            {address ? "Disconnect" : "Connect Wallet"}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavigationBarDashboard;
