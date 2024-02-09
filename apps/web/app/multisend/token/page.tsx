"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import MultiSendToken from "@/components/organisms/MultiSendTokens";
import PaymentBreakdownCard from "@/components/organisms/PaymentBreakdownCard";
import PaymentTypeCard from "@/components/organisms/PaymentTypeCard";
import LoadingOverlay from "@/components/molecules/LoadingOverlay";

export default function TokenSendPage() {
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
    <Flex width={1000} minWidth={600} gap={4}>
      <Flex flexDir="column" gap={4} flex={1}>
        <PaymentTypeCard value={pathname} onChange={paymentTypeOnChange} />
        <PaymentBreakdownCard />
      </Flex>
      <Flex flex={2} minH={500}>
        <MultiSendToken />
      </Flex>
    </Flex>
  );
}
