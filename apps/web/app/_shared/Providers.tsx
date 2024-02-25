"use client";
import { FC } from "react";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { wagmiConfig } from "@/shared/lib/wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReduxProvider from "@/shared//providers/ReduxProviders";
import theme from "@/shared/styles/chakra-ui-theme";

const queryClient = new QueryClient();
const RootProvider: FC<
  AppProps<{
    session: Session;
  }>
> = ({ Component, pageProps }) => {
  return (
    <ReduxProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <ChakraProvider theme={theme}>
              {<Component {...pageProps} />}
            </ChakraProvider>
          </SessionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
