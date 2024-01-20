"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { Flex } from "@chakra-ui/react";
import MainLayout from "./shared/components/layouts/MainLayout";
import MultiSendEthForm from "./shared/components/organisms/MultiSendEth";
import MultiSendToken from "./shared/components/organisms/MultiSendTokens";
import PaymentBreakdownCard from "@/components/organisms/PaymentBreakdownCard";
import PaymentTypeCard from "@/components/organisms/PaymentTypeCard";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import CsvUpload from "@/components/molecules/CsvUpload";

export default function Home() {
  const paymentType = useAppSelector((state) => state.transaction.paymentType);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingOverlay isLoading />;
  }
  return (
    <MainLayout>
      <Flex p={4} mt={6} justifyContent="flex-end">
        <CsvUpload />
      </Flex>
      <Flex bgColor="red" mt={4} p={4} gap={4} flexDirection="row">
        <Flex flex="1" flexDirection="column" bgColor="red" gap={4}>
          <PaymentTypeCard />
          <PaymentBreakdownCard />
        </Flex>
        <Flex flex="2">
          {paymentType === "native" && <MultiSendEthForm />}
          {paymentType === "token" && <MultiSendToken />}
        </Flex>
        <Flex flex="2">
          <RecentTransactionsCard />
        </Flex>
      </Flex>
    </MainLayout>
  );
}
