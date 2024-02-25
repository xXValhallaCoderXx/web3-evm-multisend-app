"use client";
import React, { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import ConnectedAvatar from "@/components/molecules/ConnectedAvatar";

import { useAccount } from "wagmi";

interface ITopNavigationBarProps {
  handleOnChangeChain?: any;
  onClickConnectButton?: any;
  chainOptions?: any;
  isSideMenuOpen?: boolean;
}

const NavigationBarDashboard: FC<ITopNavigationBarProps> = ({
  onClickConnectButton,
}) => {
  const { isConnected, address } = useAccount();

  return (
    <Flex
      as="nav"
      align="center"
      justify="flex-end"
      wrap="wrap"
      padding="1rem"
      bgColor="primary.700"
      color="white"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    >
      {isConnected && address ? (
        <ConnectedAvatar address={address} />
      ) : (
        <Button colorScheme="accent" size="sm" onClick={onClickConnectButton}>
          {address ? "Disconnect" : "Connect Wallet"}
        </Button>
      )}
    </Flex>
  );
};

export default NavigationBarDashboard;
