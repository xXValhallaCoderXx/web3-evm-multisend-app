"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/redux-hooks";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import MainLayout from "./shared/components/layouts/MainLayout";
import MultiSendEthForm from "./shared/components/organisms/MultiSendEth";
import MultiSendToken from "./shared/components/organisms/MultiSendTokens";
import PaymentBreakdownCard from "@/components/organisms/PaymentBreakdownCard";
import PaymentTypeCard from "@/components/organisms/PaymentTypeCard";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import CsvUpload from "@/components/molecules/CsvUpload";
import AddTokenModal from "@/components/molecules/AddTokenModal";

export default function Home() {
  const paymentType = useAppSelector((state) => state.transaction.paymentType);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Flex gap={2}>
          <Button onClick={onOpen} leftIcon={<AddIcon />} size="sm">
            Add Token
          </Button>
          <CsvUpload />
        </Flex>
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
      <AddTokenModal onClose={onClose} isOpen={isOpen} />
    </MainLayout>
  );
}
