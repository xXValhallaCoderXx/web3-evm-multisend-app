"use client";
import { ReactNode, FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import { Flex, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
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

  const handleOnCSVUpload = (data: any) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <Flex
        alignItems="center"
        height="calc(100vh - 76px)"
        flexDirection="column"
      >
        <Flex
          flexGrow={1}
          id="main-content-wrapper"
          gap={4}
          flexDir="column"
          width={1000}
        >
          <Flex id="cta-row" pt={8} justifyContent="flex-end">
            {pathname.includes("token") && (
              <Tooltip hasArrow isDisabled={isConnected} label="Connect wallet">
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
            <CsvUpload
              onCsvUpload={handleOnCSVUpload}
              isConnected={isConnected}
            />
          </Flex>
          <Flex id="main-content" justifyContent="center">
            {children}
          </Flex>
          <Flex id="recent-transactions" flexDir="column" flexGrow={1} pb={8}>
            <RecentTransactionsCard />
          </Flex>
        </Flex>
      </Flex>
      <AddTokenModal onClose={onClose} isOpen={isOpen} />
    </MainLayout>
  );
};

export default MultiSendLayout;
