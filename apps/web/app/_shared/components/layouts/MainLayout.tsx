/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { injected } from "wagmi/connectors";
import { useToast } from "@chakra-ui/react";
import TopNavigationBar from "@/components/organisms/NavigationBarDashboard";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { walletError } from "@/shared/utils/wallet-error-mapping";

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const toast = useToast();
  const { disconnect } = useDisconnect();
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

  return (
    <Box>
      <TopNavigationBar
        onClickConnectButton={handleWalletConnection}
        handleOnChangeChain={handleOnChangeChain}
        chainOptions={parseChainOptions()}
      />

      {children}
    </Box>
  );
};

export default MainLayout;
