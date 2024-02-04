"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Flex, Box, useDisclosure } from "@chakra-ui/react";

import MainLayout from "@/shared/components/layouts/MainLayout";
import MultiSendEthForm from "@/shared/components/organisms/MultiSendEth";
import PaymentBreakdownCard from "@/components/organisms/PaymentBreakdownCard";
import PaymentTypeCard from "@/components/organisms/PaymentTypeCard";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import CsvUpload from "@/components/molecules/CsvUpload";
import AddTokenModal from "@/components/molecules/AddTokenModal";

export default function NativeSendPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingOverlay isLoading />;
  }

  const paymentTypeOnChange = (value: string) => {
    router.push(value);
  };

  return (
    <MainLayout>
      <Flex p={4} mt={6} mb={4} justifyContent="flex-end">
        <Flex gap={2}>
          <CsvUpload />
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap={4} p={2}>
        <Flex justifyContent="center">
          <Flex width={1000} minWidth={600} gap={4}>
            <Flex flexDir="column" gap={4} flex={1}>
              <PaymentTypeCard
                value={pathname}
                onChange={paymentTypeOnChange}
              />
              <PaymentBreakdownCard />
            </Flex>
            <Flex flex={2} minH={500}>
              <MultiSendEthForm />
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="center">
          <Box width={1000}>
            <RecentTransactionsCard />
          </Box>
        </Flex>
      </Flex>
      <AddTokenModal onClose={onClose} isOpen={isOpen} />
    </MainLayout>
  );
}
