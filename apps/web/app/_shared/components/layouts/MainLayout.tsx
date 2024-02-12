/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { injected } from "wagmi/connectors";
import { useToast } from "@chakra-ui/react";
import TopNavigationBar from "@/components/organisms/NavigationBarDashboard";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { walletError } from "@/shared/utils/wallet-error-mapping";
import SideNavigation from "../organisms/SideNavigation";

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const toast = useToast();
  const { disconnect } = useDisconnect();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const {
    connect,
    isError: isConnectError,
    failureReason: connectFailureReason,
  } = useConnect();

  const {
    chains,
    switchChain,
    isError: isSwitchError,
    isSuccess: isSwitchSuccess,
    error,
  } = useSwitchChain();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnectError) {
      const result = walletError(connectFailureReason?.cause ?? null);

      toast({
        title: "Wallet Action Rejected",
        description: result,
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  }, [isConnectError]);

  useEffect(() => {
    if (isSwitchSuccess) {
      toast({
        title: "Action Success",
        description: "Switched network",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }

    if (isSwitchError) {
      const errorMessage =
        (error?.cause as Error)?.message ?? "An unknown error occurred";
      toast({
        title: "Wallet Action Rejected",
        description: errorMessage,
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  }, [isSwitchSuccess, isSwitchError]);

  const handleWalletConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  const parseChainOptions = () => {
    if (chains?.length > 0) {
      return chains?.map((chain) => ({
        value: chain?.id,
        label: chain?.name,
      }));
    }
    return [];
  };

  const handleOnChangeChain = (e: any) => {
    switchChain({ chainId: parseInt(e.target.value) });
  };

  const handleOnClickSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // return (
  //   <Box>
  // <TopNavigationBar
  //   onClickConnectButton={handleWalletConnection}
  //   handleOnChangeChain={handleOnChangeChain}
  //   chainOptions={parseChainOptions()}
  // />
  // <SideNavigation
  //   onClickSideMenu={handleOnClickSideMenu}
  //   isOpen={isSideMenuOpen}
  // />
  //     {children}
  //   </Box>
  // );
  return (
    <Flex height="100vh">
      <SideNavigation
        onClickSideMenu={handleOnClickSideMenu}
        isOpen={isSideMenuOpen}
      />
      <Flex direction="column" flex="1" overflowY="auto">
        <TopNavigationBar
          onClickConnectButton={handleWalletConnection}
          handleOnChangeChain={handleOnChangeChain}
          chainOptions={parseChainOptions()}
          isSideMenuOpen={isSideMenuOpen}
        />
        {children}
      </Flex>
    </Flex>
  );
};

export default MainLayout;
