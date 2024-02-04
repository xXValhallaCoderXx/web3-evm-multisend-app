"use client";
import { FC, ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { injected } from "wagmi/connectors";
import { useToast } from "@chakra-ui/react";
import TopNavigationBar from "@/components/organisms/TopNaivigationBar";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const toast = useToast();
  const {
    chains,
    switchChain,
    isError: isSwitchError,
    isPending: isSwitchPaused,
    isSuccess: isSwitchSuccess,
    error,
    ...rest
  } = useSwitchChain();
  const { address, chainId } = useAccount();

  useEffect(() => {
    if (isSwitchSuccess) {
      toast({
        title: "Action Success",
        // @ts-ignore
        description: "Switched network",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }

    if (isSwitchError) {
      toast({
        title: "Wallet Action Rejected",
        // @ts-ignore
        description: error?.cause?.message,
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
  }, [isSwitchSuccess, isSwitchError]);

  const handleWalletConnection = () => {
    if (address) {
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
  console.log("CHAIN ID: ", rest);
  return (
    <Box bgGradient="linear-gradient(to bottom, #2d0c59, #5c4baf)" h="100vh">
      <TopNavigationBar
        address={address}
        chainId={chainId}
        onClickConnectButton={handleWalletConnection}
        handleOnChangeChain={handleOnChangeChain}
        chainOptions={parseChainOptions()}
      />

      {children}
    </Box>
  );
};

export default MainLayout;
