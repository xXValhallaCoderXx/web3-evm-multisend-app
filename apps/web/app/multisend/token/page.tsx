"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Flex, Button, useDisclosure, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import MainLayout from "@/shared/components/layouts/MainLayout";
import MultiSendToken from "@/components/organisms/MultiSendTokens";
import PaymentBreakdownCard from "@/components/organisms/PaymentBreakdownCard";
import PaymentTypeCard from "@/components/organisms/PaymentTypeCard";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import CsvUpload from "@/components/molecules/CsvUpload";
import AddTokenModal from "@/components/molecules/AddTokenModal";

export default function TokenSendPage() {
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
      <Flex
        alignItems="center"
        height="calc(100vh - 65px)"
        flexDirection="column"
      >
        <Flex gap={4} mt={8} flexDir="column" width={1000}>
          <Flex justifyContent="flex-end">
            <Flex gap={4}>
              <Button
                onClick={onOpen}
                colorScheme="secondary"
                leftIcon={<AddIcon fontSize={12} />}
                size="sm"
              >
                Add Token
              </Button>
              <CsvUpload />
            </Flex>
          </Flex>
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
                <MultiSendToken />
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Box width={1000}>
              <RecentTransactionsCard />
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <AddTokenModal onClose={onClose} isOpen={isOpen} />
    </MainLayout>
  );
}
