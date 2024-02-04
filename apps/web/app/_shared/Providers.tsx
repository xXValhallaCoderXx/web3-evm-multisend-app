"use client";
import { FC } from "react";
import { WagmiProvider } from "wagmi";
import { ChakraProvider } from '@chakra-ui/react'
import { wagmiConfig } from "@/shared/config/wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReduxProvider from "@/shared//providers/ReduxProviders";
import theme from "@/shared/styles/chakra-ui-theme";
interface IRootProviderProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const RootProvider: FC<IRootProviderProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
