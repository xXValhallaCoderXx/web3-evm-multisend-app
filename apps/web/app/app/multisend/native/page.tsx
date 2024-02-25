"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Flex } from "@chakra-ui/react";
import { useGetTokenPriceQuery } from "@/shared/slice/prices/price.api";
import MultiSendEthForm from "@/shared/components/organisms/MultiSendEth";
import NativeSendPaymentBreakdown from "@/components/organisms/NativeSendPaymentBreakdown";
import PaymentTypeCard from "@/components/molecules/PaymentTypeCard";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

export default function NativeSendPage() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    data: tokenPrice,
    isLoading: isLoadingPrice,
    isError: isTokenPriceError,
  } = useGetTokenPriceQuery({
    query: {
      token: "ETH",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isTokenPriceError) {
      console.log("Error fetching token price");
    }
  }, [isTokenPriceError]);

  if (!isClient) {
    return <LoadingOverlay isLoading />;
  }

  const paymentTypeOnChange = (value: string) => {
    router.push(value);
  };

  return (
    <Flex width={1000} minWidth={600} gap={4}>
      <Flex flexDir="column" gap={4} flex={1}>
        <PaymentTypeCard value={pathname} onChange={paymentTypeOnChange} />
        <NativeSendPaymentBreakdown
          isLoading={isLoadingPrice}
          nativeTokenPrice={tokenPrice?.price ?? ""}
        />
      </Flex>
      <Flex flex={2} minH={500}>
        <MultiSendEthForm />
      </Flex>
    </Flex>
  );
}
