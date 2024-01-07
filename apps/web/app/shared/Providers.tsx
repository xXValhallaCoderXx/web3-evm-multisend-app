"use client";
import { FC } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../config/wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IRootProviderProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const RootProvider: FC<IRootProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {" "}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RootProvider;
