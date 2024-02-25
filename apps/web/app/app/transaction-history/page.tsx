"use client";
import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import MainLayout from "@/shared/components/layouts/MainLayout";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

export default function TokenSendPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingOverlay isLoading />;
  }

  return (
    <MainLayout>
      <Flex
        alignItems="center"
        height="calc(100vh - 65px)"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex justifyContent="center">
          <Box width={1000}>
            <RecentTransactionsCard />
          </Box>
        </Flex>
      </Flex>
    </MainLayout>
  );
}
