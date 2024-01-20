"use client";
import { useState, useEffect } from "react";
import { Flex, Box, Text, Stack, Radio } from "@chakra-ui/react";

import MainLayout from "./shared/components/layouts/MainLayout";
import MultiSendEthForm from "./shared/components/organisms/MultiSendEth";
import MultiSendToken from "./shared/components/organisms/MultiSendTokens";

export default function Home() {
  const [paymentType, setPaymentType] = useState("native");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOnChangePaymentType = (_e: any) => {
    setPaymentType(_e?.target?.name);
  };

  if (!isClient) {
    return <div>Loading</div>;
  }
  return (
    <MainLayout>
      <Flex justifyContent="center">
        <Box w={1200}>
          <Flex flexDirection="row">
            <Box w="30%">
              <Text fontSize="lg" fontWeight={600}>
                Payment Type
              </Text>
              <Stack mt={2}>
                <Radio
                  onChange={handleOnChangePaymentType}
                  isChecked={paymentType === "native"}
                  size="md"
                  name="native"
                >
                  Batch Send Native Currency
                </Radio>
                <Radio
                  onChange={handleOnChangePaymentType}
                  isChecked={paymentType === "token"}
                  size="md"
                  name="token"
                >
                  Batch Multiple Token
                </Radio>
              </Stack>
              <Box mt={4}>
                <Text fontSize="lg" fontWeight={600}>
                  Transaction Details
                </Text>
                <Text fontSize="2xl">0.00 ETH</Text>
                <Text fontSize="sm" color="gray" mt={-1}>
                  $0.00
                </Text>
              </Box>
            </Box>
            <Box>
              {" "}
              {paymentType === "native" && <MultiSendEthForm />}
              {paymentType === "token" && <MultiSendToken />}
            </Box>
          </Flex>
          <Box mt={4}>
            <Text>Recent Transfers</Text>
          </Box>
        </Box>
      </Flex>
    </MainLayout>
  );
}
