"use client";
import { ReactNode, FC, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Flex, Box, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";
import MainLayout from "@/shared/components/layouts/MainLayout";
import RecentTransactionsCard from "@/components/organisms/RecentTransactions";
import CsvUpload from "@/components/molecules/CsvUpload";
import AddTokenModal from "@/components/molecules/AddTokenModal";

interface IMultiSendLayout {
  children: ReactNode;
}

const MultiSendLayout: FC<IMultiSendLayout> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      >
        <Flex gap={4} mt={8} flexDir="column" width={1000}>
          <Flex justifyContent="flex-end">
            <Flex gap={4}>
              {pathname.includes("token") && (
                <Tooltip
                  hasArrow
                  isDisabled={isConnected}
                  label="Connect wallet"
                >
                  <Button
                    onClick={onOpen}
                    isDisabled={!isConnected}
                    colorScheme="secondary"
                    leftIcon={<AddIcon fontSize={12} />}
                    size="sm"
                  >
                    Add Token
                  </Button>
                </Tooltip>
              )}
              <CsvUpload isConnected={isConnected} />
            </Flex>
          </Flex>
          <Flex justifyContent="center">{children}</Flex>
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
};

export default MultiSendLayout;
